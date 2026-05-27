# Product Requirements Document
## Altair Attic — Smart Home Automation Landing Page

**Version:** 1.1  
**Date:** May 26, 2026  
**Author:** PM — Altair Attic Product Team  
**Status:** Draft for Review  
**Tech Stack:** React · TypeScript · Tailwind CSS · Iconify

---

## 1. Executive Summary

Altair Attic Limited offers Smart Home Automation as one of its core service verticals. This document defines the requirements for a dedicated single-page marketing website that positions Altair Attic as the go-to smart home automation provider in Nigeria. The page must convert visitors into leads by showcasing capability, social proof, and a clear contact path — all within a polished, dual-mode (light/dark) brand experience that is consistent with the parent brand.

---

## 2. Business Objectives

| # | Objective | Success Metric |
|---|-----------|---------------|
| 1 | Generate qualified leads for smart home projects | ≥ 15 contact form submissions/month |
| 2 | Establish brand credibility in the Nigerian market | ≥ 3 min average session duration |
| 3 | Showcase past projects to reduce sales cycle | Bounce rate < 50% |
| 4 | Reflect Altair Attic brand identity consistently | Design QA sign-off by stakeholders |

---

## 3. Target Audience

- **Primary:** Homeowners and property developers in Nigeria (Lagos, Abuja, Abeokuta) planning new builds or renovations
- **Secondary:** Corporate clients, hospitality businesses, and real-estate developers seeking integrated smart building systems
- **Tertiary:** Potential investors or tech-savvy users exploring IoT capability in the Nigerian market

---

## 4. Brand & Design Tokens

Confirmed brand colours provided by Altair Attic. All UI decisions must stay within this palette — no additional colours introduced without stakeholder approval.

### 4.1 Colour Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Brand Primary** | Azure Blue | `#0066CC` | CTAs, active nav, highlights, links, hover accents |
| **Brand Primary Hover** | Deep Azure | `#0052A3` | Hover/pressed state of primary blue (10% darken) |
| **Brand Primary Light** | Sky Tint | `#E6F0FA` | Light-mode badge backgrounds, section tints, input focus ring |
| **Surface Light** | White | `#FFFFFF` | Light mode page background, card backgrounds |
| **Surface Light 2** | Off-White | `#F9F9F9` | Alternating section backgrounds (light mode) |
| **Surface Dark** | Black | `#000000` | Dark mode page background |
| **Surface Dark 2** | Rich Dark | `#0D0D0D` | Dark mode card/nav backgrounds |
| **Surface Dark 3** | Dark Ash | `#1A1A1A` | Dark mode alternating sections, elevated surfaces |
| **Text Primary Light** | Black | `#000000` | Light mode headings and body text |
| **Text Primary Dark** | White | `#FFFFFF` | Dark mode headings and body text |
| **Text Muted Light** | Grey 500 | `#6B6B6B` | Light mode captions, subtitles, helper text |
| **Text Muted Dark** | Grey 400 | `#9E9E9E` | Dark mode captions, subtitles, helper text |
| **Border Light** | Grey 200 | `#E0E0E0` | Light mode dividers, card borders |
| **Border Dark** | Grey 800 | `#2E2E2E` | Dark mode dividers, card borders |
| **Success** | Green 600 | `#16A34A` | Form success states, status indicators |
| **Warning** | Amber 500 | `#F59E0B` | Alerts, warnings |
| **Error** | Red 600 | `#DC2626` | Form validation errors |

> **Colour rule:** The palette is intentionally minimal — Azure Blue (`#0066CC`) is the single accent colour. Black and White anchor the contrast system. `#F9F9F9` provides breathing room between sections in light mode. Dark mode uses black as the base, not dark blue or slate.

### 4.2 Tailwind Custom Token Config

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        primary:  '#0066CC',
        hover:    '#0052A3',
        light:    '#E6F0FA',
      },
      surface: {
        light:    '#FFFFFF',
        'light-2':'#F9F9F9',
        dark:     '#000000',
        'dark-2': '#0D0D0D',
        'dark-3': '#1A1A1A',
      },
    },
  },
}
```

### 4.3 Typography (recommended system)

| Role | Font | Weight |
|------|------|--------|
| Display / Hero | Clash Display / DM Sans | 700 |
| Headings | DM Sans | 600 |
| Body | Inter / Outfit | 400 / 500 |
| Mono / Labels | JetBrains Mono | 400 |

### 4.4 Design Principles

- **High-contrast, clean aesthetic** — Black/White core with Azure Blue as the single punchy accent; avoids colour noise
- **Light mode:** `#FFFFFF` primary surface · `#F9F9F9` alternating sections · `#000000` text · `#0066CC` CTAs
- **Dark mode:** `#000000` primary surface · `#1A1A1A` alternating sections · `#FFFFFF` text · `#0066CC` CTAs (same blue — it pops on both modes)
- No gradients on backgrounds — blue reserved for interactive elements and key highlights only
- Glassmorphism used sparingly on dark surfaces only (`backdrop-blur`, `#FFFFFF10` fill)
- Sharp, clean geometry — radius capped at `rounded-xl`; prefer `rounded-lg` for cards
- Motion: subtle scroll-triggered fade-ins, hover lifts on cards, smooth mode toggle (`duration-300`)

