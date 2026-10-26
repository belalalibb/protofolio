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
- Resume CTA button with pulsing indicator.

### 2. Flagship Project Card
- High-contrast visual header with live status pill (`Tested`, `Production-Ready`, `Functional Demo`).
- Domain tag chips (e.g. `Real-Time Voice`, `Industrial IoT`, `Anti-Bot`).
- Quick metrics row (e.g. `Sub-800ms Latency`, `Zero External APIs`, `C++17 / Modbus`).
- Action bar: `View Case Study` (opens full modal/drawer), `Architecture`, `Code Highlight`.

### 3. Case Study Deep Modal
- Complete 18-point rubric presentation.
- Side/top tab navigation: `Overview`, `Architecture`, `Decisions`, `Evidence`, `Limitations`.
- Syntax-highlighted code blocks with copy-to-clipboard button.
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
