// The animated rose + URL personalization + interactions.
// Personalize via query string:  ?to=Anna&from=Maksym

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- build the rose ---- */
const spin = document.getElementById('spin');
const rings = [
  { count:11, w:80, h:128, dist:2,  twist:3,  cd:'#6e0f22', cm:'#bb1c38', cl:'#e84a64', offset:0  },
  { count:10, w:72, h:114, dist:0,  twist:-3, cd:'#5d0c1d', cm:'#aa1730', cl:'#d63a55', offset:18 },
  { count:9,  w:62, h:96,  dist:-3, twist:4,  cd:'#4d0a18', cm:'#911327', cl:'#c01a38', offset:0  },
  { count:7,  w:50, h:76,  dist:-6, twist:-5, cd:'#3d0714', cm:'#74101f', cl:'#9c1430', offset:22 },
  { count:6,  w:38, h:58,  dist:-9, twist:6,  cd:'#2c0410', cm:'#561019', cl:'#7c1126', offset:0  },
  { count:4,  w:26, h:40,  dist:-12,twist:-7, cd:'#22030c', cm:'#3f0a14', cl:'#5e0f1d', offset:30 },
];
let order = 0;
rings.forEach((ring, r) => {
  for (let i = 0; i < ring.count; i++) {
    const angle = (360 / ring.count) * i + ring.offset;
    const pos = document.createElement('div');
    pos.className = 'petal-pos';
    pos.style.transform = `rotate(${angle}deg)`;
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.setProperty('--w', ring.w + 'px');
    petal.style.setProperty('--h', ring.h + 'px');
    petal.style.setProperty('--dist', ring.dist + 'px');
    petal.style.setProperty('--tw', ring.twist + 'deg');
    petal.style.setProperty('--cd', ring.cd);
    petal.style.setProperty('--cm', ring.cm);
    petal.style.setProperty('--cl', ring.cl);
    petal.style.setProperty('--d', (0.25 + order * 0.012 + r * 0.06).toFixed(3) + 's');
    petal.style.setProperty('--sd', (Math.random() * 3).toFixed(2) + 's');
    petal.style.zIndex = r;
    pos.appendChild(petal);
    spin.appendChild(pos);
    order++;
  }
});

