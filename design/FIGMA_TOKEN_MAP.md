# Figma ↔ AISI design token map

Use this when applying Figma edits to the codebase. Every design decision should map to a **token** (CSS variable) or a **component** class.

---

## Token naming (code → Figma)

All design tokens use the `--aisi-*` prefix. In Figma, create variables with the same logical structure.

| Code (CSS variable) | Figma variable path (suggestion) | Type |
|---------------------|----------------------------------|------|
| **Colors** | | |
| `--aisi-color-bg` | `aisi/color/bg` | Color |
| `--aisi-color-fg` | `aisi/color/fg` | Color |
| `--aisi-color-border` | `aisi/color/border` | Color |
| `--aisi-color-active` | `aisi/color/active` | Color |
| `--aisi-color-brand-primary` | `aisi/color/brand/primary` | Color |
| `--aisi-color-brand-secondary` | `aisi/color/brand/secondary` | Color |
| `--aisi-color-neutral-100` | `aisi/color/neutral/100` | Color |
| `--aisi-color-neutral-200` | `aisi/color/neutral/200` | Color |
| `--aisi-color-neutral-300` | `aisi/color/neutral/300` | Color |
| `--aisi-color-highlight` | `aisi/color/highlight` | Color |
| `--aisi-color-surface` | `aisi/color/surface` | Color |
| `--aisi-color-on-primary` | `aisi/color/on-primary` | Color |
| `--aisi-color-on-secondary` | `aisi/color/on-secondary` | Color |
| **Typography** | | |
| `--aisi-font-sans` | `aisi/typography/font/sans` | Font family |
| `--aisi-font-mono` | `aisi/typography/font/mono` | Font family |
| `--aisi-size-micro` | `aisi/typography/size/micro` | Dimension (9px) |
| `--aisi-size-mini` | `aisi/typography/size/mini` | Dimension (10px) |
| `--aisi-size-small` | `aisi/typography/size/small` | Dimension (11px) |
| `--aisi-size-base` | `aisi/typography/size/base` | Dimension (12px) |
| `--aisi-size-body` | `aisi/typography/size/body` | Dimension (13px) |
| `--aisi-size-stat` | `aisi/typography/size/stat` | Dimension (22px) |
| `--aisi-size-display` | `aisi/typography/size/display` | Dimension (24px) |
| `--aisi-weight-normal` | `aisi/typography/weight/normal` | Number (400) |
| `--aisi-weight-medium` | `aisi/typography/weight/medium` | Number (500) |
| `--aisi-weight-semibold` | `aisi/typography/weight/semibold` | Number (600) |
| `--aisi-weight-bold` | `aisi/typography/weight/bold` | Number (700) |
| `--aisi-tracking-tight` … `--aisi-tracking-ultra-wide` | `aisi/typography/tracking/*` | String |
| **Spacing** | | |
| `--aisi-space-xs` | `aisi/spacing/xs` | Dimension (4px) |
| `--aisi-space-sm` | `aisi/spacing/sm` | Dimension (8px) |
| `--aisi-space-md` | `aisi/spacing/md` | Dimension (12px) |
| `--aisi-space-lg` | `aisi/spacing/lg` | Dimension (16px) |
| `--aisi-space-xl` | `aisi/spacing/xl` | Dimension (24px) |
| `--aisi-space-2xl` | `aisi/spacing/2xl` | Dimension (32px) |
| **Radius** | | |
| `--aisi-radius-sm` | `aisi/radius/sm` | Dimension (2px) |
| `--aisi-radius-md` | `aisi/radius/md` | Dimension (4px) |
| `--aisi-radius-pill` | `aisi/radius/pill` | Dimension (10px) |
| **Shadow** | | |
| `--aisi-shadow-sm` | `aisi/shadow/sm` | Shadow |
| `--aisi-shadow-md` | `aisi/shadow/md` | Shadow |
| `--aisi-shadow-lg` | `aisi/shadow/lg` | Shadow |
| `--aisi-shadow-button` | `aisi/shadow/button` | Shadow |
| **Motion** | | |
| `--aisi-duration-fast` | `aisi/duration/fast` | String (0.2s) |
| `--aisi-duration-normal` | `aisi/duration/normal` | String (0.3s) |

---

## Component classes (Figma component name ↔ code)

When you rename or restyle a component in Figma, use these class names in code.

