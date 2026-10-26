# DESIGN SYSTEM & UI/UX SPECIFICATION
**Platform:** Belal Ali Engineering Portfolio  
**Aesthetic Style:** Premium Technical Dark / Modern AI Engineering  
**Version:** 1.0  

---

## 1. Design Philosophy & Visual Principles

1. **Precision & Engineering Clarity:**
   The interface feels like a sophisticated developer console or mission-control dashboard, not a generic agency template. Clean lines, subtle borders, high information density with ample breathing room.
2. **Subtle Depth & Glassmorphism:**
   Multi-layered visual depth using translucent dark panels (`rgba(15, 23, 42, 0.75)`), frosted backdrop blur (`backdrop-filter: blur(16px)`), and delicate 1px border highlights (`rgba(255, 255, 255, 0.08)`).
3. **Intentional Micro-Interactions:**
   Every interaction (hover, tab switch, language toggle, modal open) provides smooth tactile feedback using hardware-accelerated CSS transforms and transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
4. **First-Class Bilingualism & RTL Native:**
   Full bidirectional support. When switching to Arabic, layout, icons, indicators, and reading order flip seamlessly with zero broken margins or misaligned flex items.

---

## 2. Color Palette & Design Tokens

### Backgrounds & Surfaces:
- `--bg-canvas`: `#07090e` (Deep Obsidian / Black Hole)
- `--bg-surface-primary`: `#0e131f` (Dark Navy Slate)
- `--bg-surface-card`: `rgba(17, 24, 39, 0.7)` (Frosted Slate)
- `--bg-surface-card-hover`: `rgba(26, 36, 56, 0.8)` (Elevated Card)
- `--bg-surface-glass`: `rgba(15, 23, 42, 0.65)` (Glass Panel)
- `--bg-surface-elevated`: `#161f30` (Modal / Dropdown surface)

### Accent & Status Colors:
- `--accent-cyan`: `#00f2fe` (Electric Cyan — Primary Action & AI glow)
- `--accent-teal`: `#4facfe` (Vibrant Teal — Secondary Highlight)
- `--accent-emerald`: `#10b981` (Verified / Tested / Operational Status)
- `--accent-amber`: `#f59e0b` (In-Development / Prototype Status)
- `--accent-purple`: `#8b5cf6` (Architecture / Deep Tech accent)
- `--accent-rose`: `#f43f5e` (Critical alert / Error)

### Typography & Contrast:
- `--text-primary`: `#f8fafc` (Slate 50 — High Contrast Titles)
- `--text-secondary`: `#94a3b8` (Slate 400 — Body & Subtitles)
- `--text-muted`: `#64748b` (Slate 500 — Captions & Metadata)
- `--text-accent`: `#38bdf8` (Sky 400 — Interactive Links & Keywords)

### Borders & Dividers:
- `--border-subtle`: `rgba(255, 255, 255, 0.07)`
- `--border-active`: `rgba(56, 189, 248, 0.35)`
- `--border-glow`: `rgba(0, 242, 254, 0.5)`

### Shadows & Glows:
- `--glow-cyan`: `0 0 25px rgba(0, 242, 254, 0.18)`
- `--glow-emerald`: `0 0 25px rgba(16, 185, 129, 0.2)`
- `--shadow-card`: `0 8px 32px 0 rgba(0, 0, 0, 0.45)`
- `--shadow-modal`: `0 24px 64px 0 rgba(0, 0, 0, 0.7)`

---

## 3. Typography Scale & Fonts

### Font Families:
- **English / Code:**
  - Primary Sans: `'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Code / Terminal: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`
- **Arabic:**
  - Primary Arabic: `'Tajawal', 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif`

### Type Hierarchy:
- **Display Hero (H1):** `clamp(2.5rem, 5vw, 4rem)` / Line height `1.15` / Bold `700`
- **Section Heading (H2):** `clamp(1.75rem, 3.5vw, 2.5rem)` / Line height `1.25` / SemiBold `600`
- **Card Title (H3):** `1.35rem` / Line height `1.35` / SemiBold `600`
- **Subheading (H4):** `1.1rem` / Line height `1.4` / Medium `500`
- **Body Large:** `1.125rem` / Line height `1.65` / Regular `400`
- **Body Regular:** `1rem` / Line height `1.6` / Regular `400`
- **Caption / Metadata:** `0.85rem` / Line height `1.5` / Regular `400`
- **Code Snippets:** `0.875rem` / Line height `1.55` / Monospace

---

## 4. Spacing, Layout & Responsive Breakpoints

