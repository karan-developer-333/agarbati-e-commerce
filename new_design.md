# 🪔 Sugandh — Divine Fragrance E-Commerce Homepage Specifications

This specification document outlines the complete architectural layout, visual guidelines, animation details, and interactive systems for rebuilding the **"Sugandh — Divine Fragrance"** premium agarbatti e-commerce homepage in React, Tailwind CSS, GSAP, and Lenis.

Follow this blueprint to replicate the visual design, interactive patterns, and premium animations from the mockup image (`ChatGPT Image Jun 25, 2026, 11_21_25 PM.png`).

> ⚠️ **NOTE**: This document has been corrected against the actual mockup. All section layouts, asset usage, and design tokens match the image exactly.

---

## 📐 DESIGN SYSTEM & THEME TOKENS

### Color Palette (Extracted from Mockup)
*   **Main Page Background**: Ivory Cream (`#FDFBF6` / `#F8F5EE`)
*   **Primary Purple (Brand / Text / Buttons / Active Nav)**: Deep Royal Plum (`#2D1B5E` / `#1E0F47`)
*   **Accent Gold (Logo, Icons, Stars, Dividers)**: Warm Antique Gold (`#C9963A` / `#B8892D`)
*   **Text Colors**:
    *   *Primary Text*: Dark Charcoal-Plum (`#1A1030`)
    *   *Secondary Text*: Muted Warm Gray (`#7A7285`)
    *   *White Text*: Pure White (`#FFFFFF`)
*   **Card Backgrounds**: Pure White (`#FFFFFF`) with a very subtle border (`#EDE8DF`)
*   **Navbar Background**: Same as page bg (`#FDFBF6`), with a very light bottom border/shadow
*   **Active Nav Link**: Underline in solid deep purple (`#2D1B5E`)
*   **Cart Badge**: Deep purple circular badge (`#2D1B5E`) with white text
*   **Hero Background**: Very warm light beige/cream (`#F5EFE3`) — slightly darker than page bg, with a faint mandala/rangoli SVG watermark pattern
*   **Promo Card Gradients**:
    *   *Card 1 (Gift Packs)*: Soft Muted Lavender (`#EBE2F5` → `#D4C3E8`) — very pale violet
    *   *Card 2 (Festival)*: Warm Golden Cream (`#FFF3D8` → `#FFE5AA`) — warm amber-honey tone
    *   *Card 3 (Dhoop & Cones)*: Very Pale Lilac-Gray (`#EAE2EF` → `#D8CCE8`)

### Typography
*   **Brand / Headings Font**: `'Cormorant Garamond'` — for luxurious serif headings (H1, H2, brand name)
*   **Body & UI Font**: `'Poppins'` — for nav links, body copy, labels, button text, prices

### Icon Style
*   All icons: Thin-stroke, line style (NOT filled). Use Lucide React or custom SVG.
*   Gold color for feature badges and logo flame.
*   Purple for interactive/action icons.

---

## 🏗️ LAYOUT & STRUCTURE (Corrected Wireframe from Mockup)

```
┌────────────────────────────────────────────────────────┐
│                   STICKY NAVBAR                        │  Height: ~64px | Ivory Bg | Subtle bottom shadow
├────────────────────────────────────────────────────────┤
│                                                        │
│                   HERO BANNER                          │  Full width | Split 50/50 (Left: Text | Right: Product Image)
│                                                        │
├─────────────────────────┬──────────────────────────────┤
│   SHOP BY FRAGRANCE     │      BEST SELLERS            │  ← CRITICAL: These 2 sections are SIDE-BY-SIDE in a 2-COLUMN layout
│   (6 cards, 3x2 grid)   │   (5 cards, horizontal row)  │     NOT stacked vertically!
├─────────────────────────┴──────────────────────────────┤
│             VALUE PROPOSITION DIVIDER                  │  5 icons horizontal row, full width
├────────────────────────────────────────────────────────┤
│             PROMO COLLECTIONS (3)                      │  3-Column equal banners, full width
├────────────────────────────────────────────────────────┤
│                 TRUST FOOTER ROW                       │  4 trust badges horizontal
└────────────────────────────────────────────────────────┘
```

> ⚠️ **CRITICAL LAYOUT FIX**: In the mockup, **"Shop by Fragrance"** and **"Best Sellers"** sections appear **side by side** in a 2-column layout (approximately `45% | 55%` split). They are NOT full-width separate sections stacked vertically. Do NOT implement them as separate full-width rows.

