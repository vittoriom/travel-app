/* ============================================================
   Travel Companion Landing Page JavaScript
   i18n + GitHub Release Fetcher + Interactive Lifecycle Sandbox
   ============================================================ */

let currentLang = 'en';

// Sandbox Data Blueprints
const macroBlueprints = {
  japan: {
    balanced: {
      duration: "10 Days • Balanced Explorer",
      nights: "Tokyo (4 Nights) • Kyoto (4 Nights) • Osaka (2 Nights)",
      rationale: "Base in Nakagyo-ku / Sanjo in Kyoto for morning walkability to Gion and Nishiki Market without relying on crowded city buses. In Tokyo, split between Shinjuku for JR Yamanote line access and Yanaka for tranquil old-town vibes."
    },
    relaxed: {
      duration: "12 Days • Slow Living & Immersion",
      nights: "Kyoto (6 Nights) • Tokyo (6 Nights)",
      rationale: "Eliminates packing luggage between city hops. Staying a full 6 nights in a traditional Kyoto Machiya townhouse allows early 07:00 temple visits before tourists arrive, with afternoons reserved for local onsen and neighborhood tea shops."
    },
    sprint: {
      duration: "7 Days • High-Pacing Highlights",
      nights: "Tokyo (3 Nights) • Kyoto (2 Nights) • Hiroshima / Miyajima (1 Night) • Osaka (1 Night)",
      rationale: "Leverages the Shinkansen Nozomi bullet train network. Base strictly within 400m of central stations (Shinagawa in Tokyo, Kyoto Station) to eliminate transfer friction and optimize morning departures."
    }
  },
  amalfi: {
    balanced: {
      duration: "7 Days • Balanced Explorer",
      nights: "Sorrento (3 Nights) • Praiano / Amalfi (3 Nights) • Naples (1 Night)",
      rationale: "Base in Sorrento for ferry access to Capri and Pompeii rail links, then move to Praiano to avoid the suffocating crowds of Positano while maintaining cliffside sunset panoramas. Final night in Naples for historic pizza."
    },
    relaxed: {
      duration: "8 Days • Slow Living & Immersion",
      nights: "Praiano (5 Nights) • Castellabate / Cilento (3 Nights)",
      rationale: "Focuses on private boat charters along the Amalfi coast followed by authentic Cilento village life and mozzarella di bufala farms. Avoids rental car gridlock on narrow coastal roads."
    },
    sprint: {
      duration: "5 Days • High-Pacing Highlights",
      nights: "Positano (2 Nights) • Capri (1 Night) • Ravello (2 Nights)",
      rationale: "Maximum scenic impact via high-speed hydrofoils. Concentrates on the Path of the Gods hike, Villa Cimbrone gardens, and cliffside Michelin-starred dining."
    }
  },
  iceland: {
    balanced: {
      duration: "8 Days • Balanced Explorer",
      nights: "Reykjavik (1) • Vik (2) • Höfn (1) • Lake Mývatn (2) • Snæfellsnes (2)",
      rationale: "Standard counter-clockwise Ring Road route. 2 nights in Vik and Lake Mývatn ensures daylight hours are spent hiking canyon trails and geothermal fields rather than rushing between hotels."
    },
    relaxed: {
      duration: "10 Days • Slow Living & Immersion",
      nights: "South Coast / Vik (3) • Eastfjords (2) • Mývatn / Akureyri (3) • Reykjavik (2)",
      rationale: "Allows buffer days for unpredictable sub-arctic storm systems and long evenings soaking in natural thermal hot springs without strict mileage pressure."
    },
    sprint: {
      duration: "6 Days • High-Pacing Highlights",
      nights: "Golden Circle (1) • Vik (1) • Skaftafell (1) • Mývatn (1) • Reykjavik (2)",
      rationale: "4x4 SUV road trip focusing on South Coast glaciers, black sand beaches, and Diamond Beach before cutting across to Akureyri and Reykjavik."
    }
  }
};

