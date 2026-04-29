# Select — Tokens

> Source: `grommet-theme-hpe` `src/js/themes/hpe.js`
> Status: v2 — GAP-001 corrected; CSS variable names updated to camelCase
> Token usage guide: see `component-specs/tokens-usage.md`

---

## Changelog

| Version | Change |
|---|---|
| v2 | GAP-001: CSS variable column updated from kebab-case to camelCase to match actual `hpe-design-tokens` build output |
| v2 | GAP-003: Focus indicator variables corrected to `--hpe-focusIndicator-outline` and `--hpe-focusIndicator-boxShadow` |

---

## How to read this file

Each table has three columns:

- **Token path** — the logical name used in the spec and in ESM imports
- **CSS variable** — the variable available after importing the CSS files
- **Notes** — intent, caveats, or cross-references

Token layers used in this component:

| Symbol | Meaning |
|---|---|
| `C` | Component token (`components.hpe.*`) |
| `S` | Semantic token (`hpe.color.*`, `hpe.shadow.*` etc.) |
| `F` | Inherited from FormField spec — do not redefine here |

⚠️ CSS variable names marked with `*` are pending final verification
against the built `dist/css/` output. The camelCase pattern is confirmed
by GAP-003 findings — apply consistently until a full audit is done.

---

## Token naming pattern (confirmed v2)

Multi-word segments in CSS variable names use camelCase:

| v1 (incorrect) | v2 (correct) |
|---|---|
| `--hpe-form-field-...` | `--hpe-formField-...` |
| `--hpe-focus-indicator-...` | `--hpe-focusIndicator-...` |
| `--hpe-...-border-color` | `--hpe-...-borderColor` |
| `--hpe-...-border-radius` | `--hpe-...-borderRadius` |
| `--hpe-...-border-width` | `--hpe-...-borderWidth` |
| `--hpe-...-font-weight` | `--hpe-...-fontWeight` |
| `--hpe-...-padding-x` | `--hpe-...-paddingX` |
| `--hpe-...-padding-y` | `--hpe-...-paddingY` |
| `--hpe-...-gap-y` | `--hpe-...-gapY` |
| `--hpe-...-z-index` | `--hpe-...-zIndex` |
| `--hpe-...-text-color` | `--hpe-...-textColor` |
| `--hpe-...-border-top-left-radius` | `--hpe-...-borderTopLeftRadius` |
| `--hpe-...-border-bottom-left-radius` | `--hpe-...-borderBottomLeftRadius` |

---

## 1. Trigger

> Tokens inherited from FormField spec.
> Do not redefine these in a Select-specific stylesheet.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Border color | rest | F | `components.hpe.formField.default.input.container.rest.borderColor` | `--hpe-formField-default-input-container-rest-borderColor`* | |
| Border width | all | F | `components.hpe.formField.default.medium.input.container.borderWidth` | `--hpe-formField-default-medium-input-container-borderWidth`* | |
| Border radius | all | F | `components.hpe.formField.default.medium.input.container.borderRadius` | `--hpe-formField-default-medium-input-container-borderRadius`* | All four corners |
| Padding X | all | F | `components.hpe.formField.default.medium.input.container.paddingX` | `--hpe-formField-default-medium-input-container-paddingX`* | |
| Padding Y | all | F | `components.hpe.formField.default.medium.input.container.paddingY` | `--hpe-formField-default-medium-input-container-paddingY`* | |
| Border color | disabled | F | `components.hpe.formField.default.input.container.disabled.rest.borderColor` | `--hpe-formField-default-input-container-disabled-rest-borderColor`* | Whole control opacity also applied |
| Border color | error | F | `components.hpe.formField.default.input.container.error.rest.borderColor` | `--hpe-formField-default-input-container-error-rest-borderColor`* | |

---

## 2. Value / Placeholder

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Text color | populated | S | `hpe.color.text.default` | `--hpe-color-text-default`* | |
| Text color | placeholder | S | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* | |
| Font weight | all | F | `components.hpe.formField.default.medium.value.fontWeight` | `--hpe-formField-default-medium-value-fontWeight`* | |

---

## 3. Trigger Icon

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | rest | S | `hpe.color.icon.default` | `--hpe-color-icon-default`* | |
| Color | disabled | S | `hpe.color.icon.disabled` | `--hpe-color-icon-disabled`* | Inherits via control opacity |

---

## 4. Focus Ring

> GAP-003 corrected: v1 spec referenced three separate tokens that do not
> exist. The actual tokens are compound shorthands. Both must be applied
> together to render the complete two-colour HPE focus ring.

| Property | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|
| Outer ring (outline shorthand) | S | `hpe.focusIndicator.outline` | `--hpe-focusIndicator-outline` | ✓ Confirmed |
| Inner ring (box-shadow shorthand) | S | `hpe.focusIndicator.boxShadow` | `--hpe-focusIndicator-boxShadow` | ✓ Confirmed — was omitted in v1 |

Usage in CSS:
```css
.hpe-select__trigger:focus-visible {
  outline: var(--hpe-focusIndicator-outline);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
}
```

---

