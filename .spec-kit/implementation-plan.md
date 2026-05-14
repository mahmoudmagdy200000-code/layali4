# 🍽️ Restaurant Digital Menu & Link Tree — Implementation Plan
**Role:** Expert Senior Frontend Architect
**Stack:** React (Vite) · Tailwind CSS · Framer Motion · Lucide React
**Architecture:** Strict Feature-Sliced / Feature-Based

---

## 📐 Part 1: Feature Architecture Folder Structure

```
restaurant-menu/
├── public/
│   ├── favicon.ico
│   ├── logo.png                        # Restaurant logo (placeholder)
│   └── images/
│       └── placeholder-dish.png        # Fallback dish image
│
├── src/
│   ├── app/                            # App-level wiring (not a feature)
│   │   ├── App.jsx                     # Root component, layout shell
│   │   ├── main.jsx                    # Vite entry point
│   │   └── providers/
│   │       └── AppProviders.jsx        # Wraps i18n + theme context
│   │
│   ├── features/
│   │   │
│   │   ├── i18n/                       # Feature: Internationalization
│   │   │   ├── context/
│   │   │   │   └── I18nContext.jsx     # React context for lang state
│   │   │   ├── hooks/
│   │   │   │   └── useLanguage.js      # Exposes { lang, toggleLang, isRTL }
│   │   │   ├── translations/
│   │   │   │   ├── en.json             # All English UI strings
│   │   │   │   └── ar.json             # All Arabic UI strings
│   │   │   └── index.js                # Public API for this feature
│   │   │
│   │   ├── menu/                       # Feature: Digital Menu
│   │   │   ├── components/
│   │   │   │   ├── MenuSection.jsx     # Container: reads hook, passes props
│   │   │   │   ├── CategoryTabs.jsx    # Stateless: receives tabs + activeTab
│   │   │   │   ├── MenuGrid.jsx        # Stateless: receives items[]
│   │   │   │   └── MenuItemCard.jsx    # Stateless: receives single item
│   │   │   ├── hooks/
│   │   │   │   ├── useMenuData.js      # Reads menuData.json, filters by lang
│   │   │   │   └── useActiveCategory.js # Manages selected tab state
│   │   │   ├── types/
│   │   │   │   └── menu.types.js       # JSDoc / PropTypes for MenuItem, Category
│   │   │   └── index.js                # Public API
│   │   │
│   │   └── link-tree/                  # Feature: Link Tree
│   │       ├── components/
│   │       │   ├── LinkTreeSection.jsx # Container: reads config, passes to UI
│   │       │   └── LinkButton.jsx      # Stateless: icon + label + href + color
│   │       ├── config/
│   │       │   └── links.config.js     # Static link definitions (href, icon, label keys)
│   │       ├── hooks/
│   │       │   └── useLinkTree.js      # Merges config with i18n labels
│   │       └── index.js                # Public API
│   │
│   ├── shared/                         # Truly shared, feature-agnostic
│   │   ├── components/
│   │   │   ├── Header.jsx              # Logo + name + lang toggle
│   │   │   ├── LanguageToggle.jsx      # AR / EN pill toggle
│   │   │   └── PageShell.jsx           # Mobile-first centered container
│   │   ├── hooks/
│   │   │   └── useScrollLock.js        # Lock body scroll on modals (future use)
│   │   └── utils/
│   │       └── formatCurrency.js       # Formats price + currency symbol
│   │
│   └── data/
│       └── menuData.json               # Single source of truth for all menu data
│
├── tailwind.config.js
├── vite.config.js
├── index.html
└── package.json
```

---

