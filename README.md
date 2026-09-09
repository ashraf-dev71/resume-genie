# ResumeGenie & ID Creator

ResumeGenie & ID Creator is a client-side React application for creating
professional CVs, student or employee ID cards, certificates, and skill-badge
profiles. It is designed for privacy-conscious users who want to prepare,
preview, print, and export documents without sending personal information to a
backend service.

The interface supports English and Bengali, works on desktop and mobile
screens, and stores working data locally in the browser.

## Highlights

- **CV Builder**: Edit structured personal, education, experience, skills,
   projects, references, and other resume sections with a live preview.
- **CV Templates**: Switch presentation styles while keeping the same resume
   data.
- **ID Card Creator**: Build printable student or employee cards with custom
   fields, photos, branding, and QR codes.
- **Certificate Maker**: Create certificates from built-in templates and print
   them in A4 landscape format.
- **Skill Badges**: Track and present earned skills or achievements.
- **English and Bengali UI**: Change the application language from the
   interface.
- **Local-first privacy**: Resume data, images, and signatures are persisted in
   browser storage. No application server is required for normal use.
- **Print-ready output**: Dedicated print styles support A4 portrait resumes,
   A4 landscape certificates, and card-sized output.
- **Responsive workspace**: Editors and previews adapt to desktop, tablet, and
   mobile viewports.

## Technology

| Area | Technology |
| --- | --- |
| UI | React 19 and TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 with application CSS |
| Icons | Lucide React |
| Motion | Motion |
| PDF and image export | jsPDF and html-to-image |
| QR codes | qrcode |
| Local persistence | Browser `localStorage` |
| Hosting | GitHub Pages through GitHub Actions |

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A modern browser with support for local storage, Canvas, FileReader, and the
   browser print API

## Getting Started

Clone the repository and install the exact dependency tree from the lockfile:

```bash
git clone https://github.com/ashraf-dev71/resume-genie.git
cd resume-genie
npm ci
```

Start the development server:

```bash
npm run dev
```

Vite listens on `http://localhost:3000` and binds to `0.0.0.0`, which also
allows access through a forwarded Codespaces port.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000. |
| `npm run lint` | Run the TypeScript compiler without emitting files. |
| `npm run build` | Create the optimized production bundle in `dist/`. |
| `npm run preview` | Serve the generated production bundle locally. |
| `npm run clean` | Remove generated build output and the legacy `server.js` path. |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## How Data Is Handled

The application is intentionally client-side. Editor state is serialized to
`localStorage` so users can return to the same browser and continue working.
Uploaded images are resized and compressed in the browser before being stored
as data URLs. QR codes are generated locally from the supplied text.

Because browser storage is device- and browser-specific:

- Data is not automatically synchronized between devices or browsers.
- Clearing site data, private browsing sessions, or browser storage can remove
   saved documents.
- Users should export or print important documents before clearing browser
   data.
- The application does not provide server-side backups or account recovery.

## Export and Printing

The application uses browser-side rendering and PDF/image utilities for
document output. Print mode applies format-specific CSS:

- CVs use A4 portrait layout.
- Certificates use A4 landscape layout.
- ID cards use card-oriented dimensions and print styling.

For reliable output, review the live preview, use the browser's print preview,
enable background graphics when required by the selected template, and confirm
the paper size before printing.

## Project Structure

```text
.
├── public/                         Static files and the SPA fallback page
├── src/
│   ├── components/
│   │   ├── CVBuilder/              CV editor, preview, renderers, templates
│   │   ├── IDCardCreator/          ID card editor, preview, renderers
│   │   ├── CertificateMaker/       Certificate editor and templates
│   │   └── SkillBadges/            Badge management UI
│   ├── data/                       Templates, translations, and starter data
│   ├── utils/                      Persistence, QR, printing, and export logic
│   ├── App.tsx                     Application state and top-level views
│   ├── index.css                   Global and print-specific styles
│   └── main.tsx                    React entry point
├── .github/workflows/deploy.yml   GitHub Pages build and deployment workflow
├── index.html                      Vite document shell and metadata
├── vite.config.ts                  Vite, React, Tailwind, and path alias config
└── package.json                    Scripts and dependencies
```

## GitHub Pages Deployment

Deployment is automated by `.github/workflows/deploy.yml`. Every push to
`main` or `master`, as well as a manual workflow dispatch, performs these
steps:

1. Install Node.js 20.
2. Install dependencies with `npm ci`.
3. Run `npm run build`.
4. Upload the `dist/` directory as a Pages artifact.
5. Deploy the artifact with GitHub Pages.

To enable deployment for a fork or new repository:

1. Push the project to GitHub.
2. Open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Ensure Actions are enabled for the repository.
5. Push to the configured branch or run the workflow manually.

This repository is configured with the custom domain:

```text
https://resume-genie.bdhyperashraf71.me
```

The root `CNAME` file must remain in the repository for the custom domain to
continue working. DNS configuration must point the domain to GitHub Pages.

## Configuration Notes

- Vite uses `base: './'` so the generated bundle works with GitHub Pages
   project paths and custom domains.
- The `@` import alias resolves to the repository root.
- No runtime API key is required for CV, ID card, certificate, or badge editing.
- Keep personal data out of source files, commits, issues, and screenshots.

## Troubleshooting

### The app does not start

Confirm the Node.js version and reinstall dependencies:

```bash
node --version
npm --version
rm -rf node_modules
npm ci
npm run dev
```

### Saved data is missing

Check that the browser allows site storage and that the site origin has not
changed. Clearing browser storage removes locally saved documents.

### GitHub Pages shows an old version

Check the latest workflow run in the repository's **Actions** tab. Confirm that
the run completed successfully, then allow CDN and browser cache time to
refresh. A hard refresh can help during verification.

### Printed output is misaligned

Use print preview, select the intended paper size and orientation, and enable
background graphics when the template depends on them. Browser print engines
can differ slightly in font and page-break handling.

## Contributing

1. Create a feature branch from `main`.
2. Keep changes focused and follow the existing React and TypeScript patterns.
3. Add or update translations when adding user-facing text.
4. Run `npm run lint` and `npm run build`.
5. Open a pull request with a concise description and relevant screenshots for
    visual changes.

## License

This project is released under the MIT License. See the repository license
file for the full terms.
