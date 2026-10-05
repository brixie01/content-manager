# ReliefNow® Content Manager V4

V4 improves the free local-first workflow by adding a built-in topic suggestion engine.

## New in V4
- **Generate Topic Choices** creates 4 local options each for Disc, Joint, and Nerve.
- Each option is generated from curated ReliefNow-style body-area, trigger, angle, and headline libraries.
- Suggestions are checked against Used Content and receive a **Freshness %**.
- Click **Use This** and the app auto-fills:
  - headline
  - body area
  - trigger/scenario
  - educational angle
- Click **New Choices** on any category to locally regenerate only that category.
- Manual editing is still available when you want to adjust a selected topic.

## Still free
The local topic suggestion system does not use an AI API. It uses the browser only.

For full AI-written captions or actual image generation, use the app's copy buttons and paste the prepared prompt into ChatGPT.

## Included V3 workflow features
- Daily Disc / Joint / Nerve board
- Approve / Posted status
- Copy Image Prompt
- Copy Social Prompt
- Copy Everything
- Save to Idea Bank
- Mark as Used
- Duplicate warnings
- Monthly usage stats and body-area fatigue warnings
- Real ReliefNow® logo assets bundled under `assets/`
- Local JSON backup/import

## Deploy
This is a plain static site. Deploy the folder to Vercel, Netlify, or GitHub Pages. No build command is required.
