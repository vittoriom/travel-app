/* ============================================================
   Travel Companion Landing Page JavaScript
   i18n + GitHub Release Fetcher + Audio Player Simulation + FAQ
   ============================================================ */

let currentLang = 'en';

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initReleaseFetcher();
  initMockupAudioPlayer();
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
   4. Mockup Audioguide Player Interactive Simulation
   ============================================================ */
function initMockupAudioPlayer() {
  const playBtn = document.getElementById('mockup-audio-play-btn');
  const bars = document.querySelectorAll('.waveform-bar');
  let isPlaying = false;
  let waveInterval = null;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸' : '▶';

      if (isPlaying) {
        waveInterval = setInterval(() => {
          bars.forEach(bar => {
            const h = Math.floor(Math.random() * 12) + 4;
            bar.style.height = `${h}px`;
            bar.classList.add('active');
          });
        }, 180);
      } else {
        clearInterval(waveInterval);
        bars.forEach((bar, idx) => {
          bar.style.height = `${(idx % 3 + 1) * 4}px`;
          bar.classList.remove('active');
        });
      }
    });
  }
}

/* ============================================================
   5. FAQ Accordion
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
   6. Copy to Clipboard Utility
   ============================================================ */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevCmd = btn.parentElement && btn.parentElement.querySelector('.terminal-cmd');
      const textToCopy = prevCmd ? prevCmd.textContent : '';

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
   7. Mobile Navigation Toggle
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
