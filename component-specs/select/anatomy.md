# Select — Anatomy

> Component type: Interactive input
> Purpose: Allows a user to choose one option (or multiple, in the multi-select 
> variant) from a predefined list presented in a floating dropdown.
> Status: v1 draft

---

## Parts

### 1. Root
The outermost container that manages state for the entire component — 
open/closed, selected value, disabled status. Not directly visible but 
controls the relationship between all other parts.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | No — state container only |
| Contains | Trigger, Drop |

---

### 2. Trigger
The always-visible control that the user interacts with to open the dropdown. 
Displays the current selected value, or a placeholder when nothing is selected. 
Contains a trailing icon indicating the dropdown affordance.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | Always |
| Contains | Value/Placeholder, Icon |
| Interactive | Yes — opens/closes the Drop |

**States:** `rest`, `hover`, `focus`, `disabled`, `open` (while Drop is visible)

**Critical behaviour:**
- Must not change size (height or width) between any states
- Must not change size when a value is selected vs. placeholder shown
- Focus indicator is applied at this level

---

### 3. Value / Placeholder
The text content inside the Trigger. Shows the selected option's label when 
a selection has been made, or placeholder text when no selection exists.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | Always (inside Trigger) |
| Contains | Text only |

**States:** `placeholder` (no selection), `populated` (selection made)

---

### 4. Trigger Icon
The trailing icon inside the Trigger that communicates the dropdown affordance. 
Typically a chevron/arrow. Rotates or swaps when the Drop is open.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | Always (inside Trigger) |
| Contains | Icon |
| Interactive | No — purely decorative/indicative |

---

### 5. Drop (Dropdown Container)
The floating container that appears when the Trigger is activated. Renders 
outside normal document flow (portal), positioned relative to the Trigger. 
Contains the Listbox and optionally a Search input and/or Clear button.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | Only when open |
| Contains | Search (optional), Listbox, Clear button (optional) |
| Positioning | Floating, portal-rendered, aligned to Trigger |

**Critical behaviour:**
- Renders above other page content (elevated z-index)
- Position is intelligent — flips if insufficient space below Trigger
- Width matches or exceeds Trigger width

---

### 6. Search Input
An optional text input inside the Drop that filters the option list as the 
user types. Appears at the top of the Drop when present.

| Property | Value |
|---|---|
| Required | No |
| Visible | When enabled, always visible inside open Drop |
| Contains | Text input, Search icon |
| Interactive | Yes |

---

### 7. Listbox
The scrollable container that holds the list of Options. Not itself 
interactive — interaction is handled by the individual Option items.

| Property | Value |
|---|---|
| Required | Yes |
| Visible | Inside open Drop |
| Contains | Options, optional Group headers |
| Interactive | No — scroll container only |

---

### 8. Option
An individual selectable item in the Listbox. Represents one choice. 
Displays a label and optionally a leading icon. Carries a Selected Marker 
when chosen.

| Property | Value |
|---|---|
| Required | Yes (at least one) |
| Visible | Inside open Drop |
| Contains | Label text, Selected Marker (when selected) |
| Interactive | Yes — click/keyboard to select |

**States:** `rest`, `hover`, `selected`, `selected + hover`, `disabled`

**Critical behaviour:**
- Must not change height between any states
- Selected Marker must not affect layout (non-flow element)
- Disabled options are visible but not interactive

---

### 9. Selected Marker
A visual accent element on the leading edge of an Option that indicates 
it is currently selected. Decorative — communicates state visually 
alongside any other selected styling.

| Property | Value |
|---|---|
| Required | No — only present on selected Option |
| Visible | On selected Option, inside open Drop |
| Contains | Nothing — purely visual |
| Interactive | No |

**Critical behaviour:**
- Must not affect the height, width, or padding of its parent Option
- Must be non-flow (absolutely positioned or equivalent)
- Present in both `selected` and `selected + hover` states

---

### 10. Clear Button
An optional control inside the Drop that clears the current selection. 
Visually consistent with Options — same padding, radius, and typography.

| Property | Value |
|---|---|
| Required | No |
| Visible | When enabled, inside open Drop (typically above Listbox) |
| Contains | Label text |
| Interactive | Yes |

**States:** `rest`, `hover`

---

### 11. Group / Group Header
An optional way to organise Options into labelled sections within the 
Listbox. The header is a non-interactive label, not an Option.

| Property | Value |
|---|---|
| Required | No |
| Visible | Inside open Drop, when grouping is used |
| Contains | Label text |
| Interactive | No |

---

## State matrix

| Part | rest | hover | focus | open | selected | disabled |
|---|---|---|---|---|---|---|
| Trigger | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Value/Placeholder | ✓ | — | — | — | ✓ | ✓ |
| Trigger Icon | ✓ | — | — | ✓ | — | ✓ |
| Drop | — | — | — | ✓ | — | — |
| Search Input | — | — | ✓ | ✓ | — | — |
| Option | ✓ | ✓ | — | — | ✓ | ✓ |
| Selected Marker | — | — | — | — | ✓ | — |
| Clear Button | ✓ | ✓ | — | — | — | — |
| Group Header | ✓ | — | — | — | — | — |

---

## Variants

| Variant | Description |
|---|---|
| Single select | Default — one option can be selected at a time |
| Multi-select | Multiple options can be selected; Trigger shows count or summary |
| Searchable | Search Input is present inside the Drop |
| With clear | Clear Button is present inside the Drop |

---

## What this spec does NOT cover

- The FormField wrapper (label, help text, error message, required indicator) 
  — this is a separate component spec
- The Trigger's outer border and padding when used inside a FormField 
  — those tokens come from the FormField spec
- Group separators / dividers between option groups
- Custom option content (icons, descriptions, avatars inside options)