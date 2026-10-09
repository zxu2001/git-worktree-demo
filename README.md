# SalesPilot CRM — Marketing Homepage

> An all-in-one sales management platform that helps you master your pipeline and close more deals.

## 🚀 Tech Stack

- **React 18** + **Vite 6**
- Vanilla CSS (design system built on CSS Custom Properties)
- Google Fonts (Inter + Noto Sans TC)

## 📁 Project Structure

```
src/
├── main.jsx                # Application entry point
├── App.jsx                 # Root component
├── index.css               # Global styles & design system
├── components/
│   ├── Navbar.jsx          # Navigation bar (with responsive hamburger menu)
│   ├── Hero.jsx            # Hero section (CTA + pipeline mockup)
│   ├── SocialProof.jsx     # Customer trust section + testimonial quote
│   ├── Features.jsx        # 6 core features
│   ├── UseCases.jsx        # 3 use cases
│   ├── Pricing.jsx         # Plan and pricing comparison
│   ├── CallToAction.jsx    # Bottom CTA banner
│   └── Footer.jsx          # Footer (product / resources / company / legal / social)
└── data/
    ├── navigation.js       # Navigation & brand settings
    ├── hero.js             # Hero copy & stats
    ├── socialProof.js      # Customer logos & testimonial
    ├── features.js         # Feature list
    ├── useCases.js         # Use cases
    ├── pricing.js          # Plan pricing
    └── footer.js           # Footer links
```

## 🏁 Quick Start

```bash
# Install dependencies
pnpm install

# Start the dev server (default: http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview
```

## 🎨 Design Highlights

- **Dark theme**: `#0a0e1a` base with Indigo / Cyan gradients
- **Glassmorphism Navbar**: frosted-glass effect via `backdrop-filter`
- **Micro-animations**: breathing glow in the Hero background, floating mockup, cards lift on hover
- **Fully responsive**: three breakpoints, desktop → tablet → mobile
- **A11y**: semantic HTML, `aria-label`, `aria-expanded`, and `role` annotations

## ⚙️ Config-Driven

All copy and data live in the JS modules under `src/data/`, so content can be changed without touching any component code.

| File | Controls |
|------|---------|
| `navigation.js` | Brand name, navigation links |
| `hero.js` | Headline, subheadline, stats, CTA buttons |
| `socialProof.js` | Customer logos, testimonial quote |
| `features.js` | Icon / title / description for the 6 features |
| `useCases.js` | 3 role-based scenarios & highlight lists |
| `pricing.js` | Price / feature list for the 3 plans |
| `footer.js` | Footer columns, social links, copyright |

## 📜 License

MIT
