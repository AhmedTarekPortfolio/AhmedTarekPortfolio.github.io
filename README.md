# Ahmed Tarek Hassanein — Portfolio

A responsive, GitHub Pages–ready personal portfolio for Ahmed Tarek Hassanein, a Networking and Communications Engineering student in Ajman, UAE. The site presents practical experience in Excel, data organization, Python learning projects, workflow automation, technical support, and an ongoing path toward cloud data engineering.

## Website sections

- Sticky navigation and professional hero
- About and personal details
- Skills grouped by working level
- Filterable featured projects with expandable details
- Learning and practice repositories
- Professional experience timeline
- Education and academic achievement
- Current learning roadmap
- Verified contact and freelance links
- Downloadable public CV

## Technologies

- Semantic HTML5
- Modern CSS with custom properties and responsive layouts
- Vanilla JavaScript
- No framework, database, package manager, or build step

## Local preview

The site can be opened directly by double-clicking `index.html`. For the most accurate browser behavior, run a small local server from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages deployment

1. Copy the site files into the `AhmedTarekPortfolio.github.io` repository.
2. Preserve the folder structure shown below.
3. Commit and push to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
6. The site will be available at `https://ahmedtarekportfolio.github.io/` after deployment completes.

## Folder structure

```text
.
├── index.html
├── README.md
├── resume/
│   └── Ahmed-Tarek-Hassanein-CV.pdf
├── .openai/
│   └── hosting.json
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── images/
    │   └── favicon.svg
    ├── profile-photo.jpg
    └── projects/
        ├── excel-cleaning.png
        └── cv-job-matching.png
```

## Updating contact links

Verified contact links are in the `#contact` section of `index.html` and in the structured-data block near the top of the file. When a link changes, update both locations. Never add placeholder links that look functional.

## Adding or replacing project screenshots

1. Put an optimized `.webp`, `.jpg`, or `.png` image in `assets/projects/`.
2. Use a descriptive lowercase filename.
3. Update the matching `<img>` path and alt text in `index.html`.
4. Keep explicit `width` and `height` attributes to reduce layout shift.
5. Avoid screenshots containing private records, student names, real marks, credentials, or confidential files.

## Updating the CV

The reviewed CV is available at `resume/Ahmed-Tarek-Hassanein-CV.pdf` and is linked from the hero. It contains public contact details, including a phone number and email address. Review those details again before replacing the PDF or publishing a new version.

## Accessibility and responsive design

- Semantic landmarks and heading hierarchy
- Keyboard-accessible navigation, filters, links, and project details
- Visible focus states and skip link
- Active-section navigation state
- Reduced-motion support
- High-contrast text and touch-friendly controls
- Responsive layouts for phones, tablets, laptops, and large screens
- Graceful initials fallback if the profile image fails

## Content integrity

Public GitHub links were verified for the Excel cleaning, CV-to-job workflow, Python inventory, Python student management, YouTube media downloader, Python practice, and portfolio repositories. Projects without a public repository deliberately omit a GitHub button. The educational workbook case study contains no student names, marks, school identity, or confidential source files.