---

## 5. Site Architecture (Single Page)

```
/ (root — single scrollable page)
├── #home          → Hero section
├── #projects      → Portfolio/Case Studies
├── #testimonials  → Social Proof
├── #about         → About Altair Attic (Smart Home division context)
└── #contact       → Lead Capture Form
```

---

## 6. Section-by-Section Requirements

### 6.1 Navigation (Sticky)

**Description:** Persistent top nav, transitions between transparent-over-hero and solid on scroll.

**Requirements:**
- Logo (Altair Attic wordmark + icon) — left aligned
- Nav links: Home · Projects · Testimonials · About · Contact — centre or right
- Light/Dark mode toggle (Iconify: `ph:sun-bold` / `ph:moon-bold`) — far right
- Mobile: collapsible hamburger menu (`ph:list-bold`)
- Smooth scroll to anchor on link click
- Active section highlighted in nav (Intersection Observer)

**Behaviour:**
- `bg-transparent` when at top of hero → `bg-slate-900/80 backdrop-blur` (dark) or `bg-white/80 backdrop-blur` (light) on scroll
- Transition: 300ms ease

---

### 6.2 Hero — #home

**Goal:** Immediately communicate value proposition and drive CTA clicks.

**Content:**
- **Eyebrow tag:** `Smart Home Automation`
- **Headline:** *"Your Home. Intelligent. Effortless."* (or stakeholder-approved copy)
- **Sub-copy:** 2–3 lines on what Altair Attic automates — lighting, security, climate, access control, energy management in Nigerian homes
- **Primary CTA:** `Get a Free Consultation` → scrolls to #contact
- **Secondary CTA:** `See Our Projects` → scrolls to #projects
- **Visual:** Animated SVG or Lottie of a smart home blueprint / device network, OR a cinematic dark background with floating IoT device icons
- **Trust bar:** Logos/badges — "100% Nigerian-built" · "IoT Certified" · "5+ Years Experience"

**Design Notes:**
- Full-viewport height (`min-h-screen`)
- Light mode: `#FFFFFF` or `#F9F9F9` base background; blue underline/accent on headline keyword
- Dark mode: `#000000` base; subtle `#0066CC` glow or left-border accent on headline
- Hero text animates in (stagger, slide-up)

---

### 6.3 Projects — #projects

**Goal:** Build credibility through real-world deployments.

**Content:**
- Section heading: *"Smart Spaces We've Built"*
- 3–6 project cards (grid, 2–3 columns on desktop, 1 on mobile)
- Each card: Project image / illustration · Location tag · Project name · Short description · Tech stack chips · `View Details` link (optional modal or expand)

**Sample Projects (placeholder):**
1. Residential smart villa — Abeokuta (lighting + security + climate)
2. Corporate office automation — Lagos (access control + energy)
3. Serviced apartment complex — Ibadan (multi-unit management)

**Design Notes:**
- Light mode: white cards on `#F9F9F9` section background; `#E0E0E0` border
- Dark mode: `#0D0D0D` cards on `#000000` background; `#2E2E2E` border
- Hover: lift + blue border glow (`box-shadow: 0 0 0 2px #0066CC`)
- Iconify icons for tech chips: `mdi:zigbee`, `mdi:wifi`, `ph:cpu-bold`, etc.

---

### 6.4 Testimonials — #testimonials

**Goal:** Social proof to overcome trust barriers.

**Content:**
- Section heading: *"What Our Clients Say"*
- 3–5 testimonial cards with: quote · client name · title/location · star rating
- Optional: auto-scrolling carousel on mobile

**Design Notes:**
- Quote icon: `ph:quotes-bold` (Azure Blue `#0066CC`)
- Star rating: `ph:star-fill` (Amber `#F59E0B`)
- Light mode: white cards on `#F9F9F9`; Dark mode: `#1A1A1A` cards on `#000000`
- Cards in a horizontal scroll or masonry grid

---

### 6.5 About — #about

**Goal:** Humanise the brand and establish authority for the smart home vertical.

