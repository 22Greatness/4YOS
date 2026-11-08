# 4YOS Camp

**Universal Higher-Education Learning Operating System & Practical Engineering Engine**

4YOS Camp is an autonomous, open-standard higher-education learning platform built for universal access and practical competency. It connects foundational academic computer science and data science to real-world commercial problem-solving.

---

## Key Highlights

- **53 Core Computing & Statistics Courses:** Authored from first principles (Python programming, data structures, computer architecture, discrete mathematics, statistics, cyber security, systems design).
- **Offline-First Web Edition:** Powered by SQLite WASM with OPFS/IndexedDB durable storage and Service Worker precaching.
- **Hands-On Real-World Practicals:** Authentic commercial problem statements (POS float reconciliation, SME inventory SQL, micro-lending risk scoring, USSD state machine, Paystack webhook engine).
- **Socratic Mental Model Diagnostics:** Guided feedback enforcing a strict zero-answer policy with authentic cultural analogies.
- **Sovereign Portfolio Credentials:** Cryptographic learning passport (`4YOS-PASS-*`) exported in compliance with NDPA 2023 data sovereignty standards.
- **Owner Content Workspace & Studio:** Course registry inspector, synchronized WebVTT caption editor with cue validation, and atomic staging & rollback publishing.

---

## Architecture Overview

- **Frontend App Shell:** React 19, TypeScript, Vite, Tailwind/CSS custom themes.
- **Local Engine & Isolation:** Web Worker isolation with SQLite WASM and Cross-Origin Opener/Embedder Policy (COOP/COEP) guarantees.
- **Backend Services:** Cloudflare Workers, Cloudflare D1/SQLite, Paystack subscription & webhook settlement.

---

## Quick Start (Web Edition)

### Prerequisites
- Node.js 20+

### Build & Run
```bash
# Navigate to web app
cd app

# Build the web distribution
npm run web:build

# Launch local preview server (with COOP/COEP headers)
npm run web:preview
```

Open `http://localhost:4173/` in your browser.

---

## Test Suites
```bash
# Run web automated browser suites
node app/test/web/camp-lectures.test.mjs
node app/test/web/stage-e-release.test.mjs
node app/test/web/practicals-engine.test.mjs
```

---

## License
Proprietary / All rights reserved.
