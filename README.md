# 🌹 Someone, probably, admires you

An animated rose that quietly tells someone they're admired — **greeting them by name** —
plus a small **studio** that turns a name into a personalized link and a printable QR code.

**→ Live: https://msverlovych.github.io/someone-admires-you/**

Everything is plain HTML / CSS / vanilla JS, bundled with [Parcel](https://parceljs.org/).
No tracking, no accounts, no backend. The names you type are never stored anywhere — they
only live inside the link you create.

---

## 💌 How to make this for someone (no coding needed)

You don't have to install anything. Just use the live site:

1. **Open the studio** → https://msverlovych.github.io/someone-admires-you/create.html
2. In **“To”**, type their name (e.g. `Anna`).
3. In **“From”**, add a signature if you like (`someone who admires you`, your own name,
   or leave it blank to stay a mystery 😏).
4. You now have two ways to give it:
   - **Send the link.** Hit **Copy** and paste it into any chat. When they open it, a rose
     blooms and greets them by name.
   - **Make a keepsake.** Hit **↓ Download QR**, print the code, and tuck it into a card, a
     bouquet, a gift, or leave it somewhere they'll find it. They scan → the rose opens.

That's it. Simple, warm, a little bit magic. 🌹

> **A gentle heads-up:** the page is public and the name travels inside the URL, so don't put
> anything secret in it. It's built for kind, lovely gestures — keep it to those. ❤️

### Prefer to build the link by hand?

The rose page reads two URL parameters, so you can craft a link yourself:

```
https://msverlovych.github.io/someone-admires-you/index.html?to=Anna&from=Maksym
```

- `to` — the name shown in the greeting.
- `from` — the signature under it (optional).

---

## 🛠️ Run or fork it yourself (for developers)

Want your own copy, your own words, or your own domain? It's tiny.

```bash
git clone https://github.com/msverlovych/someone-admires-you.git
cd someone-admires-you
npm install        # once
npm run dev        # Parcel dev server, usually http://localhost:1234
```

Open `http://localhost:1234/index.html` for the rose, or `/create.html` for the studio.
Edits hot-reload. Preview the personalization at
`http://localhost:1234/index.html?to=Anna&from=Maksym`.

### Project layout

| Files | What it is |
|-------|------------|
| `src/index.html` · `rose.css` · `rose.js` | The rose (47 petals, hand-built in CSS) |
| `src/create.html` · `studio.css` · `studio.js` | The studio: name → link + QR |
| `src/favicon.svg` · `src/og.png` | Icon + social-share preview |

The `qrcode` library is a normal npm dependency that gets **bundled in**, so the studio
works fully offline — no CDN.

### Build & deploy

```bash
npm run build      # optimized, hashed bundle → dist/
```

This repo deploys itself: a **GitHub Actions** workflow (`.github/workflows/deploy.yml`)
builds on every push to `main` and publishes `dist/` to GitHub Pages. To host your own fork,
enable Pages (build via **GitHub Actions**) in the repo settings, and update the
`--public-url` in `package.json` to your own URL.

---

## 📄 License

The code in this project is released under the [MIT License](./LICENSE) —
© 2026 Maksym Sverlovych. You're free to use, modify, and share it; just keep the
copyright notice. (The background music has its own license — see below.)

## 🎶 Music credit

The optional background music is **“Heartwarming” by Kevin MacLeod** (incompetech.com),
licensed under [Creative Commons: By Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
It plays only when a visitor taps the little music toggle — it never autoplays.

---

Made with care — because everyone deserves to be told, gently, that they're admired. 🌹
