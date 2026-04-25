import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";

const GUEST_FILE = "guests.json";

function loadGuests() {
  try {
    return JSON.parse(fs.readFileSync(GUEST_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveGuests(guests) {
  fs.writeFileSync(GUEST_FILE, JSON.stringify(guests, null, 2));
}

function renderPage(guests) {
  const entries = guests
    .map(
      (g) => `
        <article>
            <strong>${escapeHtml(g.name)}</strong>
            <p>${escapeHtml(g.message)}</p>
        </article>
    `,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <title>Księga gości</title>
    <style>
        body { font-family: sans-serif; max-width: 600px; margin: 2rem auto; }
        article { border-bottom: 1px solid #ccc; margin-bottom: 1rem; padding-bottom: 1rem; }
        textarea { width: 100%; height: 80px; }
        input[type=text] { width: 100%; }
    </style>
</head>
<body>
    <h1>Księga gości</h1>
    ${entries || "<p>Brak wpisów.</p>"}
    <h2>Nowy wpis:</h2>
    <form method="POST" action="/submit">
        <label>Twoje imię i nazwisko<br>
            <input type="text" name="name" required>
        </label><br><br>
        <label>Treść wpisu<br>
            <textarea name="message" required></textarea>
        </label><br><br>
        <button type="submit">Dodaj wpis</button>
    </form>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseBody(request, callback) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const params = new URLSearchParams(body);
    callback(params);
  });
}

function requestListener(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const route = [request.method, url.pathname].join(" ");

  switch (route) {
    case "GET /":
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(renderPage(loadGuests()));
      break;

    case "POST /submit":
      parseBody(request, (params) => {
        const name = params.get("name")?.trim();
        const message = params.get("message")?.trim();

        if (name && message) {
          const guests = loadGuests();
          guests.push({ name, message });
          saveGuests(guests);
        }
        response.writeHead(302, { Location: "/" });
        response.end();
      });
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 Not Found");
  }
}

const server = http.createServer(requestListener);
server.listen(8000);
console.log("Serwer uruchomiony na http://localhost:8000/");
console.log("Zatrzymaj przez Ctrl+C");
