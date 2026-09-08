from __future__ import annotations

import hashlib
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "submission" / "final-package"
ARCHIVE = ROOT / "submission" / "DataForge2026_Pathway_LatentLab_Final.zip"
FIXED_TIME = (2026, 1, 1, 0, 0, 0)


def main() -> None:
    files = sorted(path for path in PACKAGE.rglob("*") if path.is_file())
    if not files:
        raise SystemExit("Final package is empty")
    with ZipFile(ARCHIVE, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            relative = path.relative_to(PACKAGE).as_posix()
            info = ZipInfo(relative, FIXED_TIME)
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=9)
    digest = hashlib.sha256(ARCHIVE.read_bytes()).hexdigest()
    with ZipFile(ARCHIVE) as archive:
        names = archive.namelist()
        if len(names) != len(files) or len(names) != len(set(names)):
            raise SystemExit("Archive entry count or uniqueness check failed")
        for required in ("README.md", "docs/concept-summary.pdf", "docs/blog.pdf", "submission/FINAL_LINKS.md"):
            if required not in names:
                raise SystemExit(f"Archive missing {required}")
        if any(name.startswith("final-package/") for name in names):
            raise SystemExit("Archive has an unintended duplicate root directory")
    print(f"Final ZIP PASS: {len(files)} files")
    print(f"SHA-256: {digest}")


if __name__ == "__main__":
    main()
