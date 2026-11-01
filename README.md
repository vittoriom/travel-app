# Travel Companion — Landing Page

Official landing page and showcase website for **[Travel Companion](https://github.com/vittoriom/travel)**, a privacy-first, local-first travel intelligence platform and on-the-road dynamic concierge for macOS built with Tauri v2, React 19, and Vite 8.

## Features

- **Zero-Dependency Architecture**: Lightweight static website with no build step required. Open `index.html` directly in any modern browser or host via GitHub Pages, Vercel, or Cloudflare Pages.
- **Interactive Travel Lifecycle Sandbox**: Live in-browser demonstration of:
  - **Macro-Planning**: AI archetype selection (Balanced, Relaxed, Sprint), nights allocation, and lodging rationales.
  - **Dish-First Gastronomy Dossier**: Authentic regional dishes, local dining etiquette, and anti-tourist advice.
  - **Fluid Daily Scheduler**: 4-slot day structure (Morning, Lunch, Afternoon, Evening) with interactive **Hard-Anchor** locking (fixed reservations that cannot be moved).
  - **On-the-Road Concierge Pivots**: Real-time simulation of **Rain Pivots**, **Fatigue Modes**, **Eat Nearby**, and **POI Cultural Pills**.
  - **FindPenguins Handover**: Interactive GPX track and KML placemark generation ready for 1-click export.
- **CLI & MCP Server Showcase**: Native CLI usage and Claude Desktop / Cursor Model Context Protocol (`mcp`) configuration snippets.
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
1. Go to **Settings > Pages** in the `vittoriom/travel-app` repository on GitHub.
2. Select the `main` branch and `/ (root)` folder.
3. Save to deploy automatically.

## License

MIT License © 2026 Vittorio Monaco
