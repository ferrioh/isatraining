---
name: Atelier Athletic
colors:
  surface: '#fef7ff'
  surface-dim: '#ded7e4'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1fe'
  surface-container: '#f3ebf8'
  surface-container-high: '#ede5f2'
  surface-container-highest: '#e7e0ed'
  on-surface: '#1d1a23'
  on-surface-variant: '#594046'
  inverse-surface: '#322f38'
  inverse-on-surface: '#f6eefb'
  outline: '#8c7076'
  outline-variant: '#e0bec5'
  surface-tint: '#b80b5d'
  primary: '#b5055b'
  on-primary: '#ffffff'
  primary-container: '#d72d73'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb1c5'
  secondary: '#705862'
  on-secondary: '#ffffff'
  secondary-container: '#f8d7e3'
  on-secondary-container: '#755c66'
  tertiary: '#b10e6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#d23284'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e1'
  primary-fixed-dim: '#ffb1c5'
  on-primary-fixed: '#3f001b'
  on-primary-fixed-variant: '#8f0046'
  secondary-fixed: '#fbdae6'
  secondary-fixed-dim: '#debeca'
  on-secondary-fixed: '#28161e'
  on-secondary-fixed-variant: '#57404a'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#fef7ff'
  on-background: '#1d1a23'
  surface-variant: '#e7e0ed'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.1em
  metric-counter:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies an elite personal training atelier: athletic discipline translated through haute couture refinement. Built for discerning private trainers and high-net-worth clientele, the aesthetic merges the visceral energy of high-performance fitness with the poise of luxury fashion editorial.

The visual style blends **Glassmorphism** with **Minimalist Editorial Luxury**. Surfaces rely on layered, luminous frosted glass panels floating above delicate blush atmospheric gradients, anchored by razor-thin specular borders and soft radiant glows. The tactile quality is airy, luminous, and refined—delivering an emotional impression of bespoke exclusivity, motivation, and effortless composure.

## Colors

The palette leverages a curated spectrum of warm pinks, luminous champagnes, and grounding charcoals:

- **Canvas & Backgrounds**: The base environment operates in `#FDF2F4` (Blush Base), subtly bathed in radial background gradients shifting into `#FCE7F0` and `#F8D7E3` (Champagne Pink).
- **Primary Accent (`#E0357A`)**: A vibrant, resolute magenta rose utilized for primary interactive states, completed goals, key action buttons, and active metric dials.
- **Secondary Surface (`#F8D7E3`)**: Used for soft tonal container tints, inactive metric track rings, and pill button hover states.
- **Tertiary Accent (`#EC4899`)**: High-luminosity fuchsia employed sparingly for progress glows, live pulse indicators, and active session highlights.
- **Neutral & Text (`#1E1B24`)**: Deep obsidian charcoal ensures strict legibility, structural authority, and stark luxury contrast against translucent pale surfaces. Muted body text shifts to `#5C5564` (Slate Rose), and subtle borders sit at `rgba(224, 53, 122, 0.12)`.

## Typography

The type hierarchy balances sculptural beauty with technical precision:

- **Display & Headings (Epilogue)**: Imparts editorial confidence and high-fashion rhythm to routine titles, program tiers, and client greetings.
- **Body & Editorial (Outfit)**: Delivers ultra-clean, contemporary readability across client notes, performance feedback, and routine descriptions.
- **Data, Counters & Badges (Space Grotesk)**: Renders rep counts, timers, set intervals, heart rate metrics, and payment states with athletic, technical precision.
- **Letter Spacing**: Labels and counter prefixes apply deliberate positive tracking for a curated haute-horlogerie effect, while display headlines use slight negative tracking for impactful presence.

## Layout & Spacing

The layout philosophy uses a disciplined **fluid grid** optimized for mobile-first personal training workflows while smoothly adapting to tablet coaching boards and desktop management suites:

- **Mobile Viewports (<640px)**: 4-column layout with strict edge margins (`1.25rem`) maximizing touch real estate. Vertical flow prioritizes glanceable daily sessions and fast KPI telemetry.
- **Tablet Coaching Canvas (640px–1024px)**: 8-column layout with `2rem` margins, enabling side-by-side routines and biometrics telemetry.
- **Desktop Concierge (1024px+)**: 12-column layout with `3rem` margins and max container width of `1280px`, hosting multi-client schedule matrices and financial analytics.
- **Rhythm & Proportions**: Component padding scales along the 4px baseline (`space-xs` through `space-xl`). Card interiors maintain balanced internal air (`space-lg`) to preserve visual breathability across glass overlays.

