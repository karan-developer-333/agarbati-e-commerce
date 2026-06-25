# 🪔 Agarbati E-Commerce — Homepage Design Specification

> **For AI Agents:** This document contains pixel-perfect design specs for building the homepage in React. Follow every section exactly — fonts, colors, spacing, layout, component structure. Do NOT deviate unless a value is marked `[PLACEHOLDER]`.

---

## 📐 DESIGN SYSTEM (Global Tokens)

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#1B4332` | Navbar bg, Hero bg, Active tab bg, Primary buttons |
| `--color-primary-dark` | `#0D2B1F` | Footer bg, deep hover states |
| `--color-accent-orange` | `#FF6B00` | Lightning bolt icons, badge highlights, CTA accents |
| `--color-accent-red` | `#C0392B` | "See more →" links, section action links |
| `--color-page-bg` | `#F2F2EE` | Main page background (entire body) |
| `--color-card-bg` | `#FFFFFF` | All product cards, category cards |
| `--color-text-primary` | `#1A1A1A` | Headings, product names, prices |
| `--color-text-secondary` | `#6B7280` | Subtext, weights, descriptions |
| `--color-text-white` | `#FFFFFF` | All text on dark green background |
| `--color-border` | `#E8E8E0` | Card borders, input borders |
| `--color-add-btn-bg` | `#F0F0E8` | "+ Add" button background on cards |
| `--color-add-btn-hover` | `#E0E0D8` | "+ Add" button hover state |
| `--color-promo-pink` | `#6B1A3A` | Promo card 1 bg (dark maroon-pink) |
| `--color-promo-orange` | `#8B4513` | Promo card 2 bg (dark sienna-orange) |
| `--color-promo-blue` | `#1E3A5F` | Promo card 3 bg (dark navy blue) |
| `--color-promo-purple` | `#4A1A6B` | Promo card 4 bg (dark purple) |
| `--color-app-banner-bg` | `#4A0E3A` | App download banner (dark maroon-purple) |
| `--color-star-yellow` | `#F4C430` | Star rating icons |

### Typography

| Token | Value | Usage |
|---|---|---|
| `--font-family` | `'Poppins', 'DM Sans', sans-serif` | All text site-wide |
| `--font-weight-regular` | `400` | Body text, descriptions |
| `--font-weight-medium` | `500` | Category names, labels |
| `--font-weight-semibold` | `600` | Section headings, nav links |
| `--font-weight-bold` | `700` | Hero headline, price big number, card titles |
| `--font-weight-extrabold` | `800` | Promo card discount numbers |

### Font Sizes

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | `11px` | Small badges, metadata |
| `--text-sm` | `12px` | Product weight/size label, breadcrumbs |
| `--text-base` | `14px` | Product names, filter tab labels, descriptions |
| `--text-md` | `16px` | Sub-headings, price decimal part |
| `--text-lg` | `18px` | Store name in featured store |
| `--text-xl` | `22px` | Section headings ("You might need", "Weekly best selling items") |
| `--text-2xl` | `28px` | Price whole number (large bold price) |
| `--text-3xl` | `32px` | Hero headline line 1 |
| `--text-4xl` | `38px` | Promo card offer amount |
| `--text-hero` | `36px / line-height: 1.2` | Hero headline |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Small tags, badges |
| `--radius-md` | `12px` | Product cards, category cards |
| `--radius-lg` | `16px` | Promo cards, featured store cards, hero banner |
| `--radius-xl` | `24px` | Search bar, filter pill tabs |
| `--radius-full` | `9999px` | Fully rounded pills, avatar circles, add button |

### Spacing Scale

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |

### Shadows

```
--shadow-card: 0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)
--shadow-card-hover: 0 8px 24px rgba(0,0,0,0.10)
--shadow-navbar: 0 2px 12px rgba(0,0,0,0.12)
```

---

## 🏗️ PAGE LAYOUT

