---
'hpe-design-tokens': major
---

Add the Landmark Surface collection with `base`, `tone.1`, `tone.2`, and `floating`. The tokens follow light and dark through aliases to the internal Color tier; there is no separate Surface mode to select.

Existing background token values are unchanged. Migrate by role rather than by value: `base` is white in light mode, and the two tones alternate for containers.

In Figma, the v2, v1 and v0 snapshot modes keep their released values. The Surface tokens resolve to transparent in those modes.