---

## 🧩 SECTION SPECIFICATIONS

### 1. Sticky Navbar
*   **Height**: ~64px, `position: sticky; top: 0; z-index: 100`
*   **Background**: `#FDFBF6` with a `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`
*   **Layout**: 3-zone flex row (`justify-between; align-items: center`)

*   **Left Zone — Brand Logo**:
    *   A small golden SVG diya/flame icon (2 flames on a small tray, thin stroke, gold-filled)
    *   Brand name: `"Sugandh"` in bold `Cormorant Garamond`, deep purple (`#2D1B5E`), font-size ~22px
    *   Tagline below: `"Divine Fragrance"` in `Poppins`, gold (`#C9963A`), font-size ~11px, letter-spacing: 0.05em

*   **Center Zone — Search Bar**:
    *   Pill-shaped input: `border-radius: 24px`
    *   Background: very light cream/gray (`#F0ECE4`)
    *   Placeholder text: `"Search for agarbatti, dhoop, incense..."` in muted gray
    *   Right-side magnifying glass icon (thin stroke, gray)
    *   Width: ~380-420px

*   **Right Zone — Navigation + Icons**:
    *   Nav links (in order): `Home` | `Shop` | `Categories ▾` | `Best Sellers` | `About Us` | `Contact`
    *   Font: `Poppins`, size ~14px, weight 500, color dark plum
    *   `Home` has a solid underline in deep purple (active state)
    *   Gap between links: ~20-24px
    *   After links: User profile icon (person outline, thin stroke) + Cart icon (bag outline, thin stroke) with a **deep purple circular badge** showing `"3"` in white, positioned top-right of cart icon
    *   Icon size: ~22-24px

---

### 2. Hero Banner Section
*   **Background**: Warm cream gradient — `linear-gradient(135deg, #F5EFE3 0%, #EDE4D0 100%)`
*   **Faint Mandala**: A very subtle off-white SVG mandala/rangoli watermark in the center-right area of the hero, rendered at ~15% opacity
*   **Falling Petals**: 5-8 small scattered pink/orange floating petal SVGs at various positions, subtle
*   **Layout**: 2-column, ~`45% text | 55% image`, padding ~60px 80px

*   **Left Block**:
    1.  **Sub-badge row**: `← • Pure Fragrance. Positive Vibes. • →`
        *   Small horizontal gold lines on either side
        *   Text in gold (`#C9963A`), uppercase, font-size ~12px, letter-spacing: 0.12em, `Poppins`
    2.  **H1 Headline**: `"Bring Divine Fragrance Into Every Home"`
        *   Font: `Cormorant Garamond`, weight 700, size ~52-56px, color deep purple (`#2D1B5E`), line-height 1.1
    3.  **Description**: `"Premium quality agarbatti for your peaceful prayers and beautiful moments."`
        *   Font: `Poppins`, weight 400, size ~15px, color muted plum (`#7A7285`)
    4.  **CTA Button**: `"Shop Now →"`
        *   Background: `#2D1B5E`, text: white, `Poppins` semi-bold
        *   `border-radius: 28px`, padding: `14px 32px`
        *   Hover: Slightly lighter purple with a subtle glow `box-shadow`
    5.  **Feature Badges Row** (horizontal, with thin pipe dividers between each):
        *   🌿 `Natural Ingredients` — thin-stroke leaf icon + label below
        *   ♥ `Long Lasting Fragrance` — thin-stroke heart icon + label
        *   🪔 `Made With Devotion` — thin-stroke incense holder icon + label
        *   Font: `Poppins`, size ~12px, color muted gray

*   **Right Block — Product Showcase**:
    *   **IMPORTANT**: This is a **real photorealistic product image**, NOT a CSS illustration.
    *   Asset: `/assets/hero_banner_render.png`
    *   The image shows: A premium purple Sugandh Sandalwood Agarbatti box (tall, vertical), an open box showing incense sticks, incense sticks burning in a brass/gold katori holder, sandalwood bark pieces, and white jasmine flowers — all on the cream background
    *   Image is positioned slightly overlapping bottom of hero, without any extra card/frame border
    *   **Slider Controls**: Two circle outline buttons (`<` and `>`) on the far right side of the hero image area, plus 1 dot (active) below — for a slide carousel of products

---

### 3. "Shop by Fragrance" Section (LEFT column of the 2-column mid-section)

