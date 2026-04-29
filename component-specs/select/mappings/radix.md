# Select — Radix UI Mapping

> Maps the platform-agnostic Select spec to Radix UI's Select primitive.
> Read alongside: `../anatomy.md`, `../tokens.md`, `../constraints.md`
>
> Radix package: `@radix-ui/react-select`
> Install: `npm install @radix-ui/react-select`
> Radix docs: https://www.radix-ui.com/primitives/docs/components/select
>
> Token consumption: CSS custom properties via `hpe-design-tokens`
> Token setup: see `component-specs/tokens-usage.md`
> Status: v1 draft

---

## How Radix implements Select

Radix Select is a collection of unstyled, composable primitive parts.
Every visual decision is left entirely to the implementor via CSS.
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
| Selected Marker | `<Select.ItemIndicator>` | Child of Item — only renders when selected |
| Group | `<Select.Group>` | Optional grouping container |
| Group Header | `<Select.Label>` | Child of Group |
| Separator | `<Select.Separator>` | Optional divider between groups |

> **Notable differences from Grommet:**
> - Radix has no built-in Search or Clear — these must be built separately
> - `<Select.ItemIndicator>` is a named part that only renders when the 
>   item is selected — it is not a CSS pseudo-element
> - Radix handles portal rendering automatically via `<Select.Portal>`

---

## State → data-attribute mapping

Radix communicates component state via HTML data-attributes.
These are the hooks for all state-based CSS.

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

Add to your app entry point before any component styles:

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
import './select.css'; // your HPE token styles

