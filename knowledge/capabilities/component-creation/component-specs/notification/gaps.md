# Notification — gaps.md

All gaps discovered during the component spec pipeline for `notification`.
Never overwrite — always append. Number sequentially across all steps.

---

### GAP-001 — No notification component tokens in hpe-design-tokens

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The `hpe-design-tokens` package contains no `--hpe-notification-*`
component token layer. Every visual property in this spec falls back to
semantic tokens (`--hpe-color-*`, `--hpe-spacing-*`, `--hpe-radius-*`, etc.).
This means there is no per-component override path for notification styling
without also affecting other components that share the same semantic tokens.
**Current workaround:** All tokens in `tokens.md` use semantic (S) layer tokens.
**Recommended fix:** Add a full set of `--hpe-notification-*` component tokens
to `hpe-design-tokens`, covering background, icon color, text color, border-radius,
padding, gap, and timing for all three kinds and five status variants.
**Status:** Open

---

### GAP-002 — No z-index token for toast FloatingLayer

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The FloatingLayer for the toast kind requires a `z-index`
value to appear above page content. No `--hpe-notification-toast-zIndex`
or equivalent token exists in `hpe-design-tokens`.
**Current workaround:** Use `var(--hpe-drop-default-zIndex)` (value: `110`),
the only available z-index token, with a `/* GAP-002 */` comment.
**Recommended fix:** Add `--hpe-notification-toast-zIndex` to the component
token set (once GAP-001 is resolved), or add a generic `--hpe-zIndex-overlay`
semantic token that overlays can share.
**Status:** Open

---

## Summary

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | No notification component tokens | tokens.md | Spec writing | Token missing | Open |
| 002 | No z-index token for toast FloatingLayer | tokens.md | Spec writing | Token missing | Open |
| 003 | CloseButton and Actions hover/active states not covered | tokens.md | Spec review | Spec incomplete | Open |
| 004 | `autoClose=false` cannot map directly to Radix `duration` | mappings/radix.md | Mapping writing (radix) | Platform conflict | Open |
| 005 | `duration` value cannot be a CSS variable in Radix | mappings/radix.md | Mapping writing (radix) | Platform conflict | Open |
| 006 | Hardcoded animation durations in swipe CSS | mappings/radix.md | Mapping review (radix) | Token missing | Open |

---

### GAP-003 — CloseButton and Actions hover/active states not covered in tokens.md

**Discovered in:** tokens.md
**Step:** Spec review
**Type:** Spec incomplete
**Description:** `anatomy.md` lists `hover` and `active` as applicable states
for the CloseButton and Actions parts. `tokens.md` covers only `rest` and `focus`
for these parts. No notification-specific tokens exist for the hover background,
hover text color, or active visual change of the CloseButton or Action links.
The grommet reference uses `hoverIndicator: true` on the Button, which delegates
hover appearance to the Button component's own theme — a mechanism not expressible
in the Notification token spec.
**Current workaround:** A delegation note has been added to the CloseButton section
of `tokens.md` to explicitly state that hover and active state appearance is
provided by the underlying Button/Anchor component's token layer.
**Recommended fix:** Once GAP-001 is resolved (notification component tokens added),
add `--hpe-notification-closeButton-hover-background` and equivalent active-state
tokens so implementations are not required to import Button component tokens.
**Status:** Open

---

## Spec Review Summary — notification

| # | Title | Type | Status |
|---|---|---|---|
| 003 | CloseButton and Actions hover/active states not covered | Spec incomplete | Open |

**Verdict:** Failed — 1 new gap found (GAP-003). Delegation note added to
`tokens.md`. Framework reference corrected in `anatomy.md`. Re-verified: all
other checks pass. Proceeding to mapping-writer.

---

### GAP-004 — `autoClose=false` cannot map directly to Radix `duration` prop

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Platform conflict
**Description:** The spec defines `autoClose` as a boolean prop. Radix
`Toast.Root` accepts `duration` as a number (ms) and has no boolean "never
auto-close" option. The workaround (`duration={Infinity}`) is not validated by
Radix's prop types, is unusual in a numeric context, and may break if Radix
changes timer behaviour.
**Current workaround:** Translate `autoClose=false` to `duration={Infinity}` in
the JSX component.
**Recommended fix:** Radix could add a `duration="none"` or `duration={null}`
convention. Until then, document the `Infinity` workaround explicitly in the
component's usage notes.
**Status:** Open

---

### GAP-005 — `duration` value cannot be a CSS variable in Radix

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Platform conflict
**Description:** The `duration` prop (auto-close timer in ms) must be a
JavaScript number because Radix reads it synchronously as a JS value, not via
CSS. A future `--hpe-notification-toast-duration` component token (once GAP-001
is resolved) could not be consumed via `duration={var(--hpe-notification-toast-duration)}`.
**Current workaround:** The spec-defined `duration` prop default of `5000` ms is
passed directly as a JavaScript number.
**Recommended fix:** Accept this as a structural platform conflict. Document in the
spec that `duration` is intentionally a JS number prop with no CSS variable path.
**Status:** Open

---

### GAP-006 — Hardcoded animation durations in swipe-to-dismiss CSS

**Discovered in:** mappings/radix.md
**Step:** Mapping review (radix)
**Type:** Token missing
**Description:** The swipe-to-dismiss animation in the toast kind uses
hardcoded durations `200ms` (cancel transition) and `100ms` (end animation).
No animation/transition duration tokens exist in `hpe-design-tokens`.
These values are borrowed from Radix's documentation example code.
**Current workaround:** Values are hardcoded with a comment referencing this gap.
**Recommended fix:** Add `--hpe-duration-fast` and `--hpe-duration-medium`
(or equivalent) semantic animation tokens to `hpe-design-tokens` for use in
component transitions and animations.
**Status:** Open

---

## Mapping Review Summary — notification / radix

| # | Title | Type | Status |
|---|---|---|---|
| 006 | Hardcoded animation durations in swipe CSS | Token missing | Open |

**Verdict:** Failed — 1 new gap found (GAP-006). All other checks pass:
all anatomy parts mapped, all props mapped, all CSS variables match tokens.md,
all constraints satisfied, all three focus tokens applied together, no other
hardcoded values. Mapping is ready for implementation pending GAP-006 resolution.
