# FormField — Tokens

> Source: `grommet-theme-hpe` `src/js/themes/hpe.js`
> Status: v3 — GAP-006, GAP-007, GAP-008, GAP-011 corrected
> Token naming pattern: camelCase for all multi-word segments

---

## Changelog

| Version | Change |
|---|---|
| v1 | Initial token spec |
| v3 | GAP-006: Focus border-color tokens flagged as missing from package |
| v3 | GAP-007: `minHeight` token added to Input container sizing |
| v3 | GAP-008: `fontSize` and `lineHeight` added to Value typography |
| v3 | GAP-011: `label-marginBottom` flagged as missing from package |

---

## Token layers

| Symbol | Meaning |
|---|---|
| `C` | Component token (`components.hpe.formField.*`) |
| `S` | Semantic token (`hpe.color.*`, `hpe.fontSize.*` etc.) |

⚠️ CSS variable names marked with `*` are pending verification against
`dist/css/components.css`. Apply the confirmed camelCase pattern throughout.

⛔ CSS variable names marked with `⛔` have been confirmed as **missing**
from the package. Do not reference them in implementation — log them in
`innovation/GAPS.md` and use a workaround.

---

## 1. Label

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Font size | all | C | `components.hpe.formField.default.label.fontSize` | `--hpe-formField-default-label-fontSize`* | |
| Font weight | all | C | `components.hpe.formField.default.label.fontWeight` | `--hpe-formField-default-label-fontWeight`* | |
| Color | rest | C | `components.hpe.formField.default.label.rest.color` | `--hpe-formField-default-label-rest-color`* | |
| Color | disabled | C | `components.hpe.formField.default.label.disabled.color` | `--hpe-formField-default-label-disabled-color`* | |
| Margin bottom | all | C | `components.hpe.formField.default.medium.label.marginBottom` | `--hpe-formField-default-medium-label-marginBottom` ⛔ | GAP-011: Missing from package — use `gap` on the field root as workaround |

---

## 2. Required indicator

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | all | C | `components.hpe.formField.default.requiredIndicator.color` | `--hpe-formField-default-requiredIndicator-color`* | |
| Content | — | — | `"*"` | — | Not a token — rendered as a character |
| Margin left | all | C | `components.hpe.formField.default.medium.requiredIndicator.marginLeft` | `--hpe-formField-default-medium-requiredIndicator-marginLeft`* | |

---

## 3. Input container

### Sizing (medium)

| Property | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|
| Min height | C | `components.hpe.formField.default.medium.input.container.minHeight` | `--hpe-formField-default-medium-input-container-minHeight` | ✓ Confirmed — resolves to 36px. GAP-007 |
| Padding X | C | `components.hpe.formField.default.medium.input.container.paddingX` | `--hpe-formField-default-medium-input-container-paddingX`* | |
| Padding Y | C | `components.hpe.formField.default.medium.input.container.paddingY` | `--hpe-formField-default-medium-input-container-paddingY`* | |
| Border radius | C | `components.hpe.formField.default.medium.input.container.borderRadius` | `--hpe-formField-default-medium-input-container-borderRadius`* | |
| Border width | C | `components.hpe.formField.default.medium.input.container.borderWidth` | `--hpe-formField-default-medium-input-container-borderWidth`* | |

### States

| Property | State | Layer | CSS variable | Notes |
|---|---|---|---|---|
| Border color | rest | C | `--hpe-formField-default-input-container-rest-borderColor`* | |
| Border color | focus | C | `--hpe-formField-default-input-container-focus-borderColor` ⛔ | GAP-006: Missing — focus communicated by focus ring only, not border change |
| Border color | error | C | `--hpe-formField-default-input-container-error-rest-borderColor`* | |
| Border color | error + focus | C | `--hpe-formField-default-input-container-error-focus-borderColor` ⛔ | GAP-006: Missing — same as above |
| Border color | success | C | `--hpe-formField-default-input-container-success-rest-borderColor`* | |
| Border color | disabled | C | `--hpe-formField-default-input-container-disabled-rest-borderColor`* | |
| Background | rest | C | `--hpe-formField-default-input-container-rest-background`* | |
| Background | disabled | C | `--hpe-formField-default-input-container-disabled-rest-background`* | |

---

## 4. Value (child input typography)

> GAP-008 corrected: fontSize and lineHeight now documented.
> These are required to produce the correct trigger height:
> 1px border + paddingY + lineHeight + paddingY + 1px border = minHeight (36px)
> Child inputs (Select, TextInput etc.) consume these — FormField does not apply them directly.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Font size | all | C | `components.hpe.formField.default.medium.value.fontSize` | `--hpe-formField-default-medium-value-fontSize`* | Resolves to 1rem |
| Line height | all | C | `components.hpe.formField.default.medium.value.lineHeight` | `--hpe-formField-default-medium-value-lineHeight`* | Resolves to 1.5rem |
| Font weight | all | C | `components.hpe.formField.default.medium.value.fontWeight` | `--hpe-formField-default-medium-value-fontWeight`* | |
| Color | populated | S | `hpe.color.text.default` | `--hpe-color-text-default`* | |
| Color | placeholder | S | `hpe.color.text.placeholder` | `--hpe-color-text-placeholder`* | |
| Color | disabled | S | `hpe.color.text.disabled` | `--hpe-color-text-disabled`* | |

---

## 5. Help text

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | rest | C | `components.hpe.formField.default.help.rest.color` | `--hpe-formField-default-help-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.help.fontSize` | `--hpe-formField-default-help-fontSize`* | |
| Margin top | all | C | `components.hpe.formField.default.medium.help.marginTop` | `--hpe-formField-default-medium-help-marginTop`* | |

---

## 6. Error message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | error | C | `components.hpe.formField.default.error.rest.color` | `--hpe-formField-default-error-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.error.fontSize` | `--hpe-formField-default-error-fontSize`* | Same size as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.error.marginTop` | `--hpe-formField-default-medium-error-marginTop`* | Same as help text margin |

---

## 7. Success message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | success | C | `components.hpe.formField.default.success.rest.color` | `--hpe-formField-default-success-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.success.fontSize` | `--hpe-formField-default-success-fontSize`* | Same size as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.success.marginTop` | `--hpe-formField-default-medium-success-marginTop`* | Same as help text margin |

---

## 8. Info message

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| Color | info | C | `components.hpe.formField.default.info.rest.color` | `--hpe-formField-default-info-rest-color`* | |
| Font size | all | C | `components.hpe.formField.default.info.fontSize` | `--hpe-formField-default-info-fontSize`* | Same size as help text |
| Margin top | all | C | `components.hpe.formField.default.medium.info.marginTop` | `--hpe-formField-default-medium-info-marginTop`* | Same as help text margin |

---

## Token coverage summary

| Part | Component tokens | Semantic tokens | Hardcoded | Gaps |
|---|---|---|---|---|
| Label | ✓ Partial | — | — | `marginBottom` missing from package (GAP-011) |
| Required indicator | ✓ Full coverage | — | `"*"` character | Not a token gap |
| Input container | ✓ Full coverage | — | — | Focus border-color tokens missing (GAP-006) |
| Value | fontSize, lineHeight, fontWeight | Text colors | — | — |
| Help text | ✓ Full coverage | — | — | — |
| Error message | ✓ Full coverage | — | — | — |
| Success message | ✓ Full coverage | — | — | — |
| Info message | ✓ Full coverage | — | — | — |