//@ts-expect-error no typing in dist bundle
import { renderApp } from "../dist/ssr-server/server-entry";

import express from "express";
import { injectSsrEntry, readHtml } from "./html";
import { getPost, getPostAssetPath, getPostsSummary } from "./post";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { injectSsrState } from "./html";
import { SSR_POST_CONTENT_KEY } from "../src/ssr/utils/constants";
import { insertMetadata } from "./metadata/insert";
import { getHomepageMetadata } from "./metadata/home-page";
import { getPostPageMetadata } from "./metadata/post-page";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", async (_, res) => {
  const template = readHtml();
  const postsSummary = await getPostsSummary();
  const html = renderApp("/", {
    postsSummary,
  });
  const templateWithMetadata = insertMetadata(template, getHomepageMetadata());
  const htmlWithSsrEntry = injectSsrEntry(templateWithMetadata, html);
  const finalHtml = injectSsrState(htmlWithSsrEntry, {
    postsSummary,
  });

  res.send(finalHtml);
});

app.get("/posts/:slug", async (req, res) => {
  const template = readHtml();
  const postData = await getPost(req.params.slug);
  const html = renderApp(`/posts/${req.params.slug}`, {
    [SSR_POST_CONTENT_KEY]: postData,
  });
  const templateWithMetadata = insertMetadata(template, getPostPageMetadata(req.params.slug, postData));
  console.log(templateWithMetadata)
  const finalHtml = injectSsrEntry(templateWithMetadata, html);
  const ssrStateTagsHtml = injectSsrState(finalHtml, {
    [SSR_POST_CONTENT_KEY]: postData,
  });
  res.send(ssrStateTagsHtml); 
});

// Serve vite/public assets
// *.png
app.get(/^\/([^\\/]+\.png)$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "ssr-client", req.params[0]));
});

// Serve vite assets (*.js, *.css)
app.get(/^\/assets\/([^\\/]+\.(?:js|css))$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "ssr-client", "assets", req.params[0]));
});

app.get("/api/post/:slug/content", async (req, res, next) => {
  try {
    const data = await getPost(req.params.slug);
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/assets/:post_slug/:asset", (req, res) => {
  res.sendFile(getPostAssetPath(req.params.post_slug, req.params.asset));
});

app.get("/api/posts-summary", async (_, res) => {
  const posts = await getPostsSummary();
  res.json(posts);
});

app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).send("404 Not Found");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

