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

---

### GAP-004 — `autoClose=false` cannot map directly to Radix `duration` prop

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Platform conflict
**Description:** The spec defines `autoClose` as a boolean prop. Radix
`Toast.Root` accepts `duration` as a number (ms) and has no boolean "never
auto-close" option. Passing a boolean directly is not valid.
**Current workaround:** Translate `autoClose=false` to `duration={Infinity}`.
This is not validated by Radix prop types and may break if Radix changes timer
behaviour internally.
**Recommended fix:** Confirm that `Infinity` is a stable workaround in the
Radix Toast implementation. Alternatively expose only `duration` and require
consumers to pass a very large number instead of `autoClose=false`.
**Status:** Open

---

### GAP-005 — `duration` / `time` prop value cannot be a CSS variable

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Platform conflict
**Description:** The spec's `duration` prop (and `time` alias) expects a
number in milliseconds. Radix reads `duration` as a JavaScript number at
runtime. There is no mechanism to supply this value via a CSS custom property
— the token system cannot inject timing values into JS props.
**Current workaround:** Consumer passes a JS number (e.g. `duration={8000}`).
No token is used for this value.
**Recommended fix:** Accept this as an inherent platform constraint. Document
that `duration` is always a JS number and cannot be themed via CSS tokens.
If a design token for notification timing is needed in future, it would have
to be read via `getComputedStyle` and passed to the component as a number.
**Status:** Open

---

### GAP-006 — `@hpe-design/icons-grommet` not installed in radix-test project

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Spec incomplete
**Description:** The spec (anatomy §4, tokens.md StatusIcon section) requires
specific icon components from `@hpe-design/icons-grommet`:
`StatusCritical`, `StatusWarning`, `StatusGood`, `Info`, `StatusUnknown`, `Close`.
The radix-test project has `grommet-icons` installed but not `@hpe-design/icons-grommet`.
These are different packages — `grommet-icons` icon names and shapes differ from
`@hpe-design/icons-grommet`. For example, the Grommet base theme uses
`StatusCriticalSmall` while the HPE theme uses `StatusCritical`.
**Current workaround:** Inline SVG substitutes used in the implementation.
These are approximate — not the canonical HPE-branded icons.
**Recommended fix:** Install `@hpe-design/icons-grommet` in the radix-test project
and replace the inline SVGs with the correct named imports.
**Status:** Open

---

### GAP-007 — Swipe animation CSS uses Radix-internal variables and hardcoded durations

**Discovered in:** mappings/radix.md
**Step:** Mapping writing (radix)
**Type:** Token missing
**Description:** The swipe-to-dismiss animation requires:
1. `--radix-toast-swipe-move-x` and `--radix-toast-swipe-end-x` — Radix-internal
   CSS variables not available as design tokens.
2. Transition and animation durations (200ms, 100ms) — no token equivalents
   exist in `hpe-design-tokens` for motion timing.
**Current workaround:** Hardcoded durations used with `/* GAP-007 */` comments.
Radix-internal variables used as-is.
**Recommended fix:** Add motion/duration tokens to `hpe-design-tokens` (e.g.
`--hpe-motion-duration-fast`, `--hpe-motion-duration-xfast`) and apply them here.
The Radix-internal variables are not resolvable without a Radix code change.
**Status:** Open

---

## Summary (updated)

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | No notification component tokens | tokens.md | Spec writing | Token missing | Open |
| 002 | No z-index token for toast FloatingLayer | tokens.md | Spec writing | Token missing | Open |
| 003 | CloseButton and Actions hover/active states not covered | tokens.md | Spec writing | Spec incomplete | Open |
| 004 | `autoClose=false` cannot map to Radix `duration` | mappings/radix.md | Mapping writing (radix) | Platform conflict | Open |
| 005 | `duration` value cannot be a CSS variable in Radix | mappings/radix.md | Mapping writing (radix) | Platform conflict | Open |
| 006 | `@hpe-design/icons-grommet` not installed in project | mappings/radix.md | Mapping writing (radix) | Spec incomplete | Open |
| 007 | Swipe animation uses hardcoded durations and Radix-internal vars | mappings/radix.md | Mapping writing (radix) | Token missing | Open |

---

## Mapping Review Summary — notification / radix

### Checks performed

| Check | Result |
|---|---|
| Every anatomy part mapped to a Radix primitive | Pass |
| Every anatomy part styled in the CSS | Pass |
| Every prop from props.md mapped | Pass |
| Every state from anatomy.md mapped | Pass |
| All CSS variables exist in tokens.md | Pass |
| All CSS variables confirmed in hpe-design-tokens package | Pass |
| All CSS variables are camelCase | Pass |
| All three focus tokens applied together | Pass — constraints §6 |
| Disabled state uses opacity on root | Pass — no disabled state on Notification Container; CloseButton/Actions delegate to Button |
| No hardcoded values without a logged gap | Pass — 200ms/100ms logged GAP-007; `text-align: left` documented §10 |
| `text-align: left` explicit in CSS | Pass — set on `.hpe-notification` |
| `align-items: flex-start` for icon top-alignment | Pass — set on `.hpe-notification` |
| `--hpe-shadow-medium` on toast Container | Pass |
| Padding split correctly implemented | Pass — start-side on container, end-side on CloseButton |
| ContentRow gap implemented | Pass — `margin-inline-start` on CloseButton |
| Status backgrounds excluded from toast | Pass — only `.hpe-notification--inline` and `--global` selectors |
| Cross-document consistency (part names, prop names, constraint refs) | Pass |

**Verdict:** Passed — no new gaps found beyond GAP-004 through GAP-007 logged
during mapping writing. Mapping is ready for implementation.
