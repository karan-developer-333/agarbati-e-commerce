# TASK: Agarbatti E-Commerce Homepage — GSAP + Lenis Animations

## PROJECT OVERVIEW
This is a React + Vite + TailwindCSS v4 project for "Sugandh" — an agarbatti (incense sticks) e-commerce homepage.
The project already has components built. Your job is to:
1. Install GSAP and Lenis
2. Add smooth scroll with Lenis
3. Add GSAP animations with ScrollTrigger to ALL sections
4. Add SVG decorative elements throughout
5. Add navigation micro-animations
6. Polish and enhance existing components

## CURRENT FILE STRUCTURE
```
src/
  App.jsx
  main.jsx
  index.css
  components/
    Navbar.jsx
    HeroBanner.jsx
    CategoryQuickLinks.jsx
    ProductSection.jsx
    ProductCard.jsx
    PromoBannerCards.jsx
    FeaturedBrands.jsx
    AppDownloadBanner.jsx
    Footer.jsx
```

## STEP 1: INSTALL DEPENDENCIES
```bash
npm install gsap @studio-freight/lenis
```

## STEP 2: LENIS SMOOTH SCROLL SETUP
In `src/main.jsx`, initialize Lenis globally:
```jsx
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

## STEP 3: ANIMATIONS TO ADD

### A. Navbar — `src/components/Navbar.jsx`
Add these animations:
- On mount: slide down from top (y: -100 → 0, opacity 0 → 1, duration 0.8, ease "power3.out")
- Search input: on focus, scale up slightly (1 → 1.02) with border glow
- Cart icon: on hover, rotate 10deg + scale 1.1
- Logo: on hover, scale 1.05 with golden glow
- Add a thin animated bottom border that fills from left on scroll (scrollTrigger on body)
- Add SVG incense smoke wisps in navbar background (subtle, white opacity 0.05)

### B. HeroBanner — `src/components/HeroBanner.jsx`
Add these animations:
- On mount: headline stagger from bottom (each word/line comes up with clip-path reveal)
- CTA "Shop now" button: pulse animation + floating particles around it
- Background: add animated SVG smoke/flame particles floating upward
- Hero image area: parallax effect (moves slower than scroll)
- Add large decorative SVG agarbatti stick illustration on right side (replace emoji)
- The SVG should have animated smoke wisps rising from the tip (CSS keyframe animation)

### C. CategoryQuickLinks — `src/components/CategoryQuickLinks.jsx`
- ScrollTrigger: cards stagger in from bottom (y:40 → 0) when section enters viewport
- Each card: hover → scale(1.05) + shadow boost (use GSAP)
- Add SVG leaf/flame decorators in card backgrounds

### D. ProductSection / ProductCard
- ScrollTrigger: product cards stagger in with scale (0.8 → 1) + opacity (0 → 1) + y (30 → 0)
- Product card hover: GSAP tween to lift card (y: -4) + shadow
- Add to cart button: on click, animate a flying product icon to cart in navbar
- Counter animation: +/- buttons spring animation

### E. PromoBannerCards — `src/components/PromoBannerCards.jsx`
- ScrollTrigger stagger: cards slide in from alternating sides (even from right, odd from left)
- Shine sweep effect on each promo card (pseudo-element gradient sweeps across on scroll)
- Add decorative SVG mandala/rangoli pattern as background overlay on each card

### F. FeaturedBrands — `src/components/FeaturedBrands.jsx`
- ScrollTrigger: brand cards scale in from center (scale 0.9 → 1) staggered
- Brand logo circles: spin 360deg on hover
- Add SVG geometric pattern in colored header area

### G. AppDownloadBanner — `src/components/AppDownloadBanner.jsx`
- ScrollTrigger: left content slides from left, right image slides from right
- Download buttons: on hover, scale + glow
- Add animated SVG wave/swirl decoration in background
- Add floating agarbatti SVG sticks scattered around

### H. Footer — `src/components/Footer.jsx`
Expand the footer significantly:
- Add full footer with columns: About, Categories, Quick Links, Contact
- Add social media icons with SVG
- Add copyright
- Background: #1B4332 with subtle SVG pattern
- Animate footer content on scroll (fade up)

## STEP 4: GLOBAL SVG DECORATIONS
Create `src/components/SvgDecorations.jsx` with reusable SVG components:

```jsx
// FloatingSmoke - animated smoke wisps
// IncenseStick - decorative stick SVG
// MandalaBg - mandala pattern for backgrounds
// WaveDecor - wave separator SVG
// FlameIcon - animated flame
// LeafDecor - leaf/botanical decoration
```

## STEP 5: ENHANCED CSS in `src/index.css`
Add:
```css
/* Lenis smooth scroll */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

