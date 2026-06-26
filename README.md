# Ahmed Tarek Portfolio Website

A GitHub Pages portfolio for **Ahmed Tarek** featuring data-cleaning and n8n automation projects.

## Folder structure

```text
AhmedTarekPortfolio.github.io/
├── index.html
├── styles.css
├── js/
│   ├── data.js       ← your projects, contact links, skills, and profile photo path
│   ├── render.js
│   └── app.js
└── assets/
    ├── profile-placeholder.svg
    └── projects/
        ├── excel-cleaning.png
        └── cv-job-matching.png
```

## Personalize it before publishing

1. Open `js/data.js`.
2. Replace the blank `linkedin`, `fiverr`, `upwork`, and `email` values with your actual links.
3. Replace `assets/profile-placeholder.svg` with your own photo path:
   - Put your photo in `assets/` as `profile-photo.jpg`.
   - Change `photo: "assets/profile-placeholder.svg"` to `photo: "assets/profile-photo.jpg"`.

## Add tomorrow’s projects

1. Put each screenshot in `assets/projects/`.
2. Open the website, press **Edit Portfolio**, then **Add New Project**.
3. Save it and press **Export Updated HTML**. This downloads a version with the new projects already included.
4. For the cleanest GitHub Pages update, copy the exported project details into `js/data.js`, upload the screenshot, and commit both files.

You can also use the **Edit Portfolio** button to edit or delete a project in the browser. It does not publish changes automatically; GitHub needs a commit to update the public site.

## Publish with GitHub Pages

1. Create a public repository named exactly `AhmedTarekPortfolio.github.io`.
2. Upload all files in this folder, preserving the folder structure.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` and the `/(root)` folder, then save.
6. GitHub will publish it at `https://AhmedTarekPortfolio.github.io` after deployment finishes.
