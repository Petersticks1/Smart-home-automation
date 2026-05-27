# Build Prompt — Altair Attic Smart Home Automation Landing Page
> Copy everything below this line and paste it into Antigravity AI as your build instruction.

---

## ROLE & OBJECTIVE

You are a senior React/TypeScript developer. Build a complete, production-ready **single-page marketing website** for **Altair Attic Limited** — specifically for their **Smart Home Automation** service. The output must be a single `App.tsx` entry point that composes all sections, with supporting component files as needed. Every line of code must be clean, typed, and immediately runnable.

---

## TECH STACK — DO NOT DEVIATE

- **React** with **TypeScript** (strict mode, no `any` types)
- **Tailwind CSS** — `darkMode: 'class'` strategy
- **Iconify** via `@iconify/react` — use Phosphor (`ph:`) and Material Design (`mdi:`) icon sets
- **Framer Motion** for scroll-triggered animations and entrance effects
- **No React Router** — single page, anchor `#id` scroll navigation only
- **No external UI libraries** (no shadcn, no MUI, no Chakra) — Tailwind only
- Fonts loaded via Google Fonts `<link>` in `index.html`: **DM Sans** (headings) + **Outfit** (body)

---

## TAILWIND CONFIG

Update `tailwind.config.ts` with these exact custom tokens before writing any component:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0066CC',
          hover:   '#0052A3',
          light:   '#E6F0FA',
        },
        surface: {
          light:    '#FFFFFF',
          'light-2':'#F9F9F9',
          dark:     '#000000',
          'dark-2': '#0D0D0D',
          'dark-3': '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

---

## COLOUR RULES — STRICTLY ENFORCED

| Token | Hex | When to use |
|-------|-----|-------------|
| `brand-primary` | `#0066CC` | All CTAs, active nav links, focus rings, icon accents, stat numbers, quote icons, hover borders |
| `brand-hover` | `#0052A3` | Hover/active state of any brand-primary element |
| `brand-light` | `#E6F0FA` | Badge backgrounds, input focus ring tint (light mode only) |
| `surface-light` | `#FFFFFF` | Light mode page background, card backgrounds |
| `surface-light-2` | `#F9F9F9` | Alternating section backgrounds in light mode |
| `surface-dark` | `#000000` | Dark mode page background |
| `surface-dark-2` | `#0D0D0D` | Dark mode card and nav backgrounds |
| `surface-dark-3` | `#1A1A1A` | Dark mode alternating section backgrounds |
| `#000000` | — | Light mode text (headings + body) |
| `#FFFFFF` | — | Dark mode text (headings + body) |
| `#6B6B6B` | — | Muted/caption text in light mode |
| `#9E9E9E` | — | Muted/caption text in dark mode |
| `#E0E0E0` | — | Borders and dividers in light mode |
| `#2E2E2E` | — | Borders and dividers in dark mode |

**Hard rules:**
- `#0066CC` is the ONLY accent/highlight colour — no purple, no teal, no orange accents
- No gradient backgrounds on any section
- No `slate-*` or `gray-*` Tailwind utilities — use the custom tokens above exclusively
- Glassmorphism (`backdrop-blur`, `bg-white/5`) only on dark mode card surfaces

---

## FILE STRUCTURE

Generate all files in this exact structure:

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

## HOOKS

### `useTheme.ts`
- Reads `localStorage` key `'theme'` on mount; falls back to `window.matchMedia('prefers-color-scheme: dark')`
- Applies/removes `'dark'` class on `document.documentElement`
- Persists preference to `localStorage` on toggle
- Returns `{ theme, toggleTheme }` where `theme` is `'light' | 'dark'`

### `useActiveSection.ts`
- Uses `IntersectionObserver` with `threshold: 0.5` to watch all section elements (`#home`, `#projects`, `#testimonials`, `#about`, `#contact`)
- Returns the currently visible section id as a string
- Used by `Navbar` to highlight the active nav link

---

## COMPONENT SPECIFICATIONS

### `SectionWrapper.tsx`
Reusable wrapper for all sections. Props: `id: string`, `className?: string`, `children: ReactNode`. Applies `scroll-mt-20` for sticky nav offset. Wraps children in a `<section>` tag with the given id.

### `ThemeToggle.tsx`
- Icon button — shows `ph:sun-bold` when dark mode is active, `ph:moon-bold` when light mode is active
- Smooth icon swap with a 200ms opacity transition
- `aria-label` that reflects current action ("Switch to light mode" / "Switch to dark mode")

### `Button.tsx`
Two variants:
- `primary` — `bg-brand-primary text-white hover:bg-brand-hover` with `rounded-lg px-6 py-3 font-display font-semibold transition-colors duration-200`
- `outline` — `border border-brand-primary text-brand-primary hover:bg-brand-light dark:hover:bg-white/10` with same padding and radius

---

## NAVBAR — `Navbar.tsx`

**Behaviour:**
- Position: `fixed top-0 left-0 right-0 z-50`
- At scroll position 0: `bg-transparent`
- On scroll > 10px: light mode → `bg-white/90 backdrop-blur-md border-b border-[#E0E0E0]`; dark mode → `bg-black/90 backdrop-blur-md border-b border-[#2E2E2E]`
- Transition: `transition-all duration-300`

**Layout:**
- Left: Text logo — `Altair Attic` in `font-display font-bold text-xl` with a small `ph:house-line-bold` Iconify icon in `#0066CC` beside it
- Centre/Right: Nav links — `Home · Projects · Testimonials · About · Contact`
- Far right: `ThemeToggle` component

**Nav links:**
- `<a href="#sectionid">` with smooth scroll (CSS `scroll-behavior: smooth` on `html`)
- Active link: `text-brand-primary font-semibold border-b-2 border-brand-primary`
- Inactive link: `text-black dark:text-white hover:text-brand-primary transition-colors duration-200`

**Mobile (below `md`):**
- Hamburger icon: `ph:list-bold` — toggles a full-width dropdown menu below the nav bar
- Dropdown: `bg-white dark:bg-surface-dark-2 border-b border-[#E0E0E0] dark:border-[#2E2E2E]` with stacked nav links
- Close icon: `ph:x-bold`

---

## HERO SECTION — `Hero.tsx` (`#home`)

**Layout:** Full viewport height (`min-h-screen`), vertically centred content, two-column on desktop (text left, visual right), stacked on mobile.

**Content — Left column:**
- Eyebrow pill tag: `Smart Home Automation` — `bg-brand-light text-brand-primary dark:bg-white/10 dark:text-white text-sm font-semibold px-4 py-1 rounded-full`
- Headline: `"Your Home. Intelligent. Effortless."` — `font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight`; the word `"Intelligent"` is styled in `text-brand-primary`
- Sub-copy (2–3 lines): `"We automate lighting, security, climate, access control, and energy management — building smarter Nigerian homes from Abeokuta to Lagos."`— `text-[#6B6B6B] dark:text-[#9E9E9E] text-lg leading-relaxed mt-4`
- CTA row (gap-4, flex-wrap): `Button primary` labelled `"Get a Free Consultation"` linking to `#contact`; `Button outline` labelled `"See Our Projects"` linking to `#projects`
- Trust bar below CTAs (flex row, gap-6, mt-10): three badge pills each with a `ph:check-circle-bold` icon in `#0066CC`:
  - `100% Nigerian-Built`
  - `IoT Certified`
  - `5+ Years Experience`

**Content — Right column:**
- Animated SVG illustration of a house floor plan with nodes representing smart devices (lights, thermostat, camera, lock, speaker) connected by thin lines
- Nodes pulse with a subtle `scale` animation using Framer Motion (`animate={{ scale: [1, 1.1, 1] }}`, `transition={{ repeat: Infinity, duration: 2, staggerChildren: 0.3 }}`)
- SVG stroke colour: `#0066CC`; background: transparent

**Entrance animation (Framer Motion):**
- Eyebrow tag: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, delay 0.1s
- Headline: delay 0.2s
- Sub-copy: delay 0.3s
- CTA buttons: delay 0.4s
- Trust bar: delay 0.5s
- Right SVG: `initial={{ opacity: 0, x: 40 }}` → `animate={{ opacity: 1, x: 0 }}`, delay 0.3s

**Background:**
- Light mode: `bg-surface-light`
- Dark mode: `bg-surface-dark`
- Subtle dot-grid pattern via `background-image: radial-gradient(#0066CC22 1px, transparent 1px)` at `background-size: 28px 28px` as a CSS class in `index.css` named `.dot-grid`; apply to the hero section

---

## PROJECTS SECTION — `Projects.tsx` (`#projects`)

**Background:** `bg-surface-light-2 dark:bg-surface-dark`

**Heading block (centred):**
- Label: `"Our Work"` — small uppercase tracking-widest text in `text-brand-primary`
- Heading: `"Smart Spaces We've Built"` — `font-display font-bold text-4xl`
- Sub: `"Real deployments across Nigeria — residential, commercial, and industrial."` — muted text

**Grid:** 3 columns on `lg`, 2 on `md`, 1 on `sm` — `gap-6`

**Project data** (hardcode in `data/projects.ts`):

```ts
export const projects = [
  {
    id: 1,
    name: 'Adekunle Smart Villa',
    location: 'Abeokuta, Ogun State',
    description: 'Full smart home deployment covering automated lighting scenes, facial-recognition access control, climate scheduling, and a centralised mobile dashboard.',
    tags: ['Lighting', 'Security', 'Climate', 'IoT'],
    icons: ['ph:lightbulb-bold', 'ph:shield-check-bold', 'ph:thermometer-bold', 'mdi:wifi'],
    gradient: '#0066CC',
  },
  {
    id: 2,
    name: 'TechBridge Corporate HQ',
    location: 'Lagos Island, Lagos',
    description: 'Office-wide automation: smart card + biometric access control, energy monitoring dashboards, automated meeting room management, and occupancy sensors.',
    tags: ['Access Control', 'Energy', 'Sensors'],
    icons: ['ph:fingerprint-bold', 'ph:lightning-bold', 'mdi:motion-sensor'],
    gradient: '#0066CC',
  },
  {
    id: 3,
    name: 'GreenLeaf Serviced Apartments',
    location: 'Ibadan, Oyo State',
    description: 'Multi-unit smart apartment management — per-unit climate and lighting control, centralised security monitoring, and automated utility billing integration.',
    tags: ['Multi-Unit', 'Climate', 'Monitoring'],
    icons: ['ph:buildings-bold', 'ph:thermometer-bold', 'ph:eye-bold'],
    gradient: '#0066CC',
  },
]
```

**`ProjectCard.tsx`:**
- `bg-white dark:bg-surface-dark-2 border border-[#E0E0E0] dark:border-[#2E2E2E] rounded-xl p-6`
- Top: Location badge — `text-brand-primary text-xs font-semibold uppercase tracking-wide` with `ph:map-pin-bold` icon
- Project name: `font-display font-bold text-xl mt-2`
- Description: muted text, `text-sm leading-relaxed mt-2`
- Tag chips row: each chip — `bg-brand-light dark:bg-white/10 text-brand-primary dark:text-white text-xs px-3 py-1 rounded-full flex items-center gap-1` with the corresponding Iconify icon
- Hover: `hover:-translate-y-1 hover:shadow-lg hover:border-brand-primary transition-all duration-300` — the border glow uses `shadow-[0_0_0_2px_#0066CC]` on hover via a Tailwind arbitrary value or inline style
- Framer Motion: `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 30 }`, `viewport={{ once: true }}`, stagger delay by card index × 0.1s

---

## TESTIMONIALS SECTION — `Testimonials.tsx` (`#testimonials`)

**Background:** `bg-white dark:bg-surface-dark-3`

**Heading block (centred):**
- Label: `"Testimonials"` in brand blue, uppercase
- Heading: `"What Our Clients Say"`

**Testimonial data** (hardcode in `data/testimonials.ts`):

```ts
export const testimonials = [
  {
    id: 1,
    quote: 'Altair Attic transformed our home completely. Controlling everything from my phone — lights, AC, the gate — still feels like magic every morning.',
    name: 'Adebayo Okonkwo',
    title: 'Homeowner',
    location: 'Abeokuta',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Our office energy bills dropped by 30% in the first quarter after the automation system was installed. The ROI speaks for itself.',
    name: 'Chidinma Eze',
    title: 'Facilities Manager',
    location: 'Lagos',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Professional team, clean installation, and the after-support has been excellent. They genuinely care about getting it right.',
    name: 'Emeka Nwosu',
    title: 'Property Developer',
    location: 'Ibadan',
    rating: 5,
  },
]
```

**`TestimonialCard.tsx`:**
- `bg-[#F9F9F9] dark:bg-surface-dark-2 border border-[#E0E0E0] dark:border-[#2E2E2E] rounded-xl p-6`
- Top-left: `ph:quotes-bold` icon in `text-brand-primary text-3xl`
- Quote text: `text-base leading-relaxed text-[#000000] dark:text-white mt-3 italic`
- Star rating row: map `rating` stars using `ph:star-fill` in `text-[#F59E0B]`
- Bottom row: avatar placeholder (circle with initials, `bg-brand-light text-brand-primary font-bold`) + name (`font-semibold`) + title & location (muted text, smaller)
- Layout: 3-column grid on `lg`, 1-column on mobile; on mobile add horizontal scroll snap (`overflow-x-auto snap-x snap-mandatory flex gap-4` with each card `snap-center min-w-[85vw]`)
- Framer Motion: `whileInView` fade-in, staggered by index

---

## ABOUT SECTION — `About.tsx` (`#about`)

**Background:** `bg-[#F9F9F9] dark:bg-surface-dark`

**Layout:** Two-column on desktop — left column text + stats, right column feature pillars.

**Left column content:**
- Label: `"About Us"` in brand blue, uppercase
- Heading: `"Why Altair Attic?"`
- Body paragraph: `"We are a Nigerian technology company based in Abeokuta, Ogun State. Smart home automation is not just a service for us — it is our commitment to making intelligent living accessible to every Nigerian household and business. From a single room to an entire estate, we design, install, and support systems that work reliably in the Nigerian environment."`

**Stat blocks** (in `data/about.ts`, rendered by `StatBlock.tsx`):

```ts
export const stats = [
  { value: 50, suffix: '+', label: 'Homes Automated' },
  { value: 5,  suffix: '+', label: 'Years in IoT' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 100,suffix: '%', label: 'Nigerian Team' },
]
```

- `StatBlock.tsx`: displays stat number animated via `useEffect` + `setInterval` counter from 0 to value on mount (or when in view); number in `text-4xl font-display font-bold text-brand-primary`; label in muted text
- Stats arranged in a 2×2 grid below the paragraph
- A `1px border-t border-brand-primary w-16` rule sits between paragraph and stats

**Right column — Feature Pillars** (from `data/about.ts`):

```ts
export const pillars = [
  { icon: 'ph:lightning-bold',      title: 'Rapid Installation',       description: 'Minimal disruption. Most residential installs completed within 2–5 days.' },
  { icon: 'ph:shield-check-bold',   title: 'Secure & Reliable',        description: 'Enterprise-grade encryption on all devices. Local processing keeps your data in your home.' },
  { icon: 'ph:sliders-bold',        title: 'Fully Customisable',       description: 'No cookie-cutter packages. Every system is designed around how you actually live.' },
  { icon: 'ph:headset-bold',        title: 'Ongoing Support',          description: '12-month warranty on all installations plus a dedicated support line.' },
]
```

- `FeaturePillar.tsx`: `flex gap-4 items-start`; icon in a `w-10 h-10 bg-brand-light dark:bg-white/10 rounded-lg flex items-center justify-center text-brand-primary text-xl` box; title `font-display font-semibold text-base`; description muted text `text-sm`
- Pillars stacked vertically in 2×2 grid on desktop, single column on mobile
- Framer Motion `whileInView` fade-in, each pillar staggered 0.1s

---

## CONTACT SECTION — `Contact.tsx` (`#contact`)

**Background:** `bg-white dark:bg-surface-dark-2`

**Layout:** Two-column on `lg` — form (right, wider) + contact info (left).

**Left column — Contact Info:**
- Heading: `"Let's Automate Your Space"`
- Sub-copy: `"Fill the form and our team will reach out within 24 hours."`
- Info rows (icon + text):
  - `ph:envelope-bold` → `hello@altairattic.com`
  - `ph:map-pin-bold` → `Abeokuta, Ogun State, Nigeria`
- Social icons row (each wrapped in `<a target="_blank">`):
  - `mdi:whatsapp` — link to `https://wa.me/234XXXXXXXXXX`
  - `mdi:linkedin` — placeholder href
  - `mdi:instagram` — placeholder href
  - `mdi:twitter` — placeholder href
  - Each icon: `text-2xl text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200`

**Right column — Form:**

Use React controlled components (`useState`) — no `<form>` action attribute, handle submit via `handleSubmit` function.

Fields:
1. `Full Name` — `type="text"` required
2. `Email Address` — `type="email"` required
3. `Phone Number` — `type="tel"` optional, placeholder `"+234 800 000 0000"`
4. `Type of Property` — `<select>` with options: `Select type...` (disabled default), `Residential`, `Commercial`, `Industrial`
5. `Project Brief` — `<textarea rows={4}>`

**Input styles:**
```
w-full px-4 py-3 rounded-lg border border-[#E0E0E0] dark:border-[#2E2E2E]
bg-white dark:bg-surface-dark-3 text-black dark:text-white
placeholder:text-[#6B6B6B] dark:placeholder:text-[#9E9E9E]
focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
transition duration-200
```

**Validation:** On submit, check required fields. If invalid, set per-field error state and show `text-[#DC2626] text-xs mt-1` error message beneath the field.

**Submit button:** Full-width `Button primary` with label `"Send Message"`. On submit success (simulate with `setTimeout` 1000ms), show a green toast notification (fixed bottom-right, `bg-[#16A34A] text-white px-6 py-3 rounded-lg shadow-lg`) saying `"Message sent! We'll be in touch within 24 hours."` — auto-dismiss after 4 seconds.

---

## FOOTER — `Footer.tsx`

**Background:** `bg-[#000000] text-white` in both modes (footer always dark).

**Layout:**
- Top row: Logo left (`Altair Attic` wordmark + `ph:house-line-bold` in `#0066CC`) + nav links right (same anchors, white text, `hover:text-brand-primary`)
- Divider: `border-t border-[#2E2E2E] my-6`
- Bottom row: `© 2026 Altair Attic Limited. All rights reserved.` left · `Visit altairattic.com →` right as an `<a href="https://altairattic.com" target="_blank" rel="noopener">` in `text-brand-primary hover:text-brand-hover`

---

## `App.tsx`

Compose all sections in order:

```tsx
<Navbar />
<main>
  <Hero />        {/* #home */}
  <Projects />    {/* #projects */}
  <Testimonials />{/* #testimonials */}
  <About />       {/* #about */}
  <Contact />     {/* #contact */}
</main>
<Footer />
```

Apply `font-body` to the root `<div>` and ensure `transition-colors duration-300` is on `<body>` or the root wrapper to smooth theme switches.

---

## `index.css`

Add these global styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-body;
}

