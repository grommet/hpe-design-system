---
'hpe-design-tokens': minor
---

Point `drop.default.background` and the four enabled `switch.default.control.handle` backgrounds (`rest`, `hover`, `selected.rest`, `selected.hover`) at `color.background.surface.floating`.

In dark mode the Switch handle becomes `base.color.grey.1200` in all four states, where it was `grey.1000` at rest and `grey.1300` otherwise; check its appearance when upgrading.

Point the seven Figma-only Tip, Calendar drop-container and notification toast backgrounds at the same Surface floating alias. Their resolved light/dark colors and the published package output are unchanged; no application migration is required.