> ⚠️ This section occupies the **left ~45%** of the viewport width in the mid-section, placed **side-by-side with Best Sellers**.

*   **Header Row**: `"Shop by Fragrance"` (left, serif, dark plum, ~22px) + `"View all →"` (right, gold/plum, ~13px)
*   **Grid**: **3 columns × 2 rows** = 6 cards (NOT 6 columns in a single row!)
*   **Card Structure**:
    *   Rounded rectangle card with thin border (`#EDE8DF`), white background, ~12px radius
    *   Inside: circular image (showing the fragrance ingredient/flower) centered in card
    *   Label below: fragrance name, centered, `Poppins`, size ~13px, dark color
    *   Hover: subtle card lift + border color change to gold
*   **6 Fragrances** (with images from Unsplash):
    1.  `Sandalwood` — incense sticks with sandalwood — `https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80`
    2.  `Rose` — red rose — `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80`
    3.  `Mogra` — white mogra flowers — `https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80`
    4.  `Lavender` — lavender bunch — `https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80`
    5.  `Jasmine` — white jasmine — `https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=400&q=80`
    6.  `Oudh` — dark agarwood — `https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80`

> ⚠️ **IMAGE FIX**: The mockup shows the category images as **product/ingredient photos** (showing the actual incense sticks with the ingredient beside them), NOT circular icon-style illustrations. Use natural product photography.

---

### 4. "Best Sellers" Section (RIGHT column of the 2-column mid-section)

> ⚠️ This section occupies the **right ~55%** of the viewport width in the mid-section, placed **side-by-side with Shop by Fragrance**.

*   **Header Row**: `"Best Sellers"` (left, serif, dark plum, ~22px) + `"View all →"` (right, ~13px)
*   **Grid**: **5 product cards in a single horizontal row** (5 columns within this right panel)
*   **Card Structure**:
    *   White card, rounded (~10-12px), subtle border, clean padding
    *   **IMPORTANT**: Product image shows **REAL photorealistic incense box images** — NOT CSS-only 3D box components. Use image assets.
    *   Product image area: shows incense box + incense sticks in a brass holder, from a slight front-angle shot
    *   **Rating Row**: Gold star `★` + `4.8` (bold, dark) + `(1.2K)` (muted gray) — all in `Poppins`, ~12px
    *   **Product Name**: `Poppins`, ~13px, dark plum, 2 lines max
    *   **Price**: Bold `₹149`, `Poppins`, ~15px, dark
    *   **Add to Cart Button**: A **deep purple circular button** with a white `+` icon, positioned **bottom-right of the card**. On click, it morphs into a `- 1 +` counter inline within the card.

*   **5 Products**:
    1.  `Divine Sandalwood Agarbatti` | ★ 4.8 (1.2K) | ₹149
    2.  `Royal Rose Agarbatti` | ★ 4.7 (980) | ₹159
    3.  `Mogra Bliss Agarbatti` | ★ 4.8 (1.1K) | ₹169
    4.  `Lavender Calm Agarbatti` | ★ 4.7 (870) | ₹179
    5.  `Oudh Supreme Agarbatti` | ★ 4.9 (1.3K) | ₹249

> ⚠️ **ASSET FIX**: The original spec said to use "CSS-based 3D cardboard box components." **This is WRONG.** The mockup clearly shows real product photography. Use actual product images. If custom images are unavailable, use styled placeholder images matching the box color scheme, but not pure CSS-only boxes.

---

### 5. Value Proposition Divider (Full Width)
*   Full-width horizontal banner, white/cream bg
*   Thin top and bottom golden-cream divider lines
*   **5 items** in an even horizontal row, each item:
    *   Icon (thin-stroke SVG) above
    *   Bold label (`Poppins`, ~14px, dark plum)
    *   Sub-label below (`Poppins`, ~12px, muted gray)
    *   Thin vertical separator line between each item
*   **Items**:
    1.  🌿 `Natural Ingredients` / `Made with pure & natural ingredients`
    2.  🕐 `Long Lasting Fragrance` / `Fragrance that stays longer`
    3.  🤲 `Made with Devotion` / `Crafted with care and devotion`
    4.  🚚 `Fast & Safe Delivery` / `Delivered to your doorstep`
    5.  🛡️ `Secure Payment` / `100% secure & trusted payments`

---

### 6. Promo / Collection Grid (Full Width, 3 Columns)