```
┌─────────────────────────────────────────┐
│              NAVBAR (sticky)            │  height: 56px, bg: #1B4332
├─────────────────────────────────────────┤
│           HERO BANNER SECTION           │  height: ~220px, bg: #1B4332
├─────────────────────────────────────────┤
│         CATEGORY QUICK LINKS ROW        │  height: ~90px, bg: #FFFFFF cards
├─────────────────────────────────────────┤
│       "YOU MIGHT NEED" SECTION          │  5-col product grid
├─────────────────────────────────────────┤
│         PROMO BANNER CARDS (4)          │  4-col colored cards
├─────────────────────────────────────────┤
│    "WEEKLY BEST SELLING ITEMS" SECTION  │  Filter tabs + 5-col grid
├─────────────────────────────────────────┤
│       FEATURED STORE SECTION            │  3-col store cards
├─────────────────────────────────────────┤
│       APP DOWNLOAD BANNER               │  Full-width dark maroon card
├─────────────────────────────────────────┤
│               FOOTER                    │  bg: #1B4332 (dark maroon bar)
└─────────────────────────────────────────┘
```

**Page max-width:** `780px` (centered), with `padding: 0 20px` on mobile
**Page background:** `#F2F2EE`

---

## 1. NAVBAR

### Container
```
position: sticky
top: 0
z-index: 1000
background: #1B4332
height: 56px
padding: 0 20px
display: flex
align-items: center
justify-content: space-between
gap: 16px
box-shadow: --shadow-navbar
```

### Left — Hamburger + Logo
```
display: flex
align-items: center
gap: 10px
```

**Hamburger Icon:**
```
color: #FFFFFF
width: 20px
height: 20px
cursor: pointer
```

**Logo:**
```
display: flex
align-items: center
gap: 6px
```
- Icon: Small shopping cart / agarbati diya icon, color: `#FFD700` (golden yellow), size: `22px`
- Brand Text: `"Sugandh"` (or your brand name)
  - font-size: `18px`
  - font-weight: `700`
  - color: `#FFFFFF`
  - font-family: `Poppins`

### Center — Search Bar
```
flex: 1
max-width: 340px
position: relative
```

**Input:**
```
width: 100%
height: 36px
border-radius: 9999px
border: none
outline: none
padding: 0 16px 0 40px
font-size: 13px
font-family: Poppins
color: #1A1A1A
background: #FFFFFF
placeholder-color: #9CA3AF
```

**Search Icon (inside input, left):**
```
position: absolute
left: 14px
top: 50%
transform: translateY(-50%)
color: #9CA3AF
width: 16px
height: 16px
```

**Placeholder text:** `"Search for Agarbati, Dhoop, Pooja items..."`

### Right — Delivery Badge + Cart + Avatar
```
display: flex
align-items: center
gap: 14px
```

**Delivery Badge:**
```
display: flex
align-items: center
gap: 4px
font-size: 12px
color: #FFFFFF
white-space: nowrap
```
- Lightning bolt icon: `⚡` or SVG, color: `#FF6B00`, size: `14px`
- Text: `"Order now and get it within "` normal weight
- `"30 min!"` — font-weight: `600`, color: `#FFD700` (golden)

**Cart Icon:**
```
position: relative
color: #FFFFFF
width: 22px
height: 22px
cursor: pointer
```
Cart Badge:
```
position: absolute
top: -6px
right: -6px
background: #FF6B00
color: #FFFFFF
border-radius: 9999px
width: 16px
height: 16px
font-size: 10px
font-weight: 700
display: flex
align-items: center
justify-content: center
```

**User Avatar:**
```
width: 32px
height: 32px
border-radius: 9999px
border: 2px solid rgba(255,255,255,0.4)
object-fit: cover
cursor: pointer
```

---

## 2. HERO BANNER SECTION

### Container
```
background: #1B4332
margin: 0
padding: 32px 24px 0 32px
border-radius: 0 0 20px 20px   ← only bottom corners rounded
min-height: 210px
display: flex
align-items: flex-end
justify-content: space-between
position: relative
overflow: hidden
```

**Subtle Background Pattern:** Thin SVG doodle pattern (grocery/food related lines, circles, leaf shapes) in `rgba(255,255,255,0.05)` overlay.

### Left — Text Content
```
display: flex
flex-direction: column
gap: 12px
padding-bottom: 32px
max-width: 55%
```

**Headline H1:**
```
font-size: 34px
font-weight: 700
color: #FFFFFF
line-height: 1.2
margin: 0
```
Text (2 lines):
> **"We bring divine**
> **fragrance to your door"**

