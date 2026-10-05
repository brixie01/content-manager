# ReliefNow® Content Manager V3

A free, local-first content workflow app for ReliefNow® social content.

## What V3 adds
- Daily content board with **Disc / Joint / Nerve** cards
- **Refresh Topic** and **Refresh All** prompt builders
- **Approve**, **Posted**, and per-platform tracking
- **Copy Image Prompt**, **Copy Social Prompt**, and **Copy Everything** buttons
- Duplicate/similarity warning on each daily topic card
- Monthly usage stats and body-area fatigue warnings
- Real bundled ReliefNow® brand assets:
  - `assets/reliefnow-laser-centers.png`
  - `assets/ditch-drugs-skip-scalpel.png`
  - `assets/get-your-second-opinion.png`
- Local JSON export/import backup
- Automatic migration from earlier localStorage versions when available

## How it works
This is still the **free version**.
The app does **not** generate content or images by itself.
Instead it:
1. manages history and daily workflow,
2. prepares copy-ready prompts,
3. helps avoid duplicates,
4. tracks progress,
5. lets you paste the copied prompt into ChatGPT.

## Run locally
This version is a plain static app.
You can simply open `index.html` in a browser.

## Deploy free
You can deploy it as a static site on:
- Vercel
- Netlify
- GitHub Pages

For Vercel:
1. Upload the whole folder to a GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: **Other** or **Static**.
4. No build command needed.
5. Deploy.

## Data note
All data is stored in the browser with `localStorage`.
Use **Export Backup** regularly if you want a portable backup.
