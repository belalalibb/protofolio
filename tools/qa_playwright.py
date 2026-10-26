#!/usr/bin/env python3
"""
Headless QA suite for the portfolio (Playwright / Chromium).

Usage:
    python3 -m http.server 4173 --bind 0.0.0.0 &
    pip install playwright && python3 -m playwright install chromium
    python3 tools/qa_playwright.py [base_url]

Writes a machine-readable result list to qa_results.json and prints PASS/FAIL lines.
Covers: console errors, i18n round-trip (nested markup), persistence, hero claims,
CV button, status/evidence badges, responsible-disclosure wording, media attributes,
modal (focus, trap, Escape, restore, inert), lab filters, pillar icons, contact form
(validation, honest banner, text kept), heading order, skip link, XSS escaping,
mobile/tablet overflow, mobile nav aria, touch targets, RTL LTR-islands, AR text fixes.
"""
import asyncio, json, sys, datetime
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173/"
R = []


def rec(name, ok, detail=""):
    R.append({"check": name, "pass": bool(ok), "detail": str(detail)})
    print(("PASS" if ok else "FAIL"), name, detail)


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()

        # ---------- Desktop EN ----------
        ctx = await b.new_context(viewport={"width": 1366, "height": 900})
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)))
        page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await page.goto(BASE, wait_until="networkidle")
        rec("no console/page errors on load", not errs, errs)

        h1_before = await page.inner_html("h1.hero-headline")
        await page.click("#btn-lang"); await page.wait_for_timeout(200)
        rec("AR applied: dir=rtl lang=ar", await page.evaluate("document.documentElement.dir") == "rtl" and await page.evaluate("document.documentElement.lang") == "ar")
        rec("title switches to AR", "بلال" in await page.title())
        rec("meta description switches", "بلال" in await page.get_attribute("meta[name=description]", "content"))
        rec("hero diagram swaps to .ar.svg", (await page.get_attribute("#hero-visual img", "src")).endswith(".ar.svg"))
        rec("lang persisted", await page.evaluate("localStorage.getItem('belal_portfolio_lang')") == "ar")
        await page.click("#btn-lang"); await page.wait_for_timeout(200)
        h1_after = await page.inner_html("h1.hero-headline")
        rec("gradient spans survive EN→AR→EN", h1_after.count("gradient-text") == 2, f"before={h1_before.count('gradient-text')} after={h1_after.count('gradient-text')}")
        rec("btn-lang has aria-label + lang attr", await page.get_attribute("#btn-lang", "aria-label") and await page.get_attribute("#btn-lang", "lang") == "ar")

        txt = await page.inner_text("#hero-metrics")
        rec("hero: no <800ms / 0% / 100% claims", "800" not in txt and "0%" not in txt and "100%" not in txt)
        rec("hero: 4 metrics with sources", await page.locator(".hero-metric-source").count() == 4)
        rec("CV button says Request CV → #contact", (await page.inner_text("#btn-resume-header")).strip() == "Request CV" and (await page.get_attribute("#btn-resume-header", "href")) == "#contact")
        rec("CV note visible in contact", await page.locator("#cv-note").is_visible())
        rec("4 flagship cards", await page.locator("#projects-container .project-card").count() == 4)
        rec("5 supporting cards", await page.locator("#supporting-container .supporting-card").count() == 5)
        rec("status + evidence badges on every flagship", await page.locator("#projects-container .status-badge").count() == 4 and await page.locator("#projects-container .evidence-badge").count() == 4)
        body = await page.inner_text("body")
        for bad in ["CAPTCHA", "Turnstile", "EzSolver", "embassy", "Embassy", "passport", "anti-ban", "Anti-Ban", "stealth", "Stealth", "bypass", "Bypass", "45-minute", "Production Ready", "<800", "< 800"]:
            rec(f"no '{bad}' on page", bad not in body)

        imgs = await page.evaluate("Array.from(document.querySelectorAll('.media-figure img')).map(i=>({lazy:i.loading,alt:i.alt.length>0,w:i.getAttribute('width'),h:i.getAttribute('height'),dec:i.decoding}))")
        rec(f"media imgs ({len(imgs)}) all have alt/width/height/decoding", all(i['alt'] and i['w'] and i['h'] and i['dec'] == 'async' for i in imgs))
        rec("non-hero media lazy", all(i['lazy'] == 'lazy' for i in imgs[1:]))
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); await page.wait_for_timeout(1500)
        broken = await page.evaluate("Array.from(document.querySelectorAll('img')).filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src)")
        rec("no broken images after full scroll", not broken, broken)
        rec("figcaptions present (≥9)", await page.locator("figcaption").count() >= 9)

        # Modal
        await page.evaluate("window.scrollTo(0,0)")
        trig = page.locator(".view-case-btn").first
        await trig.scroll_into_view_if_needed(); await trig.click(); await page.wait_for_timeout(400)
        rec("modal opens", await page.evaluate("document.getElementById('case-study-modal').classList.contains('open')"))
        rec("focus moves to close button", await page.evaluate("document.activeElement.id") == "modal-case-close", await page.evaluate("document.activeElement.id || document.activeElement.tagName"))
        rec("main/header inert", await page.evaluate("document.querySelector('main').hasAttribute('inert') && document.querySelector('.site-header').hasAttribute('inert')"))
        rec("body scroll locked", await page.evaluate("document.body.classList.contains('modal-open')"))
        mt = await page.inner_text("#modal-case-body")
        rec("QEVION modal: real Session.interrupt() excerpt", "async def interrupt(" in mt and "abort_agent_speech_stream" not in mt)
        rec("QEVION modal: honest soak (86 s), no 45-minute", "86 s" in mt and "45-minute" not in mt and "45 دقيقة" not in mt)
        rec("modal has evidence links", await page.locator(".modal-evidence-list a").count() >= 3)
        rec("modal has media gallery", await page.locator("#case-study-modal .media-figure").count() >= 3)
        inside = True
        for _ in range(15):
            await page.keyboard.press("Tab")
            if not await page.evaluate("document.querySelector('.modal-dialog').contains(document.activeElement)"):
                inside = False
        rec("Tab focus stays trapped in modal", inside)
        await page.keyboard.press("Shift+Tab")
        rec("Shift+Tab stays trapped", await page.evaluate("document.querySelector('.modal-dialog').contains(document.activeElement)"))
        await page.keyboard.press("Escape"); await page.wait_for_timeout(300)
        rec("Escape closes modal", not await page.evaluate("document.getElementById('case-study-modal').classList.contains('open')"))
        rec("focus restored to trigger", await page.evaluate("document.activeElement.classList.contains('view-case-btn')"))
        rec("inert removed", not await page.evaluate("document.querySelector('main').hasAttribute('inert')"))
        rec("aria-hidden restored on modal", await page.get_attribute("#case-study-modal", "aria-hidden") == "true")
        await trig.click(); await page.wait_for_timeout(300); await page.mouse.click(5, 450); await page.wait_for_timeout(300)
        rec("backdrop click closes modal", not await page.evaluate("document.getElementById('case-study-modal').classList.contains('open')"))

        # Lab filters
        rec("filter buttons rendered with aria-pressed", await page.locator("#lab-filters .filter-btn[aria-pressed]").count() == 5)
        await page.click('#lab-filters .filter-btn[data-category="iot"]'); await page.wait_for_timeout(150)
        rec("IoT filter → 2 cards", await page.locator("#lab-container .lab-card").count() == 2 and await page.get_attribute('#lab-filters .filter-btn[data-category="iot"]', "aria-pressed") == "true")
        await page.click('#lab-filters .filter-btn[data-category="ai"]'); await page.wait_for_timeout(150)
        rec("AI filter → 2 cards, only one pressed", await page.locator("#lab-container .lab-card").count() == 2 and await page.locator('#lab-filters .filter-btn[aria-pressed="true"]').count() == 1)
        await page.click('#lab-filters .filter-btn[data-category="all"]'); await page.wait_for_timeout(150)
        rec("All → 6 cards", await page.locator("#lab-container .lab-card").count() == 6)
        paths = await page.evaluate("Array.from(document.querySelectorAll('.pillar-icon-box svg')).map(s=>s.innerHTML)")
        rec("4 distinct pillar icons", len(set(paths)) == 4)

        # Contact form
        await page.locator("#contact").scroll_into_view_if_needed()
        await page.click("#btn-submit-form"); await page.wait_for_timeout(200)
        rec("empty submit → validation error, no success", await page.locator("#contact-alert.is-error").is_visible())
        await page.fill("#form-name", "QA Tester"); await page.fill("#form-email", "not-an-email"); await page.fill("#form-message", "Hello <b>x</b> & test")
        await page.click("#btn-submit-form"); await page.wait_for_timeout(200)
        rec("invalid email → error + focus on email", await page.locator("#contact-alert.is-error").is_visible() and await page.evaluate("document.activeElement.id") == "form-email")
        await page.fill("#form-email", "qa@example.com")
        await page.click("#btn-submit-form"); await page.wait_for_timeout(500)
        rec("valid submit → info banner (not success claim), text kept", await page.locator("#contact-alert.is-info").is_visible() and await page.input_value("#form-message") == "Hello <b>x</b> & test")
        hint = await page.inner_text("#form-hint")
        rec("form hint explains mailto / no server", "no server" in hint and "mail app" in hint)
        await page.click("#btn-copy-email"); await page.wait_for_timeout(200)
        rec("copy email → feedback shown", await page.locator("#contact-alert").is_visible())
        rec("footer year populated", (await page.inner_text("#footer-year")).strip() == str(datetime.date.today().year))
        hs = await page.evaluate("Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(h=>!h.closest('#case-study-modal')).map(h=>+h.tagName[1])")
        jumps = [(a, c) for a, c in zip(hs, hs[1:]) if c > a + 1]
        rec("no heading level skips", not jumps, jumps[:5])
        rec("exactly one h1", hs.count(1) == 1)
        # Skip link: reload to reset sequential focus start point
        await page.goto(BASE, wait_until="networkidle"); await page.keyboard.press("Tab")
        rec("first Tab → skip link", await page.evaluate("document.activeElement.classList.contains('skip-link')"))
        safe = await page.evaluate("""() => { const t=PORTFOLIO_DATA.projects[0].title.en; PORTFOLIO_DATA.projects[0].title.en='<img src=x onerror=window.__pwned=1>'; document.getElementById('btn-lang').click(); document.getElementById('btn-lang').click(); const ok=!window.__pwned && document.querySelector('#projects-container .project-title').textContent.includes('<img'); PORTFOLIO_DATA.projects[0].title.en=t; document.getElementById('btn-lang').click(); document.getElementById('btn-lang').click(); return ok; }""")
        rec("hostile data string is escaped (no XSS)", safe)
        rec("no console/page errors during interaction", not errs, errs)
        await ctx.close()

        # ---------- Mobile EN/AR ----------
        for lang in ["en", "ar"]:
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
            await ctx.add_init_script(f"localStorage.setItem('belal_portfolio_lang','{lang}')")
            page = await ctx.new_page(); e2 = []; page.on("pageerror", lambda e: e2.append(str(e)))
            await page.goto(BASE, wait_until="networkidle")
            rec(f"[{lang} mobile] no horizontal overflow", await page.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
            rec(f"[{lang} mobile] CV pill hidden, toggle visible", not await page.locator("#btn-resume-header").is_visible() and await page.locator("#mobile-toggle").is_visible())
            rec(f"[{lang} mobile] header fits one row", (await page.evaluate("document.querySelector('.nav-wrapper').getBoundingClientRect().height")) <= 80)
            await page.click("#mobile-toggle"); await page.wait_for_timeout(300)
            rec(f"[{lang} mobile] menu opens, aria-expanded=true", await page.locator("#nav-menu").is_visible() and await page.get_attribute("#mobile-toggle", "aria-expanded") == "true")
            await page.keyboard.press("Escape"); await page.wait_for_timeout(300)
            rec(f"[{lang} mobile] Escape closes menu", await page.get_attribute("#mobile-toggle", "aria-expanded") == "false")
            await page.click("#mobile-toggle"); await page.wait_for_timeout(200); await page.click("#nav-menu .nav-link >> nth=0"); await page.wait_for_timeout(300)
            rec(f"[{lang} mobile] nav link click closes menu", await page.get_attribute("#mobile-toggle", "aria-expanded") == "false")
            small = await page.evaluate("""Array.from(document.querySelectorAll('button, a.btn-cta, a.btn-ghost, .filter-btn')).filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return {id:e.id,h:r.height}}).filter(x=>x.h<40)""")
            rec(f"[{lang} mobile] all visible controls ≥40px tall", not small, small[:4])
            trig = page.locator(".view-case-btn").first; await trig.scroll_into_view_if_needed(); await trig.click(); await page.wait_for_timeout(400)
            rec(f"[{lang} mobile] modal fits viewport", await page.evaluate("const r=document.querySelector('.modal-dialog').getBoundingClientRect(); r.width<=390 && r.height<=844"))
            rec(f"[{lang} mobile] close button ≥44px", await page.evaluate("document.getElementById('modal-case-close').getBoundingClientRect().height") >= 44)
            await page.keyboard.press("Escape"); await page.wait_for_timeout(200)
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); await page.wait_for_timeout(1200)
            rec(f"[{lang} mobile] no errors", not e2, e2)
            await ctx.close()

        # ---------- Tablet ----------
        ctx = await b.new_context(viewport={"width": 820, "height": 1180}); page = await ctx.new_page()
        await page.goto(BASE, wait_until="networkidle")
        rec("[tablet 820] no horizontal overflow", await page.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
        await ctx.close()

        # ---------- AR desktop RTL specifics ----------
        ctx = await b.new_context(viewport={"width": 1366, "height": 900}); await ctx.add_init_script("localStorage.setItem('belal_portfolio_lang','ar')")
        page = await ctx.new_page(); await page.goto(BASE, wait_until="networkidle")
        rec("[ar] code box is LTR", await page.evaluate("(()=>{document.querySelector('.view-case-btn').click(); const c=document.querySelector('.modal-code-box'); return c && getComputedStyle(c).direction==='ltr';})()"))
        rec("[ar] tech tags LTR", await page.evaluate("getComputedStyle(document.querySelector('.tech-tag')).direction==='ltr'"))
        rec("[ar] email LTR", await page.evaluate("getComputedStyle(document.querySelector('#link-email span')).direction==='ltr'"))
        rec("[ar] metric values LTR", await page.evaluate("getComputedStyle(document.querySelector('.hero-metric-value')).direction==='ltr'"))
        rec("[ar] no U+FFFD on page", "\ufffd" not in await page.inner_text("body"))
        ct = await page.inner_text("#contact")
        rec("[ar] contact heading typo fixed", "لنبنِ" in ct and "لن ابنِ" not in ct)
        rec("[ar] timeline tags translated", "Hardware / IoT" not in await page.inner_text("#timeline-container"))
        rec("[ar] lab categories translated", "iot" not in await page.inner_text("#lab-container"))
        await ctx.close(); await b.close()

    n = sum(1 for r in R if r["pass"])
    print(f"\n== {n}/{len(R)} passed ==")
    json.dump({"base": BASE, "date": datetime.date.today().isoformat(), "passed": n, "total": len(R), "results": R}, open("qa_results.json", "w"), ensure_ascii=False, indent=1)
    return n == len(R)


if __name__ == "__main__":
    sys.exit(0 if asyncio.run(main()) else 1)
