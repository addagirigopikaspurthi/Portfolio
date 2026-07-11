# Addagiri Spoorthi — Portfolio

A static portfolio site. No build step, no dependencies — pure HTML/CSS/JS.

## Files
- `index.html`  — main site (the interactive "explorable graph" portfolio)
- `classic.html` — alternate scrolling version (open at /classic)
- `vercel.json` — static hosting config

## Deploy to Vercel

### Option A — GitHub + Vercel dashboard (easiest, recommended)
1. Create a new GitHub repo (or reuse your `Portfolio` repo) and upload these files
   so that `index.html` sits at the repo root.
2. Go to https://vercel.com → sign in with GitHub → "Add New… → Project".
3. Select the repo → Vercel auto-detects it as a static site → click "Deploy".
4. You get a live URL like `https://your-name.vercel.app`.

### Option B — Vercel CLI (no GitHub needed)
1. Install Node.js, then run:  `npm i -g vercel`
2. In this folder, run:  `vercel`
3. Follow the prompts (accept defaults). Then run `vercel --prod` for the live URL.

## Notes
- Framework preset on Vercel: **Other** (or "No framework").
- Build command: none. Output directory: `.` (root).
- Fonts load from Google Fonts over the internet — that's automatic.