**Sub-description:**
```
font-size: 13px
font-weight: 400
color: rgba(255,255,255,0.80)
line-height: 1.5
max-width: 280px
margin: 0
```
Text:
> *"Get premium agarbati, dhoop & pooja essentials delivered at up to 4% off on every order."*

**CTA Button — "Shop now":**
```
display: inline-flex
align-items: center
background: #FFFFFF
color: #1B4332
font-size: 14px
font-weight: 600
font-family: Poppins
padding: 10px 22px
border-radius: 9999px
border: none
cursor: pointer
width: fit-content
margin-top: 4px
transition: background 0.2s
```
Hover: `background: #F0F0E8`

### Right — Product Image
```
width: 45%
display: flex
align-items: flex-end
justify-content: center
```
- Image: Agarbati product bundle / incense sticks image in a decorative bag or diya holder
- Image height: `180px`, `object-fit: contain`
- The image bleeds slightly out from bottom of the banner card (bottom of image aligns to container bottom)

---

## 3. CATEGORY QUICK LINKS ROW

### Section Container
```
padding: 20px 0
display: flex
gap: 12px
overflow-x: auto
scrollbar: none (hide scrollbar)
```

### Each Category Card
```
min-width: 130px
background: #FFFFFF
border-radius: 12px
padding: 12px 16px
display: flex
align-items: center
justify-content: space-between
cursor: pointer
flex-shrink: 0
box-shadow: --shadow-card
transition: box-shadow 0.2s
```
Hover: `box-shadow: --shadow-card-hover`

**Left — Text Block:**
```
display: flex
flex-direction: column
gap: 2px
```
- Category Name: `font-size: 14px`, `font-weight: 600`, `color: #1A1A1A`
- Sub Label: `font-size: 11px`, `font-weight: 400`, `color: #6B7280`

**Right — Category Icon/Image:**
```
width: 40px
height: 40px
object-fit: contain
```

### 6 Categories for Agarbati Site

| # | Category Name | Sub Label | Icon |
|---|---|---|---|
| 1 | Agarbati | Classic sticks | 🪔 incense stick icon |
| 2 | Dhoop Cones | Premium cones | Cone incense icon |
| 3 | Sambrani | Natural resin | Smoke/vapor icon |
| 4 | Pooja Thali | Ritual kits | Plate with items icon |
| 5 | Essential Oils | Aromatic blends | Oil bottle icon |
| 6 (last) | **See all** | *(no sub label)* | `→` arrow in green circle |

**"See all" card special style:**
```
background: #1B4332
```
- Arrow icon: white SVG arrow in white circle, or just `→`
- Text "See all": `color: #FFFFFF`, same size

---

## 4. "YOU MIGHT NEED" SECTION

### Section Header Row
```
display: flex
align-items: center
justify-content: space-between
padding: 24px 0 16px 0
```

**Left — Section Title:**
```
font-size: 22px
font-weight: 700
color: #1A1A1A
font-family: Poppins
```
Text: `"You might need"`

**Right — "See more →" Link:**
```
font-size: 14px
font-weight: 500
color: #C0392B
cursor: pointer
display: flex
align-items: center
gap: 4px
text-decoration: none
```
- Arrow: `→` (text or SVG), same red color

### Product Cards Grid
```
display: grid
grid-template-columns: repeat(5, 1fr)
gap: 14px
```

### Each Product Card
```
background: #FFFFFF
border-radius: 14px
border: 1px solid #E8E8E0
padding: 16px 12px 12px 12px
display: flex
flex-direction: column
align-items: center
gap: 8px
cursor: pointer
box-shadow: --shadow-card
transition: box-shadow 0.2s, transform 0.2s
```
Hover:
```
box-shadow: --shadow-card-hover
transform: translateY(-2px)
```

**Product Image:**
```
width: 110px
height: 110px
object-fit: contain
margin-bottom: 4px
```

**Product Name:**
```
font-size: 14px
font-weight: 500
color: #1A1A1A
text-align: center
line-height: 1.4
font-family: Poppins
```
(2 lines max, text-overflow: ellipsis)

**Weight / Quantity Label:**
```
font-size: 12px
font-weight: 400
color: #6B7280
text-align: center
```
Example: `"50 sticks"` or `"100 gm."`

