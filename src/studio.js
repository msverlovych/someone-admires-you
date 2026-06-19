// Admiration Studio — build a personalized link + printable QR code.
// QRCode is bundled by Parcel from the npm package (no CDN, works offline).
import QRCode from 'qrcode';

const $ = id => document.getElementById(id);
const toEl = $('to'), fromEl = $('from'), baseEl = $('base'),
      linkEl = $('link'), qrImg = $('qr'), liveEl = $('live'),
      noteEl = $('note'), toastEl = $('toast');

let lastQR = null;   // data URL of the current QR, for download

// default base = this folder's index.html (works locally and after deploy on the same host)
const defaultBase = new URL('index.html', location.href).href;
baseEl.value = defaultBase;

function buildLink() {
  let raw = baseEl.value.trim() || defaultBase;
  let u;
  try { u = new URL(raw, location.href); }
  catch (e) { return null; }
  const to = toEl.value.replace(/[<>]/g, '').trim();
  const from = fromEl.value.replace(/[<>]/g, '').trim();
  // reset our params, keep any the user already had
  u.searchParams.delete('to'); u.searchParams.delete('from');
  if (to) u.searchParams.set('to', to);
  if (from) u.searchParams.set('from', from);
  return u.href;
}

function makeQR(link) {
  QRCode.toDataURL(link, {
    width: 560, margin: 2,                          // big = crisp for printing
    color: { dark: '#2a0612', light: '#f4ead9' },
    errorCorrectionLevel: 'M'
  }, (err, url) => {
    if (err || !url) { lastQR = null; qrImg.removeAttribute('src'); return; }
    lastQR = url;
    qrImg.src = url;
  });
}

let liveTimer;
function render() {
  const link = buildLink();
  if (!link) { linkEl.value = 'Invalid base URL'; return; }
  linkEl.value = link;

  makeQR(link);

  // notice if the link can't be scanned by a phone yet
  if (/^file:/i.test(link)) {
    noteEl.className = 'note warn show';
    noteEl.innerHTML = '⚠ This is a <b>local</b> link — great for testing, but a phone can’t open it. Deploy the site (GitHub Pages, Netlify, Vercel…) and paste its public URL above so the QR becomes scannable.';
  } else if (!toEl.value.trim()) {
    noteEl.className = 'note show';
    noteEl.innerHTML = 'Tip: add a name above and the rose will greet them by name 🌹';
  } else {
    noteEl.className = 'note';
  }

  // throttle the live iframe so typing stays smooth
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => { if (liveEl.src !== link) liveEl.src = link; }, 450);
}

function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove('show'), 1900);
}

['input', 'change'].forEach(ev => {
  toEl.addEventListener(ev, render);
  fromEl.addEventListener(ev, render);
  baseEl.addEventListener(ev, render);
});

$('copy').addEventListener('click', async () => {
  const link = buildLink(); if (!link) return;
  try { await navigator.clipboard.writeText(link); toast('Link copied ✓'); }
  catch (e) { linkEl.select(); document.execCommand('copy'); toast('Link copied ✓'); }
});

$('open').addEventListener('click', () => {
  const link = buildLink(); if (link) window.open(link, '_blank');
});

$('download').addEventListener('click', () => {
  if (!lastQR) { toast('QR isn’t ready yet — give it a second'); return; }
  const name = (toEl.value.trim() || 'rose').replace(/[^\w\-]+/g, '_');
  const a = document.createElement('a');
  a.href = lastQR;
  a.download = 'admire-qr-' + name + '.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('QR saved ✓');
});

render();
