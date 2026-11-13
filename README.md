# BloodLink — Real-Time Emergency Blood Donation Network

> **"BloodLink treats the internet as a bloodstream. Every donor, hospital and blood bank is a cell moving through one connected network, and every action you take makes the whole site's heart beat. Every drop is a link in someone's lifeline."**

---

## 🩸 Project Overview

**BloodLink** is a next-generation emergency blood matching platform engineered for the state of **Karnataka, India**. Built around a living, medically inspired living bloodstream visualization, BloodLink connects voluntary donors, critical trauma units, and certified blood banks into an accountable, real-time lifeline.

---

## 🫀 The Visual Foundation: Living Bloodstream

The background of the site is an interactive, multi-layered physiological simulation running at a locked 60fps behind the application glassmorphic content:

1. **Layer 1 — Base & Aurora Blooms**: Deep Obsidian (`#120709`) base with floating crimson (`#C8102E`) and wine (`#5A0A18`) radial blurs that gently respond to mouse parallax.
2. **Layer 2 — Vein Ribbons**: Three skewed, flowing gradient ribbons mimicking continuous microvascular blood circulation.
3. **Layer 3 — Pulsing Heart Backdrop**: Anatomical SVG heart silhouette that expands to `1.15x` scale, brightens to `38%` opacity, and casts a high-luminance systolic glow when pulsed.
4. **Layer 4 — Erythrocyte Particle Simulation**: 38 depth-layered red blood cells (erythrocytes) rendered with pre-cached offscreen canvas sprites to eliminate filter blur bottlenecks. Features fluid biconcave shape, biconcave dimple shading, mouse repulsion, and radial pulse propagation.
5. **Layer 5 — Procedural ECG Waveform**: Responsive viewBox-based SVG path drawing a clinically accurate cardiac **P-QRS-T** waveform that sweeps across the screen in sync with the heartbeat.
6. **Layer 6 — Vignette & Noise Texture**: Radial falloff and SVG fractal turbulence noise overlay.

---

## ⚡ Signature Interaction: The Cardiac Pulse

Every life-saving action on the platform triggers a synchronized cardiac pulse across the entire application:
* **Initial Page Load**: Automatic cardiac cadence every 4 seconds.
* **Donor Pledge (*"I Can Donate"*)**: Increments units with confetti burst and cardiac pulse.
* **Emergency SOS Submission**: Triggers a 2-second donor broadcast wave with expanding ripple rings.
* **Voluntary Donor Registration**: Onboarding complete with downloadable digital donor credentials.
* **Manual Pulse**: Available in the top navigation bar.

---

## 🌟 Implemented Features & Sections

| # | Section | ID | Background Variant | Features |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Sticky Navbar** | — | — | Centered glass pill, heartbeat droplet logo, smooth-scroll links, active section highlighter, SOS emergency button, and a thin scroll-progress "vein" line. |
| 2 | **Hero** | `#home` | `bloodstream` | Eyebrow status badge, Sora 800 gradient headline (*"When every minute matters, find a lifeline."*), Quick Finder card for 8 blood groups + district selection, and count-up stats. |
| 3 | **Find a Donor** | `#find-donor` | `aurora` | 40 mock Karnataka voluntary donors with instant filtering (groups, cities, availability, distance slider), contact request modal, dark geo-scatter map, and **Interactive Red Cell Compatibility Explorer**. |
| 4 | **Urgent Requests** | `#urgent` | `bloodstream` | 8 real-time clinical requests with live countdown timers, urgency badges, pledge progress bars, confetti celebration, case details modal, and Web Share API integration. |
| 5 | **Emergency SOS Modal** | — | — | Emergency broadcast modal with 2-second donor alert animation counting to 12 with expanding pulse rings. Persists to local storage. |
| 6 | **Become a Donor** | `#become-donor` | `aurora` | 3-step interactive onboarding wizard with health checks, donation interval calculation (90 days male / 120 days female), and generated **Downloadable Digital Donor ID Card (PNG)**. |
| 7 | **Blood Bank Network** | `#blood-banks` | `minimal` | 12 certified Karnataka blood facilities with license numbers, live Open/Closed status, 8 mini stock bars (A+ to O-) color-coded by adequacy, and direct OSM navigation links. |
| 8 | **Donation Awareness** | `#learn` | `minimal` | Instant "Am I Eligible?" mini-quiz, animated 4-step vertical donation journey, and 6 interactive 3D flip cards for Myths vs Facts. |
| 9 | **Our Impact & Take Action** | `#impact`, `#take-action` | `bloodstream` | Count-up metrics, "1 donation = up to 3 lives" split animation, monthly trend chart, 12-district community pulse, shareable social awareness badge generator, and urgent alert subscription. |
| 10 | **Footer** | — | `minimal` | Mock 24/7 emergency helpline (`1800-000-BLOOD`), Karnataka healthcare node info, and prototype disclosure. |

---

## 🛠️ Tech Stack & Architecture

* **Framework**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS with custom BloodLink design tokens
* **Icons**: Lucide React
* **Visual Effects**: HTML5 Canvas, SVG, Canvas Confetti (`canvas-confetti`), `html-to-image`
* **Fonts**: Sora (700/800) & Inter (400/500/600) via Google Fonts
* **AI Tools Utilized**: SuperDesign, Antigravity, Claude

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview compiled build
npm run preview
```

Local static server is live on: **`http://localhost:5500/`**
