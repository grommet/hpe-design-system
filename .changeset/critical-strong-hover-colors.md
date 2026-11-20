---
'hpe-design-tokens': minor
---

Add `base.color.red.900` (`#9c0f0b`), `color.icon.critical.DEFAULT.hover`,
`color.background.critical.strong.REST`, and
`color.background.critical.strong.hover` for critical interactive states in light
and dark modes.

Pair strong critical backgrounds, including hover, with `color.text.onStrong.DEFAULT.REST` and
`color.icon.onStrong.DEFAULT.REST`. Keep `color.text.onCritical` paired with the existing weak
`color.background.critical`. No existing token values change and no migration is
required. See [the change inventory for #6812](https://github.com/grommet/hpe-design-system/issues/6812#issuecomment-6986796660).
