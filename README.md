# ResumeGenie & ID Creator  

**A client‑side, ATS‑friendly CV builder, student‑ID card generator, certificate maker & skill‑badge tracker** – with full English / Bengali support. All data stays safely in the browser’s local storage, so no API keys or backend services are required.  

---  

## ✨ Features  

| ✅ | Feature | Details |
|---|---|---|
| **CV Builder** | Drag‑and‑drop sections, live preview, export to PDF or DOCX. |
| **Student ID Card** | Customizable templates, QR‑code embedding, instant download. |
| **Certificate Maker** | Pre‑made designs, auto‑fill recipient name/date, export PDF. |
| **Skill Badges** | Track earned badges, display on CV or ID card. |
| **Multilingual** | UI in English **and** Bengali. |
| **Privacy‑First** | All data stored locally (IndexedDB / localStorage). No server‑side calls. |
| **Responsive** | Works on desktop, tablet and mobile browsers. |
| **Export Ready** | Files are ATS‑compatible (plain‑text PDF) and look great to recruiters. |

---  

## 📦 Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| **Node.js** | 20 + |
| **npm** | 10 + |

---  

## 🚀 Getting Started  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your‑username/resume-genie.git
   cd resume-genie
   ```

2. **Install dependencies** (uses exact lockfile)  
   ```bash
   npm ci
   ```

3. **Run the linter** *(optional but recommended)*  
   ```bash
   npm run lint
   ```

4. **Build the project**  
   ```bash
   npm run build
   ```

5. **Start the development server**  
   ```bash
   npm run dev
   ```

6. Open the forwarded port **3000** in the **Ports** panel (or `http://localhost:3000`). The server listens on `0.0.0.0`, so it works from any forwarded URL (e.g., Codespaces).

---  

## 📂 Project Structure  

```
src/
 ├─ components/          # Re‑usable Vue/React components
 ├─ pages/               # Views: CV builder, ID creator, certificates
 ├─ store/               # Pinia/Redux store – handles localStorage sync
 ├─ assets/              # Icons, fonts & template images
 └─ i18n/                # English & Bengali translation files
public/
 └─ index.html           # Entry point
vite.config.ts           # Vite configuration (port 3000, HMR)
package.json             # Scripts & dependencies
README.md                # *You’re reading it!*
```

---  

## 🛠️ Scripts Overview  

| Script | Description |
|--------|-------------|
| `dev` | Starts **Vite** dev server (`localhost:3000`). |
| `build` | Produces a production‑ready bundle in `dist/`. |
| `lint` | Runs **ESLint** (and optionally **Prettier**) to keep code clean. |
| `preview` | Serves the built app locally for final testing. |

---  

## 📄 Export Options  

| Export type | Format | ATS compatibility |
|-------------|--------|-------------------|
| **Resume** | PDF (plain‑text), DOCX | ✅ |
| **ID Card** | PNG, PDF | ✅ |
| **Certificate** | PDF | ✅ |

---  

## 🌐 Live Demo  

Visit the live version:  
**[https://resume-genie.bdhyperashraf71.me](https://resume-genie.bdhyperashraf71.me)**  

---  

## 🧩 How It Works (Behind the Scenes)  

1. **Data Layer** – All user inputs are persisted to `localStorage` (or IndexedDB for larger blobs) using a thin wrapper that syncs on every change.  
2. **Rendering** – The UI is built with **Vite + Vue 3** (or React, if you fork). Components render live previews via the canvas API and `html2pdf.js`.  
3. **Export** – PDF generation leverages **jsPDF** (plain‑text option) and **html2canvas** for styled outputs. DOCX uses **docx‑js**.  
4. **Internationalisation** – `vue-i18n` (or `react-i18next`) loads language JSON files at runtime; switching language instantly updates all labels.  

---  

## 🛡️ Security & Privacy  

- **Zero server calls** – No data ever leaves the browser.  
- **Local‑only storage** – Users control their own data; clearing the browser cache removes everything.  
- **Content‑Security‑Policy** – The build includes a strict CSP to prevent third‑party script injection.  

---  

## 🤝 Contributing  

1. Fork the repo.  
2. Create a feature branch: `git checkout -b feature/awesome‑thing`.  
3. Make your changes, run `npm run lint` and ensure the app builds.  
4. Open a Pull Request with a clear description and screenshots (if UI changes).  

> **Tip:** Add new translations under `src/i18n/` and update the language selector component.

---  

## 📜 License  

This project is licensed under the **MIT License** – feel free to use, modify, and distribute it commercially or privately.  

---  

## 🙏 Acknowledgments  

- **Vite** – Fast dev server and bundler.  
- **jsPDF / html2canvas** – PDF generation utilities.  
- **Vue 3** – Reactive UI framework (or React alternative).  
- **Open‑source icon packs** – for the UI assets.  

---  

## 📞 Support  

Having trouble? Open an **Issue** on GitHub or drop a comment in the **Discussions** tab.  

Happy building! 🚀  | `npm run lint` | Type-check the TypeScript project |
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
