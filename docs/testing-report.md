# Portfolio Testing Report

Test date: 2026-07-16

This document is updated with tests actually executed during the current release. No Lighthouse score is reported unless Lighthouse is run successfully.

## Automated source checks

- `python scripts/validate_site.py`: passed. Validated all three HTML files, local links, anchors, JSON-LD, CV paths, sitemap, manifest, and privacy terms.
- `node --check assets/js/main.js`: passed.
- Source-level progressive-enhancement check: the delivered HTML does not depend on a pre-existing `js` class, `.reveal` content is visible by default, and only `.js .reveal` receives the pre-animation hidden state.
- Repository text and filename scan found no API keys, webhook URLs, spreadsheet identifiers, private ChatGPT project links, local filesystem paths, or exposed secrets in public portfolio files.

## PDF checks

- New CV generated from verified content using ReportLab.
- PDF page count: 1.
- Selectable text extracted successfully with `pypdf`.
- Five link annotations detected: telephone, email, portfolio, GitHub, and LinkedIn.
- PDF metadata verified: correct title, author, subject, creator, and keywords.
- Rendered to PNG with Poppler at 150 DPI and visually inspected.
- Visual result: no clipping, overlaps, black squares, broken characters, or page-break defects.

## Browser checks

- Responsive overflow matrix passed at 320, 360, 375, 390, 414, 768, 820, and 1024 CSS pixels, plus the browser's maximum available 1119-pixel viewport. The automation surface capped larger requested desktop widths, so 1280, 1440, and 1920 could not be reproduced exactly in that session.
- Mobile navigation opens with an updated `aria-expanded` state, closes with Escape, and returns focus to the menu button.
- Project filters update `aria-pressed`, the live project count, and visible cards. The Python filter showed two projects; hidden-card controls were removed from the tab order.
- Opening a project detail and changing filters closed the previously open detail. The All filter restored all six cards.
- CV View and Download actions resolve to the same current PDF; View opens a new tab and Download carries the `download` attribute.
- Custom 404 page rendered with a clear heading and a working home link.
- Browser console: zero errors during the tested interactions.
- No Lighthouse score is claimed because Lighthouse was not run in the available browser environment.

## External-link checks

- All featured GitHub repository destinations were verified through the connected GitHub account while their repositories were updated.
- GitHub profile website and LinkedIn social fields were saved and re-read successfully.
- LinkedIn's public page returned an automated-access rate limit during testing, so public-page rendering there is not claimed as verified.
