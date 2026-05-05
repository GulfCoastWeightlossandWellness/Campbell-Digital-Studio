# Theme — Campbell Digital Studio (Locked)

Copied verbatim from §03 of the loop prompt at iteration 001. Treat as immutable. Any deviation must be justified in writing in `/loop/ITERATIONS/`.

## Source of truth

The visual identity originated in `AirSolutionsPros_GBP_Playbook.html` (a client deliverable). When in doubt about any visual decision, defer to the patterns in that file. The studio site must always feel like it was designed by the same person who designed that playbook.

> Note: that source file is not in this repository. The patterns it expresses are encoded in `app/globals.css` and the editorial primitives under `components/editorial/`.

## Colors (CSS variables, defined in `app/globals.css`)

```css
:root {
  /* Navy — primary text, dark surfaces */
  --navy-950: #08172E; --navy-900: #0C1F3D; --navy-800: #142C5C;
  --navy-700: #1F3F7A; --navy-600: #2E5BA5; --navy-500: #4A7EC9;
  --navy-400: #7CA3DA;

  /* Gold — accent only, never primary */
  --gold-700: #9A7820; --gold-600: #C49A35; --gold-500: #DDB64D;
  --gold-400: #E8C46B; --gold-200: #F5E2B0; --gold-100: #F8E9C2; --gold-50: #FCF4E0;

  /* Paper — backgrounds */
  --paper-cream: #FAF6EC; --paper-sand: #F0E9D6;
  --paper-stone: #D4CCB3; --paper-rule: #E5DDC5;

  /* Ink — text */
  --ink: #14182A; --ink-soft: #3B3F50;
  --ink-mute: #6E7184; --ink-faint: #9A9DAE;

  /* Status (sparingly) */
  --success: #2F7A4D; --warn: #D08C1A; --error: #B83A2C; --info: #1F3F7A;
}
```

- Default surface: `paper-cream` bg, `ink` fg.
- Dark surfaces: `navy-900` bg, white fg, `gold-400` accents.
- Gold is for accents only: top borders, single-word emphasis, opening quote marks, section index numerals. **Never a button background.**

## Typography

Three fonts, loaded via `next/font/google`:

- **Fraunces** — display, headlines, italic sub-clauses (uses `opsz` axis)
- **Manrope** — body, UI, navigation
- **JetBrains Mono** — section markers, captions, status labels, metadata

```ts
fontFamily: {
  sans:  ['var(--font-manrope)',  'system-ui', 'sans-serif'],
  serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
  mono:  ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
}
```

### Type scale

| Element                | Font            | Size              | Weight  | Letter      | Line          |
|------------------------|-----------------|-------------------|---------|-------------|---------------|
| Hero display           | Fraunces        | clamp(48,7vw,88)  | 400     | -0.025em    | 1.02          |
| H2                     | Fraunces        | clamp(36,4.5vw,56)| 400     | -0.022em    | 1.05          |
| H2 italic sub-clause   | Fraunces italic | same              | 300     | same        | same          |
| H3                     | Fraunces        | 22–26             | 500     | -0.015em    | 1.2           |
| H4 (eyebrow)           | Manrope         | 11                | 700     | 0.14em      | 1.3 UPPERCASE |
| Body                   | Manrope         | 15–16             | 400     | normal      | 1.65          |
| Long-form body         | Fraunces        | 18                | 400     | normal      | 1.7           |
| Section index/metadata | Mono            | 10–11             | 500–600 | 0.18–0.20em | UPPERCASE     |
| Pull quote             | Fraunces italic | 28–32             | 300     | -0.015em    | 1.25          |
| Caption                | Mono            | 10                | 500     | 0.15em      | UPPERCASE     |

**Signature move:** italic Fraunces sub-clauses inside H2 headlines. Every H2 should have one:

```html
<h2>Selected Work,<br><em>through the lens of a clinic.</em></h2>
```

## Section markers

Every major section opens with a `SectionTag`:

```tsx
<SectionTag num="02" label="Selected Work" />
```

Renders as: mono 11px, navy or gold numeral, ink-mute label, thin paper-rule line filling the rest of the row. **No section without a section marker.**

## Layout

- Max page width: **1280px**
- Reading width for prose: **720px max**
- Side padding: `clamp(20px, 5vw, 80px)` (`section-wrap` class)
- Section vertical rhythm: 96–128px desktop / 64–80px mobile (`section-block` / `section-block-tight`)
- Asymmetry encouraged: not every section is centered; use 5/7, 7/5, 3/9 column splits.

## Components (build once, reuse everywhere)

In `components/editorial/`:

- `SectionTag` — index + label + rule
- `Eyebrow` — small mono uppercase label
- `EditorialH2` — Fraunces with optional italic sub-clause
- `Cover` — dark navy hero with gold top stripe (`.cover-surface` class)
- `Cadence` — three-up monospace stat grid
- `Pullquote` — Fraunces italic with gold opening quote
- `IndexRow` — clickable editorial table row
- `EditorialTable` — responsibility / comparison table
- `Script` — quoted callout block

In `components/sections/` (added in the prior rebuild):

- `SelectedClients`, `TestimonialBlock`, `CaseStudyResults`, `FaqSection`

If any of these are missing or malformed, building / repairing them is higher priority than any page-level work.

## Motion

- Fade + 8px translate on viewport enter (`.rise` class in `globals.css`, 0.6s ease-out)
- Animated underlines on text links (slide-from-left, 0.25s)
- No custom cursor, no parallax, no scroll-jacking, no marquee
- Always honor `prefers-reduced-motion` (already implemented globally in `globals.css`)

## Forbidden patterns (drift guards)

If you find yourself doing any of these, **stop and reconsider**:

- Stat counter bars / animated number counts
- Red ✕ "problem" lists
- Six-step horizontal process timelines
- Centered hero with two side-by-side buttons
- Emoji anywhere in user-facing copy or component naming
- "Trusted by" logo walls without real partnerships
- Exit-intent popups
- Chat widgets
- Cookie consent banners (Plausible doesn't need one)
- "As featured in" without real press
- Animated 5-star rating bars
- Gradient buttons with rounded-full corners
- Dropdown menus with more than 3 items
- Any component with the word "card" in its name (we use editorial rows, not cards)

If a backlog task implies any of the above, push back: rewrite the task or escalate to BLOCKERS.md.