### Spacing Scale:
- `--space-xs`: `0.25rem` (4px)
- `--space-sm`: `0.5rem` (8px)
- `--space-md`: `1rem` (16px)
- `--space-lg`: `1.5rem` (24px)
- `--space-xl`: `2.5rem` (40px)
- `--space-2xl`: `4rem` (64px)
- `--space-3xl`: `6rem` (96px)

### Breakpoints:
- `sm`: `640px` (Mobile landscape)
- `md`: `768px` (Tablet portrait)
- `lg`: `1024px` (Tablet landscape / Small laptops)
- `xl`: `1280px` (Desktop / Large monitors)
- `max-width-container`: `1200px` (Optimized reading width)

---

## 5. Component Patterns

### 1. Navigation Bar
- Fixed top, frosted glass blur, responsive hamburger drawer on mobile.
- Language switcher button (`EN | عربي`) with smooth document direction flip (`dir="ltr"` / `dir="rtl"`).
- "Request CV" CTA (links to contact; relabel to "Download CV" once a PDF exists). Hidden below 768 px to keep the header on one row.

### 2. Flagship Project Card
- Header row: domain pill + **two badges** — maturity (`.status-badge.status-{concept|prototype|demo|tested|field-tested|deployed|production}`, colour-coded amber/emerald/cyan) and evidence (`.evidence-badge.evidence-{public|reported}`).
- Metrics row as a `<dl>` with value, label and optional condition note (e.g. `≈3–4 ms · sandbox, n=20`). Values are `dir="ltr"`.
- Highlights list, tech tags (`<ul>`), action bar: `Read case study` (modal) + `View repository` (when public).
- **Media column** (`.project-card.has-media` → 2-column grid ≥ 900 px, stacked below): `renderGallery()` output, up to 3 items on the card; full set in the modal.

### 3. Case Study Deep Modal
- Sections rendered from `DETAILED_CASE_STUDIES` (problem → architecture → decisions → measurements → evidence), media gallery, "From the source" code excerpt with file label, and an **Evidence** link list.
- Accessibility: focus moves to the close button on open, Tab/Shift+Tab trapped, Escape and backdrop click close, focus restored to the trigger, `inert` on header/main/footer, `body.modal-open` scroll lock. Sticky header; bottom-sheet layout below 768 px. No transition may touch `visibility` inside the dialog (it blocks `focus()`).
- Code blocks are plain `<pre dir="ltr" tabindex="0">`; no syntax-highlight library (none is loaded).
- Clean ESC key / backdrop click dismissal with focus lock.

### 4. Interactive Architecture Diagram
- Clean SVG and CSS-based responsive architecture cards showing bidirectional data flows, protocol boundaries, and verification gates.

### 5. Interactive Engineering Lab (Tier C)
- Filterable grid with category pills (`All`, `IoT & Hardware`, `Trading & FinTech`, `Developer Tools`).
- Concise technical breakdown with direct links to local or repository evidence.

### 6. Contact & Collaboration Terminal
- Interactive quick inquiry form with instant validation.
- Direct links with one-click copy for email, telegram, and git handle.

---

## 6. Accessibility & Motion Rules

- **Contrast:** All text meets or exceeds WCAG AA standards (minimum 4.5:1 ratio).
- **Reduced Motion:** Fully honors `@media (prefers-reduced-motion: reduce)` by disabling smooth transitions and particle animations.
- **Keyboard Navigation:** Clear `:focus-visible` styling (`outline: 2px solid var(--accent-cyan); outline-offset: 2px`).

---
**Gate 4 Design System Specification Complete.**


---

## Media component (added 2026-10-26)

```html
<figure class="media-figure media-image|media-diagram">
  <div class="media-frame" style="aspect-ratio: W/H">
    <img src alt width height loading="lazy" decoding="async" [data-diagram-base]>
  </div>
  <figcaption>…</figcaption>
</figure>
```

`.media-gallery.media-count-N` lays items out 1/2-up (first item spans full width when N = 3). Diagrams use `object-fit: contain`, screenshots `object-fit: cover; object-position: top`. Captions use `--text-muted` at 0.78 rem. Tokens: `--text-muted` raised to `#8290a8` for AA contrast on the dark surfaces.

## Status & evidence tokens

| Class | Colour | Meaning |
|---|---|---|
| `.status-tested`, `.status-field-tested` | emerald | automated tests / field evidence exist |
| `.status-deployed`, `.status-production` | cyan | live traffic (none currently) |
| `.status-demo`, `.status-prototype` | amber | works, limited verification |
| `.evidence-public` | light blue | verified in a public repo |
| `.evidence-reported` | violet | owner's account, source private |