## Elevation & Depth

Visual hierarchy rejects heavy, murky drop shadows in favor of **Glassmorphism with Specular Radiance**:

- **Surface Base**: Solid backdrop tinted in `#FDF2F4` layered with ambient radial glow swatches (`rgba(248, 215, 227, 0.4)` and `rgba(224, 53, 122, 0.08)`).
- **Glassmorphic Cards (Level 1)**: Translucent milky fill (`rgba(255, 255, 255, 0.65)`), backed by `backdrop-blur(16px)` and edged with a 1px composite outline (`border: 1px solid rgba(255, 255, 255, 0.8)` on the top edge, tapering to `rgba(224, 53, 122, 0.15)` on the bottom). Ambient shadow: `0 8px 32px -4px rgba(30, 27, 36, 0.04)`.
- **Floating Modals & Active Sheets (Level 2)**: Translucent fill (`rgba(255, 255, 255, 0.85)`), `backdrop-blur(24px)`, bounded by a subtle specular rim (`rgba(255, 255, 255, 0.95)`), elevated by `0 16px 40px -8px rgba(224, 53, 122, 0.12)`.
- **Active Accents & Primary Triggers**: Backlit with an ambient halo (`0 6px 20px rgba(224, 53, 122, 0.35)`), creating an energetic lift that signals interactivity and momentum.

## Shapes

The shape system embraces **Pill-shaped (Level 3)** geometry to evoke organic human movement, ergonomic handling, and effortless grace.

- **Primary Interactive Targets**: Buttons, filter chips, tags, and progress capsules utilize continuous true pill radii (`9999px` / `rounded-full`).
- **Cards & Content Panels**: Use generous `rounded-xl` (2.5rem to 3rem) corner radii, giving glass surfaces smooth, pebble-like contours.
- **Inputs & Status Badges**: Retain continuous circular ends, creating harmony with numeric metric counters and circular progress rings.

## Components

### Buttons & Actions
- **Primary Pill Action**: Gradient fill from `#E0357A` to `#EC4899`, white Space Grotesk uppercase text, pill-shaped (`9999px`), glowing drop shadow (`0 8px 24px rgba(224, 53, 122, 0.3)`).
- **Secondary Glass Pill**: Semi-transparent frosted fill (`rgba(255, 255, 255, 0.5)`), `backdrop-blur(12px)`, border in `rgba(224, 53, 122, 0.25)`, text in Obsidian Charcoal (`#1E1B24`).

### Routine Planning Cards
- Frosted glass slab (`rgba(255, 255, 255, 0.6)`), 24px internal padding, `rounded-xl`.
- Header featuring exercise title in Epilogue, accompanied by rep/set badges rendered in pill tags (`rgba(248, 215, 227, 0.6)`).
- Completion check using a custom ring button that shifts from faint rose outline to solid magenta rose fill with an elastic scale transition.

### Fitness Metrics Trackers
- Circular and horizontal glass gauges with track background in `#F8D7E3` and filled progress stroke in `#E0357A`.
- Metric Counter centered using Space Grotesk 700 with a diminutive uppercase unit label (`BPM`, `KCAL`, `KG`) in `#5C5564`.

### Payment & Client Status Badges
- Ultra-compact pill badges (`padding: 4px 12px`, Space Grotesk label font, `uppercase`, tracked +0.08em).
- **Paid / Active**: Luminous emerald rose tint (`rgba(16, 185, 129, 0.08)` surface, `#0D9488` text, soft green-rose glow).
- **Pending / In Session**: Champagne tint (`rgba(224, 53, 122, 0.1)` surface, `#E0357A` text).
- **Overdue**: Delicate coral crimson tint (`rgba(239, 68, 68, 0.1)` surface, `#DC2626` text).

### Form Inputs & Selectors
- Frosted container (`rgba(255, 255, 255, 0.75)`), pill border (`1px solid rgba(224, 53, 122, 0.2)`), inner shadow for tactile depth.
- Floating labels in Outfit body-sm transitioning to Space Grotesk accent pink on focus.