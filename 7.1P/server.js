const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

let wishes = []; 

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  // Set a limit on max 3 posts per minute per socket
  const postHits = [];
  const WINDOW_MS = 60_000;
  const MAX_POSTS = 3;

  socket.emit("wishes:sync", { wishes });

  socket.on("wish:add", (payload, ack) => {
    const now = Date.now();
    while (postHits.length && now - postHits[0] > WINDOW_MS) postHits.shift();
    if (postHits.length >= MAX_POSTS) {
      ack?.({ ok: false, error: "Rate limit: wait a minute before posting more wishes." });
      return;
    }

    const text = String(payload?.text ?? "").trim();
    const category = String(payload?.category ?? "Other").trim() || "Other";
    const author = String(payload?.author ?? "Guest").trim() || "Guest";

    if (!text) return ack?.({ ok: false, error: "Wish text cannot be empty." });
    if (text.length > 180) return ack?.({ ok: false, error: "Max 180 characters." });
    if (author.length > 30) return ack?.({ ok: false, error: "Max 30 chars for name." });

    const wish = {
      id: makeId(),
      text,
      category,
      author,
      createdAt: new Date().toISOString(),
      likes: 0,
      pledges: 0,
      status: "new"
    };

    wishes.push(wish);
    postHits.push(now);

    io.emit("wish:added", { wish });
    ack?.({ ok: true });
  });

  socket.on("wish:like", ({ id }) => {
    const w = wishes.find(x => x.id === id);
    if (!w) return;
    w.likes += 1;
    io.emit("wish:updated", { wish: w });
  });

  socket.on("wish:pledge", ({ id }) => {
    const w = wishes.find(x => x.id === id);
    if (!w) return;
    w.pledges += 1;
    io.emit("wish:updated", { wish: w });
  });

  socket.on("wish:updateStatus", ({ id, status }) => {
    const w = wishes.find(x => x.id === id);
    if (!w) return;

    const allowed = new Set(["new", "in_progress", "achieved"]);
    if (!allowed.has(status)) return;

    w.status = status;
    io.emit("wish:updated", { wish: w });
  });

  socket.on("wish:delete", ({ id }) => {
    const before = wishes.length;
    wishes = wishes.filter(x => x.id !== id);
    if (wishes.length !== before) {
      io.emit("wish:removed", { id });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected:", socket.id, reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
