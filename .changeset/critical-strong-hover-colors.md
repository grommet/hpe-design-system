---
'hpe-design-tokens': minor
---

Add `base.color.red.900` (`#9c0f0b`), `color.icon.critical.DEFAULT.hover`,
`color.background.critical.strong.REST`, and
`color.background.critical.strong.hover` as specified in #6812.

The semantic colors support light and dark modes and expose the Grommet keys
`icon-critical-hover`, `background-critical-strong`, and
`background-critical-strong-hover`. Pair the strong critical backgrounds with
`text-onStrong` and `icon-onStrong`; `text-onCritical` remains the pairing for
the existing weak critical background.

All additions are non-breaking. Existing token values are unchanged, and no
migration is required.
