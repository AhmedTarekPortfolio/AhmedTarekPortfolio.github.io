# Ahmed Tarek Hassanein - Portfolio

The public portfolio of Ahmed Tarek Hassanein, a Networking and Communications Engineering student in Ajman, United Arab Emirates. It presents verified experience in data entry, Excel data cleaning, document processing, technical support, Python fundamentals, and basic workflow automation without overstating current skill levels.

**Live site:** [ahmedtarekportfolio.github.io](https://ahmedtarekportfolio.github.io/)

## Highlights

- Premium dark interface built with semantic HTML, responsive CSS, and lightweight vanilla JavaScript
- Six recruiter-focused projects with clear completion, prototype, learning, and privacy-safe status labels
- Separate secondary section for utilities and ongoing experiments
- Accessible mobile navigation, keyboard focus, reduced-motion support, project filters, and progressive enhancement
- New one-page ATS-readable CV with editable HTML/CSS source and clickable PDF links
- Complete canonical, Open Graph, Twitter Card, JSON-LD, favicon, manifest, robots, sitemap, and 404 support
- Automated local-link, anchor, JSON-LD, privacy, manifest, sitemap, CV-path, and JavaScript-syntax checks

## Project positioning

The site is intended for applications involving:

- Excel data cleaning, formatting, and spreadsheet organization
- Data entry, document processing, and data-focused administration
- Junior Python and basic automation opportunities
- Entry-level technical support
- Suitable freelance data and spreadsheet work

Projects are labeled honestly. The CV-to-Remote-Job Matching project is a **Documented Workflow Prototype** because its public repository contains documentation and sanitized screenshots, not an exportable workflow file or sample workbook. The Local AI Deployment Lab is an ongoing learning experiment with no repository link.

## Local preview

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Validation

```bash
python scripts/validate_site.py
node --check assets/js/main.js
```

The GitHub Actions workflow in `.github/workflows/validate.yml` runs these checks on pushes and pull requests.

## Structure

```text
.
├── index.html
├── 404.html
├── README.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   │   ├── favicon.svg
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── social-card.png
│   ├── projects/
│   └── profile-photo.webp
├── resume/
│   ├── Ahmed-Tarek-Hassanein-CV.pdf
│   ├── cv.html
│   └── cv.css
├── docs/
│   ├── content-audit.md
│   ├── external-profile-updates.md
│   └── testing-report.md
├── scripts/validate_site.py
└── .github/workflows/validate.yml
```

## Privacy

- No student names, marks, school workbooks, institutional templates, API keys, tokens, webhook URLs, spreadsheet IDs, private CV source documents, or local computer paths are published.
- The education-data project is presented only as a sanitized case study.
- Confidential CSV and Excel source data remain private.
- Fiverr is omitted until a permanent seller or gig URL is available.
- Upwork is omitted until its public positioning matches the portfolio.

## CV

The current CV was rebuilt from scratch in July 2026. `resume/cv.html` and `resume/cv.css` are the editable source; `resume/Ahmed-Tarek-Hassanein-CV.pdf` is the public one-page PDF. The old CV is retained only in Git history.

## Contact links

- Email: [ahmedabntarek9@gmail.com](mailto:ahmedabntarek9@gmail.com)
- GitHub: [AhmedTarekPortfolio](https://github.com/AhmedTarekPortfolio)
- LinkedIn: [ahmedtarek-g7](https://linkedin.com/in/ahmedtarek-g7)

Upwork and Fiverr are intentionally not presented as verified portfolio links.