*   **Full-width container**, evenly divided into 3 equal columns
*   Each card has rounded corners (~16px), subtle card border

*   **Card 1: Premium Gift Packs**
    *   Background: Soft Lavender gradient (`#EBE2F5` → `#D4C3E8`)
    *   Text: `"Premium Gift Packs"` (bold, Cormorant, dark plum, ~20px) / `"Perfect for every occasion"` (Poppins, gray)
    *   Button: `"Explore Now"` (solid deep purple, pill shape, white text)
    *   Image: `/assets/promo_gift_packs.png` — A luxury purple gift box with multiple agarbatti packs inside, lavender sprigs as decoration
    *   Image positioned on right side of card, slightly overlapping card edge for depth

*   **Card 2: Festival Collection**
    *   Background: Warm golden cream gradient (`#FFF3D8` → `#FFE5AA`)
    *   Text: `"Festival Collection"` / `"Make every festival special"`
    *   Button: `"Shop Now"` (solid deep purple, pill shape)
    *   Image: `/assets/promo_festival.png` — A lit diya, marigold flowers, brass katori, agarbatti sticks in brass holder — festive Diwali arrangement

*   **Card 3: Dhoop & Incense Cones**
    *   Background: Very pale lilac-gray gradient (`#EAE2EF` → `#D8CCE8`)
    *   Text: `"Dhoop & Incense Cones"` / `"Pure. Natural. Divine."`
    *   Button: `"Shop Now"` (solid deep purple, pill shape)
    *   Image: `/assets/promo_dhoop_cones.png` — A Sugandh branded dhoop cones box + several brown dhoop cones scattered on a wooden surface

---

### 7. Trust Footer Row (Full Width)
*   White/cream background, centered content
*   4 trust badges in a horizontal row with thin vertical separators:
    1.  🏅 `100% Original Products`
    2.  📦 `Easy Returns`
    3.  ✅ `Quality Assured`
    4.  🎧 `Dedicated Support`
*   Each badge: thin-stroke icon above text, gold/plum color scheme
*   Below this row: full footer with brand info, links, and social icons

---

## ⚡ ANIMATIONS & TRANSITIONS (GSAP + Lenis)

### 1. Global Smooth Scroll (Lenis)
Initialize in `src/main.jsx`:
```javascript
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
```

### 2. GSAP ScrollTrigger Effects
*   **Navbar Entrance**: On load, slide down (`y: -64` to `0`) and fade in over 0.6s
*   **Hero Text Stagger**: Stagger each line of the H1 headline, sub-badge, and CTA with GSAP `fromTo` using `y: 30, opacity: 0` → `y: 0, opacity: 1`, stagger 0.15s
*   **Hero Image Parallax**: ScrollTrigger parallax on right product image (`y: 0` to `y: -40` as user scrolls)
*   **Category Cards Stagger**: As mid-section enters viewport, stagger all 6 category cards with `y: 30, opacity: 0` → visible, 0.1s stagger
*   **Best Seller Cards Stagger**: Same stagger entrance for product cards
*   **Product Card Hover Lift**: On `mouseenter`, GSAP `to(card, { y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.12)', duration: 0.25 })`. On `mouseleave`, reverse.
*   **Add to Cart Flying Animation**: When `+` is clicked, clone the product image thumbnail, animate it flying (`x, y` transform) from product card position to navbar cart icon. End with a bounce scale on the cart badge number.

### 3. SVG & CSS Animations
*   **Rising Smoke Wisps** (in hero, subtle):
    ```css
    @keyframes smokeRise {
      0%   { transform: translateY(0) scale(1) skewX(0deg); opacity: 0.45; }
      50%  { transform: translateY(-30px) scale(1.4) skewX(8deg); opacity: 0.2; }
      100% { transform: translateY(-70px) scale(1.8) skewX(-8deg); opacity: 0; }
    }
    .smoke-wisp {
      animation: smokeRise 4s ease-in-out infinite;
      transform-origin: bottom center;
    }
    ```
*   **Incense Tip Glow Pulse**: A small radial-gradient orange/amber circle at the tip of burning sticks:
    ```css
    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50%       { opacity: 0.95; transform: scale(1.3); }
    }
    .incense-glow { animation: glowPulse 1.6s ease-in-out infinite; }
    ```
*   **Petal Float**: 5-8 scattered SVG petals in hero area, each with slightly different `animation-duration` (6s–10s) and `animation-delay` (-2s to -8s) for organic feel.

