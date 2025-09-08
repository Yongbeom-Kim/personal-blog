/**
 * @typedef CloudfrontContext
 * @type {object}
 * @property {string} distributionDomainName
 * @property {string} distributionId
 * @property {string} endpoint
 * @property {'viewer-request' | 'viewer-response'} eventType
 * @property {string} requestId
 */

/**
 * @typedef CloudfrontViewer
 * @type {object}
 * @property {string} ip
 */

/**
 * @typedef CloudfrontRequest
 * @type {object}
 * @property {string} method
 * @property {string} uri
 * @property {object} querystring
 * @property {object} headers
 * @property {object} cookies
 */

/**
 * @typedef CloudfrontResponse
 * @type {object}
 * @property {number} statusCode
 * @property {string} [statusDescription]
 * @property {object} headers
 * @property {object} cookies
 * @property {string} [body]
 * @property {'text'|'base64'} [encoding]
 * @property {string} [data]
 */

import cf from "cloudfront";

/**
 * @param {{
 * version: string,
 * context: CloudfrontContext,
 * viewer: CloudfrontViewer,
 * request: CloudfrontRequest,
 * response: CloudfrontResponse
 * }} event
 *
 * @returns {CloudfrontRequest}
 */
async function handler(event) {
  const kvsHandle = cf.kvs();
  const s3DomainName = await kvsHandle.get("s3_domain");
  const request = event.request;
  const uri = request.uri;

  cf.updateRequestOrigin({
    domainName: s3DomainName,
    connectionAttempts: 3,
    originAccessControlConfig: {
        enabled: true,
        signingBehavior: "always",
        signingProtocol: "sigv4",
        originType: "s3"
    }
  });

  if (/\.(png|jpg|gif|html|js|css)/.test(uri)) {
    request.uri = "/csr" + uri;
  } else {
    request.uri = "/csr/index.html";
  }
  
  return request;
}
