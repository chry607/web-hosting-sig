# Static portfolio

Plain HTML/CSS/JS, no build step. Publish the folder contents as-is.

- **GitHub Pages**: Pages only serves `/` or `/docs`, not `/static`. Use a GitHub Actions deploy of the `static` folder (see guide) or put these files in a separate repo.
- **Vercel**: import repo, set Root Directory to `static`, Framework Preset "Other".
- **Render**: New → Static Site, Publish Directory `static`, no build command.
- **DigitalOcean**: App Platform → Static Site, source dir `/static`.

Preview locally: `python3 -m http.server 8000`