/* GSAP will-change optimization */
.gsap-animated { will-change: transform, opacity; }

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #F2F2EE; }
::-webkit-scrollbar-thumb { background: #1B4332; border-radius: 3px; }

/* Smoke animation keyframes */
@keyframes smokeRise {
  0% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-30px) scale(1.5) rotate(15deg); opacity: 0.3; }
  100% { transform: translateY(-60px) scale(2) rotate(-15deg); opacity: 0; }
}

@keyframes flamePulse {
  0%, 100% { transform: scale(1) rotate(-3deg); }
  50% { transform: scale(1.1) rotate(3deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

## STEP 6: AGARBATTI HERO SVG
Replace the emoji in HeroBanner with a proper SVG agarbatti illustration:
```svg
<!-- Agarbatti stick: thin brown stick, tip glowing orange, smoke wisps rising -->
<svg viewBox="0 0 120 200" ...>
  <!-- stick body -->
  <rect x="58" y="40" width="4" height="160" rx="2" fill="#8B4513"/>
  <!-- tip glow -->
  <circle cx="60" cy="40" r="6" fill="#FF6B00" opacity="0.9"/>
  <circle cx="60" cy="40" r="10" fill="#FFD700" opacity="0.3"/>
  <!-- smoke wisps (animated with CSS) -->
  <path class="smoke-1" d="M60 35 Q65 25 60 15 Q55 5 60 -5" stroke="white" stroke-width="2" fill="none" opacity="0.4"/>
  <path class="smoke-2" d="M60 30 Q68 20 63 8 Q58 -4 65 -12" stroke="white" stroke-width="1.5" fill="none" opacity="0.25"/>
</svg>
```

## IMPORTANT NOTES
- Keep ALL existing design tokens (colors, padding, fonts) EXACTLY as they are
- Colors: primary #1B4332, accent #C0392B, bg #F2F2EE, text #1A1A1A
- Font: Poppins throughout
- Max width 780px centered
- DO NOT change the visual design — only ADD animations and SVGs
- All GSAP animations should use `useGSAP` hook or `useEffect` with proper cleanup
- Import gsap and ScrollTrigger in each component that uses it
- Use `gsap.context()` for proper cleanup in React components

## STEP 7: NAVIGATION SMOOTH SCROLL
In Navbar, add anchor links that use Lenis smooth scroll to sections:
- When clicking nav items, use `lenis.scrollTo('#section-id')` for buttery smooth navigation

## STEP 8: PAGE LOAD ANIMATION
Add a simple page load sequence in App.jsx:
- On initial load, animate the entire page with a subtle fade-in
- Stagger section reveals as user scrolls

## EXECUTION ORDER
1. `npm install gsap @studio-freight/lenis`
2. Update `src/main.jsx` with Lenis + GSAP setup
3. Update `src/index.css` with animation keyframes
4. Create `src/components/SvgDecorations.jsx`
5. Update `src/components/Navbar.jsx` with animations
6. Update `src/components/HeroBanner.jsx` with SVG + animations
7. Update `src/components/CategoryQuickLinks.jsx`
8. Update `src/components/ProductCard.jsx`
9. Update `src/components/ProductSection.jsx`
10. Update `src/components/PromoBannerCards.jsx`
11. Update `src/components/FeaturedBrands.jsx`
12. Update `src/components/AppDownloadBanner.jsx`
13. Update `src/components/Footer.jsx` (expand it)
14. Update `src/App.jsx` with section IDs

After all changes, run `npm run dev` to verify everything works.
