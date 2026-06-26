# Sugandh E-Commerce: UI/UX Testing & Punishment System
**Version 1.0 (Strict Quality Control Guidelines)**

This document defines the quality standards, audit procedures, and correction guidelines for the coding agent. It acts as a system to enforce zero-tolerance for visual discrepancies, bad spacing, overlapping texts, generic placeholders, and poor responsiveness.

---

## 1. The Core Philosophy
A premium luxury e-commerce experience requires flawless precision. The user should be wowed at first glance. Any deviation from the reference design, layout shift, or missing interaction is considered a **Quality Defect** and triggers the **Agent Punishment Protocol**.

---

## 2. Penalty Point System
The Agent starts with a **Quality Score of 100**. Deductions are made for each type of infraction detected during UI audits.

| Infraction Class | Description | Penalty Points |
| :--- | :--- | :---: |
| **Class A: Broken Experience** | Non-functional buttons, broken state tracking, or non-interactive active elements. | **30 pts** |
| **Class B: Placeholder Usage** | Generic Unsplash image URLs, missing assets, emoji placeholders, or low-res illustrations. | **20 pts** |
| **Class C: Layout Deviation** | Elements not matching columns, wrong alignment, vertical/horizontal centering mismatch. | **15 pts** |
| **Class D: Typography & Overflow** | Clipping names, text wraps overlapping other items, poor font hierarchy, horizontal overflows. | **15 pts** |
| **Class E: Missing Polishing** | Lack of micro-interactions on hover, click animations, drawer entry transitions, or GSAP errors. | **10 pts** |

### Grading Thresholds:
*   **95 – 100 pts**: **Divine Standard** (Passes visual inspection).
*   **90 – 94 pts**: **Minor Warning** (Needs instant correction within 1 turn).
*   **< 90 pts**: **Failed Build** (Deduction triggers a mandatory self-corrective audit).

---

## 3. UI/UX Verification Checklist
To confirm a task is completed, the agent must run through these checks:

### 1. Grid & Flex Spacing
- [ ] Columns use proportional widths (`grid-cols-[6fr_5fr]` for side-by-side components of varying counts) so cards have the exact same pixel width.
- [ ] No hardcoded heights on cards unless matched exactly with a sibling card.
- [ ] Horizontal scroll handles are disabled on desktop, and scrollbars are hidden using custom utility classes (`scrollbar-hide`).

### 2. Assets & Media
- [ ] No generic Unsplash URLs or placeholder images.
- [ ] All images have clean blending (`mix-blend-multiply` or solid matching backgrounds) to blend with the cream backdrop.
- [ ] Image ratios are locked (`aspect-square` or custom rectangle) to prevent stretching.

### 3. Micro-Interactions
- [ ] Buttons scale slightly on click (`active:scale-95`).
- [ ] Card hover states transition smoothly with shadow changes (`hover:shadow-lg transition-all duration-300`).
- [ ] GSAP transitions do not trigger console warnings (all query selectors are validated).

---

## 4. Defect Ledger & Corrective Log
All previous defects found in this project and the corresponding fixes are recorded below.

### Log #1: Trust Badges Alignment Mismatch (Class C defect)
*   **Infraction**: Badges in footer had staggered wrapping on mobile and uneven borders.
*   **Correction**: Refactored `Footer.jsx` to use a flex layout with thin vertical dividers and proportional spacing.
*   **Penalty**: -15 points (Resolved).

### Log #2: Card Height & Width Mismatch (Class C & D defect)
*   **Infraction**: Fragrance cards were shorter and wider than bestseller cards.
*   **Correction**: Implemented `grid-cols-[6fr_5fr]` on `MidSection` so cards have identical width, and matched container height properties to `h-[220px] sm:h-[235px] lg:h-[220px] xl:h-[245px]`.
*   **Penalty**: -15 points (Resolved).

### Log #3: Cart Item Placeholder (Class B defect)
*   **Infraction**: Cart item drawer used generic emoji and gradient backdrop instead of actual rendered packaging images.
*   **Correction**: Replaced placeholder styling in `CartDrawer.jsx` with actual product image tags matching the shop thumbnails.
*   **Penalty**: -20 points (Resolved).