export const HPESelect = ({ placeholder, children, disabled, ...props }) => (
  <Select.Root disabled={disabled} {...props}>

    <Select.Trigger className="hpe-select__trigger">
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="hpe-select__icon">
        {/* chevron icon */}
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="hpe-select__content" position="popper">
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

> **Note on `position="popper"`:** Radix Content supports two positioning 
> modes — `"item-aligned"` (default, aligns drop over the selected item) 
> and `"popper"` (aligns drop below the trigger like a standard dropdown).
> HPE Select uses `"popper"` — it matches the Grommet Drop behaviour 
> and the layout described in `anatomy.md`.

---

## CSS

```css
/* ===========================================
   HPE Select — Radix UI
   Tokens from hpe-design-tokens
   See: component-specs/select/tokens.md
   =========================================== */

/* -------------------------------------------
   1. Trigger
   Tokens inherited from FormField spec.
   ------------------------------------------- */

.hpe-select__trigger {
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  /* FormField input container tokens */
  padding-block: var(--hpe-form-field-default-medium-input-container-padding-y);
  padding-inline: var(--hpe-form-field-default-medium-input-container-padding-x);
  border-radius: var(--hpe-form-field-default-medium-input-container-border-radius);
  border-width: var(--hpe-form-field-default-medium-input-container-border-width);
  border-style: solid;
  border-color: var(--hpe-form-field-default-input-container-rest-border-color);

  /* Typography */
  font-weight: var(--hpe-form-field-default-medium-value-font-weight);
  color: var(--hpe-color-text-default);

  /* Behaviour */
  cursor: pointer;
}

/* DO NOT add height/width changes on any state — see constraints §1 */

.hpe-select__trigger:hover {
  /* No visual change on trigger hover in HPE spec */
  /* Border and background remain identical to rest */
}

.hpe-select__trigger:focus-visible {
  /* Global HPE focus ring — two-colour outline */
  /* Do not add border-color changes here — see constraints §1 */
  outline: var(--hpe-focus-indicator-outline-width) solid
    var(--hpe-focus-indicator-outline-color);
  outline-offset: var(--hpe-focus-indicator-outline-offset);
}

.hpe-select__trigger[data-state="open"] {
  /* No visual differentiation when open — see gaps in grommet.md */
}

.hpe-select__trigger[data-disabled] {
  opacity: 0.3;
  cursor: default;
  /* Apply opacity to the whole trigger — do not change individual
     token properties. See constraints §1 and §8 */
}

/* Value / Placeholder */

.hpe-select__trigger [data-placeholder] {
  color: var(--hpe-color-text-placeholder);
}


/* -------------------------------------------
   2. Trigger Icon
   ------------------------------------------- */

.hpe-select__icon {
  color: var(--hpe-color-icon-default);
  /* Icon inherits disabled opacity from trigger — no separate rule needed */
}


/* -------------------------------------------
   3. Drop (Select.Content)
   Renders inside Select.Portal — outside normal DOM flow.
   ------------------------------------------- */

.hpe-select__content {
  /* Surface */
  background: var(--hpe-drop-default-background);
  border-radius: var(--hpe-drop-default-border-radius);

  /* Elevation */
  box-shadow: var(--hpe-shadow-medium);

  /* Positioning offset from trigger */
  /* With position="popper", use sideOffset for the margin token */
  /* Pass sideOffset={margin} as a prop — see component structure above */

  /* Z-index — must clear HPE global header (z-index 101) */
  z-index: var(--hpe-drop-default-z-index);

  /* Width — must be at least as wide as trigger */
  /* With position="popper" this is controlled via:
     width: var(--radix-select-trigger-width);
     See constraints §2 */
  min-width: var(--radix-select-trigger-width);
}

/* Radix provides --radix-select-trigger-width as a CSS variable
   automatically when position="popper" — use it to match trigger width */


/* -------------------------------------------
   4. Listbox (Select.Viewport)
   Scroll container — no visual tokens of its own.
   ------------------------------------------- */

.hpe-select__viewport {
  /* Drop padding — top only, not bottom. See constraints §2 */
  padding-top: var(--hpe-select-default-medium-drop-padding-y);
  padding-inline: var(--hpe-select-default-medium-drop-padding-x);

  /* Flex column layout with gap between options */
  display: flex;
  flex-direction: column;
  gap: var(--hpe-select-default-medium-drop-gap-y);

  /* No background, border, or radius — see constraints §3 */
}


/* -------------------------------------------
   5. Option (Select.Item)
   ------------------------------------------- */

.hpe-select__item {
  /* Layout — position relative required for ItemIndicator */
  position: relative; /* DO — see constraints §4 */
  display: flex;
  align-items: center;

  /* Sizing */
  padding-block: var(--hpe-select-default-medium-option-padding-y);
  padding-inline: var(--hpe-select-default-medium-option-padding-x);
  border-radius: var(--hpe-select-default-medium-option-border-radius);
  border-width: var(--hpe-select-default-medium-option-border-width);
  border-style: solid;

  /* Rest state */
  border-color: var(--hpe-select-default-option-rest-border-color);
  color: var(--hpe-select-default-option-rest-text-color);
  font-weight: var(--hpe-select-default-option-rest-font-weight);

  /* Behaviour */
  cursor: pointer;
  user-select: none;

  /* DO NOT change height between states — see constraints §4 */
}

/* Hover state — also applies to keyboard focus within the list */
/* Radix uses [data-highlighted] for both pointer hover and keyboard focus */

.hpe-select__item[data-highlighted] {
  background: var(--hpe-select-default-option-hover-background);
  border-color: var(--hpe-select-default-option-hover-border-color);
  color: var(--hpe-select-default-option-hover-text-color);
  outline: none; /* Focus ring is handled by data-highlighted, not :focus */
}

/* Selected state */

.hpe-select__item[data-state="checked"] {
  background: var(--hpe-select-default-option-selected-rest-background);
  border-color: var(--hpe-select-default-option-selected-rest-border-color);
  color: var(--hpe-select-default-option-selected-rest-text-color);
  font-weight: var(--hpe-select-default-option-selected-rest-font-weight);
}

/* Selected + hover state */

.hpe-select__item[data-state="checked"][data-highlighted] {
  background: var(--hpe-select-default-option-selected-hover-background);
  color: var(--hpe-select-default-option-selected-hover-text-color);
}

/* Disabled state */

.hpe-select__item[data-disabled] {
  background: var(--hpe-select-default-option-disabled-rest-background);
  border-color: var(--hpe-select-default-option-disabled-rest-border-color);
  color: var(--hpe-select-default-option-disabled-rest-text-color);
  font-weight: var(--hpe-select-default-option-disabled-rest-font-weight);
  cursor: default;
  pointer-events: none;
}


/* -------------------------------------------
   6. Selected Marker (Select.ItemIndicator)

   In Radix, ItemIndicator is a named component part that only
   renders in the DOM when the item is selected.

   In Grommet this is a ::before pseudo-element.
   The anatomical intent is identical — a non-flow element on
   the leading edge of the selected option.

   See constraints §5 for positioning rules.
   ------------------------------------------- */

.hpe-select__item-indicator {
  /* Remove from layout flow */
  position: absolute;

  /* Leading edge placement */
  left: var(--hpe-select-default-medium-option-marker-left);
  top: var(--hpe-select-default-medium-option-marker-top);
  bottom: var(--hpe-select-default-medium-option-marker-bottom);

  /* Dimensions */
  width: var(--hpe-select-default-medium-option-marker-width);

  /* Rounded outer corners only — see constraints §5 */
  border-top-left-radius: var(--hpe-select-default-medium-option-marker-border-top-left-radius);
  border-bottom-left-radius: var(--hpe-select-default-medium-option-marker-border-bottom-left-radius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  /* Colour — rest and hover use same token */
  background: var(--hpe-select-default-option-marker-rest-background);
}

/* Disabled selected marker */

.hpe-select__item[data-disabled] .hpe-select__item-indicator {
  background: var(--hpe-color-border-disabled);
}


/* -------------------------------------------
   7. Group Header (Select.Label)
   ------------------------------------------- */

.hpe-select__label {
  padding-block: var(--hpe-select-default-medium-option-padding-y);
  padding-inline: var(--hpe-select-default-medium-option-padding-x);
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
  margin-block: var(--hpe-select-default-medium-drop-gap-y);
  margin-inline: var(--hpe-select-default-medium-drop-padding-x);
}
```

---

## Radix-specific implementation notes

| Topic | Note |
|---|---|
| **Portal** | Always wrap `<Select.Content>` in `<Select.Portal>`. This ensures the Drop renders outside the document flow. Without it, the Drop is inline and breaks layouts — see constraints §2 |
| **Collision detection** | Radix handles intelligent Drop flipping automatically when `position="popper"`. No additional configuration needed — see constraints §2 |
| **Trigger width matching** | With `position="popper"`, Radix exposes `--radix-select-trigger-width` as a CSS variable on the Content. Use `min-width: var(--radix-select-trigger-width)` to satisfy the width constraint |
| **`sideOffset` prop** | Pass the margin token value to `<Select.Content sideOffset={...}>` to set the gap between trigger and drop. This replaces `global.drop.margin` from the Grommet mapping |
| **`data-highlighted` vs `:hover`** | Always use `[data-highlighted]` for option hover/focus styles — not `:hover`. Radix removes pointer events during keyboard navigation, so `:hover` alone misses keyboard states |
| **`ItemIndicator` rendering** | `<Select.ItemIndicator>` only renders in the DOM when `data-state="checked"`. It does not need a `display: none` rest state — Radix handles this |
| **Search** | Radix Select has no built-in search. If needed, use `@radix-ui/react-select` with a controlled filter pattern, or switch to `@radix-ui/react-combobox` for searchable lists |
| **Clear** | Radix Select has no built-in clear. Implement as a separate `<Select.Item value="">` styled with the Clear Button tokens, or as a button outside the Select that resets the value prop |
| **Multi-select** | Radix Select does not support multi-select natively. Use a combination of checkboxes or `@radix-ui/react-popover` with a custom list for multi-select patterns |

---

## Gaps between Radix and HPE spec

| Gap | Detail | Recommendation |
|---|---|---|
| No built-in Search | Radix Select has no search input | Use a combobox pattern or controlled filter with `@radix-ui/react-combobox` |
| No built-in Clear | Radix has no clear affordance | Add a controlled reset button outside the Select, or a special empty-value Item |
| No multi-select | Radix Select is single-select only | Use a Popover + custom list for multi-select |
| `sideOffset` not a token | The margin between trigger and drop must be passed as a numeric prop | Read the margin token value and pass it as `sideOffset` on `<Select.Content>` |
| No size variants | Only medium size is currently specified | When small/large tokens are added to `tokens.md`, add size modifier classes here |