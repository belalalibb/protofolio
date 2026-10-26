# PRE-RELEASE & DEPLOYMENT CHECKLIST
**Platform:** Belal Ali Engineering Portfolio  
**Target Host Options:** Vercel · Cloudflare Pages · GitHub Pages · Netlify  
**Security Status:** Sanitized (0 sensitive tokens)  

---

## 1. Pre-Flight Verification

- [x] **Zero Secret Leakage:** No API keys, credentials, or client secrets in `index.html`, `data.js`, or `app.js`.
- [x] **Sanitized Case Studies:** All client records in booking/automation studies are completely anonymized.
- [x] **HTTP & Syntax Validation:** All endpoints return HTTP 200; JavaScript syntax passes `node --check`.
- [x] **RTL & Bilingual Symmetry:** Native English and Arabic layouts tested without horizontal scroll or broken text.
- [x] **Responsive Viewports:** Layout tested on mobile (375px), tablet (768px), and widescreen desktop (1280px+).

---

## 2. User Decisions & Personal Assets Needed from Belal

Before sharing the portfolio URL with recruiters, founders, or enterprise clients, please verify or provide the following 4 items:

1. **Official LinkedIn Profile URL:**
   - Currently, social links point to `https://github.com/belalalibb` and `mailto:ba1593@gmail.com`.
   - If you have an active LinkedIn URL, add it to `index.html` under `#link-linkedin`.
2. **Professional Portrait / Headshot:**
   - A high-resolution photo can be placed in `assets/belal-portrait.jpg`.
   - The interface currently uses the modern technical monogram `BA` with cyan ambient glow.
3. **Reviewed CV / Resume File:**
   - Place your finalized PDF resume file in `assets/Belal_Ali_Resume.pdf`.
   - The "Resume / CV" CTA in the navigation header will trigger its download directly.
4. **Custom Domain (Optional):**
   - E.g., `belalali.dev` or `belal.ai`.
   - Point your custom domain CNAME or A-records to your Vercel/Cloudflare host.

---

## 3. Fast Deployment Guide (3 Minutes)

### Option A: Deploy via GitHub Pages (Free & Immediate)
```bash
cd d:\projects\portfolio
git init
git add .
git commit -m "feat: initial release of Belal Ali Engineering Portfolio"
git branch -M main
git remote add origin https://github.com/belalalibb/portfolio.git
git push -u origin main
```
*In GitHub repository Settings → Pages → Select branch `main` → Save.*

### Option B: Deploy via Vercel CLI
```bash
npm.cmd install -g vercel
cd d:\projects\portfolio
vercel
```

---
**Checklist Status: Ready for Production Release.**