const gastronomyData = {
  japan: [
    {
      badge: "Regional Specialty",
      badgeClass: "badge-specialty",
      name: "Kyoto Kaiseki-Ryori & Yuba",
      desc: "Multi-course seasonal art form honoring subtle dashi broth, fresh tofu skin (yuba), and mountain vegetables. Book lunch rather than dinner for 50% lower prices with identical master quality."
    },
    {
      badge: "Local Etiquette Secret",
      badgeClass: "badge-etiquette",
      name: "Counter Dining & No-Tipping Rule",
      desc: "Never leave cash on the table; tipping is considered impolite. At counter ramen or sushi bars, eat immediately while hot and refrain from loud phone calls or heavy cologne."
    },
    {
      badge: "Tourist Trap Warning",
      badgeClass: "badge-traps",
      name: "Street Wagyu Skewers & Nishiki Crowds",
      desc: "Avoid ¥3,000 flash-torched skewers in crowded midday arcade bottlenecks. Instead, seek out traditional Obanzai lunch sets in quiet side alleys like Takakura-dori."
    }
  ],
  amalfi: [
    {
      badge: "Regional Specialty",
      badgeClass: "badge-specialty",
      name: "Colatura di Alici di Cetara",
      desc: "Amber-colored fermented anchovy elixir rooted in ancient Roman garum. Tossed simply with spaghetti, garlic, parsley, and peasant olive oil in the fishing village of Cetara."
    },
    {
      badge: "Local Etiquette Secret",
      badgeClass: "badge-etiquette",
      name: "Coffee & Dining Cadence",
      desc: "No cappuccino after 11:00 AM unless you want curious looks. Coperto (table fee) is standard, and seafood is best ordered according to that morning's catch of the day (pescato del giorno)."
    },
    {
      badge: "Tourist Trap Warning",
      badgeClass: "badge-traps",
      name: "Main Piazzetta Positano Cocktails",
      desc: "Beware €24 watered-down spritz cocktails with packaged olives in main seaside squares. Head uphill to family-run trattorias in Montepertuso or Praiano for true home cooking."
    }
  ],
  iceland: [
    {
      badge: "Regional Specialty",
      badgeClass: "badge-specialty",
      name: "Arctic Char & Rúgbrauð (Geothermal Bread)",
      desc: "Delicate freshwater fish paired with dark rye bread slow-baked in pots buried directly in hot geothermal volcanic sand for 24 hours."
    },
    {
      badge: "Local Etiquette Secret",
      badgeClass: "badge-etiquette",
      name: "Geothermal Pool Shower Etiquette",
      desc: "You must shower thoroughly with soap without swimwear before entering any public hot spring or thermal pool. It is a strictly enforced hygiene norm."
    },
    {
      badge: "Tourist Trap Warning",
      badgeClass: "badge-traps",
      name: "Overpriced Highway Gas Station Buffets",
      desc: "Pack your own road lunches from Bónus supermarkets instead of paying €30 for heated cafeteria soup at crowded tourist bus pitstops."
    }
  ]
};

const conciergePivots = {
  rain: {
    title: "🌧️ Contextual Pivot: Rain & Weather Shift Activated",
    badge: "Rain Alternate Routing",
    recommendation: "Outdoor hike to Kiyomizu hillside replaced. Rerouted to covered Teramachi & Nishiki Art Arcades, followed by an intimate indoor matcha ceremony at an authentic 18th-century Machiya."
  },
  fatigue: {
    title: "⚡ Contextual Pivot: Fatigue Mode (18,200 Steps Recorded)",
    badge: "Pacing Softened",
    recommendation: "Walking distance reduced by 4.2 km. Mountain stairs replaced with a scenic ride on the vintage Keifuku Randen tram, ending with a relaxing footbath cafe in Arashiyama."
  },
  nearby: {
    title: "🥢 Local Food Intelligence: Within 400m",
    badge: "Anti-Tourist Filter On",
    recommendation: "Found: 'Gion Okaru' (hidden 250m away). Authentic Kyoto-style curry udon and simmered seasonal obanzai dishes. Frequented by local craftsmen, zero tourist queue."
  },
  pill: {
    title: "🏛️ Cultural Curiosity Pill: Kigumi Woodcraft",
    badge: "Contextual Knowledge",
    recommendation: "Did you know? Kiyomizu-dera's majestic main hall stage hangs 13 meters over the cliffside completely nail-free. Built using interlocking zelkova wooden tenons (kigumi) that have withstood earthquakes since 1633."
  }
};

const sampleGpxXml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Travel Companion - https://github.com/vittoriom/travel" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Japan Autumn Odyssey - Day 3</name>
    <desc>Geocoded track and waypoints prepared for FindPenguins</desc>
    <time>2026-11-01T09:00:00Z</time>
  </metadata>
  <wpt lat="34.9671" lon="135.7727">
    <name>Fushimi Inari Taisha</name>
    <desc>Morning exploration of the Senbon Torii mountain path</desc>
    <time>2026-11-01T09:15:00Z</time>
  </wpt>
  <wpt lat="35.0037" lon="135.7772">
    <name>Gion Karyo (Hard Anchor)</name>
    <desc>Traditional Kaiseki lunch reservation - Confirmed</desc>
    <time>2026-11-01T13:00:00Z</time>
  </wpt>
  <wpt lat="34.9949" lon="135.7850">
    <name>Kiyomizu-dera Wooden Stage</name>
    <desc>Historic temple and panoramic sunset over Kyoto</desc>
    <time>2026-11-01T15:30:00Z</time>
  </wpt>