| Figma component / layer name | CSS class(es) | File |
|-----------------------------|---------------|------|
| **Typography** | | |
| Display number | `.aisi-display-number` | components.css |
| Badge circle (default) | `.aisi-badge-circle` | components.css |
| Badge circle primary | `.aisi-badge-circle.aisi-badge-circle--primary` | components.css |
| Badge circle accent | `.aisi-badge-circle.aisi-badge-circle--accent` | components.css |
| Label uppercase | `.aisi-label-uppercase` | components.css |
| Heading section | `.aisi-heading-section` | components.css |
| Label vertical | `.aisi-label-vertical` | components.css |
| **Buttons** | | |
| Button default | `.aisi-btn` | components.css |
| Button primary | `.aisi-btn.aisi-btn--primary` | components.css |
| Button icon | `.aisi-btn-icon` | components.css |
| Tool controls (group) | `.aisi-tool-controls` | components.css |
| **Navigation** | | |
| Nav item | `.aisi-nav-item` | components.css |
| Nav item active | `.aisi-nav-item.active` | components.css |
| Nav item number | `.aisi-nav-item__number` | components.css |
| **Node card** | | |
| Card node | `.aisi-card-node` | components.css |
| Card node selected | `.aisi-card-node.aisi-card-node--selected` | components.css |
| Card node natal | `.aisi-card-node.aisi-card-node--natal` | components.css |
| Card node dynamic | `.aisi-card-node.aisi-card-node--dynamic` | components.css |
| Card node header | `.aisi-card-node__header` | components.css |
| Card node title | `.aisi-card-node__title` | components.css |
| Card node content | `.aisi-card-node__content` | components.css |
| Badge type | `.aisi-badge-type` | components.css |
| Badge index | `.aisi-badge-index` | components.css |
| Badge index accent | `.aisi-badge-index.aisi-badge-index--accent` | components.css |
| Badge index neutral | `.aisi-badge-index.aisi-badge-index--neutral` | components.css |
| **Data** | | |
| Data row | `.aisi-data-row` | components.css |
| Data value | `.aisi-data-value` | components.css |
| Data value primary | `.aisi-data-value.aisi-data-value--primary` | components.css |
| Data value accent | `.aisi-data-value.aisi-data-value--accent` | components.css |
| List item | `.aisi-list-item` | components.css |
| Stat grid | `.aisi-stat-grid` | components.css |
| Stat item | `.aisi-stat-item` | components.css |
| Stat label | `.aisi-stat-label` | components.css |
| Stat value | `.aisi-stat-value` | components.css |
| Stat value primary | `.aisi-stat-value.aisi-stat-value--primary` | components.css |
| Progress track | `.aisi-progress` | components.css |
| Progress fill | `.aisi-progress__fill` | components.css |
| Progress fill neutral | `.aisi-progress__fill.aisi-progress__fill--neutral` | components.css |
| **Panel** | | |
| Panel section | `.aisi-panel-section` | components.css |
| Panel section highlight | `.aisi-panel-section.aisi-panel-section--highlight` | components.css |
| Panel section header | `.aisi-panel-section__header` | components.css |
| **Utilities** | | |
| Text primary (cobalt) | `.aisi-text-primary` | components.css |
| Text accent (blush) | `.aisi-text-accent` | components.css |
| Background primary | `.aisi-bg-primary` | components.css |
| Background accent | `.aisi-bg-accent` | components.css |

---

## Applying Figma edits

1. **Color / type / spacing change**  
   Update the value in `src/styles/tokens.css` for the matching `--aisi-*` variable. Optionally create or update the corresponding Figma variable so the next export stays in sync.

2. **Component layout or style change**  
   Edit `src/styles/components.css` for the matching `.aisi-*` class. Use only `var(--aisi-*)` for colors, spacing, radius, shadow, and font; avoid hardcoded values.

3. **New component or variant**  
   Add the new class in `components.css` following the same naming (`aisi-{component}[__element][--modifier]`). If it introduces a new design value, add a token in `tokens.css` and document it here.

---

## Legacy names (deprecated)

These old class names and tokens are no longer used in the design showcase. They remain as aliases in `tokens.css` only for backward compatibility elsewhere; prefer `--aisi-*` and `.aisi-*` in new code.

| Old | New |
|-----|-----|
| `--c-bg`, `--c-fg`, `--c-cobalt`, etc. | `--aisi-color-bg`, `--aisi-color-fg`, `--aisi-color-brand-primary`, etc. |
| `--f-sans`, `--f-mono` | `--aisi-font-sans`, `--aisi-font-mono` |
| `--space-xs` … `--space-2xl` | `--aisi-space-xs` … `--aisi-space-2xl` |
| `.dna-number` | `.aisi-display-number` |
| `.dna-circle-tag`, `.cobalt`, `.blush` | `.aisi-badge-circle`, `--primary`, `--accent` |
| `.dna-uppercase` | `.aisi-label-uppercase` |
| `.section-title` | `.aisi-heading-section` |
| `.btn`, `.btn.primary` | `.aisi-btn`, `.aisi-btn--primary` |
| `.icon-btn` | `.aisi-btn-icon` |
| `.nav-item`, `.nav-number` | `.aisi-nav-item`, `.aisi-nav-item__number` |
| `.node`, `.node-header`, etc. | `.aisi-card-node`, `.aisi-card-node__header`, etc. |
| `.data-row`, `.data-value` | `.aisi-data-row`, `.aisi-data-value` |
| `.panel-section`, `.section-header` | `.aisi-panel-section`, `.aisi-panel-section__header` |
| `.list-item`, `.stat-*`, `.progress-bar` | `.aisi-list-item`, `.aisi-stat-*`, `.aisi-progress` |
