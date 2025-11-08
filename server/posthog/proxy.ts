import type { RequestHandler } from "express";
import { type IncomingHttpHeaders } from "http";
import { Readable } from "stream";

const API_HOST = process.env.POSTHOG_API_HOST;
const ASSET_HOST = process.env.POSTHOG_ASSET_HOST;

if (!API_HOST || !ASSET_HOST) {
  throw new Error("POSTHOG_API_HOST and POSTHOG_ASSET_HOST environment variables must be set");
}

export const POSTHOG_PROXY_PATH_PREFIX = "/list";

const getRemoteAddr = (req: Parameters<RequestHandler>[0]) => {
	const forwadedFor = req.headers['X-forwarded-for']
	if (!forwadedFor)
		return req.socket.remoteAddress;
	if (typeof forwadedFor === 'string') {
		return forwadedFor.split(',')[0]
	}
	return forwadedFor[0].split(',')[0]
}

const toHeaderInit = (headers: IncomingHttpHeaders): Record<string, string> => {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(headers)) {
		if (typeof value === "string") {
			result[key] = value;
		} else if (Array.isArray(value)) {
			result[key] = value.join(', ');
		}
		// Skip undefined headers
	}
	return result;
}


export const posthogProxy: RequestHandler = (req, resp, next) => {
  const pathname = (req.url ?? "").slice(POSTHOG_PROXY_PATH_PREFIX.length);
  const posthogHost = pathname.startsWith("/static/") ? ASSET_HOST : API_HOST;

  const headers = req.headers;
  headers.host = posthogHost
  if (req.headers.host) {
    headers['X-Forwarded-Host'] = req.headers.host;
  }

	const remoteAddr = getRemoteAddr(req)
	if (remoteAddr) {
		headers["X-Real-IP"] = remoteAddr;
		headers["X-Forwarded-For"] = remoteAddr;
	}

	// Remove sensitive or hop-by-hop headers
	delete headers.cookie;
	delete headers.connection; // https://datatracker.ietf.org/doc/html/rfc7230#section-6.1

	const url = new URL(pathname, `https://${posthogHost}`)
	console.log(url)
	
	const fetchOptions: RequestInit = {
		method: req.method ?? "",
		headers: toHeaderInit(headers),
	};
	
	// For requests with bodies, stream the request directly
	if (!["HEAD", "GET"].includes(req.method ?? "")) {
		fetchOptions.body = Readable.toWeb(req) as ReadableStream;
		fetchOptions.duplex = "half";
	}
	
	fetch(url, fetchOptions).then(async (proxyResponse: Response) => {
		const { headers: proxyRespHeader, body: proxyRespBody, status: proxyRespStatus } = proxyResponse;

		// Set response headers
		proxyRespHeader.forEach((value, key) => {
			if (['content-encoding', 'content-length'].includes(key)) return;
			resp.setHeader(key, value);
		});
		
		resp.status(proxyRespStatus);
		
		// Pipe the response body stream directly
		if (proxyRespBody) {
			Readable.fromWeb(proxyRespBody).pipe(resp);
		} else {
			resp.end();
		}
	})
	.catch((e: unknown) => {
		console.error("PostHog Proxy error", e)
		next(new Error("Bad gateway", { cause: e }));
	});
};