## 🎨 Part 2: Tailwind Color Palette Setup

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand Purples ──────────────────────────────────
        brand: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',   // Primary action color
          600: '#9333ea',   // Hover state
          700: '#7e22ce',   // Active / pressed
          800: '#6b21a8',   // Dark variant
          900: '#581c87',   // Deep accent
          950: '#3b0764',   // Near-black purple
        },
        // ── Neutral Grays (warm-shifted for appetite appeal) ─
        surface: {
          0:   '#ffffff',
          50:  '#fafafa',
          100: '#f4f4f5',   // Page background
          200: '#e4e4e7',   // Card borders
          300: '#d4d4d8',   // Dividers
          400: '#a1a1aa',   // Placeholder text
          500: '#71717a',   // Secondary text
          600: '#52525b',   // Body text
          700: '#3f3f46',   // Strong text
          800: '#27272a',   // Headings
          900: '#18181b',   // Near-black
          950: '#09090b',   // True dark bg
        },
        // ── Semantic ───────────────────────────────────────
        success: '#22c55e',
        whatsapp: '#25D366',
      },
      fontFamily: {
        // Display: elegant serif for restaurant name/headings
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        // Body: clean, highly legible on mobile
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        // Arabic: native-quality Arabic rendering
        arabic:  ['"Noto Naskh Arabic"', 'serif'],
      },
      borderRadius: {
        card: '1.25rem',    // 20px — soft card corners
        pill: '9999px',     // Full pill for tabs & buttons
      },
      boxShadow: {
        card:   '0 2px 16px 0 rgba(88, 28, 135, 0.08)',
        'card-hover': '0 8px 32px 0 rgba(88, 28, 135, 0.18)',
        tab:    '0 2px 8px 0 rgba(168, 85, 247, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Design Token Usage Cheatsheet

| Token | Usage |
|---|---|
| `brand-500` | Primary CTA buttons, active tab indicator |
| `brand-100` | Subtle pill backgrounds, tag chips |
| `brand-950` | Dark mode page background |
| `surface-100` | Light mode page background |
| `surface-200` | Card border, input border |
| `surface-500` | Description / secondary text |
| `whatsapp` | WhatsApp button background |
| `font-display` | Restaurant name, section headings |
| `font-arabic` | All text when `lang === 'ar'` |

---

## 🗂️ Part 3: `menuData.json` Schema

```json
{
  "restaurant": {
    "name": { "en": "Levant Kitchen", "ar": "مطبخ الشام" },
    "tagline": { "en": "Authentic Flavors", "ar": "نكهات أصيلة" }
  },
  "categories": [
    {
      "id": "starters",
      "label": { "en": "Starters", "ar": "المقبلات" },
      "icon": "Salad",
      "items": [
        {
          "id": "item-001",
          "title":       { "en": "Hummus",    "ar": "حمص" },
          "description": { "en": "Creamy chickpea dip with olive oil", "ar": "حمص كريمي مع زيت الزيتون" },
          "price": 28,
          "currency": { "en": "SAR", "ar": "ر.س" },
          "image": "/images/hummus.jpg",
          "tags": ["vegan", "popular"]
        }
      ]
    }
  ]
}
```

---

## 🔗 Part 4: `links.config.js` Schema

```js
// src/features/link-tree/config/links.config.js
import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react'

export const LINK_CONFIG = [
  {
    id: 'whatsapp',
    href: 'https://wa.me/966XXXXXXXXX',
    icon: MessageCircle,
    labelKey: 'links.whatsapp',   // key in en.json / ar.json
    colorClass: 'bg-whatsapp text-white',
    priority: 1,
  },
  {
    id: 'maps',
    href: 'https://maps.google.com/?q=...',
    icon: MapPin,
    labelKey: 'links.maps',
    colorClass: 'bg-brand-600 text-white',
    priority: 2,
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/...',
    icon: Instagram,
    labelKey: 'links.instagram',
    colorClass: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    priority: 3,
  },
  {
    id: 'call',
    href: 'tel:+966XXXXXXXXX',
    icon: Phone,
    labelKey: 'links.call',
    colorClass: 'bg-surface-800 text-white',
    priority: 4,
  },
]
```

---

## 🚀 Part 5: Step-by-Step Execution Phases

---

### Phase 0 — Project Bootstrap (Day 1)

**Goal:** Runnable dev environment with all tooling wired.

```bash
# 1. Scaffold via Vite
npm create vite@latest restaurant-menu -- --template react
cd restaurant-menu

# 2. Install dependencies
npm install framer-motion lucide-react

# 3. Install Tailwind + PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Install Google Fonts (DM Sans + Playfair Display + Noto Naskh Arabic)
# Add to index.html <head>:
# <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700&family=Noto+Naskh+Arabic:wght@400;600&display=swap" rel="stylesheet">
```

**Deliverables:**
- [ ] `vite.config.js` configured with `@` path alias → `src/`
- [ ] `tailwind.config.js` fully populated (see Part 2)
- [ ] `index.html` with font imports + `<div id="root">`
- [ ] `src/app/main.jsx` bootstrapped
- [ ] Base `index.css` with Tailwind directives + CSS custom properties

---

### Phase 1 — i18n Feature (Day 1–2)

**Goal:** Language context available globally before any UI is built.

**Step 1.1 — Create translation files**
- `src/features/i18n/translations/en.json` — all English strings
- `src/features/i18n/translations/ar.json` — all Arabic strings
- Include keys for: nav, links.*, menu.*, header.*

**Step 1.2 — Build `I18nContext`**
```jsx
// src/features/i18n/context/I18nContext.jsx
const I18nContext = createContext()
export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en') // default English
  const isRTL = lang === 'ar'
  const t = (key) => /* dot-notation key lookup in translations */
  // Apply dir + font-family to <html> element on lang change
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])
  return <I18nContext.Provider value={{ lang, isRTL, t, toggleLang }}>...</I18nContext.Provider>
}
```

**Step 1.3 — `useLanguage` hook**
```js
// src/features/i18n/hooks/useLanguage.js
export const useLanguage = () => useContext(I18nContext)
```

**Step 1.4 — Wrap app in provider**
```jsx
// src/app/providers/AppProviders.jsx
export function AppProviders({ children }) {
  return <I18nProvider>{children}</I18nProvider>
}
```

**Deliverables:**
- [ ] `lang` toggle switches `dir` attribute on `<html>` seamlessly
- [ ] `t('key')` returns correct string per active language
- [ ] No page reload on language switch

---

### Phase 2 — Shared Components & Shell (Day 2)

**Goal:** App skeleton renders with correct mobile layout.

**Step 2.1 — `PageShell.jsx`**
- `max-w-md mx-auto min-h-screen` — centered on desktop, full-width on mobile
- Background: `bg-surface-100` (light) or `bg-surface-950` (dark)
- Subtle noise texture overlay via CSS `::before` pseudo-element

**Step 2.2 — `Header.jsx`**
- Left: Logo image (or initial monogram fallback) + restaurant name in `font-display`
- Right: `<LanguageToggle />`
- Sticky position: `sticky top-0 z-50 backdrop-blur-md bg-surface-0/80`
- Animate in with Framer Motion `initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}`

**Step 2.3 — `LanguageToggle.jsx`**
```jsx
// Pill toggle: [EN] [AR]
// Active lang: bg-brand-500 text-white rounded-pill
// Inactive: text-surface-500
// Framer Motion layoutId="langPill" for smooth sliding indicator
```

**Step 2.4 — `formatCurrency.js`**
```js
export const formatCurrency = (price, currency) => `${price} ${currency}`
```

**Deliverables:**
- [ ] Header renders correctly, sticks on scroll
- [ ] Language toggle is tappable and switches lang context
- [ ] Layout is centered on 768px+ screens, full-width on mobile

---

### Phase 3 — Link Tree Feature (Day 3)

**Goal:** High-conversion link section fully functional.

**Step 3.1 — `useLinkTree` hook**
```js
// Reads LINK_CONFIG, uses t() to resolve labelKey → localized label
// Returns: { links: [{ ...config, label: string }] }
```

**Step 3.2 — `LinkButton.jsx` (Stateless)**
```jsx
// Props: { href, icon: Icon, label, colorClass, index }
// Uses <motion.a> with:
//   - whileTap={{ scale: 0.97 }} for tactile press feedback
//   - initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//   - transition={{ delay: index * 0.08 }} for staggered entrance
// Full width, rounded-pill, h-14, flex items-center gap-3
// Icon on left (flips to right in RTL via `flex-row-reverse`)
```

**Step 3.3 — `LinkTreeSection.jsx` (Container)**
```jsx
// Calls useLinkTree() → gets localized links array
// Passes each link to <LinkButton /> with index for stagger
```

**Deliverables:**
- [ ] 4 link buttons render with correct icons and labels
- [ ] Staggered entrance animation on mount
- [ ] WhatsApp opens `wa.me` link, Call opens `tel:`, Maps opens geo URL
- [ ] Labels flip language correctly without rerender flash

---

### Phase 4 — Menu Feature (Day 4–5)

**Goal:** Full digital menu with animated category tabs and item cards.

**Step 4.1 — `useMenuData` hook**
```js
// Imports menuData.json statically (no fetch needed — Vite handles JSON imports)
import menuData from '@/data/menuData.json'

export function useMenuData(lang) {
  // Returns categories with localized labels and items
  // Each item has localized title, description, currency
  // Memoized with useMemo([lang])
}
```

**Step 4.2 — `useActiveCategory` hook**
```js
// State: { activeId, setActiveId }
// Initializes to first category id
// Exposed as: { activeId, setActiveCategory }
```

**Step 4.3 — `CategoryTabs.jsx` (Stateless)**
```jsx
// Props: { categories, activeId, onSelect }
// Horizontally scrollable row: overflow-x-auto scrollbar-hidden
// Each tab: rounded-pill px-4 py-2 font-medium text-sm
// Active: bg-brand-500 text-white shadow-tab
// Framer Motion layoutId="activeTab" sliding underline/background
// No scroll snap — let finger swipe freely
```

**Step 4.4 — `MenuItemCard.jsx` (Stateless)**
```jsx
// Props: { image, title, description, price, currency, tags }
// Layout:
//   - Aspect-ratio 4:3 image top (bg-surface-200 placeholder if no image)
//   - Content area: title (font-display font-semibold), description (text-sm text-surface-500),
//     price row (brand-600 font-bold + currency)
//   - Optional "Popular" badge: absolute top-2 left-2, bg-brand-100 text-brand-700
// Shadow: shadow-card, hover: shadow-card-hover transition-shadow duration-300
// Rounded: rounded-card
// Framer Motion: whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
```

**Step 4.5 — `MenuGrid.jsx` (Stateless)**
```jsx
// Props: { items }
// Layout: grid grid-cols-2 gap-3 (single col on very narrow screens)
// AnimatePresence wraps the grid — when activeId changes, items exit/enter
```

**Step 4.6 — `MenuSection.jsx` (Container)**
```jsx
// Orchestrates: useMenuData + useActiveCategory
// Derives activeItems from categories.find(c => c.id === activeId).items
// Renders: <CategoryTabs /> + <AnimatePresence><MenuGrid /></AnimatePresence>
```

**Deliverables:**
- [ ] Category tabs scroll horizontally with smooth sliding active indicator
- [ ] Switching tabs triggers exit/enter animation on item grid
- [ ] Cards animate in as user scrolls down (viewport-triggered)
- [ ] All text is correctly localized and RTL-flipped
- [ ] Images gracefully fall back to placeholder

---

### Phase 5 — App Assembly & Transitions (Day 6)

**Goal:** Wire everything together with page-level motion.

**Step 5.1 — `App.jsx` layout**
```jsx
function App() {
  return (
    <AppProviders>
      <PageShell>
        <Header />
        <main>
          {/* Page entrance animation wrapper */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <LinkTreeSection />
            <Divider />
            <MenuSection />
          </motion.div>
        </main>
      </PageShell>
    </AppProviders>
  )
}
```

**Step 5.2 — RTL layout audit**
- All `ml-*` / `mr-*` → use `ms-*` / `me-*` (logical properties) in Tailwind
- Flex rows in components use `flex-row` by default; RTL reversal handled by `dir="rtl"` on `<html>` (browser-native)
- Icons that are directional (arrows, chevrons) use `rtl:rotate-180` class

**Step 5.3 — Performance audit checklist**
- [ ] All images use `loading="lazy"` + explicit `width`/`height`
- [ ] `menuData.json` is a static import (zero network request)
- [ ] Fonts loaded with `display=swap`
- [ ] No unused Tailwind classes (PurgeCSS via `content` glob)
- [ ] Framer Motion tree-shaken: import only `motion`, `AnimatePresence`
- [ ] Lighthouse Mobile score target: **95+**

---

### Phase 6 — Anti-Gravity MCP Integration (Day 7)

**Goal:** Project runs cleanly inside the internal anti-gravity environment.

**Step 6.1 — `vite.config.js` MCP-safe config**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  base: './',          // Relative paths for embedded deployment
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    host: true,         // Expose to anti-gravity dev proxy
  },
})
```

**Step 6.2 — Environment variables**
```
# .env
VITE_RESTAURANT_NAME="Levant Kitchen"
VITE_WHATSAPP_NUMBER="966XXXXXXXXX"
VITE_MAPS_URL="https://maps.google.com/?q=..."
VITE_INSTAGRAM_URL="https://instagram.com/..."
VITE_PHONE_NUMBER="+966XXXXXXXXX"
```

**Step 6.3 — Anti-gravity MCP notes**
- Confirm MCP server dev proxy forwards `localhost:5173` correctly
- Static assets (`public/`) must be served from the same origin as the app shell
- If anti-gravity uses an iframe embed, set `Content-Security-Policy` to allow `frame-ancestors`

**Deliverables:**
- [ ] `npm run dev` starts cleanly inside anti-gravity
- [ ] `npm run build` produces a static `dist/` folder with no absolute path issues
- [ ] All env vars accessible via `import.meta.env.VITE_*`

---

### Phase 7 — QA, Polish & Handoff (Day 8)

**Checklist:**

**Functionality**
- [ ] Language switch: EN ↔ AR toggles direction, fonts, and all strings
- [ ] All 4 link buttons open correct destinations
- [ ] All menu categories render correct items
- [ ] No layout breaks at 320px, 375px, 390px, 414px viewport widths

**Performance**
- [ ] No layout shift (CLS < 0.1) — image placeholders reserve space
- [ ] First Contentful Paint < 1.2s on 4G throttled mobile
- [ ] Bundle size < 200KB gzipped (Framer Motion is the heaviest dep at ~35KB)

**Accessibility**
- [ ] All links have `aria-label`
- [ ] Color contrast AA compliant (brand-500 on white: ✅ 4.6:1)
- [ ] Keyboard navigable

**RTL Parity**
- [ ] Header logo/name on correct side per direction
- [ ] Card text aligns correctly
- [ ] Category tabs scroll from right-to-left in AR mode

---

## 📊 Part 6: Phase Timeline Summary

| Phase | Focus | Duration |
|---|---|---|
| 0 | Bootstrap + Tooling | Day 1 |
| 1 | i18n Feature | Days 1–2 |
| 2 | Shared Shell + Header | Day 2 |
| 3 | Link Tree Feature | Day 3 |
| 4 | Digital Menu Feature | Days 4–5 |
| 5 | Assembly + Animations | Day 6 |
| 6 | Anti-Gravity Integration | Day 7 |
| 7 | QA + Polish | Day 8 |

**Total estimated timeline: 8 working days** for a single mid-senior frontend developer.

---

## 🧠 Key Architectural Principles — Quick Reference

| Principle | Rule |
|---|---|
| **Feature isolation** | A feature imports only from `shared/` or its own folder. Never cross-imports between `features/menu` and `features/link-tree` |
| **Stateless UI** | `MenuItemCard`, `LinkButton`, `CategoryTabs` have zero state — they are pure render functions of their props |
| **Single data source** | `menuData.json` is the only source of menu truth. No hardcoded strings in components |
| **i18n at the edge** | Language resolution happens in hooks/containers. UI components receive already-localized strings as props |
| **Animation ownership** | Framer Motion wrappers live in the component file itself, not injected from outside |
| **Public API** | Each feature exposes an `index.js` barrel file. Other parts of the app import from `@/features/menu`, never from deep internal paths |
