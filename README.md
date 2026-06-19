# 🌹 Admire

A single-page, hand-built animated rose that quietly tells someone they're admired —
plus a small **studio** to generate personalized links and printable QR codes.

Everything is plain HTML / CSS / vanilla JS, bundled with [Parcel](https://parceljs.org/).
No frameworks. The QR library (`qrcode`) is a normal npm dependency — it gets bundled
in, so the studio works fully offline (no CDN).

## Pages

| File | What it is |
|------|------------|
| `src/index.html` + `rose.css` + `rose.js` | The rose. Personalize with the URL: `?to=Anna&from=Maksym` |
| `src/create.html` + `studio.css` + `studio.js` | The studio: type a name → get a link + QR to download |

## Develop

```bash
npm install        # once
npm run dev        # starts Parcel dev server, usually http://localhost:1234
# or:
npm start          # same, and opens the browser automatically
```

Open `http://localhost:1234/index.html` for the rose, or `/create.html` for the studio.
Edits hot-reload.

> Tip: preview the personalization at
> `http://localhost:1234/index.html?to=Anna&from=Maksym`

## Build for production

```bash
npm run build      # outputs an optimized, hashed bundle into dist/
```

`--public-url ./` is already set, so `dist/` works whether it's served from a domain
root or a sub-path. Deploy the **contents of `dist/`** to any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages…).

## Making a QR for a card

1. Deploy `dist/` and note the public URL of the rose page,
   e.g. `https://yoursite.com/index.html`.
2. Open the studio (`/create.html`), paste that URL into **Published page link**.
3. Type a name (and optional signature), then **Download QR**.
4. Print it on a card. Scanning opens the rose, greeting them by name. 💌
