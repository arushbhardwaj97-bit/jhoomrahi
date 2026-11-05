# JhoomRahi (झूमराही)

> **Rehna ho, ghoomna ho, ya khaana ho — JhoomRahi ke saath.**  
> A pan-India community platform built for students and young professionals across three core verticals: **Stay** (PG/Flat/Roommate), **Travel** (trip partner finder), and **Discover** (unfiltered city guide with community ratings).

---

## 📌 Phase Status

- [x] **Phase 1: Foundation, Design System, Landing Page & Auth Flow** *(Completed)*
- [ ] **Phase 2: Stay Vertical** (Browse flats/PGs, amenity filters, detail view)
- [ ] **Phase 3: Travel Vertical** (Trip partner finder, calendar, squad detail)
- [ ] **Phase 4: Discover Vertical** (City guides, secret spots, community ratings)
- [ ] **Phase 5: Backend Auth & Member Dashboard**

---

## 🚀 How to Run

No build step, no bundlers, no npm install required. Every page runs directly in any modern web browser.

### Option 1: Direct File Open (Zero Server)
Double-click `index.html` or open it directly in Chrome, Firefox, Safari, or Edge:
```
file:///c:/Users/meena/Downloads/JhoomRahi/index.html
```

### Option 2: Local HTTP Server (Recommended)
Using Python 3:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using Node.js:
```bash
npx serve .
```

---

## 🧱 Tech Stack & Constraints

- **Markup & Layout:** HTML5 + Semantic Elements
- **Styling:** Vanilla CSS Custom Properties (CSS variables) + Tailwind CSS CDN (inline config in `<head>`)
- **Interactivity & State:** Alpine.js CDN (tabs, modals, drawers, multi-step forms)
- **Scroll Animations:** AOS (Animate On Scroll) CDN
- **Celebrations:** canvas-confetti CDN
- **Icons:** Lucide Icons CDN (jsDelivr UMD bundle) + Inline SVGs for brand icons
- **Typography:** Google Fonts — *Space Grotesk* (headings) & *Inter* (body)
- **Auth Philosophy:** Email OTP only (No costly SMS OTP, no phone number barriers, universal email access for both students and working professionals)

---

## 📁 Folder Structure

```
jhoomrahi/
├── index.html            # Landing page with asymmetric hero, pillars, listings & testimonials
├── login.html            # Split login with Email OTP verification
├── signup.html           # 3-step onboarding form with progress bar & interest chips
├── assets/
│   ├── css/
│   │   ├── style.css     # Design tokens (Light/Dark), resets, buttons, cards, pills & layout
│   │   └── animations.css# Keyframes (float, marquee, shimmer, pulse-ring) & reduced-motion
│   └── js/
│       ├── data.js       # Indian datasets: 10 cities, PGs, upcoming trips & local food spots
│       ├── api.js        # Mock API abstraction layer (USE_MOCK = true)
│       ├── main.js       # Theme toggle, typewriter, counters, toasts, confetti & route handlers
│       └── animations.js # AOS initialization & mousemove parallax controllers
└── README.md             # Project documentation & execution guide
```

---

## 🎨 Design System & Anti-AI Rules

- **Palette:**
  - Brand Indigo: `--primary: #6366f1` (`#4f46e5`)
  - Accent Lime: `--accent: #a3e635` (High-energy CTAs)
  - Travel Coral: `--coral: #fb7185` (Trip badges & countdowns)
  - Discover Amber: `--amber: #f59e0b` (Food ratings & late-night chips)
  - Light Surface: `--cream: #fafaf7` / `--surface: #ffffff`
  - Dark Surface: `--cream: #0b1120` / `--surface: #111827`
- **Asymmetry:** 60/40 hero split; Stay 2/3 + Travel 1/3 layout row; full-width Discover row.
- **Editorial Typography:** Tight letter-spacing on display headings (`-0.035em`), generous whitespace.
- **Human Microcopy:** Authentic Indian context (*"24h Geyser"*, *"RO Water"*, *"Spiti Winter Roadtrip"*, *"₹90 Unlimited Desi Thali"*, *"Zero Brokerage"*).
- **Hand-Drawn Accent:** Responsive SVG squiggle under *"ghoomna"* calibrated with `min-width: 80px` for mobile visibility at 375px.

---

## 🔐 Auth Implementation Details

1. **Email OTP Only:** Login and Signup require solely an email address.
2. **Demo Verification:** Enter any email, click "Send code", and a 6-digit OTP box appears. (Simulated code: `123456`).
3. **Multi-Step Signup Flow:**
   - **Step 1:** Email verification with 6-digit auto-advancing OTP boxes.
   - **Step 2:** Name, Indian city selection (Bengaluru, Delhi, Pune, etc.), and Role (Student / Working professional / Other).
   - **Step 3:** Profile photo preview + multi-select tribe interest tags (*Trekking*, *Foodie*, *Coding*, *Music*, *Reading*, *Travel*, *Photography*, *Sports*).
   - **Skip For Now:** Every step has an instant skip option.
   - **Completion:** Triggers confetti burst, success toast, and redirects to `index.html`.

---

## 🗺️ Next Phases Roadmap

- **Phase 2 — Stay Vertical (`stay/`):**
  - Search & filter engine (Rent slider, amenities, flatmate preferences).
  - PG & Flat listing card grid with verified photo galleries.
  - Roommate compatibility questionnaire.
- **Phase 3 — Travel Vertical (`travel/`):**
  - Weekend roadtrip and trek squad finder.
  - Slot reservation & budget-split calculator.
  - Verified co-traveler verification badges.
- **Phase 4 — Discover Vertical (`discover/`):**
  - Student & resident rated spots (Midnight chai, co-work cafes, cheap thalis).
  - Community reviews and physical scout verification checkmarks.
- **Phase 5 — Full Backend & Member Dashboard:**
  - User profile management (optional phone number addition).
  - Saved listings, booked trips, and active roommate chats.
