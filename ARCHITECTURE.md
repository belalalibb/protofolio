# PLATFORM ARCHITECTURE & ENGINEERING SPECIFICATION
**Platform:** Belal Ali Engineering Portfolio  
**Location:** `d:\projects\portfolio`  
**Standard:** Clean Separation of Data, Style, and Execution  
**Updated:** October 2026  

---

## 1. System Overview & Architectural Thesis

The platform is designed to embody the exact engineering ethos it promotes: **fast, resilient, zero-bloat, and evidence-driven**. Rather than relying on heavy client-side frameworks with complex hydration overhead and large JavaScript bundles, the platform utilizes modern Web Standards:
- **Modular Data Layer (`scripts/data.js`):** Fully separates portfolio content, case study rubrics, and project metadata from visual components.
- **Reactive UI Controller (`scripts/app.js`):** Lightweight, zero-dependency state manager handling bidirectional localization (EN/AR), dynamic filtering, modal interactions, and contact routing.
- **Design Token CSS Engine (`styles/main.css` & `styles/rtl.css`):** Hardware-accelerated CSS custom properties with zero runtime CSS-in-JS overhead.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Client Viewport                  │
│       index.html (Semantic HTML5 · SEO Structured Data)     │
└──────────────────────────────▲──────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────┐
│  Presentation & Design Tokens │   Reactive State & Filtering │
│  - styles/main.css           │   - scripts/app.js           │
│  - styles/rtl.css (Arabic)   │   - scripts/data.js          │
│  - Glassmorphism & Tokens    │   - LocalStorage Lang State  │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 2. Directory & Component Structure

```
d:\projects\portfolio/
├── index.html                   # Core semantic document with SEO & schema
├── styles/
│   ├── main.css                 # Design tokens, typography, glassmorphism, responsive grid
│   └── rtl.css                  # Native Arabic RTL typography and directional mirroring
├── scripts/
│   ├── data.js                  # Complete bilingual data dictionary (projects, lab, journey)
│   └── app.js                   # Application state, case study modal, filtering, mailto routing
├── docs/                        # Complete Engineering Governance Docs:
│   ├── PORTFOLIO_DISCOVERY.md   # Discovery audit across 271 workspace projects
│   ├── PROJECT_INVENTORY.md     # Standardized maturity & evidence registry
│   ├── PERSONAL_BRAND_STRATEGY.md # Positioning, differentiators, and audience personas
│   ├── PORTFOLIO_CONTENT.md     # Full bilingual content blueprint
│   ├── CASE_STUDIES.md          # 18-point rubric deep-dives for flagship systems
│   ├── DESIGN_SYSTEM.md         # Tokens, typography scale, responsive breakpoints
│   ├── ARCHITECTURE.md          # This architectural blueprint
│   ├── TEST_REPORT.md           # Automated verification test results
│   ├── RELEASE_CHECKLIST.md     # Pre-flight and deployment security checklist
│   └── README.md                # Local setup, hosting, and project maintenance guide
```

---

## 3. Localization & Bidirectionality Engine

> **Updated 2026-10-26.** Translation now uses three attribute channels: `data-i18n` (plain text via `textContent`), `data-i18n-html` (trusted HTML from the internal `UI_STRINGS` dictionary only — used for the hero heading so nested `<span class="gradient-text">` survives round-trips), and `data-i18n-attr="placeholder:key,aria-label:key"`. All data-driven rendering passes through `esc()`. Bilingual SVG diagrams are declared once and the component swaps `.en.svg`/`.ar.svg` on toggle. Initial language = saved preference → `navigator.language` → `en`.

- **Persistence:** User selection is persisted across browser reloads via `localStorage.getItem('belal_portfolio_lang')`.
- **Directional Adaptation:**
  ```javascript
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  ```
- **Typography Switching:**
  - English: `Outfit`, `JetBrains Mono` (loaded via `<link rel="preconnect">` + one stylesheet, `display=swap`)
  - Arabic: `Tajawal` (Cairo fallback in the font stack only)
- **Code Block Preservation:** All code snippets, metric numbers, and terminal outputs maintain LTR orientation regardless of page direction for optimal technical readability.

---

## 4. Performance

> The FCP/CLS figures previously listed here were never measured and have been removed. No Lighthouse run exists yet (no public URL). What *is* in place:

- No framework, no bundler; two CSS files, two JS files loaded with `defer`.
- Fonts via `preconnect` + a single stylesheet with `display=swap` (no CSS `@import`).
- Every `<img>` has `width`/`height` and sits in an `aspect-ratio` frame to avoid layout shift; all below-the-fold media is `loading="lazy" decoding="async"`.
- `background-attachment: fixed` disabled below 768 px.
- Screenshots are WebP (quality 82); diagrams are SVG (≈ 10–13 KB each).
- Verification: `tools/qa_playwright.py` asserts no horizontal overflow, no failed requests and no broken images at 390/820/1366 px.

---

## 5. Deployment Architectures

The platform is fully static and can be deployed with zero build pipeline to any modern edge host:

1. **Vercel / Netlify:**
   - Root directory: `./`
   - Build command: None required (static).
   - Output directory: `./`
2. **GitHub Pages:**
   - Push repository to `https://github.com/belalalibb/belal-portfolio`.
   - Settings → Pages → Deploy from branch `main` / `root`.
3. **Cloudflare Pages:**
   - Deploy directly from Git with worldwide edge distribution.

---

## 6. How to Add New Projects in the Future

To add a new project without modifying HTML or CSS:
1. Open `scripts/data.js`.
2. Append a new object to `PORTFOLIO_DATA.projects` (or `PORTFOLIO_DATA.labProjects`).
3. If providing a detailed case study, add the case study entry in `scripts/app.js` under `DETAILED_CASE_STUDIES`.
4. Refresh the page—the card, tags, metrics, and modal are automatically rendered in both English and Arabic.

---
**Architecture Document Approved.**
