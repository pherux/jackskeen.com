# Visual Design System

## 1. Color

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand primary | `--night` | `#0b2738` | Header, hero, strong CTA panels, media frames |
| Brand depth | `--night-deep` | `#071e2c` | Footer and the darkest layered surfaces |
| Reading background | `--paper` | `#fbf9f5` | Primary editorial canvas |
| Soft background | `--secondary` | `#f1ede6` | Muted controls and quiet distinctions |
| Primary text | `--ink` | `#332f2b` | Long-form and light-surface headings |
| Inverse text | `--ivory` | `#f8f4ed` | Text on deep blue |
| Action accent | `--coral` | `#d86a4d` | Primary CTA, focus, active nodes, short rules |
| Divider | `--paper-line` | `#ddd7cf` | Editorial grids and boundaries |

Deep blue is the brand's primary color. Clay remains an action accent rather than a
second brand field. It should occupy materially less surface area than blue or paper.

Contrast rules:

- Ivory on brand primary for large and normal text.
- Ink on paper for all reading content.
- Clay on paper only for labels, rules, and sufficiently weighted controls; never
  use it for long text.
- Focus uses a 2px clay outline with a 4px offset.

## 2. Typography

- Display: Cormorant Garamond 400/500 via `next/font`.
- Sans/body: Manrope 400/500/600 via `next/font`.
- Hero display: fluid 48–112px, line-height 0.9–1.02, slightly negative tracking.
- Page display: fluid 56–112px, line-height about 0.9.
- Section display: fluid 40–72px, line-height 0.98.
- Reading body: 16–20px depending on template, 1.6–1.8 line-height, maximum measure
  42–46rem.
- Labels/navigation: 10–13px, Manrope 600 where needed, restrained tracking.

Display typography carries hierarchy. Uppercase is reserved for short labels and the
brand lockup, never paragraphs.

## 3. Spacing and grid

Base spacing sequence: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

- Maximum canvas: 1440px.
- Editorial container: 1440px with fluid side padding of 44–104px.
- Reading measure: 672–736px.
- Desktop templates use two columns only when the relationship is meaningful.
- Tablet collapses tertiary columns before reducing text size.
- Mobile uses 20–24px side padding and one clear reading column.
- Dividers create structure; whitespace creates grouping. Cards are exceptional.

## 4. Header and navigation

Desktop uses the brand at left, four primary links centered, and `Start Your Roadmap`
at right. Height is approximately 62px. Navigation underline motion is 180ms.

Mobile uses the brand and a labelled Menu control. The open panel must identify the
current route, lock page scroll, close on Escape and route selection, return focus to
the trigger, and maintain 44px targets.

## 5. Buttons and links

- Primary: solid clay, white text, squared 2px radius.
- Inverse secondary: transparent, ivory border/text, deep-blue hover inversion.
- Light-surface secondary: transparent, clay border/text, clay fill on hover.
- Editorial link: text with a short underline or directional language.
- Minimum interactive height: 44px for touch contexts; current desktop compact
  controls may visually measure 38px only when the hit area remains 44px.

No pill buttons, large radii, glossy effects, or drop shadows.

## 6. Forms

Labels remain visible above every control. Inputs use a quiet underline on paper,
with strong focus, inline field errors, and an error summary. Disabled fields are
visibly unavailable but readable. Success and error states require approved copy.

The submit action is never enabled until server validation, spam protection, consent,
privacy links, delivery, and recovery states are complete.

## 7. Editorial content

Article titles use the display face and may occupy up to 17 characters per line at
wide viewports. Metadata uses Manrope. Body content uses a narrow measure, generous
paragraph spacing, source-native media, and no decorative card wrapping.

Article teasers use rules, topic/date metadata, a display title, a short excerpt, and
a plain text link. Topic groups may use a two-column ruled matrix on desktop and one
column on mobile.

## 8. Media and proof

- Photography is documentary, warm, and natural; avoid glossy stock imagery.
- Hero images use `next/image`, cover crop, and a subtle directional edge fade into
  the copy panel.
- Video uses a real poster or approved still with a familiar play control and no
  autoplay.
- Testimonials use one quote/story at a time, generous whitespace, and adjacent
  verified attribution. Logos and outcome statements require rights and approval.
- Podcast/video embeds remain light until initiated and always include transcript or
  caption paths when available.

## 9. Circle-inspired geometry

Use the supplied raster geometry assets for arcs, axes, nodes, and pathways. Geometry
may frame hierarchy or indicate progression but never competes with the headline.
Do not recreate these assets with inline SVG or CSS drawings.

## 10. Motion

- 160–220ms for hover/focus transitions.
- No parallax, scroll-jacking, autoplay, or decorative entrance choreography.
- Meaningful disclosures may animate opacity/position subtly when motion is allowed.
- `prefers-reduced-motion` disables smooth scrolling and effectively removes
  transition duration.

## 11. Responsive behavior

- 1024px: reduce three-column editorial lists to two columns.
- 816px: replace desktop navigation with the mobile menu.
- 768px: split heroes become copy then image; paired editorial columns stack.
- 448px: CTA groups stack full-width and brand/header spacing tightens.
- 320px minimum: no page-level horizontal overflow. The Roadmap process may use an
  explicitly labelled local horizontal scroller until replaced by the vertical
  production treatment.
