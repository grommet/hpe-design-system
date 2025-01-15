---
"hpe-design-tokens": minor
---

- Added new export `hpe-design-tokens/grommet`.
- Changed ESM/CommonJS exports to resolve to CSS variables rather than raw values.
- Changed structure of "color" exports to flatten color name after the category (e.g., `hpe.color.background.selected.weak` --> `hpe.color.background['selected-weak']`).
