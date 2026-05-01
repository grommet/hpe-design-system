# Notification — gaps.md

All gaps discovered during the component spec pipeline for `notification`.
Never overwrite — always append. Number sequentially across all steps.

---

## How to read this file

| Column | Meaning |
|---|---|
| # | Sequential gap number across all pipeline steps |
| Discovered in | Which spec document first identified the gap |
| Step | Which pipeline step (spec writing, props writing, spec review, mapping writing, mapping review) |
| Type | Token missing \| Spec incomplete \| Platform conflict \| Constraint conflict |
| Status | Open \| Resolved |

---

### GAP-001 — No notification component tokens in hpe-design-tokens

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The `hpe-design-tokens` package contains no `--hpe-notification-*`
component token layer. Every visual property in this spec falls back to
semantic tokens (`--hpe-color-*`, `--hpe-spacing-*`, `--hpe-radius-*`,
`--hpe-shadow-*`, etc.). This means there is no per-component override path
for notification styling without also affecting other components that share the
same semantic tokens.
**Current workaround:** All tokens in `tokens.md` use the semantic (S) layer.
**Recommended fix:** Add a `--hpe-notification-*` component token set covering
background, icon color, text color, border-radius, padding, gap, shadow, and
timing for all three kinds and five status variants.
**Status:** Open

---

### GAP-002 — No z-index token for the toast FloatingLayer

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Token missing
**Description:** The FloatingLayer for the toast kind requires a `z-index`
value to render above page content. No `--hpe-notification-toast-zIndex`
or equivalent token exists in `hpe-design-tokens`.
**Current workaround:** Use `--hpe-drop-default-zIndex` (value: `110`) — the
only available z-index token — with a `/* GAP-002 */` comment.
**Recommended fix:** Add `--hpe-notification-toast-zIndex` to the component
token set (once GAP-001 is resolved), or add a generic `--hpe-zIndex-overlay`
semantic token that overlays can share.
**Status:** Open

---

### GAP-003 — CloseButton and Actions hover/active states not covered by tokens

**Discovered in:** tokens.md
**Step:** Spec writing
**Type:** Spec incomplete
**Description:** The anatomy lists `hover` and `active` as applicable states
for the CloseButton and Actions parts. No notification-specific tokens exist
for hover background, hover text color, or active visual change on either part.
The reference implementation delegates this to the Button and Anchor
component token layers — a mechanism not expressible in the Notification token
spec without importing those component tokens.
**Current workaround:** A delegation note in `tokens.md` states that hover and
active appearance is provided by the underlying Button or Anchor component
token layer.
**Recommended fix:** Once GAP-001 is resolved, add
`--hpe-notification-closeButton-hover-background` and equivalent active-state
tokens so implementations are not required to import Button/Anchor component tokens.
**Status:** Open

---

## Summary

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | No notification component tokens | tokens.md | Spec writing | Token missing | Open |
| 002 | No z-index token for toast FloatingLayer | tokens.md | Spec writing | Token missing | Open |
| 003 | CloseButton and Actions hover/active states not covered | tokens.md | Spec writing | Spec incomplete | Open |

---

### GAP-004 — No animation tokens for toast enter / exit transitions

**Discovered in:** anatomy.md
**Step:** Spec review
**Type:** Token missing
**Description:** The reference component wraps the toast kind in a Layer
component that performs a default fade-in / fade-out animation on mount and
unmount. No animation or motion tokens exist in `hpe-design-tokens`
(no `--hpe-motion-duration-*`, `--hpe-motion-easing-*`, or equivalent).
The animation behavior exists in the reference but cannot be expressed with
tokens at this time.
**Current workaround:** anatomy.md §9 notes animation as out of scope with
an explanation. Any implementation must either omit animation or use hardcoded
values with a `/* GAP-004 */` comment.
**Recommended fix:** Add motion duration and easing tokens to `hpe-design-tokens`
(e.g. `--hpe-motion-duration-fast`, `--hpe-motion-easing-default`) and update
this spec to reference them.
**Status:** Open

---

## Summary (updated after spec review)

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | No notification component tokens | tokens.md | Spec writing | Token missing | Open |
| 002 | No z-index token for toast FloatingLayer | tokens.md | Spec writing | Token missing | Open |
| 003 | CloseButton and Actions hover/active states not covered | tokens.md | Spec writing | Spec incomplete | Open |
| 004 | No animation tokens for toast enter/exit transitions | anatomy.md | Spec review | Token missing | Open |

---

## Spec Review Summary — notification

### Checks performed

| Check | Result | Notes |
|---|---|---|
| Token name correctness — camelCase | Pass | All token names confirmed camelCase against hpe-design-tokens |
| Token name correctness — presence | Pass (1 correction) | `--hpe-drop-default-zIndex` was incorrectly marked ⛔ (confirmed absent) in tokens.md §1e; token IS present in components.css at value 110. Corrected to no marker. |
| Anatomy coverage — every part has at least one token | Pass | Container, IconContainer, StatusIcon, TextContainer, Title, Message, MessageText, Actions, CloseButton, CloseIcon, FloatingLayer all covered |
| Anatomy coverage — every consumer-facing part has a prop | Pass | All parts mapped to props in props.md |
| Constraint coverage — every constraint backed by token or gap | Pass | §1–§12 all reference token names or document exceptions |
| Props coverage — every prop backed by anatomy or token | Pass | All 14 props traced to anatomy parts or token sections |
| Props coverage — all enum values documented | Pass | `status`, `kind`, `position`, `ariaLive` all fully enumerated |
| Props coverage — all callbacks documented with arguments | Pass | `onClose` and `actions[n].onClick` both documented |
| Cross-document consistency — part names | Pass | Consistent across tokens.md, anatomy.md, constraints.md, props.md |
| Cross-document consistency — constraint numbers | Pass | §1–§12 referenced correctly |
| Cross-document consistency — CSS variable names | Pass | All variables match between tokens.md and constraints.md §2 table |
| No framework references in agnostic documents | Pass | No Radix, Grommet, React, or similar references |
| Focus indicator — all three tokens together | Pass | Documented in tokens.md §7, §8c and constraints.md §6 |
| Icon names — exact component name per status | Pass | Documented in tokens.md §3a and anatomy.md §4 with `@hpe-design/icons-grommet` package |
| Text alignment — explicitly stated for all kinds | Pass | Constraints §10; tokens.md §5a and §6a note "(no token) — set literally" |
| Icon vertical alignment — explicitly stated | Pass | Anatomy.md §8 states `align-items: flex-start`; constraints §11 |
| Internal gaps — three separate gaps documented | Pass | icon→text (§2 IconContainer), title→message (§4 TextContainer), content→CloseButton (§1d Container gap) |
| box-shadow / elevation for toast | Pass | `--hpe-shadow-medium` in tokens.md §1b; mandatory per constraints §4 |
| z-index for toast | Pass — gap logged | GAP-002 confirmed; workaround using `--hpe-drop-default-zIndex` documented |
| Padding levels — container and CloseButton distinguished | Pass | §1c (start-side) and §8a (end-side) are separate table sections |
| Animation / transition | Fail — GAP-004 logged | Reference component (Layer) animates on mount/unmount; no motion tokens exist |

**Verdict:** Passed with one gap logged (GAP-004 — animation tokens). The ⛔ marker
error on `--hpe-drop-default-zIndex` in tokens.md was corrected during this review.
All 14 hard-fail and soft checks pass. Spec is ready for mapping.
