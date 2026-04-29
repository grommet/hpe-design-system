# Select — Constraints

> These rules govern how tokens must be applied to produce a correct, 
> deterministic HPE Select component. They are platform-agnostic unless 
> explicitly marked with a platform tag.
>
> Read alongside: `anatomy.md`, `tokens.md`
> Status: v1 draft

---

## How to read this file

Each constraint has four fields:

| Field | Meaning |
|---|---|
| **Rule** | The constraint itself — what must or must not happen |
| **Type** | `DO`, `DO NOT`, `NOTE`, or `REASON` |
| **Applies to** | Which anatomy part(s) this governs |
| **Reason** | Why this rule exists — helps correct generalisation |

`REASON` entries are the most important for agents. They explain the 
intent behind a rule so it can be applied correctly in situations 
not explicitly covered by the spec.

---

## 1. Trigger

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| The trigger must not change height between rest, hover, focus, open, and selected states | `DO NOT` | Trigger | Size stability prevents layout shift. The trigger is a fixed-height form control regardless of interaction state |
| The trigger must not change width between states, including when a value is selected vs. placeholder shown | `DO NOT` | Trigger | Width is determined by the container or an explicit size, never by content length |
| Apply `opacity: 0.3` to the entire trigger control when disabled — do not change individual token properties | `DO` | Trigger (disabled) | A single opacity on the container is the correct mechanism. Changing individual border/text/background properties separately produces inconsistent results and is harder to override |
| Do not apply a focus border to the trigger — use the global focus indicator only | `DO NOT` | Trigger (focus) | HPE's focus indicator is a two-colour outline ring applied globally. Redefining a border on focus would duplicate or conflict with this |
| The trigger's border, padding, and radius tokens come from the FormField spec, not the Select spec | `NOTE` | Trigger | The trigger is an input container — all input containers share the same tokens regardless of what control lives inside them |

---

## 2. Drop (Dropdown Container)

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| The Drop must render outside normal document flow — in a portal, not inline | `DO` | Drop | Inline rendering causes the drop to push page content and break layouts. It must float above the page |
| The Drop must sit above the HPE global header | `DO` | Drop | The HPE global header has `z-index: 101`. The Drop's z-index token is set to clear this. Do not override it downward |
| The Drop must be at least as wide as the Trigger | `DO` | Drop | Narrower drops cause selected value labels to truncate in the trigger but appear full-width in the drop, creating a confusing mismatch |
| The Drop must flip position intelligently if there is insufficient space below the Trigger | `DO` | Drop | This is a positioning behaviour requirement, not a token. Implement using your framework's intelligent positioning (e.g. floating-ui, Radix's built-in collision detection) |
| Apply `paddingY` only to the top of the Drop container, not top and bottom equally | `DO` | Drop | The bottom gap is provided by the last option's own padding combined with the flex gap. Adding paddingY to the bottom doubles the visual gap at the bottom of the list |
| Apply `gapY` as a flex column gap between options in the Listbox, not as margin on individual options | `DO` | Drop / Listbox | Flex gap is applied once at the container level. Margins on individual items are harder to override and cause double-spacing at list edges |

---

## 3. Listbox

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| Do not apply border-radius to the Listbox container | `DO NOT` | Listbox | Border-radius is applied per option item. Applying it to the container clips the scroll area incorrectly on some platforms |
| The Listbox is a scroll container only — apply no background, border, or shadow tokens directly to it | `DO NOT` | Listbox | Visual surface tokens belong to the Drop. The Listbox is transparent by design |

---

## 4. Option

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| Options must not change height between rest, hover, selected, and selected+hover states | `DO NOT` | Option | Height stability is essential. Any state-based height change causes the entire list to reflow, which is disorienting during keyboard navigation |
| Apply border-radius to each option individually, not to the Listbox container | `DO` | Option | Per-option radius creates the correct pill/rounded appearance on each item. Container-level radius only rounds the outer edges of the list |
| Do not add visible border in the rest state | `NOTE` | Option | The rest `borderColor` token value is transparent. A border is present in the DOM (to prevent layout shift) but invisible at rest |
| Apply border to all four sides of the option, not just one side | `DO` | Option | The border tokens apply to the full option boundary, not an underline or side accent |
| The option's `position` must be set to `relative` when the Selected Marker is present | `DO` | Option (selected) | The Selected Marker is absolutely positioned relative to its parent option. Without `position: relative` on the option, the marker escapes to the nearest positioned ancestor |

---