**Price Display — SPECIAL FORMAT:**
```
display: flex
align-items: baseline
gap: 1px
width: 100%
padding: 2px 0
```
- Main number (e.g. `"17."`) :
  ```
  font-size: 26px
  font-weight: 700
  color: #1A1A1A
  font-family: Poppins
  ```
- Decimal + currency (e.g. `"29₹"` or `"29$"`) :
  ```
  font-size: 14px
  font-weight: 700
  color: #1A1A1A
  vertical-align: super   ← superscript style
  ```

**"+" Add to Cart Button:**
```
width: 100%
height: 36px
background: #F0F0E8
border-radius: 8px
border: none
font-size: 20px
font-weight: 400
color: #1A1A1A
cursor: pointer
display: flex
align-items: center
justify-content: center
margin-top: 4px
transition: background 0.15s
```
Hover: `background: #E0E0D8`

**When item is added to cart — Counter replaces "+" button:**
```
width: 100%
height: 36px
background: #F0F0E8
border-radius: 8px
display: flex
align-items: center
justify-content: space-between
padding: 0 12px
```
- `−` button: green circle (`background: #1B4332`, `color: #FFFFFF`, `border-radius: 50%`, `width: 24px`, `height: 24px`)
- Count number: `font-size: 16px`, `font-weight: 700`, `color: #1A1A1A`
- `+` button: same green circle style as `−`

### Sample Products (Agarbati)

| Product Name | Weight | Price |
|---|---|---|
| Cycle Agarbati (Pooja) | 50 sticks | ₹17.29 |
| Satya Nag Champa | 40 sticks | ₹29.99 |
| Hem Gold Incense | 20 sticks | ₹14.49 |
| Mogra Agarbati | 50 sticks | ₹19.29 |
| Gulab Rose Agarbati | 100 sticks | ₹22.99 |

---

## 5. PROMO BANNER CARDS (4 Column Grid)

### Container
```
display: grid
grid-template-columns: repeat(4, 1fr)
gap: 16px
padding: 28px 0
```

### Each Promo Card
```
border-radius: 16px
padding: 20px 16px 0 16px
display: flex
flex-direction: column
justify-content: space-between
overflow: hidden
position: relative
min-height: 180px
```

**Top Section (text area):**
```
display: flex
justify-content: space-between
align-items: flex-start
```

**Left — Offer Text:**
```
display: flex
flex-direction: column
gap: 4px
```
- Label (e.g. `"Save"` / `"Discount"` / `"Up to"` / `"Free"`):
  ```
  font-size: 14px
  font-weight: 600
  color: rgba(255,255,255,0.90)
  ```
- Amount (e.g. `"₹299"` / `"30%"` / `"50%"` / `"SHIP"`):
  ```
  font-size: 36px
  font-weight: 800
  color: #FFFFFF
  line-height: 1
  ```
- Description:
  ```
  font-size: 11px
  font-weight: 400
  color: rgba(255,255,255,0.75)
  line-height: 1.5
  max-width: 110px
  margin-top: 6px
  ```

**Right — Decorative Icon:**
```
width: 32px
height: 32px
opacity: 0.6
```
(Sun rays / sparkle / medal / gift box SVG icons in white)

**Bottom — Product Image:**
```
width: 100%
display: flex
justify-content: flex-end
margin-top: 12px
```
Product image: `height: 90px`, `object-fit: contain`

### 4 Promo Cards for Agarbati

| Card | BG Color | Label | Amount | Description | Product Image |
|---|---|---|---|---|---|
| 1 | `#6B1A3A` (dark maroon-pink) | `"Save"` | `"₹299"` | Enjoy discount on all types of Pooja & fragrance items | Agarbati bundle pack |
| 2 | `#8B4513` (sienna-orange) | `"Discount"` | `"30%"` | Enjoy discount on all types of Pooja & fragrance items | Dhoop cone box |
| 3 | `#1E3A5F` (dark navy blue) | `"Up to"` | `"50%"` | Enjoy discount on all types of Pooja & fragrance items | Sambrani cup pack |
| 4 | `#4A1A6B` (dark purple) | `"Free"` | `"SHIP"` | Enjoy discount on all types of Pooja & fragrance items | Essential oil bottle |

---

## 6. "WEEKLY BEST SELLING ITEMS" SECTION

