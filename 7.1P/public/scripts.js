/* global io */

const socket = io();

const authorEl = document.getElementById("author");
const anonymousEl = document.getElementById("anonymous");
const categoryEl = document.getElementById("category");
const wishTextEl = document.getElementById("wishText");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const socketStatusEl = document.getElementById("socketStatus");
const wishListEl = document.getElementById("wishList");

let wishes = [];

function setFeedback(msg) {
  feedbackEl.textContent = msg || "";
}

function fmtTime(iso) {
  return new Date(iso).toLocaleString();
}

function renderWishes() {
  wishListEl.innerHTML = "";

  const sorted = wishes
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (sorted.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No wishes yet.";
    wishListEl.appendChild(li);
    return;
  }

  for (const w of sorted) {
    const li = document.createElement("li");

    const line = document.createElement("div");
    line.textContent = `${w.text} — ${w.author} [${w.category}] [${w.status}] (${fmtTime(w.createdAt)})`;
    li.appendChild(line);

    const actions = document.createElement("div");

    const likeBtn = document.createElement("button");
    likeBtn.textContent = `Like (${w.likes})`;
    likeBtn.onclick = () => socket.emit("wish:like", { id: w.id });

    const pledgeBtn = document.createElement("button");
    pledgeBtn.textContent = `Me too (${w.pledges})`;
    pledgeBtn.onclick = () => socket.emit("wish:pledge", { id: w.id });

    const statusSel = document.createElement("select");
    ["new", "in_progress", "achieved"].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      if (w.status === s) opt.selected = true;
      statusSel.appendChild(opt);
    });
    statusSel.onchange = () => socket.emit("wish:updateStatus", { id: w.id, status: statusSel.value });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      if (confirm("Delete this wish for everyone?")) {
        socket.emit("wish:delete", { id: w.id });
      }
    };

    actions.appendChild(likeBtn);
    actions.appendChild(pledgeBtn);
    actions.appendChild(statusSel);
    actions.appendChild(delBtn);

    li.appendChild(actions);
    wishListEl.appendChild(li);
  }
}

// Post wish
submitBtn.onclick = () => {
  setFeedback("");

  const text = wishTextEl.value.trim();
  const category = categoryEl.value;

  const author = anonymousEl.checked
    ? "Anonymous"
    : (authorEl.value.trim() || "Guest");

  if (!text) {
    setFeedback("Enter a wish first.");
    return;
  }

  submitBtn.disabled = true;

  socket.emit("wish:add", { text, category, author }, (ack) => {
    submitBtn.disabled = false;

    if (!ack || !ack.ok) {
      setFeedback(ack?.error || "Failed to post wish.");
      return;
    }

    wishTextEl.value = "";
    setFeedback("Posted.");
    setTimeout(() => setFeedback(""), 1000);
  });
};

// Socket status + handlers
socket.on("connect", () => {
  socketStatusEl.textContent = `Connected: ${socket.id}`;
});

socket.on("disconnect", (reason) => {
  socketStatusEl.textContent = `Disconnected: ${reason}`;
});

socket.on("wishes:sync", ({ wishes: serverWishes }) => {
  wishes = serverWishes || [];
  renderWishes();
});

socket.on("wish:added", ({ wish }) => {
  wishes.push(wish);
  renderWishes();
});

socket.on("wish:updated", ({ wish }) => {
  const idx = wishes.findIndex(w => w.id === wish.id);
  if (idx !== -1) wishes[idx] = wish;
  renderWishes();
});

socket.on("wish:removed", ({ id }) => {
  wishes = wishes.filter(w => w.id !== id);
  renderWishes();
});