## 5. Selected Marker

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| The Selected Marker must not affect the layout flow of its parent option | `DO NOT` | Selected Marker | The marker is decorative. It must be removed from flow (absolutely positioned or equivalent) so that adding/removing it never changes the option's height or width |
| The Selected Marker must appear in both `selected` and `selected + hover` states | `DO` | Selected Marker | The marker does not disappear on hover of a selected item. It persists through all selected states |
| The Selected Marker background does not change between `selected` and `selected + hover` | `NOTE` | Selected Marker | The same token is used for both states by design. Do not introduce a hover-specific marker colour |
| When an option is disabled and selected, the Selected Marker must use the `border-disabled` semantic token, not the standard marker background | `DO` | Selected Marker (disabled) | The disabled marker colour signals that the selection is inactive, consistent with all other disabled visual treatments |
| The marker is on the leading edge (left in LTR, right in RTL) | `DO` | Selected Marker | Leading-edge placement is intentional — it aligns with HPE's selection pattern across components. Do not move it to trailing edge or top/bottom |
| Apply rounded corners only to the outer two corners of the marker (top-left and bottom-left in LTR) | `DO` | Selected Marker | The inner edge of the marker is flush with the option content area. Rounding the inner corners creates a visible gap between the marker and the option edge |

---

## 6. Clear Button

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| The Clear Button must be visually consistent with Options — use the same padding, border-radius, and font-weight tokens | `DO` | Clear Button | The Clear Button sits inside the same Drop as the Options and must feel like part of the same set of interactive items, not a separate control |
| The Clear Button must not have a selected state | `DO NOT` | Clear Button | It is an action, not a selectable option. Applying selected styling to it would imply it can be "chosen", which is incorrect |
| Place the Clear Button above the Listbox, inside the Drop | `DO` | Clear Button | This is the established position in the HPE pattern. Placing it below the list requires the user to scroll to find it |

---

## 7. Search Input

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| The Search Input must sit above the Listbox, below the Drop top padding | `DO` | Search Input | Options filter in response to typing — the input must be visible and reachable without scrolling |
| The Search Input must not close the Drop on interaction | `DO NOT` | Search Input | Clicking or focusing the search input is an intermediate interaction, not a selection. The Drop stays open |
| The Search Input is not a standalone TextInput — do not apply Select trigger border/background tokens to it | `DO NOT` | Search Input | The search field inside a Drop has its own visual treatment (minimal, no outer border) inherited from the global input tokens, not the trigger tokens |

---

## 8. Disabled state — whole component

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| Apply `opacity: 0.3` to the entire trigger control when disabled | `DO` | Trigger (disabled) | This is a single property on the container. It uniformly dims the border, value text, placeholder, and icon without needing to change each token individually |
| Do not open the Drop when the component is disabled | `DO NOT` | Root (disabled) | This is a behaviour constraint. A disabled Select has no interactive states beyond its visual treatment |
| Disabled options inside an open Drop remain visible but must not be interactive | `DO` | Option (disabled) | Disabled options communicate that a choice exists but is unavailable in the current context. Hiding them removes that signal |

---

## 9. Focus

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| Focus is indicated by the global HPE focus ring — a two-colour outline applied to the Trigger | `DO` | Trigger (focus) | Do not replicate or replace this with a border-color change on the trigger. The global focus ring is the single, consistent focus indicator across all HPE components |
| The focus ring must not cause the Trigger to change size | `DO NOT` | Trigger (focus) | The focus ring is rendered outside the element's box model (outline, not border). It must not add to the element's height or width |
| When keyboard-navigating options inside the Drop, apply the same visual treatment as hover | `DO` | Option (focus / keyboard) | There is no separate "keyboard focus" token for options. The hover token serves both pointer hover and keyboard focus within the list |

---

## 10. Size variants

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| Only medium size tokens are currently specified | `NOTE` | All parts | The token tables in `tokens.md` cover the medium (default) size. Small and large size tokens exist in the token library but are not yet mapped in this spec |
| Do not scale option padding manually for different sizes — use the size-specific tokens when available | `DO NOT` | Option | Manually scaled padding will drift from the token values over time. Wait for small/large token tables to be added to this spec |

---

## 11. Light and dark mode

| Rule | Type | Applies to | Reason |
|---|---|---|---|
| All colour tokens have light and dark mode values — do not hardcode colour values | `DO NOT` | All parts | Every colour token in `tokens.md` resolves differently in light and dark mode. Hardcoding a hex value breaks one of the two modes |
| Apply the CSS colour token files for both light and dark modes — do not import only one | `DO` | All parts | See `tokens-usage.md` for the correct import pattern. Importing only `color.light.css` means dark mode is unstyled |
| The Drop shadow token differs between light and dark modes | `NOTE` | Drop | The `hpe.shadow.medium` token has separate light and dark values. If implementing shadow manually, check both values |