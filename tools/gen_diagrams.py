#!/usr/bin/env python3
"""
Generate the original SVG architecture diagrams used by the portfolio.

Every diagram is derived from verified repository facts (see MEDIA_PLAN.md).
Run:  python3 tools/gen_diagrams.py   -> writes assets/diagrams/*.svg (EN + AR)
"""
from __future__ import annotations
import html
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "diagrams"
OUT.mkdir(parents=True, exist_ok=True)

BG, CARD, CARD2, BORDER = "#0b1020", "#121a2b", "#0e1524", "#263147"
TEXT, MUTED = "#f1f5f9", "#9fb0c7"
CYAN, EMERALD, AMBER, PURPLE, ROSE = "#22d3ee", "#34d399", "#fbbf24", "#a78bfa", "#fb7185"
FONT_EN = "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
FONT_AR = "'Tajawal', 'Cairo', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
MONO = "'JetBrains Mono', Consolas, 'Courier New', monospace"


def esc(s: str) -> str:
    return html.escape(s, quote=True)


class SVG:
    def __init__(self, w, h, lang, title, desc):
        self.w, self.h, self.lang = w, h, lang
        self.rtl = lang == "ar"
        self.font = FONT_AR if self.rtl else FONT_EN
        self.parts: list[str] = []
        self.title, self.desc = title, desc

    def rect(self, x, y, w, h, fill=CARD, stroke=BORDER, r=12, sw=1.2, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>')

    def text(self, x, y, s, size=14, fill=TEXT, weight=500, anchor="middle", mono=False):
        font = MONO if mono else self.font
        direction = ' direction="rtl" unicode-bidi="plaintext"' if (self.rtl and not mono) else ""
        self.parts.append(f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}"{direction}>{esc(s)}</text>')

    def lines(self, x, y, items, size=12.5, fill=MUTED, gap=18, mono=False):
        for i, s in enumerate(items):
            self.text(x, y + i * gap, s, size=size, fill=fill, weight=400, mono=mono)

    def box(self, x, y, w, h, title, sub=(), accent=CYAN, title_size=15, sub_size=12, fill=CARD):
        self.rect(x, y, w, h, fill=fill)
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="4" rx="2" fill="{accent}"/>')
        cx = x + w / 2
        self.text(cx, y + 28, title, size=title_size, weight=600)
        if sub:
            self.lines(cx, y + 50, sub, size=sub_size)

    def arrow(self, x1, y1, x2, y2, color=CYAN, label=None, dash=None, label_dy=-6, both=False):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        mid = f"m{color.strip('#')}"
        start = f' marker-start="url(#{mid}s)"' if both else ""
        self.parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.8" marker-end="url(#{mid})"{start}{d}/>')
        if label:
            self.text((x1 + x2) / 2, (y1 + y2) / 2 + label_dy, label, size=11.5, fill=MUTED, weight=400)

    def pill(self, x, y, s, color=CYAN, mono=True):
        w = max(54, int(len(s) * 7.6 + 22))
        self.parts.append(f'<rect x="{x - w/2}" y="{y - 11}" width="{w}" height="22" rx="11" fill="{color}" fill-opacity="0.12" stroke="{color}" stroke-opacity="0.5"/>')
        self.text(x, y + 4, s, size=11, fill=color, weight=600, mono=mono)

    def note(self, x, y, w, s, color=EMERALD, h=44, size=13):
        bg = {"#34d399": "#0f1b17", "#fbbf24": "#1a1607"}.get(color, CARD2)
        self.rect(x, y, w, h, fill=bg, stroke=color, r=10, sw=1)
        self.text(x + w / 2, y + h / 2 + 5, s, size=size, fill=color, weight=600)

    def render(self):
        defs = "".join(
            f'<marker id="m{c.strip("#")}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{c}"/></marker>'
            f'<marker id="m{c.strip("#")}s" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7"><path d="M10,0 L0,5 L10,10 z" fill="{c}"/></marker>'
            for c in (CYAN, EMERALD, AMBER, PURPLE, ROSE, MUTED))
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" role="img" aria-labelledby="t d" lang="{self.lang}">\n'
                f'<title id="t">{esc(self.title)}</title><desc id="d">{esc(self.desc)}</desc>\n<defs>{defs}'
                f'<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c1222"/><stop offset="1" stop-color="#090d18"/></linearGradient></defs>\n'
                f'<rect width="{self.w}" height="{self.h}" fill="url(#bg)"/>\n' + "\n".join(self.parts) + "\n</svg>\n")


from diagram_specs import GENERATORS  # noqa: E402

if __name__ == "__main__":
    for name, fn in GENERATORS.items():
        for lang in ("en", "ar"):
            p = OUT / f"{name}.{lang}.svg"
            p.write_text(fn(SVG, lang), encoding="utf-8")
            print("wrote", p.name, p.stat().st_size, "bytes")
