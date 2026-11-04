#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parent / "public"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 7747

sys.path.insert(0, str(Path(__file__).resolve().parent))
from agent import ask  # noqa: E402
from workshop import add_note, load as load_workshop  # noqa: E402


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        sys.stderr.write("[zo-auto] " + (fmt % args) + "\n")

    def _json(self, code, obj):
        payload = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def _body(self):
        n = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(n) if n else b"{}"
        try:
            return json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return {}

    def do_GET(self):
        if self.path.split("?")[0] == "/api/workshop":
            self._json(200, load_workshop())
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?")[0]
        if path == "/api/ask":
            body = self._body()
            self._json(
                200,
                ask(
                    body.get("message") or "",
                    body.get("history") or [],
                    body.get("current"),
                ),
            )
            return
        if path == "/api/note":
            try:
                self._json(200, add_note(self._body()))
            except ValueError as err:
                self._json(400, {"error": str(err)})
            return
        self.send_error(404)


if __name__ == "__main__":
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Zo Projects | Auto  ->  http://127.0.0.1:{PORT}")
    print(f"Serving {ROOT}")
    httpd.serve_forever()
