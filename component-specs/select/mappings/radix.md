# Select — Radix UI Mapping

> Maps the platform-agnostic Select spec to Radix UI's Select primitive.
> Read alongside: `../anatomy.md`, `../tokens.md`, `../constraints.md`
>
> Radix package: `@radix-ui/react-select`
> Radix docs: https://www.radix-ui.com/primitives/docs/components/select
> Token setup: see `component-specs/tokens-usage.md`
> Status: v3 — GAP-007, GAP-008, GAP-009, GAP-010 corrected

---

## Changelog

| Version | Change |
|---|---|
| v2 | GAP-001: CSS variable names corrected to camelCase |
| v2 | GAP-002: `sideOffset` documented as JS constant |
| v2 | GAP-003: Focus indicator tokens corrected |
| v3 | GAP-007: `min-height` added to trigger CSS |
| v3 | GAP-008: `font-size` and `line-height` added to trigger CSS |
| v3 | GAP-009: Drop bottom padding corrected — `padding-block` on viewport |
| v3 | GAP-010: Icon size controlled via CSS using `--hpe-element-medium-icon-size` |

---

## How Radix implements Select

Radix Select is a collection of unstyled, composable primitive parts.
Radix handles all behaviour: open/close, keyboard navigation,
ARIA attributes, portal rendering, and collision detection.

### Anatomy part → Radix part mapping

| Anatomy part | Radix component | Notes |
|---|---|---|
| Root | `<Select.Root>` | State container — not styled |
| Trigger | `<Select.Trigger>` | The visible control |
| Value / Placeholder | `<Select.Value>` | Child of Trigger |
| Trigger Icon | `<Select.Icon>` | Child of Trigger |
| Drop | `<Select.Content>` | Renders via `<Select.Portal>` |
| Listbox | `<Select.Viewport>` | Scroll container inside Content |
| Option | `<Select.Item>` | Each selectable item |
| Selected Marker | `<Select.ItemIndicator>` | Only renders when selected |
| Group | `<Select.Group>` | Optional grouping container |
| Group Header | `<Select.Label>` | Child of Group |
| Separator | `<Select.Separator>` | Optional divider between groups |

---

## State → data-attribute mapping

| Anatomy state | Radix data-attribute | Applies to |
|---|---|---|
| open | `[data-state="open"]` | `Select.Trigger`, `Select.Content` |
| closed | `[data-state="closed"]` | `Select.Trigger`, `Select.Content` |
| hover / keyboard focus | `[data-highlighted]` | `Select.Item` |
| selected | `[data-state="checked"]` | `Select.Item` |
| selected + hover | `[data-state="checked"][data-highlighted]` | `Select.Item` |
| disabled | `[data-disabled]` | `Select.Item`, `Select.Trigger` |
| placeholder shown | `[data-placeholder]` | `Select.Value` |
| drop position (top) | `[data-side="top"]` | `Select.Content` |
| drop position (bottom) | `[data-side="bottom"]` | `Select.Content` |

---

## Token import

```js
// main.jsx or index.js
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```

---

## Component structure

```jsx
import * as Select from '@radix-ui/react-select';
import { FormDown } from 'grommet-icons';
import './selectV3.css';

// GAP-002: sideOffset cannot accept a CSS variable — JS number required.
// Resolved value of --hpe-drop-default-margin = 6px.
const DROP_MARGIN = 6;

export const HPESelectV3 = ({ placeholder, children, disabled, ...props }) => (
  <Select.Root disabled={disabled} {...props}>

    <Select.Trigger className="hpe-select__trigger">
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="hpe-select__icon">
        {/* GAP-010: size controlled via CSS, not the size prop */}
        <FormDown color="plain" />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        className="hpe-select__content"
        position="popper"
        sideOffset={DROP_MARGIN}
      >
        <Select.Viewport className="hpe-select__viewport">
          {children}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>

  </Select.Root>
);

export const HPESelectItem = ({ children, ...props }) => (
  <Select.Item className="hpe-select__item" {...props}>
    <Select.ItemIndicator className="hpe-select__item-indicator" />
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
);
```

