# AISI Design System
**Professional Astrology Platform Component Library**

Version 2.4 | Last Updated: February 2026

**Token source:** `src/styles/tokens.css` (all `--aisi-*` variables)  
**Component source:** `src/styles/components.css` (all `.aisi-*` classes)  
**Figma sync:** See [FIGMA_TOKEN_MAP.md](FIGMA_TOKEN_MAP.md) for token/component mapping and how to apply Figma edits.

---

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Typography Components](#typography-components)
3. [Button Components](#button-components)
4. [Navigation Components](#navigation-components)
5. [Node Components](#node-components)
6. [Panel Components](#panel-components)
7. [Data Display Components](#data-display-components)
8. [Layout Components](#layout-components)
9. [Usage Examples](#usage-examples)

---

## Design Tokens

All tokens live in **`src/styles/tokens.css`** with the `--aisi-*` prefix. Use only these in components.

### Color

```css
/* Semantic */
--aisi-color-bg: #FDFCF9;
--aisi-color-fg: #2A363B;
--aisi-color-border: #DEDBD0;
--aisi-color-active: #F4F7F8;

/* Brand */
--aisi-color-brand-primary: #1F5673;
--aisi-color-brand-secondary: #D98E73;

/* Neutral (100–300) */
--aisi-color-neutral-100: #F3F1EA;
--aisi-color-neutral-200: #BCCACD;
--aisi-color-neutral-300: #6B7C85;

/* Functional */
--aisi-color-highlight: #EEF4F4;
--aisi-color-surface: #F2F6F7;
--aisi-color-on-primary: #ffffff;
--aisi-color-on-secondary: #ffffff;
```

### Typography

```css
--aisi-font-sans: "Gill Sans", "Gill Sans MT", "Helvetica Neue", Helvetica, Arial, sans-serif;
--aisi-font-mono: "Courier New", Courier, monospace;

--aisi-size-micro: 9px;
--aisi-size-mini: 10px;
--aisi-size-small: 11px;
--aisi-size-base: 12px;
--aisi-size-body: 13px;
--aisi-size-stat: 22px;
--aisi-size-display: 24px;

--aisi-weight-normal: 400;
--aisi-weight-medium: 500;
--aisi-weight-semibold: 600;
--aisi-weight-bold: 700;

--aisi-tracking-tight: -0.02em;
--aisi-tracking-tighter: -0.01em;
--aisi-tracking-normal: 0.04em;
--aisi-tracking-relaxed: 0.05em;
--aisi-tracking-wide: 0.1em;
--aisi-tracking-extra-wide: 0.12em;
--aisi-tracking-ultra-wide: 0.15em;
```

### Spacing

```css
--aisi-space-xs: 4px;
--aisi-space-sm: 8px;
--aisi-space-md: 12px;
--aisi-space-lg: 16px;
--aisi-space-xl: 24px;
--aisi-space-2xl: 32px;
```

### Radius & shadow

```css
--aisi-radius-sm: 2px;
--aisi-radius-md: 4px;
--aisi-radius-pill: 10px;
--aisi-radius-full: 50%;

--aisi-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--aisi-shadow-md: 0 4px 20px rgba(31, 86, 115, 0.08);
--aisi-shadow-lg: 0 8px 24px rgba(31, 86, 115, 0.15);
--aisi-shadow-button: 0 2px 8px rgba(31, 86, 115, 0.2);
```

---

## Typography Components

All typography components use tokens from `tokens.css`; definitions live in `components.css`.

### 1. Display Number (`.aisi-display-number`)
**Purpose:** Large display numbers for section identifiers.  
**Usage:** Workspace numbers, major headings.

```html
<span class="aisi-display-number">05</span>
```

### 2. Badge Circle (`.aisi-badge-circle`, `--primary`, `--accent`)
**Purpose:** Circular badge identifiers.  
**Usage:** Icons, markers, brand elements.

```html
<span class="aisi-badge-circle">A</span>
<span class="aisi-badge-circle aisi-badge-circle--primary">01</span>
<span class="aisi-badge-circle aisi-badge-circle--accent">02</span>
```

### 3. Label Uppercase (`.aisi-label-uppercase`)
**Purpose:** Compact uppercase labels.  
**Usage:** Section headers, metadata labels.

```html
<span class="aisi-label-uppercase">Analysis Workspace</span>
```

### 4. Heading Section (`.aisi-heading-section`)
**Purpose:** Panel section headings.  
**Usage:** Inspector panels, sidebar sections.

```html
<span class="aisi-heading-section">
  <span class="aisi-badge-circle aisi-badge-circle--primary">01</span>
  Selection Analysis
</span>
```

### 5. Label Vertical (`.aisi-label-vertical`)
**Purpose:** Rotated vertical text labels.  
**Usage:** Sidebar footers, edge labels.

```html
<div class="aisi-label-vertical">ZINC PROJECT SYSTEM v2.4</div>
```

---

## Button Components

### 1. Button (`.aisi-btn`)
**Purpose:** Standard action buttons.  
**Usage:** Toolbar, forms, actions.

```html
<button class="aisi-btn" type="button">Auto Layout</button>
```

### 2. Button Primary (`.aisi-btn.aisi-btn--primary`)
**Purpose:** Primary call-to-action.  
**Usage:** Main actions, confirmations.

```html
<button class="aisi-btn aisi-btn--primary" type="button">Run Calculation</button>
```

### 3. Button Icon (`.aisi-btn-icon`)
**Purpose:** Compact icon-only buttons.  
**Usage:** Canvas controls, toolbars.

```html
<button type="button" class="aisi-btn-icon">+</button>
<button type="button" class="aisi-btn-icon">Fit</button>
```

### 4. Tool controls group (`.aisi-tool-controls`)
**Purpose:** Horizontal group of buttons.  
**Usage:** Toolbars.

```html
<div class="aisi-tool-controls">
  <button class="aisi-btn" type="button">Auto Layout</button>
  <button class="aisi-btn aisi-btn--primary" type="button">Run Calculation</button>
</div>
```

---

## Navigation Components

### Navigation Item (`.aisi-nav-item`, `.aisi-nav-item__number`)
**Purpose:** Sidebar navigation links.  
**Usage:** Main navigation menu. Use `.active` for current page.

```html
<a href="#" class="aisi-nav-item">
  <span class="aisi-nav-item__number">00</span>
  <span>Dashboard</span>
</a>
<a href="#" class="aisi-nav-item active">
  <span class="aisi-nav-item__number">05</span>
  <span>Nodes</span>
</a>
```

---

## Node Components

### Card Node (`.aisi-card-node`, modifiers: `--selected`, `--natal`, `--dynamic`)
**Purpose:** Card container for graph nodes.  
**Usage:** Node graph elements. Child structure: `__header`, `__title`, `__content`; use `.aisi-badge-index` and `.aisi-badge-type` inside.

**Badge types (text):** SOURCE, TIME, DECISION, NATAL, RELATIONSHIP, RESULT.

```html
<div class="aisi-card-node aisi-card-node--natal aisi-card-node--selected" style="position: relative;">
  <span class="aisi-badge-index">01</span>
  <div class="aisi-card-node__header">
    <span class="aisi-card-node__title">Natal Profile</span>
    <span class="aisi-badge-type">SOURCE</span>
  </div>
  <div class="aisi-card-node__content">
    <div class="aisi-data-row">
      <span>Subject</span>
      <span class="aisi-data-value">J. Doe</span>
    </div>
    <div class="aisi-data-row">
      <span>Active</span>
      <span class="aisi-data-value aisi-data-value--primary">Saturn Square</span>
    </div>
  </div>
</div>
```

**Badge index variants:** `.aisi-badge-index--accent`, `.aisi-badge-index--neutral`.

---

## Panel Components

### Panel Section (`.aisi-panel-section`, `.aisi-panel-section--highlight`)
**Purpose:** Content section in inspector panel.  
**Usage:** Inspector, sidebar panels. Use `.aisi-panel-section__header` for the title row.

```html
<div class="aisi-panel-section aisi-panel-section--highlight">
  <div class="aisi-panel-section__header">
    <span class="aisi-heading-section">
      <span class="aisi-badge-circle aisi-badge-circle--primary">01</span>
      Selection Analysis
    </span>
  </div>
  <!-- Content here -->
</div>
```

---

## Data Display Components

### Data Row & Value (`.aisi-data-row`, `.aisi-data-value`, `--primary`, `--accent`)
**Purpose:** Key-value pair display.  
**Usage:** Node data, panel information.

```html
<div class="aisi-data-row">
  <span>Subject</span>
  <span class="aisi-data-value">J. Doe</span>
</div>
<div class="aisi-data-row">
  <span>Active</span>
  <span class="aisi-data-value aisi-data-value--primary">Saturn Square</span>
</div>
```

### List Item (`.aisi-list-item`)
**Purpose:** List row with label and value.  
**Usage:** Aspect lists, data tables.

```html
<div class="aisi-list-item">
  <span style="font-weight: 500;">Sun Square Saturn</span>
  <span class="aisi-text-primary" style="font-family: var(--aisi-font-mono);">0.2°</span>
</div>
```

### Progress (`.aisi-progress`, `.aisi-progress__fill`, `--neutral`)
**Purpose:** Visual progress/completion indicator.  
**Usage:** House activation, percentages.

```html
<div class="aisi-stat-item">
  <div style="display: flex; justify-content: space-between;">
    <span class="aisi-stat-label">10th House (Career)</span>
    <span class="aisi-stat-label">92%</span>
  </div>
  <div class="aisi-progress">
    <div class="aisi-progress__fill" style="width: 92%;"></div>
  </div>
</div>
```

---

## Layout Components

### Stat Grid & Stat Item (`.aisi-stat-grid`, `.aisi-stat-item`, `.aisi-stat-label`, `.aisi-stat-value`)
**Purpose:** Two-column stat display; individual metric with label and value.  
**Usage:** Metrics, statistics. Use `.aisi-stat-value--primary` for primary-colored values.

```html
<div class="aisi-stat-grid">
  <div class="aisi-stat-item">
    <span class="aisi-stat-label">Dominant</span>
    <span class="aisi-stat-value">Fire / Fixed</span>
  </div>
  <div class="aisi-stat-item">
    <span class="aisi-stat-label">Vitality</span>
    <span class="aisi-stat-value aisi-stat-value--primary">High</span>
  </div>
</div>
```

---

## Usage Examples

### Complete Panel Section

```html
<div class="aisi-panel-section">
  <div class="aisi-panel-section__header">
    <span class="aisi-heading-section">Active Aspects</span>
    <span class="aisi-label-uppercase" style="font-size: var(--aisi-size-micro);">Sort: Orb</span>
  </div>
  <div class="aisi-list-item">
    <span style="font-weight: 500;">Sun Square Saturn</span>
    <span class="aisi-text-primary" style="font-family: var(--aisi-font-mono);">0.2°</span>
  </div>
  <div class="aisi-list-item">
    <span>Venus Trine Mars</span>
    <span style="font-family: var(--aisi-font-mono);">1.4°</span>
  </div>
  <div class="aisi-list-item">
    <span>Moon Opp Pluto</span>
    <span style="font-family: var(--aisi-font-mono);">2.1°</span>
  </div>
</div>
```

### Toolbar with Actions

```html
<header class="toolbar">
  <div class="workspace-title">
    <span class="aisi-display-number">05</span>
    <span class="aisi-label-uppercase">Analysis Workspace / Node Graph</span>
  </div>
  <div class="aisi-tool-controls">
    <button class="aisi-btn" type="button">Auto Layout</button>
    <button class="aisi-btn" type="button">Add Node +</button>
    <button class="aisi-btn aisi-btn--primary" type="button">Run Calculation</button>
  </div>
</header>
```

### Canvas Controls

```html
<div class="canvas-controls">
  <button type="button" class="aisi-btn-icon">+</button>
  <button type="button" class="aisi-btn-icon">-</button>
  <button type="button" class="aisi-btn-icon">Fit</button>
</div>
```

---

## Design Principles

### 1. Typography Hierarchy
- **Display Numbers (24px):** Section identifiers, major headings
- **Statistical Values (22px):** Metrics, percentages
- **Body Text (12-13px):** Primary content
- **Labels (9-11px):** Metadata, badges, micro copy

### 2. Color Usage
- **Cobalt Blue:** Primary actions, active states, data highlights
- **Blush Coral:** Secondary nodes, relationship data, accents
- **Zinc Grays:** UI chrome, borders, secondary text
- **White/Off-White:** Backgrounds, cards, elevated surfaces

### 3. Spacing System
- Use 4px base unit for consistency
- Standard padding: 16px (cards), 24px (panels)
- Standard gaps: 8px (small), 12px (medium), 16px (large)

### 4. Interaction States
- **Hover:** Subtle background change, border color shift
- **Active:** Border accent, elevated shadow, slight transform
- **Selected:** Enhanced shadow, background change, transform

### 5. Border & Shadow Strategy
- Use subtle borders (1px) with low-contrast colors
- Layer shadows for depth (4px, 8px, 20px blur)
- Combine border + shadow for elevated elements

---

## Component Naming Convention

All components use the **`aisi-`** prefix. Use BEM-style modifiers with `--` and elements with `__`.

**Format:** `aisi-[component][__element][--modifier]`

**Examples:**
- `aisi-display-number` — Typography display number
- `aisi-badge-circle`, `aisi-badge-circle--primary` — Badge with modifier
- `aisi-btn`, `aisi-btn--primary` — Button and primary variant
- `aisi-nav-item`, `aisi-nav-item__number` — Nav item and child element
- `aisi-card-node`, `aisi-card-node__header`, `aisi-card-node--selected` — Node card, element, modifier
- `aisi-panel-section`, `aisi-panel-section__header` — Panel and header
- `aisi-stat-grid`, `aisi-stat-item`, `aisi-stat-value--primary` — Stats layout and variants

**Token naming:** `--aisi-{category}-{name}` (e.g. `--aisi-color-brand-primary`, `--aisi-space-md`). See [FIGMA_TOKEN_MAP.md](FIGMA_TOKEN_MAP.md) for the full list and Figma variable mapping.

---

## Accessibility Notes

1. **Color Contrast:** All text meets WCAG AA standards
2. **Focus States:** Add outline for keyboard navigation
3. **Hover States:** Minimum 28px touch targets for mobile
4. **Semantic HTML:** Use proper heading hierarchy
5. **ARIA Labels:** Add aria-label for icon-only buttons

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### CSS Features Used:
- CSS Grid
- CSS Custom Properties (Variables)
- Flexbox
- CSS Transforms
- CSS Transitions

---

## Version History

- **v2.4** (Feb 2026) - Initial design system documentation
- Comprehensive component library extracted from AISI platform
- Full token system with color, typography, and spacing scales

---

## Credits

**Design System:** AISI Professional Astrology Platform  
**System Name:** ZINC PROJECT SYSTEM v2.4  
**Typography:** Gill Sans, Courier New  
**Color Palette:** Cobalt & Blush Professional Theme

---

*End of Design System Documentation*