/* ---- personalization via URL  (?to=Name&from=Name) ---- */
const params = new URLSearchParams(location.search);
const clean = s => (s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
const toName = clean(params.get('to'));
const fromName = clean(params.get('from'));

/* ---- word-by-word headline ---- */
const line = document.getElementById('line');
const words = toName
  ? [ {t:toName + ','}, {br:true},
      {t:'someone,'}, {t:'probably,'}, {br:true},
      {t:'admires', cls:'accent'}, {t:'you.'} ]
  : [ {t:'Someone,'}, {t:'probably,'}, {br:true},
      {t:'admires', cls:'accent'}, {t:'you.'} ];

let wi = 0;
words.forEach(w => {
  if (w.br) { line.appendChild(document.createElement('br')); return; }
  const span = document.createElement('span');
  span.className = 'word' + (w.cls ? ' ' + w.cls : '');
  span.textContent = w.t;
  span.style.animationDelay = (2.05 + wi * 0.16).toFixed(2) + 's';
  line.appendChild(span);
  line.appendChild(document.createTextNode(' '));
  wi++;
});

/* signature from the admirer */
if (fromName) {
  const sig = document.getElementById('sig');
  sig.textContent = '— ' + fromName;
  sig.style.animationDelay = (2.05 + wi * 0.16 + 0.25).toFixed(2) + 's';
  sig.classList.add('show');
}

if (!reduce) {
  /* ---- cursor light + parallax tilt ---- */
  const glow = document.getElementById('cursorGlow');
  const dot  = document.getElementById('cursorDot');
  const tilt = document.getElementById('tilt');
  let tx = 0, ty = 0, cx = 0, cy = 0;

  window.addEventListener('pointermove', (e) => {
    glow.style.opacity = 1;
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    dot.style.transform  = `translate(${e.clientX}px, ${e.clientY}px)`;
    const nx = (e.clientX / window.innerWidth  - 0.5);
    const ny = (e.clientY / window.innerHeight - 0.5);
    tx = -ny * 14;   // rotateX
    ty =  nx * 18;   // rotateY
  });
  window.addEventListener('pointerleave', () => { tx = 0; ty = 0; glow.style.opacity = 0; });

  (function loop() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    tilt.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
    requestAnimationFrame(loop);
  })();

  /* ---- falling petals ---- */
  const petalsLayer = document.getElementById('petals');
  function dropPetal() {
    const p = document.createElement('div');
    p.className = 'fp';
    const size = 8 + Math.random() * 12;
    p.style.setProperty('--fw', size + 'px');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--fx', (Math.random() * 220 - 110) + 'px');
    p.style.setProperty('--fr', (Math.random() * 720 - 360) + 'deg');
    p.style.setProperty('--ft', (7 + Math.random() * 6) + 's');
    p.style.setProperty('--fd', '0s');
    p.style.opacity = 0.5 + Math.random() * 0.4;
    petalsLayer.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
  for (let i = 0; i < 4; i++) setTimeout(dropPetal, i * 1400 + 600);
  setInterval(dropPetal, 1700);

  /* ---- floating golden dust ---- */
  const dustLayer = document.getElementById('dust');
  function spawnDust() {
    const d = document.createElement('div');
    d.className = 'dust';
    const s = 1.5 + Math.random() * 3.5;
    d.style.width = s + 'px'; d.style.height = s + 'px';
    d.style.left = Math.random() * 100 + 'vw';
    d.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    d.style.setProperty('--dt', (9 + Math.random() * 8) + 's');
    d.style.setProperty('--do', (0.25 + Math.random() * 0.5).toFixed(2));
    d.style.filter = 'blur(' + (Math.random() * 1.5).toFixed(1) + 'px)';
    dustLayer.appendChild(d);
    d.addEventListener('animationend', () => d.remove());
  }
  for (let i = 0; i < 14; i++) setTimeout(spawnDust, i * 500);
  setInterval(spawnDust, 650);

  /* ---- click to scatter petals from cursor ---- */
  const burstLayer = document.getElementById('burst');
  window.addEventListener('pointerdown', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(2.2)`;
    setTimeout(() => { dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`; }, 160);
    const n = 16;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'fp';
      const size = 9 + Math.random() * 13;
      p.style.position = 'fixed';
      p.style.top = '0'; p.style.left = '0';
      p.style.setProperty('--fw', size + 'px');
      p.style.opacity = 1;
      burstLayer.appendChild(p);

      const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const dvx = Math.cos(ang) * (120 + Math.random() * 180);
      const dvy = Math.sin(ang) * (120 + Math.random() * 180);
      const gravity = 260 + Math.random() * 160;
      const spinDeg = (Math.random() * 900 - 450);

      p.animate([
        { transform:`translate(${e.clientX}px, ${e.clientY}px) rotate(0deg)`, opacity:1 },
        { transform:`translate(${e.clientX + dvx}px, ${e.clientY + dvy + gravity}px) rotate(${spinDeg}deg)`, opacity:0 }
      ], { duration: 1100 + Math.random() * 700, easing:'cubic-bezier(.2,.6,.3,1)', fill:'forwards' })
       .onfinish = () => p.remove();
    }
  });
}

/* ---- gentle background music (opt-in, fades in/out) ---- */
/* "Heartwarming" by Kevin MacLeod (incompetech.com) — CC BY 4.0. See README. */
(function setupMusic() {
  const btn = document.getElementById('musicToggle');
  if (!btn) return;

  const audio = new Audio(new URL('./music.mp3', import.meta.url));
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;

  const TARGET = 0.32;            // never loud — it's a whisper, not a concert
  let fade, playing = false;

  function fadeTo(target, after) {
    clearInterval(fade);
    fade = setInterval(() => {
      const step = 0.025;
      if (Math.abs(audio.volume - target) <= step) {
        audio.volume = target; clearInterval(fade); after && after();
      } else {
        audio.volume = Math.min(1, Math.max(0, audio.volume + (audio.volume < target ? step : -step)));
      }
    }, 40);
  }

  function setState(on) {
    playing = on;
    btn.classList.toggle('playing', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
    btn.title = on ? 'Pause music' : 'Play music';
  }

  function play() {
    audio.play().then(() => { setState(true); fadeTo(TARGET); })
                .catch(() => {/* blocked until a real tap — user can press again */});
  }
  function pause() { fadeTo(0, () => audio.pause()); setState(false); }

  btn.addEventListener('click', () => (playing ? pause() : play()));
})();