### Section Header Row
```
display: flex
align-items: center
justify-content: space-between
padding: 8px 0 16px 0
```
**Title:** Same style as section 4 — `font-size: 22px`, `font-weight: 700`, `color: #1A1A1A`
Text: `"Weekly best selling items"`

**"See more →":** Same red link style as section 4.

### Category Filter Tabs Row
```
display: flex
gap: 8px
padding-bottom: 20px
flex-wrap: wrap
```

**Each Tab — Default State:**
```
padding: 7px 16px
border-radius: 9999px
border: 1px solid #D1D5DB
background: #FFFFFF
font-size: 13px
font-weight: 500
color: #1A1A1A
cursor: pointer
white-space: nowrap
transition: all 0.15s
```

**Each Tab — Active/Selected State:**
```
background: #1B4332
border-color: #1B4332
color: #FFFFFF
font-weight: 600
```

**Filter Tab Labels (Agarbati):**
`Agarbati` | `Dhoop Cones` (active default) | `Sambrani` | `Essential Oils` | `Pooja Kits` | `Gift Packs` | `Organic` | `Premium`

### Product Grid
Exact same 5-column grid and card design as Section 4 ("You might need")

### Sample Products
| Product Name | Weight | Price |
|---|---|---|
| Cycle Brand Agarbati | 50 sticks | ₹17.29 |
| Deshi Chandan | 40 sticks | ₹07.29 |
| Kesar Rose Dhoop | 20 cones | ₹13.29 |
| Sandalwood Agarbati | 50 sticks | ₹17.29 |
| Jasmine Mogra | 100 sticks | ₹14.29 |

---

## 7. FEATURED STORE SECTION

### Section Header Row
Same pattern — Title left, link right.
**Title:** `"Featured brands"` — `font-size: 22px`, `font-weight: 700`
**Link:** `"Visit all brands →"` — red link style

### Cards Grid
```
display: grid
grid-template-columns: repeat(3, 1fr)
gap: 16px
padding-bottom: 28px
```

### Each Featured Brand Card
```
background: #FFFFFF
border-radius: 16px
overflow: hidden
cursor: pointer
box-shadow: --shadow-card
transition: box-shadow 0.2s, transform 0.2s
```
Hover: `transform: translateY(-2px)`, `box-shadow: --shadow-card-hover`

**Top Colorful Banner (image area):**
```
height: 90px
position: relative
display: flex
align-items: center
justify-content: flex-start
padding: 12px 16px
```
Background: solid color (card 1: `#FF6B00`, card 2: `#5B2D8E`, card 3: `#00C9A7`)

Faint doodle/wave pattern on the banner in slightly lighter version of same color.

**Brand Logo Circle:**
```
width: 52px
height: 52px
border-radius: 9999px
background: #FFFFFF
border: 3px solid rgba(255,255,255,0.4)
display: flex
align-items: center
justify-content: center
overflow: hidden
```
Logo image: `40px × 40px`, `object-fit: contain`

**Bottom Info Area:**
```
padding: 14px 16px 16px 16px
```

- Brand Name: `font-size: 17px`, `font-weight: 700`, `color: #1A1A1A`, `margin-bottom: 4px`
- Delivery Badge Row:
  ```
  display: flex
  align-items: center
  gap: 4px
  ```
  - `⚡` icon: `color: #FF6B00`, `font-size: 13px`
  - Text `"Delivery in 30 minutes"`: `font-size: 13px`, `font-weight: 500`, `color: #6B7280`

### 3 Featured Brands

| Brand | Banner BG | Brand Name | Sub |
|---|---|---|---|
| 1 | `#FF6B00` (orange) | Cycle Agarbati | Delivery in 30 minutes |
| 2 | `#5B2D8E` (purple) | Hem Incense | Delivery in 30 minutes |
| 3 | `#00C9A7` (teal) | Satya Nag Champa | Delivery in 30 minutes |

---

## 8. APP DOWNLOAD BANNER

### Container
```
background: #4A0E3A
border-radius: 16px
padding: 40px 40px 0 40px
margin: 8px 0 32px 0
display: flex
align-items: flex-end
justify-content: space-between
overflow: hidden
position: relative
min-height: 200px
```

