# ResumeGenie & ID Creator

ResumeGenie is a client-side ATS-friendly CV builder, student ID card creator,
certificate maker, and skill badge tracker with English and Bengali support.
User data stays in the browser's local storage.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

No API key or backend service is required for the current application.

## Run in Codespaces

From the repository root:

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Open the forwarded port `3000` in the **Ports** panel. The development server
listens on `0.0.0.0`, so it is available through the Codespaces forwarded URL.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run lint` | Type-check the TypeScript project |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Remove generated build files |

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and on
manual dispatch. It installs dependencies with `npm ci`, runs type-checking and
the production build, then deploys `dist/` with GitHub Pages.

In the repository settings, set **Pages > Build and deployment > Source** to
**GitHub Actions**. The configured custom domain is:

`https://resume-genie.bdhyperashraf71.me`

After pushing to `main`, check the **Actions** tab for the deployment result.

## Privacy

CVs, photos, signatures, and other entered data are kept locally in the browser.
Clearing browser site data removes saved application data.
