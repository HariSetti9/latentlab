from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, PageTemplate, Paragraph, Spacer

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

INK = colors.HexColor("#17231f")
GREEN = colors.HexColor("#176b52")
LIME = colors.HexColor("#ddeb99")
MUTED = colors.HexColor("#64716b")
PAPER = colors.HexColor("#fffdf7")
LINE = colors.HexColor("#d4d7cc")


def clean(text: str) -> str:
    replacements = {"–": "-", "—": "-", "→": "->", "≥": ">=", "×": "x", "“": '"', "”": '"', "’": "'"}
    for source, target in replacements.items():
        text = text.replace(source, target)
    return text


def inline(text: str) -> str:
    text = clean(text)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" color="#176b52"><u>\1</u></a>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r'<font name="Courier">\1</font>', text)
    return text


def parse_markdown(path: Path, styles: dict[str, ParagraphStyle], compact: bool = False):
    lines = path.read_text(encoding="utf-8").splitlines()
    story = []
    paragraph = []

    def flush():
        if paragraph:
            story.append(Paragraph(inline(" ".join(paragraph)), styles["body"]))
            story.append(Spacer(1, 1.3 * mm if compact else 2.6 * mm))
            paragraph.clear()

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush()
        elif stripped.startswith("### "):
            flush()
            story.append(Paragraph(inline(stripped[4:]), styles["h3"]))
        elif stripped.startswith("## "):
            flush()
            story.append(Paragraph(inline(stripped[3:]), styles["h2"]))
        elif stripped.startswith("# "):
            flush()
            story.append(Paragraph(inline(stripped[2:]), styles["title"]))
        elif stripped.startswith("- "):
            flush()
            story.append(Paragraph(inline(stripped[2:]), styles["bullet"], bulletText="-"))
        else:
            paragraph.append(stripped)
    flush()
    return story


def base_styles(compact: bool = False):
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=25 if compact else 28, leading=27 if compact else 32, textColor=INK, alignment=TA_LEFT, spaceAfter=3 * mm),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=11 if compact else 16, leading=13 if compact else 19, textColor=GREEN, spaceBefore=2 * mm if compact else 5 * mm, spaceAfter=1.2 * mm),
        "h3": ParagraphStyle("H3", parent=base["Heading3"], fontName="Helvetica-Bold", fontSize=8.6 if compact else 11.5, leading=10.2 if compact else 14, textColor=INK, spaceBefore=1.5 * mm if compact else 3 * mm, spaceAfter=.7 * mm),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="Helvetica", fontSize=7.45 if compact else 9.5, leading=9.25 if compact else 13.3, textColor=INK, alignment=TA_LEFT),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName="Helvetica", fontSize=7.3 if compact else 9.3, leading=9.1 if compact else 12.8, leftIndent=4 * mm, firstLineIndent=-2.5 * mm, textColor=INK),
    }


def concept_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, height - 10 * mm, width, 10 * mm, fill=1, stroke=0)
    canvas.setFillColor(LIME)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(14 * mm, height - 6.3 * mm, "DATAFORGE 2026  /  PATHWAY  /  ONE-PAGE CONCEPT BRIEF")
    canvas.setStrokeColor(LINE)
    canvas.line(14 * mm, 10 * mm, width - 14 * mm, 10 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 6.5)
    canvas.drawString(14 * mm, 6.5 * mm, "OUR EXPERIMENT + PRIMARY-SOURCED RESEARCH CONTEXT  |  LATENTLAB")
    canvas.drawRightString(width - 14 * mm, 6.5 * mm, "1 / 1")
    canvas.restoreState()


def blog_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, height - 8 * mm, width, 8 * mm, fill=1, stroke=0)
    canvas.setFillColor(LIME)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(18 * mm, height - 5.2 * mm, "LATENTLAB  /  TECHNICAL BLOG")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"{doc.page}")
    canvas.restoreState()


def build_concept():
    output = DOCS / "concept-summary.pdf"
    doc = BaseDocTemplate(str(output), pagesize=A4, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=15 * mm, bottomMargin=13 * mm, title="LATENTLAB - Recurrent Latent-Space Reasoning", author="LATENTLAB contributors")
    gap = 7 * mm
    usable = A4[0] - 28 * mm
    frame_width = (usable - gap) / 2
    frames = [Frame(14 * mm, 13 * mm, frame_width, A4[1] - 28 * mm, id="left", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0), Frame(14 * mm + frame_width + gap, 13 * mm, frame_width, A4[1] - 28 * mm, id="right", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)]
    doc.addPageTemplates(PageTemplate(id="concept", frames=frames, onPage=concept_page))
    doc.build(parse_markdown(DOCS / "CONCEPT_SUMMARY.md", base_styles(compact=True), compact=True))


def build_blog():
    output = DOCS / "blog.pdf"
    doc = BaseDocTemplate(str(output), pagesize=A4, leftMargin=22 * mm, rightMargin=22 * mm, topMargin=18 * mm, bottomMargin=17 * mm, title="Can an AI Think Longer Without Talking Longer?", author="LATENTLAB contributors")
    frame = Frame(22 * mm, 17 * mm, A4[0] - 44 * mm, A4[1] - 36 * mm, id="body", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(PageTemplate(id="blog", frames=[frame], onPage=blog_page))
    story = parse_markdown(DOCS / "BLOG.md", base_styles())
    doc.build([KeepTogether(item) if isinstance(item, Paragraph) and item.style.name in {"H2", "H3"} else item for item in story])


if __name__ == "__main__":
    build_concept()
    build_blog()
    print("Generated docs/concept-summary.pdf and docs/blog.pdf")
