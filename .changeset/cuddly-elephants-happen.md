---
"hpe-design-tokens": minor
---

- Renamed exports from "base" to "primitives" (e.g., "base.css" --> "primitives.css").
- Removed "default" from CJS/ESM component token exports (e.g., "components.default.cjs" --> "components.js"). No effect on import.
- Removed light/dark, medium/small modes from ESM/CommonJS exports. Because these now return CSS variable refs, we don't need separate mode exports. (e.g., "color.light.js" --> "color.js").
