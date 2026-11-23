---
'hpe-design-tokens': patch
---

Fix `color.background.critical.strong.REST`, `color.background.critical.strong.hover` and `color.icon.critical.DEFAULT.hover` alternating between published and hidden in the Figma library on each sync. The three tokens are now published in every mode. In the v1 and v0 modes they still resolve to transparent.

No token value or package output changes, and no migration is required.
