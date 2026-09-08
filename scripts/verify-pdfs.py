from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
expected = {"concept-summary.pdf": 1, "blog.pdf": None}
for name, page_count in expected.items():
    path = root / "docs" / name
    reader = PdfReader(path)
    if page_count is not None and len(reader.pages) != page_count:
        raise SystemExit(f"{name}: expected {page_count} page, found {len(reader.pages)}")
    if len(reader.pages) == 0 or any(not (page.extract_text() or "").strip() for page in reader.pages):
        raise SystemExit(f"{name}: empty or unreadable page detected")
    links = sum(len(page.get("/Annots", [])) for page in reader.pages)
    if links < 4:
        raise SystemExit(f"{name}: expected at least four linked primary-source citations, found {links}")
    print(f"{name}: {len(reader.pages)} page(s), readable text present, {links} link annotations")