.dot-grid {
  background-image: radial-gradient(#0066CC22 1px, transparent 1px);
  background-size: 28px 28px;
}
```

---

## ANIMATIONS — GLOBAL RULES

- All scroll-triggered animations use Framer Motion `whileInView` with `viewport={{ once: true, margin: '-80px' }}`
- Default entrance: `initial={{ opacity: 0, y: 24 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5, ease: 'easeOut' }}`
- Stagger children using `delay: index * 0.1` on individual items
- Respect `prefers-reduced-motion`: wrap animations in a check — if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip initial/animate variants
- No looping animations except the hero SVG node pulse

---

## RESPONSIVENESS CHECKLIST

Every section must pass at these breakpoints:
- `375px` — iPhone SE (single column everything, CTAs stacked)
- `768px` — tablet (2-column grid for cards)
- `1280px` — desktop (full 3-column grid, 2-column form layout)

Navbar collapses to hamburger at `md` (768px) and below.

---

## ACCESSIBILITY REQUIREMENTS

- All interactive elements have `focus-visible:ring-2 focus-visible:ring-brand-primary`
- All Iconify icons used as standalone buttons include `aria-label`
- All images and SVGs include `alt` attributes
- Form labels are explicitly associated with inputs via `htmlFor` / `id`
- Colour contrast for all text meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)

---

## SEO — `index.html` `<head>`

Ensure `index.html` includes:

```html
<title>Smart Home Automation Nigeria | Altair Attic Limited</title>
<meta name="description" content="Nigeria's leading smart home automation company. Altair Attic designs and installs intelligent lighting, security, climate, and access control systems for homes and businesses across Nigeria." />
<meta name="keywords" content="smart home automation Nigeria, home automation Abeokuta, IoT Nigeria, intelligent home Lagos, smart lighting Nigeria" />
<meta property="og:title" content="Smart Home Automation | Altair Attic Limited" />
<meta property="og:description" content="We automate Nigerian homes and businesses — lighting, security, climate, and more." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#0066CC" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## DELIVERABLES EXPECTED

Generate all files in the structure listed above. Each file must:
1. Be fully complete — no `// TODO` placeholders
2. Use only the colour tokens defined in this prompt — no arbitrary colours outside the palette
3. Be immediately runnable with `npm install && npm run dev` after adding dependencies:
   - `framer-motion`
   - `@iconify/react`

Start with `tailwind.config.ts`, then `index.css`, then `hooks/`, then `data/`, then `components/` (bottom-up: ui → shared → sections → layout), then `App.tsx`.