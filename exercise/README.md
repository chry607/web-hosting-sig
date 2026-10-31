# Exercise: Host the Calculator

A static calculator (HTML/CSS/JS, no build step). Your job: get it live on four platforms.

## Tasks
1. Create a GitHub repo with these files at the repo root and push.
2. Deploy it to each platform below and submit all four URLs.

| Platform | Settings |
|---|---|
| **GitHub Pages** | Settings → Pages → Deploy from branch → `main` / (root) |
| **Vercel** | Import repo → Framework "Other" → no build command → Deploy |
| **Render** | New → Static Site → no build command → Publish Directory `.` |
| **DigitalOcean** | Apps → Create → Static Site → Source `/` → no build command |

## Checkpoints
- [ ] Calculator works on all four URLs
- [ ] Change the page title or colors, push, and see it auto-redeploy everywhere
- [ ] Bonus: break `script.js` on purpose, find the issue, then roll back/fix
- [ ] Bonus: add a custom domain to one platform

Test locally: `python3 -m http.server 8000`
