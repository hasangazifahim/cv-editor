# Gazi Fahim Hasan — ATS-Friendly Curriculum Vitae (CV)

[![ATS Parseability](https://img.shields.io/badge/ATS%20Parseability-100%25%20Verified-brightgreen?style=flat-square)](#ats-verification-results)
[![Formats Available](https://img.shields.io/badge/Formats-PDF%20%7C%20HTML%20%7C%20Plain%20Text-blue?style=flat-square)](#available-formats)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

An executive, high-conversion, Applicant Tracking System (ATS) optimized Curriculum Vitae engineered for **Gazi Fahim Hasan** (SEO Executive & Technical SEO Specialist, B.Sc in Computer Science & Engineering graduate).

---

## 📋 Available Formats & Tools

| Format / Tool | File Link | Best Used For |
| :--- | :--- | :--- |
| **Interactive CV Studio & Builder** | [editor.html](./editor.html) | **Self-service live editor**: customize all fields one-by-one with real-time preview, auto-save, conditional field hiding, JSON export/import, and instant PDF print. |
| **Executive PDF (With Photo)** | [Gazi_Fahim_Hasan_ATS_CV.pdf](./Gazi_Fahim_Hasan_ATS_CV.pdf) | Direct recruiter emails, European/international job applications, hiring manager presentations. |
| **Strict ATS PDF (Text-Only)** | [Gazi_Fahim_Hasan_ATS_CV_TextOnly.pdf](./Gazi_Fahim_Hasan_ATS_CV_TextOnly.pdf) | Automated application portals (Workday, Taleo, Greenhouse, Lever, iCIMS). |
| **Interactive Web Viewer** | [index.html](./index.html) | Live browser preview with print optimization (`@media print`), photo toggle, and ATS text exporter. |
| **Plain Text (Markdown / TXT)** | [context/CHAT_HISTORY.md](./context/CHAT_HISTORY.md) | Copy-pasting directly into online application text boxes. |

---

## 🌟 Key Highlights Included in the CV

- **Proven Performance Metrics**:
  - **+340%** average organic traffic lift across client portfolios.
  - **1,500+** commercial keywords ranked in Google Top 3.
  - **120+** comprehensive technical site audits delivered.
  - **770%** average client ROI.
- **Enterprise Technical Execution**:
  - Eliminated 1,200+ crawl errors, canonical loops, and indexation bottlenecks with Screaming Frog and Google Search Console.
  - Achieved **98/100 Google Lighthouse** score for B2B SaaS platform, lifting qualified demo signups by **+210%**.
  - Engineered modular **Schema.org JSON-LD structured data** (Product, Organization, FAQ, LocalBusiness) capturing high-CTR rich snippets.
  - Multi-location Local SEO securing **#1 Google Map Pack rankings across 8 major regions** (+185% calls lift).
- **Academic Foundation**:
  - **B.Sc. in Computer Science & Engineering** from Sonargaon University (Software engineering, algorithms, data structures, and web technologies).
  - Academic references from CSE Associate Professor & Head and Assistant Professor & Coordinator.

---

## 🧪 ATS Verification Results

Verified via automated PDF extraction (`pypdf`) simulating modern corporate ATS engines:

```
=== ATS PARSEABILITY VERIFICATION RESULTS ===
[PASS] Full Candidate Name: GAZI FAHIM HASAN
[PASS] Professional Role: SEO Executive & Technical SEO Specialist
[PASS] Contact Coordinates: Phone, Email, Location, Portfolio, GitHub, LinkedIn
[PASS] Quantifiable Traffic Lift (+340%)
[PASS] Top 3 Keyword Trajectory (1,500+)
[PASS] Technical Crawl Anomaly Metric (1,200+)
[PASS] Structured Education (Sonargaon University, B.Sc CSE)
[PASS] Academic References (CSE Department Head & Coordinator)
[PASS] Linear DOM flow (zero multi-column stream corruption)
[PASS] Standard Uppercase Section Headings
```

---

## 📁 Repository Structure

```
├── Gazi_Fahim_Hasan_ATS_CV.pdf           # Executive PDF with portrait
├── Gazi_Fahim_Hasan_ATS_CV_TextOnly.pdf  # Pure-text ATS PDF
├── index.html                            # Interactive CV web application & print engine
├── index_text_only.html                  # Text-only HTML template
├── styles.css                            # ATS typography, responsive layout & print styling
├── assets/
│   └── images/
│       ├── gazi-portrait.png             # High-res executive studio headshot
│       └── gazi_cv_photo.png             # Square CV crop
├── context/
│   ├── CHAT_HISTORY.md                   # Human-readable Antigravity session context
│   ├── transcript.jsonl                  # Machine-readable conversation log
│   ├── transcript_full.jsonl             # Full untruncated conversation log
│   ├── implementation_plan.md            # Architecture & implementation plan
│   └── walkthrough.md                    # Verification & visual report
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hasangazifahim/gazi-fahim-ats-cv.git
   cd gazi-fahim-ats-cv
   ```

2. **Open in browser**:
   Double click `index.html` or run:
   ```bash
   open index.html
   ```

3. **Re-compile PDFs using Headless Chrome** (macOS):
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="Gazi_Fahim_Hasan_ATS_CV.pdf" "file://$(pwd)/index.html"
   ```

---

## 📬 Contact & Portfolio

- **Portfolio**: [gazifahimhasan.com](https://gazifahimhasan.com)
- **Email**: [gazifahimhasan1@gmail.com](mailto:gazifahimhasan1@gmail.com)
- **Phone**: [+880 1857571304](tel:+8801857571304)
- **GitHub**: [@gazifahim](https://github.com/gazifahim)
- **LinkedIn**: [linkedin.com/in/gazifahimhasan](https://linkedin.com/in/gazifahimhasan)
