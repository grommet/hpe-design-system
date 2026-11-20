---
'hpe-design-tokens': major
---

Add the Landmark Surface collection with `base`, `tone.1`, `tone.2`, and `floating`. The tokens follow light and dark through aliases to the internal Color tier; there is no separate Surface mode to select.

Existing background token values are unchanged. Migrate by role rather than by value: `base` is white in light mode, and the two tones alternate for containers. Drop and the four enabled Switch handle states now use `floating`; check the appearance of Switch handles in dark mode when upgrading.
