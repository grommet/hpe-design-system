# Notification — gaps.md

All gaps discovered during the component spec pipeline for `notification`.
Never overwrite — always append. Number sequentially across all steps.

---

### GAP-001 — No notification component tokens in hpe-design-tokens

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The `hpe-design-tokens` package contains no `--hpe-notification-*`
component token layer. Every visual property in this spec falls back to semantic
tokens (`--hpe-color-*`, `--hpe-spacing-*`, `--hpe-radius-*`, `--hpe-shadow-*`
etc.). This means there is no per-component override path for notification styling
without also affecting other components that share the same semantic tokens.
**Current workaround:** All tokens in `tokens.md` use semantic (S) layer tokens.
**Recommended fix:** Add a full `--hpe-notification-*` component token set to
`hpe-design-tokens`, covering background, icon color, text color, border-radius,
padding, gap, shadow, and timing for all three kinds and five status variants.
**Status:** Open

---

### GAP-002 — No z-index token for toast FloatingLayer

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The FloatingLayer for the toast kind requires a `z-index` value
to appear above page content. No `--hpe-notification-toast-zIndex` or equivalent
token exists in `hpe-design-tokens`.
**Current workaround:** Use `var(--hpe-drop-default-zIndex)` (value: `110`),
the only available z-index token, with a `/* GAP-002 */` comment.
**Recommended fix:** Add `--hpe-notification-toast-zIndex` to the component
token set (once GAP-001 is resolved), or add a generic `--hpe-zIndex-overlay`
semantic token that overlays can share.
**Status:** Open

---

### GAP-003 — CloseButton and Actions hover/active states not covered by tokens

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Spec incomplete
**Description:** The anatomy lists `hover` and `active` as applicable states for
the CloseButton and Actions parts. `tokens.md` covers only `rest` and `focus` for
these parts. No notification-specific tokens exist for hover background, hover text
color, or active visual change for the CloseButton or Action links. The Grommet
reference delegates this to the Button component's `hoverIndicator` prop, which
applies the Button component's own hover token layer — a mechanism not expressible
in the Notification token spec without importing Button tokens.
**Current workaround:** A delegation note in `tokens.md` explicitly states that
hover and active appearance is provided by the underlying Button/Anchor component
token layer.
**Recommended fix:** Once GAP-001 is resolved, add
`--hpe-notification-closeButton-hover-background` and equivalent active-state
tokens so implementations are not required to import Button component tokens.
**Status:** Open

---

## Summary

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | No notification component tokens | tokens.md | Spec writing | Token missing | Open |
| 002 | No z-index token for toast FloatingLayer | tokens.md | Spec writing | Token missing | Open |
| 003 | CloseButton and Actions hover/active states not covered | tokens.md | Spec writing | Spec incomplete | Open |

---

## Spec Review Summary — notification

### Checks performed

| Check | Result |
|---|---|
| Token name correctness (camelCase, confirmed against package) | Pass — all tokens verified against hpe-design-tokens built CSS |
| Anatomy coverage — all parts have at least one token | Pass |
| Anatomy coverage — all parts have at least one prop | Pass |
| Focus indicator — all three tokens specified together | Pass — constraints §6 |
| Icon names per status — exact component name documented | Pass — tokens.md StatusIcon table and anatomy.md §4 |
| Text alignment — explicitly stated for all kinds | Pass — tokens.md (per part), constraints §10 |
| Icon vertical alignment — explicitly stated | Pass — anatomy.md §7 layout behaviour and constraints §11 |
| Internal gaps — three gaps documented separately | Pass — iconContainer padding-inline-end (icon→text), textContainer gap (title→message), contentRow gap (content→close button) |
| box-shadow / elevation for toast | Pass — `--hpe-shadow-medium` documented in Container |
| z-index for toast | Pass — confirmed missing; workaround documented; GAP-002 |
| Padding levels — container outer and close-button split documented | Pass — padding split note in Container section |
| Animation / transition | Pass — Grommet reference does not define animation tokens; noted as out of scope in anatomy.md §8 |
| Hardcoded values — all logged in gaps.md | Pass — `text-align: left` and z-index workaround both documented with explanations |
| Cross-document consistency — part names match | Pass |
| Constraint numbers match cross-references | Pass |
| No framework references in agnostic documents | Pass |

**Verdict:** Pass — no new gaps found beyond GAP-001, GAP-002, GAP-003 logged at
spec-writing time.
