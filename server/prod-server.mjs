import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { attachRealtime } from "./realtime.mjs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(currentDir, "..", "dist");
const PORT = Number(process.env.PORT ?? 8080);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let filePath = path.normalize(path.join(DIST, urlPath));

  if (!filePath.startsWith(DIST)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

attachRealtime(server, { path: "/ws" });

server.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("  ISA TRAINING - producción (SPA + WebSocket)");
  console.log("  -------------------------------------------");
  console.log(`  http://localhost:${PORT}`);
  console.log(`  ws://localhost:${PORT}/ws`);
  console.log("");
});
