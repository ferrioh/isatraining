import http from "node:http";
import { attachRealtime } from "./realtime.mjs";

const PORT = Number(process.env.WS_PORT ?? process.env.PORT ?? 8080);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("ISA TRAINING realtime WebSocket server\n");
});

attachRealtime(server, { path: "/ws" });

server.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("  ISA TRAINING - servidor WebSocket");
  console.log("  --------------------------------");
  console.log(`  ws://localhost:${PORT}/ws`);
  console.log("");
});
