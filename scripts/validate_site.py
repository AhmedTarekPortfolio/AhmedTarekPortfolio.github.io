"""Lightweight validation for the static portfolio."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [ROOT / "index.html", ROOT / "404.html", ROOT / "resume" / "cv.html"]


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.assets: list[str] = []
        self.json_ld: list[str] = []
        self._json_parts: list[str] | None = None

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])
        if tag in {"img", "script"} and values.get("src"):
            self.assets.append(values["src"])
        if tag == "link" and values.get("href"):
            self.assets.append(values["href"])
        if tag == "script" and values.get("type") == "application/ld+json":
            self._json_parts = []

    def handle_data(self, data: str) -> None:
        if self._json_parts is not None:
            self._json_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self._json_parts is not None:
            self.json_ld.append("".join(self._json_parts))
            self._json_parts = None


def local_path(document: Path, reference: str) -> Path | None:
    parsed = urlparse(reference)
    if parsed.scheme or reference.startswith(("//", "mailto:", "tel:", "#")):
        return None
    path = parsed.path
    if not path:
        return None
    return ROOT / path.lstrip("/") if path.startswith("/") else document.parent / path


def main() -> int:
    errors: list[str] = []
    for document in HTML_FILES:
        if not document.exists():
            errors.append(f"Missing HTML file: {document.relative_to(ROOT)}")
            continue
        parser = DocumentParser()
        parser.feed(document.read_text(encoding="utf-8"))
        for raw in parser.json_ld:
            try:
                json.loads(raw)
            except json.JSONDecodeError as error:
                errors.append(f"Invalid JSON-LD in {document.name}: {error}")
        for reference in parser.assets + parser.links:
            target = local_path(document, reference)
            if target is not None and not target.exists():
                errors.append(f"Broken local reference in {document.relative_to(ROOT)}: {reference}")
            if reference.startswith("#") and reference[1:] not in parser.ids:
                errors.append(f"Broken anchor in {document.relative_to(ROOT)}: {reference}")

    required = [
        "resume/Ahmed-Tarek-Hassanein-CV.pdf", "resume/cv.html", "resume/cv.css",
        "robots.txt", "sitemap.xml", "site.webmanifest", "assets/images/social-card.png",
        "assets/images/icon-192.png", "assets/images/icon-512.png",
    ]
    for relative in required:
        if not (ROOT / relative).exists():
            errors.append(f"Missing required file: {relative}")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    if "https://ahmedtarekportfolio.github.io/" not in sitemap:
        errors.append("Canonical portfolio URL missing from sitemap")
    manifest = json.loads((ROOT / "site.webmanifest").read_text(encoding="utf-8"))
    if len(manifest.get("icons", [])) < 2:
        errors.append("Manifest must include 192px and 512px icons")

    combined = "\n".join(path.read_text(encoding="utf-8") for path in HTML_FILES)
    forbidden = ["fiverr.com", "upwork.com", "chatgpt.com", "C:\\Users\\", "spreadsheetId", "webhook"]
    for term in forbidden:
        if term.lower() in combined.lower():
            errors.append(f"Forbidden public term found: {term}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Validated {len(HTML_FILES)} HTML files, local links, anchors, JSON-LD, CV paths, sitemap, manifest, and privacy terms.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