</gpx>`;

const sampleKml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>FindPenguins Handover - Kyoto Day 3</name>
    <Placemark>
      <name>Fushimi Inari Taisha</name>
      <Point><coordinates>135.7727,34.9671,0</coordinates></Point>
    </Placemark>
    <Placemark>
      <name>Gion Karyo Kaiseki (Locked Anchor)</name>
      <Point><coordinates>135.7772,35.0037,0</coordinates></Point>
    </Placemark>
    <Placemark>
      <name>Kiyomizu-dera</name>
      <Point><coordinates>135.7850,34.9949,0</coordinates></Point>
    </Placemark>
  </Document>
</kml>`;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initReleaseFetcher();
  initSandbox();
  initCliMcpTabs();
  initFaqAccordion();
  initMobileMenu();
  initCopyButtons();
});

/* ============================================================
   1. Theme Management (macOS Dark / Light)
   ============================================================ */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('travel_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  setTheme(activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('travel_theme', next);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ============================================================
   2. Localization (i18n)
   ============================================================ */
function initLanguage() {
  const storedLang = localStorage.getItem('travel_lang');
  const browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
  currentLang = storedLang || (['en', 'it'].includes(browserLang) ? browserLang : 'en');

  updateLanguageUI(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        currentLang = selected;
        localStorage.setItem('travel_lang', currentLang);
        updateLanguageUI(currentLang);
      }
    });
  });
}

function updateLanguageUI(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const dict = (window.translations && window.translations[lang]) || {};

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  document.documentElement.lang = lang;
}

/* ============================================================
   3. GitHub Release Fetcher
   ============================================================ */
function initReleaseFetcher() {
  const repoOwner = 'vittoriom';
  const repoName = 'travel';
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
  const defaultDownloadUrl = `https://github.com/${repoOwner}/${repoName}/releases`;

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error('Release not found or rate limited');
      return res.json();
    })
    .then(data => {
      const tagName = data.tag_name || 'v0.2.0';
      const dmgAsset = data.assets && data.assets.find(a => a.name.endsWith('.dmg'));
      const downloadUrl = dmgAsset ? dmgAsset.browser_download_url : data.html_url || defaultDownloadUrl;
      const sizeMb = dmgAsset ? (dmgAsset.size / (1024 * 1024)).toFixed(1) + ' MB' : '~15 MB';

      ['nav-download-btn', 'hero-download-btn', 'cta-download-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = downloadUrl;
      });

      const versionEl = document.getElementById('hero-version-text');
      if (versionEl) {
        versionEl.innerHTML = `Latest Release: <strong>${tagName}</strong> (${sizeMb}) • macOS 13+ Universal (Apple Silicon & Intel)`;
      }
    })
    .catch(() => {
      ['nav-download-btn', 'hero-download-btn', 'cta-download-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = defaultDownloadUrl;
      });
    });
}

/* ============================================================
   4. Interactive Sandbox Playground
   ============================================================ */
