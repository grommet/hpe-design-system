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
> Status: v2 — GAP-001, GAP-002, GAP-003 corrected

---

## Changelog

| Version | Change |
|---|---|
| v2 | GAP-001: All CSS variable names corrected to camelCase to match actual `hpe-design-tokens` build output |
| v2 | GAP-002: `sideOffset` documented as a JS prop — CSS variable cannot be passed directly |
| v2 | GAP-003: Focus indicator tokens corrected to `--hpe-focusIndicator-outline` and `--hpe-focusIndicator-boxShadow`; inner ring documented |

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
import './select.css';

// GAP-002: sideOffset cannot accept a CSS variable — it requires a JS number.
// Read the margin token value via getComputedStyle at runtime, or use the
// known resolved value (6px = 6). See innovation/GAPS.md GAP-002.
const DROP_MARGIN = 6;

export const HPESelect = ({ placeholder, children, disabled, ...props }) => (
  <Select.Root disabled={disabled} {...props}>

    <Select.Trigger className="hpe-select__trigger">
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="hpe-select__icon">
        {/* chevron icon */}
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

> **Note on `position="popper"`:** Radix Content supports two positioning
> modes — `"item-aligned"` (default, aligns drop over the selected item)
> and `"popper"` (aligns drop below the trigger like a standard dropdown).
> HPE Select uses `"popper"` — it matches the Grommet Drop behaviour
> and the layout described in `anatomy.md`.

---

## CSS

> **GAP-001 corrected:** All CSS variable names now use camelCase for
> multi-word segments to match the actual `hpe-design-tokens` build output.
> Pattern: `--hpe-[camelCaseComponent]-[path]-[camelCaseProperty]`
> Example: `--hpe-formField-default-medium-input-container-borderRadius`
> Variables marked `*` are still pending verification against
> `dist/css/components.css`.

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
  padding-block: var(--hpe-formField-default-medium-input-container-paddingY);
  padding-inline: var(--hpe-formField-default-medium-input-container-paddingX);
  border-radius: var(--hpe-formField-default-medium-input-container-borderRadius);
  border-width: var(--hpe-formField-default-medium-input-container-borderWidth);
  border-style: solid;
  border-color: var(--hpe-formField-default-input-container-rest-borderColor);

  /* Typography */
  font-weight: var(--hpe-formField-default-medium-value-fontWeight);
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
  /* GAP-003 corrected: two-token focus ring
     Outer ring: outline shorthand
     Inner ring: box-shadow (omitted in v1 spec — now included) */
  outline: var(--hpe-focusIndicator-outline);
  box-shadow: var(--hpe-focusIndicator-boxShadow);

  /* Do not add border-color changes here — see constraints §1 */
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
  border-radius: var(--hpe-drop-default-borderRadius);

  /* Elevation */
  box-shadow: var(--hpe-shadow-medium);

  /* GAP-002: sideOffset (gap from trigger to drop) cannot use a CSS variable.
     The resolved value of --hpe-drop-default-margin (6px) is passed as
     sideOffset={6} on <Select.Content> in the JSX.
     See innovation/GAPS.md GAP-002. */

  /* Z-index — must clear HPE global header (z-index 101) */
  z-index: var(--hpe-drop-default-zIndex);

  /* Width — must be at least as wide as trigger */
  min-width: var(--radix-select-trigger-width);
}


/* -------------------------------------------
   4. Listbox (Select.Viewport)
   Scroll container — no visual tokens of its own.
   ------------------------------------------- */

.hpe-select__viewport {
  /* Drop padding — top only, not bottom. See constraints §2 */
  padding-top: var(--hpe-select-default-medium-drop-paddingY);
  padding-inline: var(--hpe-select-default-medium-drop-paddingX);

  /* Flex column layout with gap between options */
  display: flex;
  flex-direction: column;
  gap: var(--hpe-select-default-medium-drop-gapY);

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
  padding-block: var(--hpe-select-default-medium-option-paddingY);
  padding-inline: var(--hpe-select-default-medium-option-paddingX);
  border-radius: var(--hpe-select-default-medium-option-borderRadius);
  border-width: var(--hpe-select-default-medium-option-borderWidth);
  border-style: solid;

  /* Rest state */
  border-color: var(--hpe-select-default-option-rest-borderColor);
  color: var(--hpe-select-default-option-rest-textColor);
  font-weight: var(--hpe-select-default-option-rest-fontWeight);

  /* Behaviour */
  cursor: pointer;
  user-select: none;

  /* DO NOT change height between states — see constraints §4 */
}

/* Hover state — also applies to keyboard focus within the list */

.hpe-select__item[data-highlighted] {
  background: var(--hpe-select-default-option-hover-background);
  border-color: var(--hpe-select-default-option-hover-borderColor);
  color: var(--hpe-select-default-option-hover-textColor);
  outline: none; /* Focus ring handled by data-highlighted, not :focus */
}

/* Selected state */

.hpe-select__item[data-state="checked"] {
  background: var(--hpe-select-default-option-selected-rest-background);
  border-color: var(--hpe-select-default-option-selected-rest-borderColor);
  color: var(--hpe-select-default-option-selected-rest-textColor);
  font-weight: var(--hpe-select-default-option-selected-rest-fontWeight);
}

/* Selected + hover state */

.hpe-select__item[data-state="checked"][data-highlighted] {
  background: var(--hpe-select-default-option-selected-hover-background);
  color: var(--hpe-select-default-option-selected-hover-textColor);
}

/* Disabled state */

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

  /* Rounded outer corners only — see constraints §5 */
  border-top-left-radius: var(--hpe-select-default-medium-option-marker-borderTopLeftRadius);
  border-bottom-left-radius: var(--hpe-select-default-medium-option-marker-borderBottomLeftRadius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

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
| **Portal** | Always wrap `<Select.Content>` in `<Select.Portal>`. Without it the Drop is inline and breaks layouts |
| **Collision detection** | Radix handles Drop flipping automatically when `position="popper"` |
| **Trigger width matching** | With `position="popper"`, Radix exposes `--radix-select-trigger-width` — use `min-width: var(--radix-select-trigger-width)` |
| **`sideOffset` prop** | Must be a JS number — CSS variables cannot be passed. See GAP-002 |
| **`data-highlighted` vs `:hover`** | Always use `[data-highlighted]` — Radix removes pointer events during keyboard navigation |
| **`ItemIndicator` rendering** | Only renders in the DOM when `data-state="checked"` — no `display: none` needed |
| **Focus ring** | Two tokens required: `--hpe-focusIndicator-outline` (outer) and `--hpe-focusIndicator-boxShadow` (inner). Both must be applied — see GAP-003 |

---

## Gaps between Radix and HPE spec

| Gap | Detail | Recommendation |
|---|---|---|
| No built-in Search | Radix Select has no search input | Use combobox pattern or controlled filter |
| No built-in Clear | Radix has no clear affordance | Add a controlled reset button or empty-value Item |
| No multi-select | Radix Select is single-select only | Use a Popover + custom list for multi-select |
| `sideOffset` not a token | Must be passed as a numeric prop | See GAP-002 — hardcode resolved value with comment |
| No size variants | Only medium size is currently specified | Add size modifier classes when small/large tokens land |