Faint wave/swirl decorative pattern: `rgba(255,255,255,0.04)` overlay SVG

### Left — Text + Buttons
```
display: flex
flex-direction: column
gap: 16px
padding-bottom: 40px
max-width: 55%
```

**Headline:**
```
font-size: 26px
font-weight: 700
color: #FFFFFF
line-height: 1.3
```
Text: `"Stay Home and Get All Your Pooja Essentials From Our Store!"`

**Sub Text:**
```
font-size: 13px
font-weight: 400
color: rgba(255,255,255,0.75)
```
Text: `"Download the app from App Store or Google Play"`

**Download Buttons Row:**
```
display: flex
gap: 12px
flex-wrap: wrap
```

Both buttons use official store badge images (actual Google Play / App Store badge PNG assets):
- Image height: `40px`
- `cursor: pointer`
- `border-radius: 8px`
- `overflow: hidden`

### Right — Delivery Person Image
```
width: 40%
display: flex
align-items: flex-end
justify-content: center
```
- Image: Delivery person / person in traditional Indian attire holding agarbati/incense products
- Height: `180px`, `object-fit: contain`
- Image bleeds to the bottom of the card

---

## 9. FOOTER

### Container
```
background: #1B4332
padding: 0
height: 8px
margin-top: 0
```
*(Minimal footer bar — just a closing color band. Can be extended with full footer links as needed.)*

---

## 🃏 PRODUCT DETAIL CARD (Modal / Carousel Slide)

> Shown as a carousel modal overlay on product click.

### Container
```
background: #FFFFFF
border-radius: 20px
padding: 24px
display: grid
grid-template-columns: 1fr 1fr
gap: 32px
max-width: 700px
margin: 0 auto
position: relative
```

### Left — Image Gallery
**Discount Badge:**
```
position: absolute
top: 16px
left: 16px
background: #1B4332
color: #FFFFFF
border-radius: 50%
width: 60px
height: 60px
display: flex
flex-direction: column
align-items: center
justify-content: center
font-size: 18px
font-weight: 700
text-align: center
```
Text: `"70%"` on line 1, `"DISCOUNT"` on line 2 in `font-size: 9px`

**Main Image:**
```
width: 100%
height: 220px
object-fit: contain
border-radius: 12px
background: #F8F8F4
```

**Thumbnail Strip:**
```
display: flex
gap: 10px
margin-top: 12px
```
Each thumbnail:
```
width: 68px
height: 68px
border-radius: 10px
border: 2px solid #E8E8E0
object-fit: contain
background: #F8F8F4
cursor: pointer
```
Active thumbnail: `border: 2px solid #1B4332`

**Carousel Dots (below thumbnails):**
```
display: flex
gap: 6px
justify-content: center
margin-top: 12px
```
- Active dot: `width: 20px`, `height: 6px`, `border-radius: 3px`, `background: #C0392B`
- Inactive dot: `width: 6px`, `height: 6px`, `border-radius: 50%`, `background: #D1D5DB`

### Right — Product Info
**Countdown Timer:**
```
display: flex
align-items: center
gap: 8px
font-size: 14px
color: #C0392B
margin-bottom: 8px
```
- Clock icon: SVG, `color: #C0392B`, `16px`
- Time: `"270 : 13 : 10 : 32"` — `font-size: 16px`, `font-weight: 600`, `color: #C0392B`

**Store Name:**
```
font-size: 13px
color: #6B7280
margin-bottom: 4px
```

**Product Name H2:**
```
font-size: 22px
font-weight: 700
color: #1A1A1A
line-height: 1.3
margin-bottom: 8px
```

**Star Rating Row:**
```
display: flex
align-items: center
gap: 6px
margin-bottom: 12px
```
- Star icon: `⭐` filled, `color: #F4C430`, `16px`
- Rating text: `"4.5 Rating"` — `font-size: 14px`, `font-weight: 600`, `color: #1A1A1A`
- Review count: `"(15 reviews)"` — `font-size: 13px`, `color: #6B7280`

**Price:**
Same superscript format as product cards but larger:
- Main number: `font-size: 32px`, `font-weight: 700`
- Decimal + ₹: `font-size: 18px`, `font-weight: 700`, `vertical-align: super`

**Action Buttons Row:**
```
display: flex
gap: 12px
margin: 16px 0
```

