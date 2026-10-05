# ReliefNow® Content Manager V2

A local-first, zero-API-cost content workflow manager for ReliefNow® social media.

## V2 additions
- Uses the real uploaded ReliefNow® brand assets bundled under `public/logos/`
- Adds a **Brand Rules** screen
- Defines which official logos/CTA are required by content type
- Includes editable placement/usage rules for each content type
- Adds editable **Light / Dark / Cinematic** prompt presets
- Injects the selected content type, required official assets, asset placement rules, and visual preset language into every copied ChatGPT prompt
- Migrates existing browser data from V1 automatically when available

## Core workflow
- Track used Disc / Joint / Nerve topics
- Generate a ready-to-copy daily ChatGPT prompt
- Avoid exact and similar prior topics
- Save unused ideas in an Idea Bank
- Check candidate headlines locally for likely duplication
- Export/import a JSON backup
- Store data locally in the browser using `localStorage`

## Official bundled assets
- `public/logos/reliefnow-laser-centers.png`
- `public/logos/ditch-drugs-skip-scalpel.png`
- `public/logos/get-your-second-opinion.png`

These files are treated as source-of-truth brand assets. The generated prompt explicitly instructs ChatGPT not to redraw, approximate, restyle, recolor, distort, or substitute the marks.

## Default content-type asset rules
### Social Still
Uses all three official assets.

### Testimonial Overlay
Uses both top logos plus the Get Your Second Opinion™ CTA at the bottom.

### Blog Hero
Defaults to the ReliefNow® Laser Centers logo only. This is editable in Brand Rules.

## Run locally
1. Install Node.js 18+
2. Open a terminal in this folder
3. Run:
   `npm install`
   `npm run dev`
4. Open the local URL shown by Vite

## Deploy free on Vercel
1. Create a GitHub repository and upload this folder
2. In Vercel, choose **Add New → Project**
3. Import the GitHub repository
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy

## Data note
V2 remains local-first, so each browser/device has its own copy of the data. Use **Settings → Export V2 backup** to create a portable JSON backup.

No OpenAI API is used by this app. ChatGPT generation remains manual, so there is no AI API bill.
