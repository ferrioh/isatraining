const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5173;
const HOST = process.env.HOST || "localhost";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".md": "text/markdown; charset=utf-8",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    ...headers,
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname || "/");

  if (pathname === "/favicon.ico") {
    return send(res, 204, "");
  }

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.normalize(path.join(ROOT, pathname));

  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
  }

  let target = filePath;

  try {
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, "index.html");
    }

    if (!fs.existsSync(target)) {
      return send(res, 404, "404 - Ruta no encontrada: " + pathname, {
        "Content-Type": "text/plain; charset=utf-8",
      });
    }

    const ext = path.extname(target).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    const stream = fs.createReadStream(target);

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    });
    stream.pipe(res);
    stream.on("error", () => send(res, 500, "Error al leer el archivo"));
  } catch (err) {
    return send(res, 500, "Error del servidor: " + err.message, {
      "Content-Type": "text/plain; charset=utf-8",
    });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("  ISA TRAINING - servidor de desarrollo");
  console.log("  --------------------------------------");
  console.log("  Local:   http://" + HOST + ":" + PORT + "/");
  console.log("");
  console.log("  Pantallas:");
  console.log("   - Descubre   http://" + HOST + ":" + PORT + "/isa_training_inicio_descubre/code.html");
  console.log("   - Rutinas    http://" + HOST + ":" + PORT + "/rutinas_de_la_semana/code.html");
  console.log("   - Clientes   http://" + HOST + ":" + PORT + "/clientes/code.html");
  console.log("   - Gestion    http://" + HOST + ":" + PORT + "/control_de_clientes_pagos/code.html");
  console.log("   - Perfil     http://" + HOST + ":" + PORT + "/perfil_de_usuario_membres_a/code.html");
  console.log("");
  console.log("  Ctrl+C para detener.");
  console.log("");
});