---

## CSS

```css
/* ===========================================
   HPE Select v3 — Radix UI
   Tokens from hpe-design-tokens
   See: component-specs/select/tokens.md v3
   =========================================== */

/* -------------------------------------------
   1. Trigger
   ------------------------------------------- */

.hpe-select__trigger {
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  /* Sizing — GAP-007: min-height now applied */
  min-height: var(--hpe-formField-default-medium-input-container-minHeight);
  padding-block: var(--hpe-formField-default-medium-input-container-paddingY);
  padding-inline: var(--hpe-formField-default-medium-input-container-paddingX);

  /* Border */
  border-radius: var(--hpe-formField-default-medium-input-container-borderRadius);
  border-width: var(--hpe-formField-default-medium-input-container-borderWidth);
  border-style: solid;
  border-color: var(--hpe-formField-default-input-container-rest-borderColor);

  /* Typography — GAP-008: font-size and line-height now applied */
  font-size: var(--hpe-formField-default-medium-value-fontSize);
  line-height: var(--hpe-formField-default-medium-value-lineHeight);
  font-weight: var(--hpe-formField-default-medium-value-fontWeight);
  color: var(--hpe-color-text-default);

  /* Behaviour */
  cursor: pointer;
  background: none;
}

/* DO NOT change size, padding, or border-width on any state — see constraints §1 */

.hpe-select__trigger:focus-visible {
  /* GAP-003: two-colour focus ring — both tokens required */
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
  /* No border-color change on focus — see constraints §9 */
}

.hpe-select__trigger[data-disabled] {
  opacity: 0.3;
  cursor: default;
}

/* Value / Placeholder */

.hpe-select__trigger [data-placeholder] {
  color: var(--hpe-color-text-placeholder);
}


/* -------------------------------------------
   2. Trigger Icon
   GAP-010: size via CSS only — not grommet-icons size prop
   ------------------------------------------- */

.hpe-select__icon {
  display: flex;
  align-items: center;
  color: var(--hpe-color-icon-default);
}

.hpe-select__icon svg {
  width: var(--hpe-element-medium-icon-size);
  height: var(--hpe-element-medium-icon-size);
}


/* -------------------------------------------
   3. Drop (Select.Content)
   ------------------------------------------- */

.hpe-select__content {
  background: var(--hpe-drop-default-background);
  border-radius: var(--hpe-drop-default-borderRadius);
  box-shadow: var(--hpe-shadow-medium);
  z-index: var(--hpe-drop-default-zIndex);
  min-width: var(--radix-select-trigger-width);

  /* GAP-002: sideOffset passed as JS number in JSX — not applied here */
}


/* -------------------------------------------
   4. Listbox (Select.Viewport)
   GAP-009: padding-block applied to both top AND bottom
   ------------------------------------------- */

.hpe-select__viewport {
  /* Corrected: padding-block covers top and bottom equally */
  padding-block: var(--hpe-select-default-medium-drop-paddingY);
  padding-inline: var(--hpe-select-default-medium-drop-paddingX);

  display: flex;
  flex-direction: column;
  gap: var(--hpe-select-default-medium-drop-gapY);

  /* No background, border, or radius — see constraints §3 */
}


/* -------------------------------------------
   5. Option (Select.Item)
   ------------------------------------------- */

.hpe-select__item {
  position: relative; /* Required — see constraints §4 */
  display: flex;
  align-items: center;

  padding-block: var(--hpe-select-default-medium-option-paddingY);
  padding-inline: var(--hpe-select-default-medium-option-paddingX);
  border-radius: var(--hpe-select-default-medium-option-borderRadius);
  border-width: var(--hpe-select-default-medium-option-borderWidth);
  border-style: solid;
  border-color: var(--hpe-select-default-option-rest-borderColor);
  color: var(--hpe-select-default-option-rest-textColor);
  font-weight: var(--hpe-select-default-option-rest-fontWeight);

  cursor: pointer;
  user-select: none;
}

.hpe-select__item[data-highlighted] {
  background: var(--hpe-select-default-option-hover-background);
  border-color: var(--hpe-select-default-option-hover-borderColor);
  color: var(--hpe-select-default-option-hover-textColor);
  outline: none;
}

.hpe-select__item[data-state="checked"] {
  background: var(--hpe-select-default-option-selected-rest-background);
  border-color: var(--hpe-select-default-option-selected-rest-borderColor);
  color: var(--hpe-select-default-option-selected-rest-textColor);
  font-weight: var(--hpe-select-default-option-selected-rest-fontWeight);
}

.hpe-select__item[data-state="checked"][data-highlighted] {
  background: var(--hpe-select-default-option-selected-hover-background);
  color: var(--hpe-select-default-option-selected-hover-textColor);
}

.hpe-select__item[data-disabled] {
  background: var(--hpe-select-default-option-disabled-rest-background);
  border-color: var(--hpe-select-default-option-disabled-rest-borderColor);
  color: var(--hpe-select-default-option-disabled-rest-textColor);
  font-weight: var(--hpe-select-default-option-disabled-rest-fontWeight);
  cursor: default;
  pointer-events: none;
}


/* -------------------------------------------
   6. Selected Marker (Select.ItemIndicator)
   ------------------------------------------- */

.hpe-select__item-indicator {
  position: absolute;
  left: var(--hpe-select-default-medium-option-marker-left);
  top: var(--hpe-select-default-medium-option-marker-top);
  bottom: var(--hpe-select-default-medium-option-marker-bottom);
  width: var(--hpe-select-default-medium-option-marker-width);

  border-top-left-radius: var(--hpe-select-default-medium-option-marker-borderTopLeftRadius);
  border-bottom-left-radius: var(--hpe-select-default-medium-option-marker-borderBottomLeftRadius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  background: var(--hpe-select-default-option-marker-rest-background);
}

.hpe-select__item[data-disabled] .hpe-select__item-indicator {
  background: var(--hpe-color-border-disabled);
}


/* -------------------------------------------
   7. Group Header (Select.Label)
   ------------------------------------------- */

.hpe-select__label {
  padding-block: var(--hpe-select-default-medium-option-paddingY);
  padding-inline: var(--hpe-select-default-medium-option-paddingX);
  color: var(--hpe-color-text-weak);
  font-size: smaller;
  cursor: default;
  user-select: none;
}


/* -------------------------------------------
   8. Separator (Select.Separator)
   ------------------------------------------- */

.hpe-select__separator {
  height: 1px;
  background: var(--hpe-color-border-weak);
  margin-block: var(--hpe-select-default-medium-drop-gapY);
  margin-inline: var(--hpe-select-default-medium-drop-paddingX);
}
```

