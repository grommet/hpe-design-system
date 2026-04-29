# Select — Tokens

> Source: `grommet-theme-hpe` `src/js/themes/hpe.js`
> Status: v1 draft — needs CSS variable names verified against 
> `dist/css/components.css` build output
> Token usage guide: see `component-specs/tokens-usage.md`

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

⚠️ CSS variable names marked with `*` need verification against the 
built `dist/css/` output before treating as final.

---

## 1. Trigger

> Tokens inherited from FormField spec.
> Do not redefine these in a Select-specific stylesheet.
> See: `component-specs/form-field/tokens.md → Input container` (future doc)

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Border color | rest | F | `components.hpe.formField.default.input.container.rest.borderColor` | `--hpe-form-field-default-input-container-rest-border-color`* | |
| Border width | all | F | `components.hpe.formField.default.medium.input.container.borderWidth` | `--hpe-form-field-default-medium-input-container-border-width`* | |
| Border radius | all | F | `components.hpe.formField.default.medium.input.container.borderRadius` | `--hpe-form-field-default-medium-input-container-border-radius`* | Applied to all four corners |
| Padding X | all | F | `components.hpe.formField.default.medium.input.container.paddingX` | `--hpe-form-field-default-medium-input-container-padding-x`* | |
| Padding Y | all | F | `components.hpe.formField.default.medium.input.container.paddingY` | `--hpe-form-field-default-medium-input-container-padding-y`* | |
| Border color | disabled | F | `components.hpe.formField.default.input.container.disabled.rest.borderColor` | `--hpe-form-field-default-input-container-disabled-rest-border-color`* | Whole control opacity also applied — see constraints |
| Border color | error | F | `components.hpe.formField.default.input.container.error.rest.borderColor` | `--hpe-form-field-default-input-container-error-rest-border-color`* | |

---

## 2. Value / Placeholder

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Text color | populated | S | `hpe.color.text.default` | `--hpe-color-text-default`* | Inherits from global text color |
| Text color | placeholder | S | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* | |
| Font weight | all | F | `components.hpe.formField.default.medium.value.fontWeight` | `--hpe-form-field-default-medium-value-font-weight`* | |

---

## 3. Trigger Icon

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | rest | S | `hpe.color.icon.default` | `--hpe-color-icon-default`* | Referenced as semantic alias `icon` in theme |
| Color | disabled | S | `hpe.color.icon.disabled` | `--hpe-color-icon-disabled`* | Inherits via control opacity — see constraints |

---

## 4. Drop (Dropdown Container)

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Background | open | C | `components.hpe.drop.default.background` | `--hpe-drop-default-background`* | Shared across all Drop-based components |
| Border radius | open | C | `components.hpe.drop.default.borderRadius` | `--hpe-drop-default-border-radius`* | |
| Margin (gap from trigger) | open | C | `components.hpe.drop.default.margin` | `--hpe-drop-default-margin`* | Offset between trigger edge and drop edge |
| Shadow | open (light) | S | `hpe.shadow.medium` | `--hpe-shadow-medium`* | Applied via `elevation: medium` |
| Shadow | open (dark) | S | `hpe.shadow.medium` (dark) | `--hpe-shadow-medium`* | Dark mode shadow via CSS variable |
| Padding X | open | C | `components.hpe.select.default.medium.drop.paddingX` | `--hpe-select-default-medium-drop-padding-x`* | Padding on the drop container itself |
| Padding Y | open | C | `components.hpe.select.default.medium.drop.paddingY` | `--hpe-select-default-medium-drop-padding-y`* | Top padding only — see constraints |
| Gap between options | open | C | `components.hpe.select.default.medium.drop.gapY` | `--hpe-select-default-medium-drop-gap-y`* | Applied as flex gap on the listbox |
| Z-index | open | C | `components.hpe.drop.default.zIndex` | `--hpe-drop-default-z-index`* | Must clear HPE global header (z-index 101) |

---

## 5. Listbox

