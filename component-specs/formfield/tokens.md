# FormField — Tokens

> Source: `grommet-theme-hpe` `src/js/themes/hpe.js`
> Status: v1 draft
> Token naming pattern: camelCase for all multi-word segments
> See: `select/select-tokens-guide.md → Token naming pattern`

---

## Token layers

| Symbol | Meaning |
|---|---|
| `C` | Component token (`components.hpe.formField.*`) |
| `S` | Semantic token (`hpe.color.*`, `hpe.fontSize.*` etc.) |

⚠️ CSS variable names marked with `*` are pending verification against
`dist/css/components.css`. Apply the confirmed camelCase pattern throughout.

---

## 1. Label

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Font size | all | C | `components.hpe.formField.default.label.fontSize` | `--hpe-formField-default-label-fontSize`* | |
| Font weight | all | C | `components.hpe.formField.default.label.fontWeight` | `--hpe-formField-default-label-fontWeight`* | |
| Color | rest | C | `components.hpe.formField.default.label.rest.color` | `--hpe-formField-default-label-rest-color`* | |
| Color | disabled | C | `components.hpe.formField.default.label.disabled.color` | `--hpe-formField-default-label-disabled-color`* | |
| Margin bottom | all | C | `components.hpe.formField.default.medium.label.marginBottom` | `--hpe-formField-default-medium-label-marginBottom`* | Gap between label and input container |

---

## 2. Required indicator

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | all | C | `components.hpe.formField.default.requiredIndicator.color` | `--hpe-formField-default-requiredIndicator-color`* | Typically matches error or brand color |
| Content | — | — | `"*"` | — | Not a token — rendered as a character |
| Margin left | all | C | `components.hpe.formField.default.medium.requiredIndicator.marginLeft` | `--hpe-formField-default-medium-requiredIndicator-marginLeft`* | Gap between label text and asterisk |

---

## 3. Input container

The input container is the styled border box. It does not contain
typography tokens — those belong to the child input control.

### Sizing (medium)

| Property | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|
| Padding X | C | `components.hpe.formField.default.medium.input.container.paddingX` | `--hpe-formField-default-medium-input-container-paddingX`* | |
| Padding Y | C | `components.hpe.formField.default.medium.input.container.paddingY` | `--hpe-formField-default-medium-input-container-paddingY`* | |
| Border radius | C | `components.hpe.formField.default.medium.input.container.borderRadius` | `--hpe-formField-default-medium-input-container-borderRadius`* | All four corners |
| Border width | C | `components.hpe.formField.default.medium.input.container.borderWidth` | `--hpe-formField-default-medium-input-container-borderWidth`* | |

### States

| Property | State | Layer | Token path | CSS variable |
|---|---|---|---|---|
| Border color | rest | C | `components.hpe.formField.default.input.container.rest.borderColor` | `--hpe-formField-default-input-container-rest-borderColor`* |
| Border color | focus | C | `components.hpe.formField.default.input.container.focus.borderColor` | `--hpe-formField-default-input-container-focus-borderColor`* |
| Border color | error | C | `components.hpe.formField.default.input.container.error.rest.borderColor` | `--hpe-formField-default-input-container-error-rest-borderColor`* |
| Border color | error + focus | C | `components.hpe.formField.default.input.container.error.focus.borderColor` | `--hpe-formField-default-input-container-error-focus-borderColor`* |
| Border color | success | C | `components.hpe.formField.default.input.container.success.rest.borderColor` | `--hpe-formField-default-input-container-success-rest-borderColor`* |
| Border color | disabled | C | `components.hpe.formField.default.input.container.disabled.rest.borderColor` | `--hpe-formField-default-input-container-disabled-rest-borderColor`* |
| Background | rest | C | `components.hpe.formField.default.input.container.rest.background` | `--hpe-formField-default-input-container-rest-background`* |
| Background | disabled | C | `components.hpe.formField.default.input.container.disabled.rest.background` | `--hpe-formField-default-input-container-disabled-rest-background`* |

---

## 4. Value (child input typography)

These tokens apply to the text inside the input control — consumed by
child inputs (Select, TextInput etc.), not by FormField itself.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Font weight | all | C | `components.hpe.formField.default.medium.value.fontWeight` | `--hpe-formField-default-medium-value-fontWeight`* | |
| Color | populated | S | `hpe.color.text.default` | `--hpe-color-text-default`* | |
| Color | placeholder | S | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* | |
| Color | disabled | S | `hpe.color.text.disabled` | `--hpe-color-text-disabled`* | |

---

## 5. Help text

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | rest | C | `components.hpe.formField.default.help.rest.color` | `--hpe-formField-default-help-rest-color`* | Typically `text-weak` |
| Font size | all | C | `components.hpe.formField.default.help.fontSize` | `--hpe-formField-default-help-fontSize`* | Smaller than label |
| Margin top | all | C | `components.hpe.formField.default.medium.help.marginTop` | `--hpe-formField-default-medium-help-marginTop`* | Gap between input container and help text |

---

## 6. Error message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | error | C | `components.hpe.formField.default.error.rest.color` | `--hpe-formField-default-error-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.error.fontSize` | `--hpe-formField-default-error-fontSize`* | Same as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.error.marginTop` | `--hpe-formField-default-medium-error-marginTop`* | Same as help text margin |

---

## 7. Success message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | success | C | `components.hpe.formField.default.success.rest.color` | `--hpe-formField-default-success-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.success.fontSize` | `--hpe-formField-default-success-fontSize`* | Same as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.success.marginTop` | `--hpe-formField-default-medium-success-marginTop`* | Same as help text margin |

---

## 8. Info message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | info | C | `components.hpe.formField.default.info.rest.color` | `--hpe-formField-default-info-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.info.fontSize` | `--hpe-formField-default-info-fontSize`* | Same as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.info.marginTop` | `--hpe-formField-default-medium-info-marginTop`* | Same as help text margin |

---

## Token coverage summary

| Part | Component tokens | Semantic tokens | Hardcoded values | Gaps |
|---|---|---|---|---|
| Label | ✓ Full coverage | — | — | — |
| Required indicator | ✓ Full coverage | — | `"*"` character | Not a token gap |
| Input container | ✓ Full coverage | — | — | — |
| Value | Partial (font weight) | Text colors | — | — |
| Help text | ✓ Full coverage | — | — | — |
| Error message | ✓ Full coverage | — | — | — |
| Success message | ✓ Full coverage | — | — | — |
| Info message | ✓ Full coverage | — | — | — |