---

## Radix-specific implementation notes

| Topic | Note |
|---|---|
| **Portal** | Always wrap `<Select.Content>` in `<Select.Portal>` — see constraints §2 |
| **Collision detection** | Radix handles Drop flipping automatically with `position="popper"` |
| **Trigger width** | `min-width: var(--radix-select-trigger-width)` — see constraints §7 |
| **`sideOffset`** | Must be a JS number — see GAP-002 |
| **`data-highlighted`** | Always use instead of `:hover` — Radix removes pointer events during keyboard nav |
| **`ItemIndicator`** | Only in DOM when `data-state="checked"` — no `display: none` needed |
| **Focus ring** | Both `--hpe-focusIndicator-outline` and `--hpe-focusIndicator-boxShadow` required |
| **Icon size** | Always via CSS `--hpe-element-medium-icon-size` — never via grommet-icons `size` prop |

---

## Gaps between Radix and HPE spec

| Gap | Detail | Recommendation |
|---|---|---|
| No built-in Search | Radix Select has no search input | Use combobox pattern |
| No built-in Clear | Radix has no clear affordance | Add controlled reset button |
| No multi-select | Radix Select is single-select only | Use Popover + custom list |
| `sideOffset` not a token | Must be a numeric prop | See GAP-002 |
| No size variants | Only medium specified | Add size modifier classes when tokens land |