The Listbox has no dedicated tokens — it is a scroll container. Its visual 
appearance comes from the Drop tokens above. No additional tokens needed.

---

## 6. Option

### Sizing (medium — default size)

| Property | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|
| Padding X | C | `components.hpe.select.default.medium.option.paddingX` | `--hpe-select-default-medium-option-padding-x`* | |
| Padding Y | C | `components.hpe.select.default.medium.option.paddingY` | `--hpe-select-default-medium-option-padding-y`* | |
| Border radius | C | `components.hpe.select.default.medium.option.borderRadius` | `--hpe-select-default-medium-option-border-radius`* | Applied per option, not on listbox container |
| Border width | C | `components.hpe.select.default.medium.option.borderWidth` | `--hpe-select-default-medium-option-border-width`* | |

### States

| Property | State | Layer | Token path | CSS variable |
|---|---|---|---|---|
| Text color | rest | C | `components.hpe.select.default.option.rest.textColor` | `--hpe-select-default-option-rest-text-color`* |
| Border color | rest | C | `components.hpe.select.default.option.rest.borderColor` | `--hpe-select-default-option-rest-border-color`* |
| Font weight | rest | C | `components.hpe.select.default.option.rest.fontWeight` | `--hpe-select-default-option-rest-font-weight`* |
| Background | hover | C | `components.hpe.select.default.option.hover.background` | `--hpe-select-default-option-hover-background`* |
| Border color | hover | C | `components.hpe.select.default.option.hover.borderColor` | `--hpe-select-default-option-hover-border-color`* |
| Text color | hover | C | `components.hpe.select.default.option.hover.textColor` | `--hpe-select-default-option-hover-text-color`* |
| Background | selected › rest | C | `components.hpe.select.default.option.selected.rest.background` | `--hpe-select-default-option-selected-rest-background`* |
| Border color | selected › rest | C | `components.hpe.select.default.option.selected.rest.borderColor` | `--hpe-select-default-option-selected-rest-border-color`* |
| Text color | selected › rest | C | `components.hpe.select.default.option.selected.rest.textColor` | `--hpe-select-default-option-selected-rest-text-color`* |
| Font weight | selected › rest | C | `components.hpe.select.default.option.selected.rest.fontWeight` | `--hpe-select-default-option-selected-rest-font-weight`* |
| Background | selected › hover | C | `components.hpe.select.default.option.selected.hover.background` | `--hpe-select-default-option-selected-hover-background`* |
| Text color | selected › hover | C | `components.hpe.select.default.option.selected.hover.textColor` | `--hpe-select-default-option-selected-hover-text-color`* |
| Background | disabled › rest | C | `components.hpe.select.default.option.disabled.rest.background` | `--hpe-select-default-option-disabled-rest-background`* |
| Border color | disabled › rest | C | `components.hpe.select.default.option.disabled.rest.borderColor` | `--hpe-select-default-option-disabled-rest-border-color`* |
| Text color | disabled › rest | C | `components.hpe.select.default.option.disabled.rest.textColor` | `--hpe-select-default-option-disabled-rest-text-color`* |
| Font weight | disabled › rest | C | `components.hpe.select.default.option.disabled.rest.fontWeight` | `--hpe-select-default-option-disabled-rest-font-weight`* |

---

## 7. Selected Marker