**Content:**
- Heading: *"Why Altair Attic?"*
- Short paragraph: Altair Attic's story, mission, and why smart home automation is a core pillar
- 3–4 stat blocks: `50+ Homes Automated` · `5 Years in IoT` · `98% Client Satisfaction` · `100% Nigerian Team`
- Feature pillars (icon + title + text, 3-column grid):
  - `ph:lightning-bold` — Rapid Installation
  - `ph:shield-check-bold` — Secure & Reliable Systems
  - `ph:sliders-bold` — Fully Customisable
  - `ph:headset-bold` — Ongoing Support

**Design Notes:**
- Stats animated via counter on scroll-enter; stat numbers in `#0066CC`
- Thin blue (`#0066CC`) horizontal rule between stat and pillar sections

---

### 6.6 Contact — #contact

**Goal:** Convert visitors to leads.

**Content:**
- Heading: *"Let's Automate Your Space"*
- Sub-copy: "Fill the form and our team will reach out within 24 hours."
- Form fields:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional, Nigerian format)
  - Type of Property: Residential / Commercial / Industrial (radio/select)
  - Message / Project Brief (textarea)
  - `Send Message` button (primary CTA, full-width on mobile)
- Alongside form (2-col desktop):
  - Email: hello@altairattic.com
  - Location: Abeokuta, Ogun State, Nigeria
  - Social links (Iconify): `mdi:twitter` · `mdi:linkedin` · `mdi:instagram` · `mdi:whatsapp`

**Behaviour:**
- Client-side validation (required fields, email format)
- Success toast notification on submit
- Error handling with inline field messages

---

### 6.7 Footer

**Content:**
- Logo + tagline: *"Building the engine for your vision."*
- Quick links (same anchors as nav)
- Legal: `© 2026 Altair Attic Limited. All rights reserved.`
- Link back to parent site: `altairattic.com`

---

## 7. Theme / Dark-Light Mode

| Aspect | Specification |
|--------|--------------|
| Default | System preference (`prefers-color-scheme`) |
| Toggle | Persisted in `localStorage` |
| Implementation | Tailwind `dark:` variant with `class` strategy (`darkMode: 'class'` in `tailwind.config`) |
| Transition | `transition-colors duration-300` on root element |
| Icon | Sun (light mode active) / Moon (dark mode active) via Iconify |

---

## 8. Technical Requirements

| Requirement | Detail |
|-------------|--------|
| Framework | React 18+ with TypeScript (strict mode) |
| Styling | Tailwind CSS v3+ (`darkMode: 'class'`) |
| Icons | Iconify (`@iconify/react`) — Phosphor & Material Design icon sets |
| Fonts | Google Fonts or Fontsource (self-hosted preferred) |
| Routing | None — single page, anchor-based navigation |
| Animations | Framer Motion or CSS transitions (`@keyframes`) |
| Form handling | React state + optional EmailJS / Formspree for submission |
| Scroll behaviour | `scroll-behavior: smooth` + Intersection Observer for nav highlighting |
| Performance | Lighthouse score ≥ 90 (Performance, Accessibility, SEO) |
| Responsiveness | Mobile-first; breakpoints: `sm` (640px) · `md` (768px) · `lg` (1024px) · `xl` (1280px) |
| Accessibility | WCAG 2.1 AA — ARIA labels, keyboard nav, colour contrast ≥ 4.5:1 |
| SEO | Meta tags, OG tags, structured data (LocalBusiness schema) |

---

## 9. Component Breakdown

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── StatBlock.tsx
│   │   ├── FeaturePillar.tsx
│   │   └── ThemeToggle.tsx
│   └── shared/
│       └── SectionWrapper.tsx
├── hooks/
│   ├── useTheme.ts
│   └── useActiveSection.ts
├── data/
│   ├── projects.ts
│   ├── testimonials.ts
│   └── about.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 10. Milestones & Scope

| Phase | Scope | Est. Duration |
|-------|-------|--------------|
| **Phase 1 — Setup** | Project scaffold, Tailwind config, theme system, Navbar, Footer | 1 day |
| **Phase 2 — Core Sections** | Hero, Projects, Testimonials | 2 days |
| **Phase 3 — Remaining Sections** | About, Contact (with form logic) | 1–2 days |
| **Phase 4 — Polish** | Animations, responsive QA, dark/light QA, accessibility audit | 1 day |
| **Phase 5 — Deploy** | Build, SEO meta, deploy to Vercel / Netlify | 0.5 day |

**Total estimated:** ~5–6 working days (solo developer)

---

## 11. Out of Scope (v1)

- Multi-language support (i18n)
- CMS integration (content is static / hardcoded in `data/`)
- Backend API / database
- User authentication
- Blog or resource hub
- E-commerce / payment flow

---

