# Token Conventions

This file is shared across all capabilities in the knowledge system.
It defines the CSS custom property naming rules for `hpe-design-tokens`
that apply to every component spec, mapping, and implementation.

---

## camelCase is mandatory

All multi-word segments in CSS variable names use camelCase.
kebab-case is always wrong.

| Wrong (kebab-case) | Correct (camelCase) |
|---|---|
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
| `--hpe-...-margin-bottom` | `--hpe-...-marginBottom` |
| `--hpe-...-margin-top` | `--hpe-...-marginTop` |
| `--hpe-form-field-...` | `--hpe-formField-...` |
| `--hpe-focus-indicator-...` | `--hpe-focusIndicator-...` |
| `--hpe-...-border-radius` | `--hpe-...-borderRadius` |

---

## Token layer symbols

Used in all spec documents to indicate the origin of a token:

| Symbol | Layer | Source |
|---|---|---|
| `C` | Component token | `components.hpe.*` in `hpe-design-tokens` |
| `S` | Semantic token | `hpe.color.*`, `hpe.shadow.*`, `hpe.fontSize.*` etc. |
| `F` | FormField inherited | From the FormField spec — do not redefine in child components |

---

## Verification markers

Used in `tokens.md` tables to indicate confidence level:

| Marker | Meaning |
|---|---|
| _(no marker)_ | Confirmed present in `hpe-design-tokens` package |
| `*` | Unverified — applies the camelCase pattern but not yet confirmed against the built CSS |
| `⛔` | Confirmed missing from the package — log as GAP-XXX |

---

## Focus indicator pattern

The HPE focus indicator is a two-colour ring that always requires
all three tokens applied together. Never use only one or two of them.
Never reference separate width, color, or offset tokens — they do not
exist in the package.

```css
outline: var(--hpe-focusIndicator-outline);
outline-offset: var(--hpe-focusIndicator-outlineOffset);
box-shadow: var(--hpe-focusIndicator-boxShadow);
```

| Token | What it sets | Confirmed |
|---|---|---|
| `--hpe-focusIndicator-outline` | Outer ring — full outline shorthand | ✓ |
| `--hpe-focusIndicator-outlineOffset` | Gap between element and outer ring | ✓ |
| `--hpe-focusIndicator-boxShadow` | Inner ring via box-shadow | ✓ |

---

## Disabled state pattern

Disabled state is always applied as opacity on the root element.
Never override individual border colors, text colors, or backgrounds
on the disabled state — child elements inherit disabled appearance
through opacity.

```css
.hpe-component[data-disabled] {
  opacity: 0.3;
  pointer-events: none;
  cursor: default;
}
```

---

## Token import order

Always import tokens in this order:

```js
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```
