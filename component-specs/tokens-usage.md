# How to consume HPE Design Tokens

## Install

```bash
npm install hpe-design-tokens
```

## Available formats

### CSS custom properties (recommended for Radix, Shadcn, vanilla CSS)

Import the CSS files into your project once, globally. All token values 
become available as CSS variables throughout your app.

```js
// In your app entry point (e.g. main.jsx or index.js)
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';  // light mode
import 'hpe-design-tokens/dist/css/color.dark.css';   // dark mode
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```

Then use in CSS:
```css
.my-element {
  background: var(--hpe-color-background-default);
  color: var(--hpe-color-text-strong);
}
```

### CSS variable naming convention

Token paths map to CSS variable names using this pattern:

```
hpe.color.background.default
→ --hpe-color-background-default

components.hpe.select.default.option.hover.background
→ --hpe-select-default-option-hover-background
```

Rules:
- The `hpe.` prefix becomes `--hpe-`
- The `components.hpe.` prefix becomes `--hpe-`
- Dots become hyphens
- camelCase property names are lowercased with hyphens

### JavaScript ESM (recommended for Grommet, CSS-in-JS)

```js
import { light, dark, components } from 'hpe-design-tokens';

// Access token values directly
const hoverBg = components.hpe.select.default.option.hover.background;
```

### Which format to use

| Stack | Format | Import |
|---|---|---|
| Radix UI | CSS variables | `dist/css/*.css` |
| Shadcn/ui | CSS variables | `dist/css/*.css` |
| Vanilla CSS | CSS variables | `dist/css/*.css` |
| Grommet | ESM (grommet) | `hpe-design-tokens/grommet` |
| CSS-in-JS (styled-components) | ESM | `hpe-design-tokens` |

## Light and dark mode

Color tokens are mode-specific. The CSS files handle this automatically 
using CSS `@media (prefers-color-scheme)` or a `data-theme` attribute 
(check the generated CSS for the exact mechanism).

For explicit mode control, import both and toggle a class or attribute 
on your root element per the CSS file's selector.

## Token layers

Tokens are organised in three layers. Always prefer the most specific:

| Layer | Use when | Example CSS variable |
|---|---|---|
| Component | Styling a known HPE component | `--hpe-select-default-option-hover-background` |
| Semantic | Styling novel components or filling gaps | `--hpe-color-background-hover` |
| Primitive | Never use directly in components | `--hpe-base-color-green-700` |