**"Add to bucket" button:**
```
flex: 1
height: 44px
border: 2px solid #1B4332
border-radius: 9999px
background: #FFFFFF
color: #1B4332
font-size: 14px
font-weight: 600
display: flex
align-items: center
justify-content: center
gap: 8px
cursor: pointer
```
- Cart icon: SVG, `color: #1B4332`, `18px`

**"Buy now" button (Green filled):**
```
flex: 1
height: 44px
border-radius: 9999px
background: #1B4332
color: #FFFFFF
font-size: 14px
font-weight: 600
border: none
display: flex
align-items: center
justify-content: center
gap: 8px
cursor: pointer
```

**Secondary Actions Row:**
```
display: flex
gap: 20px
font-size: 13px
color: #6B7280
margin-bottom: 16px
```
- Heart icon + `"ADD TO WISHLIST"`
- Compare icon + `"Compare with other vendor"`

**User Avatars + Sold Count Row:**
```
display: flex
align-items: center
gap: 8px
```
- 3 small overlapping user avatars: `width: 24px`, `height: 24px`, `border-radius: 50%`, `border: 2px solid #FFFFFF`
- 🔥 fire emoji + `"100 sold in last 35 hour"` — `font-size: 13px`, `color: #FF4500`

**Product Meta:**
```
margin-top: 12px
font-size: 13px
color: #6B7280
line-height: 2
```
- `SKU: AG3442`
- `Categories:` links in `color: #1B4332`, underline on hover

**Description:**
```
font-size: 13px
color: #6B7280
line-height: 1.6
margin-top: 8px
```

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Columns | Notes |
|---|---|---|
| Desktop (>768px) | 5 product cols, 4 promo cols, 3 store cols | Full layout as described |
| Tablet (600–768px) | 3 product cols, 2 promo cols, 2 store cols | Reduce columns |
| Mobile (<600px) | 2 product cols, 1 promo col (scroll), 1 store col (scroll) | Horizontal scroll for categories and promos |

---

## ⚛️ REACT COMPONENT TREE

```
<App>
  <Navbar />
  <main style={{ background: '#F2F2EE', padding: '0 20px', maxWidth: '780px', margin: '0 auto' }}>
    <HeroBanner />
    <CategoryQuickLinks />
    <ProductSection title="You might need" products={youMightNeedProducts} />
    <PromoBannerCards />
    <ProductSection
      title="Weekly best selling items"
      products={weeklyBestProducts}
      showFilterTabs={true}
      filterTabs={['Agarbati', 'Dhoop Cones', 'Sambrani', 'Essential Oils', 'Pooja Kits', 'Gift Packs', 'Organic', 'Premium']}
    />
    <FeaturedBrands />
    <AppDownloadBanner />
  </main>
  <Footer />
</App>
```

---

## 🔧 TECH STACK (Recommended)

```
Framework:      React 18 + Vite
Styling:        Tailwind CSS (or plain CSS Modules with the tokens above)
Icons:          react-icons (Heroicons / Feather icons)
Fonts:          Google Fonts — Poppins (400, 500, 600, 700, 800)
State:          useState for cart counter, active filter tab
Images:         Local /assets or Unsplash placeholder URLs
```

**Google Font import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## ✅ IMPLEMENTATION CHECKLIST FOR AI AGENT

- [ ] Set `body { background: #F2F2EE; font-family: 'Poppins', sans-serif; margin: 0; }`
- [ ] Sticky Navbar with dark green bg, search pill, cart badge
- [ ] Hero banner dark green with white headline + CTA button + product image
- [ ] Horizontal scrollable category row with 6 cards (last one green "See all")
- [ ] "You might need" 5-col grid with special superscript price format
- [ ] "+" button that transforms into `− count +` counter on click
- [ ] 4-col promo cards with dark colored backgrounds and product images at bottom
- [ ] "Weekly best selling" with pill filter tabs (active = dark green)
- [ ] Featured brands with colored top banner + logo circle
- [ ] App download banner (dark maroon-purple with download buttons)
- [ ] Minimal footer bar in dark green
- [ ] All hover transitions: `transition: all 0.2s ease`
- [ ] All `border-radius` values match tokens exactly
- [ ] Section heading + "See more →" pattern repeated consistently