The selected marker is a non-flow decorative element on the leading edge 
of a selected option. See constraints for positioning requirements.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Width | selected | C | `components.hpe.select.default.medium.option.marker.width` | `--hpe-select-default-medium-option-marker-width`* | |
| Top offset | selected | C | `components.hpe.select.default.medium.option.marker.top` | `--hpe-select-default-medium-option-marker-top`* | Positions marker flush with option top edge |
| Bottom offset | selected | C | `components.hpe.select.default.medium.option.marker.bottom` | `--hpe-select-default-medium-option-marker-bottom`* | Positions marker flush with option bottom edge |
| Left offset | selected | C | `components.hpe.select.default.medium.option.marker.left` | `--hpe-select-default-medium-option-marker-left`* | Positions marker at leading edge |
| Border radius (top-left) | selected | C | `components.hpe.select.default.medium.option.marker.borderTopLeftRadius` | `--hpe-select-default-medium-option-marker-border-top-left-radius`* | Rounded on the outer corners only |
| Border radius (bottom-left) | selected | C | `components.hpe.select.default.medium.option.marker.borderBottomLeftRadius` | `--hpe-select-default-medium-option-marker-border-bottom-left-radius`* | |
| Background | selected › rest | C | `components.hpe.select.default.option.marker.rest.background` | `--hpe-select-default-option-marker-rest-background`* | |
| Background | selected › hover | C | `components.hpe.select.default.option.marker.rest.background` | `--hpe-select-default-option-marker-rest-background`* | Same token as rest — marker color does not change on hover |
| Background | disabled | S | `hpe.color.border.disabled` | `--hpe-color-border-disabled`* | Falls back to semantic border-disabled |

---

## 8. Clear Button

Visually consistent with Options — intentionally reuses option tokens.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Padding X | all | C | `components.hpe.select.default.medium.option.paddingX` | `--hpe-select-default-medium-option-padding-x`* | Same as option |
| Padding Y | all | C | `components.hpe.select.default.medium.option.paddingY` | `--hpe-select-default-medium-option-padding-y`* | Same as option |
| Border radius | all | C | `components.hpe.select.default.medium.option.borderRadius` | `--hpe-select-default-medium-option-border-radius`* | Same as option |
| Border width | all | C | `components.hpe.select.default.medium.option.borderWidth` | `--hpe-select-default-medium-option-border-width`* | Same as option |
| Text color | rest | S | `hpe.color.text.strong` | `--hpe-color-text-strong`* | |
| Font weight | rest | C | `components.hpe.select.default.option.rest.fontWeight` | `--hpe-select-default-option-rest-font-weight`* | Same as option |
| Background | hover | C | `components.hpe.select.default.option.hover.background` | `--hpe-select-default-option-hover-background`* | Same as option hover |
| Text color | hover | S | `hpe.color.text.strong` | `--hpe-color-text-strong`* | Unchanged on hover |

---

## 9. Search Input

The search input inside the Drop reuses global input styles. No 
Select-specific tokens apply — it is styled by the global `input` 
and `textInput` theme entries which reference FormField tokens.

| Property | Notes |
|---|---|
| Padding | `3xsmall` — semantic spacing token |
| All other styles | Inherited from global input — see FormField spec |

---

## Token coverage summary

| Part | Component tokens | Semantic tokens | Hardcoded values | Gaps |
|---|---|---|---|---|
| Trigger | Via FormField | — | `opacity: 0.3` on disabled | Disabled opacity has no token |
| Value / Placeholder | Partial (font weight) | Text, placeholder colors | — | — |
| Trigger Icon | — | `icon` color alias | — | No component token |
| Drop | ✓ Full coverage | Shadow via elevation | — | — |
| Listbox | — | — | — | No tokens needed |
| Option | ✓ Full coverage | — | — | — |
| Selected Marker | ✓ Full coverage | Border-disabled (fallback) | — | — |
| Clear Button | Reuses option tokens | `text-strong` | — | — |
| Search Input | — | Via FormField | — | — |

---

## Semantic token reference

Semantic tokens used in this component for quick reference:

| Alias used in theme | Full semantic path | CSS variable |
|---|---|---|
| `icon` | `hpe.color.icon.default` | `--hpe-color-icon-default`* |
| `text-strong` | `hpe.color.text.strong` | `--hpe-color-text-strong`* |
| `border-disabled` | `hpe.color.border.disabled` | `--hpe-color-border-disabled`* |
| `placeholder` | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* |
| `hpe.shadow.medium` | `hpe.shadow.medium` | `--hpe-shadow-medium`* |