## 5. Drop (Dropdown Container)

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Background | open | C | `components.hpe.drop.default.background` | `--hpe-drop-default-background`* | |
| Border radius | open | C | `components.hpe.drop.default.borderRadius` | `--hpe-drop-default-borderRadius`* | |
| Margin (gap from trigger) | open | C | `components.hpe.drop.default.margin` | `--hpe-drop-default-margin`* | GAP-002: cannot be used as CSS variable in `sideOffset` — pass resolved value as JS number |
| Shadow | open | S | `hpe.shadow.medium` | `--hpe-shadow-medium`* | |
| Padding X | open | C | `components.hpe.select.default.medium.drop.paddingX` | `--hpe-select-default-medium-drop-paddingX`* | |
| Padding Y | open | C | `components.hpe.select.default.medium.drop.paddingY` | `--hpe-select-default-medium-drop-paddingY`* | Top only |
| Gap between options | open | C | `components.hpe.select.default.medium.drop.gapY` | `--hpe-select-default-medium-drop-gapY`* | |
| Z-index | open | C | `components.hpe.drop.default.zIndex` | `--hpe-drop-default-zIndex`* | Must clear HPE global header |

---

## 6. Listbox

No dedicated tokens — scroll container only. Visual appearance comes from Drop tokens above.

---

## 7. Option

### Sizing (medium)

| Property | Layer | Token path | CSS variable |
|---|---|---|---|
| Padding X | C | `components.hpe.select.default.medium.option.paddingX` | `--hpe-select-default-medium-option-paddingX`* |
| Padding Y | C | `components.hpe.select.default.medium.option.paddingY` | `--hpe-select-default-medium-option-paddingY`* |
| Border radius | C | `components.hpe.select.default.medium.option.borderRadius` | `--hpe-select-default-medium-option-borderRadius`* |
| Border width | C | `components.hpe.select.default.medium.option.borderWidth` | `--hpe-select-default-medium-option-borderWidth`* |

### States

| Property | State | Layer | CSS variable |
|---|---|---|---|
| Text color | rest | C | `--hpe-select-default-option-rest-textColor`* |
| Border color | rest | C | `--hpe-select-default-option-rest-borderColor`* |
| Font weight | rest | C | `--hpe-select-default-option-rest-fontWeight`* |
| Background | hover | C | `--hpe-select-default-option-hover-background`* |
| Border color | hover | C | `--hpe-select-default-option-hover-borderColor`* |
| Text color | hover | C | `--hpe-select-default-option-hover-textColor`* |
| Background | selected › rest | C | `--hpe-select-default-option-selected-rest-background`* |
| Border color | selected › rest | C | `--hpe-select-default-option-selected-rest-borderColor`* |
| Text color | selected › rest | C | `--hpe-select-default-option-selected-rest-textColor`* |
| Font weight | selected › rest | C | `--hpe-select-default-option-selected-rest-fontWeight`* |
| Background | selected › hover | C | `--hpe-select-default-option-selected-hover-background`* |
| Text color | selected › hover | C | `--hpe-select-default-option-selected-hover-textColor`* |
| Background | disabled › rest | C | `--hpe-select-default-option-disabled-rest-background`* |
| Border color | disabled › rest | C | `--hpe-select-default-option-disabled-rest-borderColor`* |
| Text color | disabled › rest | C | `--hpe-select-default-option-disabled-rest-textColor`* |
| Font weight | disabled › rest | C | `--hpe-select-default-option-disabled-rest-fontWeight`* |

---

## 8. Selected Marker

| Property | State | Layer | CSS variable | Notes |
|---|---|---|---|---|
| Width | selected | C | `--hpe-select-default-medium-option-marker-width`* | |
| Top offset | selected | C | `--hpe-select-default-medium-option-marker-top`* | |
| Bottom offset | selected | C | `--hpe-select-default-medium-option-marker-bottom`* | |
| Left offset | selected | C | `--hpe-select-default-medium-option-marker-left`* | |
| Border radius (top-left) | selected | C | `--hpe-select-default-medium-option-marker-borderTopLeftRadius`* | Outer corners only |
| Border radius (bottom-left) | selected | C | `--hpe-select-default-medium-option-marker-borderBottomLeftRadius`* | |
| Background | selected › rest | C | `--hpe-select-default-option-marker-rest-background`* | |
| Background | selected › hover | C | `--hpe-select-default-option-marker-rest-background`* | Same token — does not change on hover |
| Background | disabled | S | `--hpe-color-border-disabled`* | Fallback to semantic token |

---

## 9. Clear Button

Reuses option tokens intentionally.

| Property | State | Layer | CSS variable |
|---|---|---|---|
| Padding X | all | C | `--hpe-select-default-medium-option-paddingX`* |
| Padding Y | all | C | `--hpe-select-default-medium-option-paddingY`* |
| Border radius | all | C | `--hpe-select-default-medium-option-borderRadius`* |
| Border width | all | C | `--hpe-select-default-medium-option-borderWidth`* |
| Text color | rest | S | `--hpe-color-text-strong`* |
| Font weight | rest | C | `--hpe-select-default-option-rest-fontWeight`* |
| Background | hover | C | `--hpe-select-default-option-hover-background`* |
| Text color | hover | S | `--hpe-color-text-strong`* |

---

## Token coverage summary

| Part | Component tokens | Semantic tokens | Hardcoded values | Gaps |
|---|---|---|---|---|
| Trigger | Via FormField | — | `opacity: 0.3` on disabled | Disabled opacity has no token |
| Value / Placeholder | Partial (font weight) | Text, placeholder colors | — | — |
| Trigger Icon | — | `icon` color alias | — | No component token |
| Focus Ring | — | `focusIndicator` shorthands | — | v1 omitted inner ring (fixed) |
| Drop | ✓ Full coverage | Shadow | sideOffset hardcoded (GAP-002) | — |
| Listbox | — | — | — | No tokens needed |
| Option | ✓ Full coverage | — | — | — |
| Selected Marker | ✓ Full coverage | Border-disabled (fallback) | — | — |
| Clear Button | Reuses option tokens | `text-strong` | — | — |
| Search Input | — | Via FormField | — | — |