function initSandbox() {
  // Tab Switcher
  const tabBtns = document.querySelectorAll('.sandbox-tab-btn');
  const tabContents = document.querySelectorAll('.sandbox-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById(`tab-${tabTarget}`);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // Tab 1: Macro Blueprint Logic
  const destSelect = document.getElementById('sb-select-destination');
  const paceSelect = document.getElementById('sb-select-pacing');
  const blueprintDuration = document.getElementById('sb-blueprint-duration');
  const blueprintNights = document.getElementById('sb-blueprint-nights');
  const blueprintRationale = document.getElementById('sb-blueprint-rationale');

  function updateMacroBlueprint() {
    const dest = destSelect ? destSelect.value : 'japan';
    const pace = paceSelect ? paceSelect.value : 'balanced';
    const data = macroBlueprints[dest] && macroBlueprints[dest][pace];

    if (data) {
      if (blueprintDuration) blueprintDuration.textContent = data.duration;
      if (blueprintNights) blueprintNights.textContent = data.nights;
      if (blueprintRationale) blueprintRationale.textContent = data.rationale;
    }

    updateGastronomySection(dest);
  }

  if (destSelect) destSelect.addEventListener('change', updateMacroBlueprint);
  if (paceSelect) paceSelect.addEventListener('change', updateMacroBlueprint);

  // Tab 2: Gastronomy Dossier Logic
  function updateGastronomySection(dest) {
    const container = document.getElementById('sb-gastro-cards-container');
    if (!container) return;
    const items = gastronomyData[dest] || gastronomyData.japan;

    container.innerHTML = items.map(item => `
      <div class="gastro-card">
        <span class="gastro-badge ${item.badgeClass}">${item.badge}</span>
        <h4 class="gastro-dish-name">${item.name}</h4>
        <p class="gastro-dish-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  // Initial Gastronomy render
  updateGastronomySection('japan');

  // Tab 3: Planner Hard-Anchor Logic
  const toggleAnchorBtn = document.getElementById('btn-toggle-anchor');
  const rebalanceBtn = document.getElementById('btn-rebalance-schedule');
  const lunchCard = document.getElementById('planner-lunch-card');
  const plannerToast = document.getElementById('planner-toast');
  let isAnchorLocked = true;

  if (toggleAnchorBtn && lunchCard) {
    toggleAnchorBtn.addEventListener('click', () => {
      isAnchorLocked = !isAnchorLocked;
      lunchCard.classList.toggle('locked', isAnchorLocked);
      const lockBadge = lunchCard.querySelector('.badge-locked');
      if (lockBadge) {
        lockBadge.textContent = isAnchorLocked ? '🔒 LOCKED ANCHOR' : '🔓 FLEXIBLE';
      }
    });
  }

  if (rebalanceBtn && plannerToast) {
    rebalanceBtn.addEventListener('click', () => {
      plannerToast.classList.add('show');
      setTimeout(() => {
        plannerToast.classList.remove('show');
      }, 3500);
    });
  }

  // Tab 4: Concierge Pivots
  const pivotButtons = document.querySelectorAll('.concierge-trigger-btn');
  const liveResultTitle = document.getElementById('concierge-result-title');
  const liveResultBadge = document.getElementById('concierge-result-badge');
  const liveResultText = document.getElementById('concierge-result-text');

  pivotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pivotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const trigger = btn.getAttribute('data-trigger');
      const pivot = conciergePivots[trigger];
      if (pivot) {
        if (liveResultTitle) liveResultTitle.textContent = pivot.title;
        if (liveResultBadge) liveResultBadge.textContent = pivot.badge;
        if (liveResultText) liveResultText.textContent = pivot.recommendation;
      }
    });
  });

  // Tab 5: FindPenguins Handover
  const gpxBox = document.getElementById('gpx-preview-box');
  const kmlBox = document.getElementById('kml-preview-box');
  if (gpxBox) gpxBox.textContent = sampleGpxXml;
  if (kmlBox) kmlBox.textContent = sampleKml;
}

/* ============================================================
   5. CLI & MCP Section Tabs
   ============================================================ */
function initCliMcpTabs() {
  const mcpBtns = document.querySelectorAll('.mcp-tab-btn');
  const cliPane = document.getElementById('mcp-pane-cli');
  const serverPane = document.getElementById('mcp-pane-server');

  mcpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mcpBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-mcp');
      if (target === 'cli') {
        if (cliPane) cliPane.style.display = 'block';
        if (serverPane) serverPane.style.display = 'none';
      } else {
        if (cliPane) cliPane.style.display = 'none';
        if (serverPane) serverPane.style.display = 'block';
      }
    });
  });
}

/* ============================================================
   6. FAQ Accordion
   ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-item-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => {
          i.classList.remove('active');
          const icon = i.querySelector('.faq-toggle-icon');
          if (icon) icon.textContent = '+';
        });

        if (!isOpen) {
          item.classList.add('active');
          const icon = item.querySelector('.faq-toggle-icon');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });
}

/* ============================================================
   7. Copy to Clipboard Utility
   ============================================================ */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const copyTargetId = btn.getAttribute('data-copy-target');
      let textToCopy = '';

      if (copyTargetId) {
        const targetEl = document.getElementById(copyTargetId);
        if (targetEl) textToCopy = targetEl.textContent || targetEl.innerText;
      } else {
        const prevCmd = btn.parentElement && btn.parentElement.querySelector('.terminal-cmd');
        if (prevCmd) textToCopy = prevCmd.textContent;
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
          const originalText = btn.textContent;
          btn.textContent = currentLang === 'it' ? 'Copiato! ✓' : 'Copied! ✓';
          btn.style.borderColor = 'var(--color-emerald)';
          btn.style.color = 'var(--color-emerald)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
}

/* ============================================================
   8. Mobile Navigation Toggle
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const inner = document.querySelector('.navbar-inner');
  if (toggle && inner) {
    toggle.addEventListener('click', () => {
      inner.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        inner.classList.remove('mobile-open');
      });
    });
  }
}
