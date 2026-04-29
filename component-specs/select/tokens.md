# Select — Tokens

> Source: `grommet-theme-hpe` `src/js/themes/hpe.js`
> Status: v3 — GAP-007, GAP-008, GAP-010 corrected
> Token usage guide: see `component-specs/tokens-usage.md`

---

## Changelog

| Version | Change |
|---|---|
| v2 | GAP-001: CSS variable names corrected to camelCase |
| v2 | GAP-003: Focus indicator tokens corrected |
| v3 | GAP-007: `minHeight` token added to Trigger sizing |
| v3 | GAP-008: `fontSize` and `lineHeight` tokens added to Trigger |
| v3 | GAP-010: Icon size token added to Trigger Icon |

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
by GAP-001 findings — apply consistently until a full audit is done.

---

## Token naming pattern (confirmed v2)

Multi-word segments in CSS variable names use camelCase:

| kebab-case (incorrect) | camelCase (correct) |
|---|---|
| `--hpe-form-field-...` | `--hpe-formField-...` |
| `--hpe-focus-indicator-...` | `--hpe-focusIndicator-...` |
| `--hpe-...-border-color` | `--hpe-...-borderColor` |
| `--hpe-...-border-radius` | `--hpe-...-borderRadius` |
| `--hpe-...-border-width` | `--hpe-...-borderWidth` |
| `--hpe-...-font-weight` | `--hpe-...-fontWeight` |
| `--hpe-...-font-size` | `--hpe-...-fontSize` |
| `--hpe-...-line-height` | `--hpe-...-lineHeight` |
| `--hpe-...-min-height` | `--hpe-...-minHeight` |
| `--hpe-...-padding-x` | `--hpe-...-paddingX` |
| `--hpe-...-padding-y` | `--hpe-...-paddingY` |
| `--hpe-...-gap-y` | `--hpe-...-gapY` |
| `--hpe-...-z-index` | `--hpe-...-zIndex` |
| `--hpe-...-text-color` | `--hpe-...-textColor` |

---

## 1. Trigger

> Tokens inherited from FormField spec.
> Do not redefine these in a Select-specific stylesheet.

### Sizing (medium)

| Property | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|
| Min height | F | `components.hpe.formField.default.medium.input.container.minHeight` | `--hpe-formField-default-medium-input-container-minHeight` | Resolves to 36px — GAP-007 |
| Padding X | F | `components.hpe.formField.default.medium.input.container.paddingX` | `--hpe-formField-default-medium-input-container-paddingX`* | |
| Padding Y | F | `components.hpe.formField.default.medium.input.container.paddingY` | `--hpe-formField-default-medium-input-container-paddingY`* | |
| Border radius | F | `components.hpe.formField.default.medium.input.container.borderRadius` | `--hpe-formField-default-medium-input-container-borderRadius`* | All four corners |
| Border width | F | `components.hpe.formField.default.medium.input.container.borderWidth` | `--hpe-formField-default-medium-input-container-borderWidth`* | |

### States

| Property | State | Layer | CSS variable |
|---|---|---|---|
| Border color | rest | F | `--hpe-formField-default-input-container-rest-borderColor`* |
| Border color | disabled | F | `--hpe-formField-default-input-container-disabled-rest-borderColor`* |
| Border color | error | F | `--hpe-formField-default-input-container-error-rest-borderColor`* |

---

## 2. Value / Placeholder

> GAP-008 corrected: fontSize and lineHeight now documented.
> These are required to produce the correct trigger height calculation:
> 1px border + paddingY + lineHeight + paddingY + 1px border = minHeight (36px)

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Font size | all | F | `components.hpe.formField.default.medium.value.fontSize` | `--hpe-formField-default-medium-value-fontSize`* | Resolves to 1rem |
| Line height | all | F | `components.hpe.formField.default.medium.value.lineHeight` | `--hpe-formField-default-medium-value-lineHeight`* | Resolves to 1.5rem |
| Font weight | all | F | `components.hpe.formField.default.medium.value.fontWeight` | `--hpe-formField-default-medium-value-fontWeight`* | |
| Text color | populated | S | `hpe.color.text.default` | `--hpe-color-text-default`* | |
| Text color | placeholder | S | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* | |
| Text color | disabled | S | `hpe.color.text.disabled` | `--hpe-color-text-disabled`* | |

---

## 3. Trigger Icon

> GAP-010 corrected: icon size token now documented.
> Do not use the grommet-icons `size` prop to control size — use CSS only.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Size (width + height) | all | S | `hpe.element.medium.icon.size` | `--hpe-element-medium-icon-size` | Resolves to 16px — apply via CSS, not grommet-icons `size` prop |
| Color | rest | S | `hpe.color.icon.default` | `--hpe-color-icon-default`* | |
| Color | disabled | S | `hpe.color.icon.disabled` | `--hpe-color-icon-disabled`* | Inherits via control opacity |

---

## 4. Focus Ring

> GAP-003 corrected: two-token compound focus ring.
> Both tokens must be applied together.

| Property | Layer | CSS variable | Notes |
|---|---|---|---|
| Outer ring (outline shorthand) | S | `--hpe-focusIndicator-outline` | ✓ Confirmed |
| Outline offset | S | `--hpe-focusIndicator-outlineOffset` | ✓ Confirmed |
| Inner ring (box-shadow shorthand) | S | `--hpe-focusIndicator-boxShadow` | ✓ Confirmed — omitted in v1 |

---

## 5. Drop (Dropdown Container)

| Property | State | Layer | CSS variable | Notes |
|---|---|---|---|---|
| Background | open | C | `--hpe-drop-default-background`* | |
| Border radius | open | C | `--hpe-drop-default-borderRadius`* | |
| Margin (gap from trigger) | open | C | `--hpe-drop-default-margin`* | GAP-002: cannot be used in `sideOffset` — pass resolved value as JS number |
| Shadow | open | S | `--hpe-shadow-medium`* | |
| Padding X | open | C | `--hpe-select-default-medium-drop-paddingX`* | |
| Padding Y | open | C | `--hpe-select-default-medium-drop-paddingY`* | GAP-009 corrected: apply to both top AND bottom — see constraints §2 |
| Gap between options | open | C | `--hpe-select-default-medium-drop-gapY`* | Between items only — not after last item |
| Z-index | open | C | `--hpe-drop-default-zIndex`* | Must clear HPE global header |

---

## 6. Listbox

No dedicated tokens — scroll container only.

---

## 7. Option

### Sizing (medium)

| Property | Layer | CSS variable |
|---|---|---|
| Padding X | C | `--hpe-select-default-medium-option-paddingX`* |
| Padding Y | C | `--hpe-select-default-medium-option-paddingY`* |
| Border radius | C | `--hpe-select-default-medium-option-borderRadius`* |
| Border width | C | `--hpe-select-default-medium-option-borderWidth`* |

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
| Value / Placeholder | fontSize, lineHeight, fontWeight | Text colors | — | — |
| Trigger Icon | — | Icon color, icon size | — | — |
| Focus Ring | — | `focusIndicator` shorthands | — | — |
| Drop | ✓ Full coverage | Shadow | sideOffset hardcoded (GAP-002) | — |
| Listbox | — | — | — | No tokens needed |
| Option | ✓ Full coverage | — | — | — |
| Selected Marker | ✓ Full coverage | Border-disabled (fallback) | — | — |
| Clear Button | Reuses option tokens | `text-strong` | — | — |