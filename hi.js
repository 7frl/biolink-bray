// --------------------
// RANDOM MUSIC PLAYER
// --------------------

const songs = [
  "like.mp3",
  "Jubie.mp3",
  "Party At My Place.mp3"
];

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  if (!audio) return;

  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  audio.src = randomSong;
  audio.load();
});

// --------------------
// ENTER MAIN
// --------------------

function entermain() {
  const enter = document.getElementById("enter");
  const main = document.getElementById("main");
  const audio = document.getElementById("audio");

  if (enter) enter.style.display = "none";
  if (main) main.style.display = "flex";

  if (audio) {
    audio.loop = true;
    audio.volume = 1.0;

    audio.play().catch(() => {
      const retry = document.createElement("div");
      retry.textContent = "tap to enable sound";
      retry.style.position = "absolute";
      retry.style.bottom = "30px";
      retry.style.left = "50%";
      retry.style.transform = "translateX(-50%)";
      retry.style.color = "#fff";
      retry.style.fontSize = "20px";
      retry.style.fontFamily = "'Pangolin', cursive";
      retry.style.cursor = "pointer";
      retry.style.textShadow = "0 0 10px white";

      retry.onclick = () => {
        audio.play();
        retry.remove();
      };

      document.body.appendChild(retry);
    });
  }
}

// --------------------
// CLICK HANDLER
// --------------------

document.addEventListener("DOMContentLoaded", () => {
  const enterDiv = document.getElementById("enter");
  if (!enterDiv) return;

  enterDiv.addEventListener("click", entermain);
  enterDiv.addEventListener("touchstart", entermain, { passive: true });
});

// --------------------
// SPARKLE EFFECT
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
        star[c].style.top = (y + 1) + "px";
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
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = h + "px";
  div.style.width = w + "px";
  div.style.overflow = "hidden";
  return div;
}
