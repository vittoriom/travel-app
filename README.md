# Travel Companion — Landing Page

Official landing page and showcase website for **[Travel Companion](https://github.com/vittoriom/travel)**, a privacy-first, local-first travel intelligence platform and on-the-road dynamic concierge for macOS built with Tauri v2, React 19, and Vite 8.

## Features

- **Zero-Dependency Architecture**: Lightweight static website with no build step required. Open `index.html` directly in any modern browser or host via GitHub Pages, Vercel, or Cloudflare Pages.
- **Museum-Grade AI Audioguides**: Spoken voice narration player simulation with architectural secrets, historical lore, notable artworks, and playback speed controls.
- **Trip Lifecycle Showcase**: Highlights macro-planning archetypes, dish-first regional food dossiers, fluid daily scheduling with locked hard anchors, dynamic rain/fatigue pivots, and one-click FindPenguins GPX/KML export.
- **Native CLI & MCP Ready**: Mentions embedded terminal CLI commands (`travel-cli`) and Model Context Protocol (`mcp`) integration for Claude Desktop and Cursor.
- **Bilingual Localization (EN / IT)**: Full English and Italian translations with automated browser language detection and instant client-side toggle.
- **Dark & Light Mode**: macOS-aligned dark and light theme toggle with persistent state in `localStorage`.
- **GitHub Release Integration**: Live fetching of the latest `.dmg` release binary asset, tag version, and file size via GitHub REST API.
- **Gatekeeper Terminal Helper**: Copy-paste terminal command helper for opening independently compiled macOS binaries.

## Local Preview

You can preview the landing page instantly using Python's built-in HTTP server or any static web server:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node / npx
npx serve .
```

Then open `http://localhost:8080` in your browser.

## Deployment

### GitHub Pages

This repository is configured for automated deployment to GitHub Pages via GitHub Actions:

1. In GitHub, go to your repository **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Every push to the `main` branch will automatically trigger the [deploy.yml](.github/workflows/deploy.yml) workflow and publish the site.

The site is also fully compatible with legacy branch deployment (Source: *Deploy from a branch* -> Branch: `main`, Folder: `/ (root)`). A `.nojekyll` file is included in the root to ensure all static assets are served properly.

## License

MIT License © 2026 Vittorio Monaco
