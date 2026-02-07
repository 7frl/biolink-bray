// --------------------
// RANDOM MUSIC PLAYER
// --------------------

const songs = [
  "i wanna fly.mp3",
  "now & later.mp3",
  "Party At My Place.mp3",
  "bby ur so pretty.mp3"
];

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  if (!audio) return;

  audio.src = songs[Math.floor(Math.random() * songs.length)];
  audio.load();
});

// --------------------
// VIEW COUNTER (GitHub Pages safe)
// --------------------

const VIEW_NAMESPACE = "february-gh-pages";
const VIEW_KEY = "main";

async function updateViews() {
  const el = document.getElementById("viewCount");
  if (!el) return;

  try {
    let data;

    if (!sessionStorage.getItem("counted")) {
      const res = await fetch(
        `https://api.countapi.xyz/hit/${VIEW_NAMESPACE}/${VIEW_KEY}`
      );
      data = await res.json();
      sessionStorage.setItem("counted", "true");
    } else {
      const res = await fetch(
        `https://api.countapi.xyz/get/${VIEW_NAMESPACE}/${VIEW_KEY}`
      );
      data = await res.json();
    }

    el.textContent = data.value.toLocaleString();
  } catch {
    el.textContent = "—";
  }
}

// --------------------
// ENTER MAIN
// --------------------

function entermain() {
  document.getElementById("enter")?.remove();
  document.getElementById("main").style.display = "flex";

  updateViews();

  const audio = document.getElementById("audio");
  if (!audio) return;

  audio.loop = true;
  audio.volume = 1;

  audio.play().catch(() => {
    const tap = document.createElement("div");
    tap.textContent = "tap to enable sound";
    tap.style.cssText = `
      position:fixed;
      bottom:30px;
      left:50%;
      transform:translateX(-50%);
      color:white;
      font-size:20px;
      text-shadow:0 0 10px white;
      cursor:pointer;
      z-index:9999;
    `;
    tap.onclick = () => {
      audio.play();
      tap.remove();
    };
    document.body.appendChild(tap);
  });
}

// --------------------
// CLICK HANDLER
// --------------------

document.addEventListener("DOMContentLoaded", () => {
  const enter = document.getElementById("enter");
  if (!enter) return;

  enter.addEventListener("click", entermain);
  enter.addEventListener("touchstart", entermain, { passive: true });
});

// --------------------
// SPARKLE EFFECT (unchanged)
// --------------------

let sparkles = 50;
let x = 400, y = 300, ox = 400, oy = 300;
let swide = 800, shigh = 600, sleft = 0, sdown = 0;

const tiny = [], star = [];
const starv = [], tinyv = [];
const starx = [], stary = [], tinyx = [], tinyy = [];

window.onload = function () {
  for (let i = 0; i < sparkles; i++) {
    const t = createDiv(3, 3);
    t.style.visibility = "hidden";
    document.body.appendChild(tiny[i] = t);
    tinyv[i] = 0;

    const s = createDiv(5, 5);
    const h = createDiv(1, 5);
    const v = createDiv(5, 1);
    s.appendChild(h);
    s.appendChild(v);
    h.style.top = "2px";
    v.style.left = "2px";

    document.body.appendChild(star[i] = s);
    starv[i] = 0;
  }

  updateSize();
  sparkle();
};

function sparkle() {
  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;

    for (let c = 0; c < sparkles; c++) {
      if (!starv[c]) {
        starx[c] = x;
        stary[c] = y + 1;
        star[c].style.left = x + "px";
        star[c].style.top = y + 1 + "px";
        star[c].style.visibility = "visible";
        starv[c] = 50;
        break;
      }
    }
  }

  for (let c = 0; c < sparkles; c++) {
    if (starv[c]) updateStar(c);
    if (tinyv[c]) updateTiny(c);
  }

  setTimeout(sparkle, 40);
}

function updateStar(i) {
  if (--starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    starx[i] += (i % 5 - 2) / 5;
    if (stary[i] < shigh + sdown) {
      star[i].style.top = stary[i] + "px";
      star[i].style.left = starx[i] + "px";
    } else {
      star[i].style.visibility = "hidden";
      starv[i] = 0;
    }
  } else {
    tinyv[i] = 50;
    tinyx[i] = starx[i];
    tinyy[i] = stary[i];
    tiny[i].style.visibility = "visible";
    star[i].style.visibility = "hidden";
  }
}

function updateTiny(i) {
  if (--tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    tinyx[i] += (i % 5 - 2) / 5;
    tiny[i].style.top = tinyy[i] + "px";
    tiny[i].style.left = tinyx[i] + "px";
  } else {
    tiny[i].style.visibility = "hidden";
  }
}

document.onmousemove = e => {
  x = e.pageX;
  y = e.pageY;
};

window.onscroll = updateScroll;
window.onresize = updateSize;

function updateScroll() {
  sdown = window.scrollY || 0;
  sleft = window.scrollX || 0;
}

function updateSize() {
  swide = window.innerWidth || 800;
  shigh = window.innerHeight || 600;
}

function createDiv(h, w) {
  const d = document.createElement("div");
  d.style.position = "absolute";
  d.style.height = h + "px";
  d.style.width = w + "px";
  d.style.overflow = "hidden";
  return d;
}