---

## 📂 ASSETS RESOURCE MAP

### Local Assets (place in `/public/assets/`)

| Asset Name | File Path | Description |
|---|---|---|
| **Hero Banner** | `/assets/hero_banner_render.png` | Purple Sandalwood box + incense sticks in brass holder + flowers |
| **Premium Gift Packs** | `/assets/promo_gift_packs.png` | Luxury gift box with multiple agarbatti packs, lavender decoration |
| **Festival Collection** | `/assets/promo_festival.png` | Diya + marigolds + brass katori + incense sticks, festive |
| **Dhoop Cones** | `/assets/promo_dhoop_cones.png` | Dhoop cones box + scattered cones on wooden surface |

### Fragrance Category Images (Unsplash CDN)
Use these as category circle images:
*   **Sandalwood**: `https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80`
*   **Rose**: `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80`
*   **Mogra**: `https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80`
*   **Lavender**: `https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80`
*   **Jasmine**: `https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=400&q=80`
*   **Oudh**: `https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80`

---

## 📝 DEVELOPMENT TASK LIST (Corrected)

- [ ] **Task 1: Design Tokens Setup**
  * Update `src/index.css` — define root CSS variables: `--color-bg: #FDFBF6`, `--color-primary: #2D1B5E`, `--color-gold: #C9963A`, `--font-serif: 'Cormorant Garamond'`, `--font-sans: 'Poppins'`
  * Import Google Fonts in `index.html`: `Cormorant Garamond` (weights 400, 600, 700) and `Poppins` (weights 400, 500, 600)

- [ ] **Task 2: Refactor Navbar**
  * File: `src/components/Navbar.jsx`
  * 3-zone layout: Logo | Search pill | Nav links + icons
  * Deep purple active underline on "Home"
  * Purple cart badge showing `3`
  * Sticky, `z-index: 100`, subtle shadow

- [ ] **Task 3: Hero Banner**
  * File: `src/components/HeroBanner.jsx`
  * Warm cream gradient bg + faint mandala SVG watermark at ~15% opacity
  * Left: sub-badge (gold) → H1 (Cormorant, purple) → description → CTA button → feature badges
  * Right: `/assets/hero_banner_render.png` full display
  * Slider controls: circle outline `<` `>` buttons + dot indicators

- [ ] **Task 4: Mid-Section 2-Column Layout** ← NEW CRITICAL TASK
  * Create a wrapper `src/components/MidSection.jsx` (or use parent layout in `App.jsx`)
  * Use CSS grid: `grid-template-columns: 45% 55%` to place Shop by Fragrance (left) and Best Sellers (right) side-by-side

- [ ] **Task 5: CategoryQuickLinks (Shop by Fragrance)**
  * File: `src/components/CategoryQuickLinks.jsx`
  * 3×2 grid layout (3 columns, 2 rows) — NOT 6-column single row
  * White cards with thin border, circular image inside, name below
  * Use Unsplash URLs as src

- [ ] **Task 6: Best Sellers Product Cards**
  * File: `src/components/ProductCard.jsx`
  * 5 cards in a horizontal row within the right panel
  * Use real product images (NOT CSS 3D boxes)
  * Star rating + name + price + purple circular add button
  * Click `+` → morphs to `- 1 +` counter

- [ ] **Task 7: Value Proposition Divider**
  * File: `src/components/ValueProps.jsx`
  * Full-width, 5 items with thin-stroke icons, vertical separators between each
  * Cream bg with thin top/bottom gold-tinted divider lines

- [ ] **Task 8: Promo Collection Banners**
  * File: `src/components/PromoBannerCards.jsx`
  * 3 equal columns, each with gradient bg, text, button, and `/assets/promo_*.png` image
  * Gradient backgrounds as specified per card

- [ ] **Task 9: Trust Footer Row**
  * File: `src/components/Footer.jsx`
  * 4 trust badges in horizontal row above main footer links
  * Main footer: brand description, navigation columns, contact, social icons

- [ ] **Task 10: GSAP & Lenis Animations**
  * Lenis smooth scroll init in `src/main.jsx`
  * ScrollTrigger stagger for hero text, category cards, product cards
  * Hero image parallax
  * Product card hover lift
  * Fly-to-cart animation on `+` click
  * Rising smoke SVG CSS animation in hero
  * Incense tip glow pulse CSS animation
