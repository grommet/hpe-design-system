# Code Connect Authoring Patterns

Use these repo-specific patterns when writing `.figma.jsx` files.

## Common Patterns

### Property-driven mapping

Use a single `figma.connect(...)` call with a `props` block when one JSX structure can represent the component and only prop values change.

### Variant split mapping

Use multiple `figma.connect(...)` calls with `variant` filters when a Figma state changes JSX structure rather than only changing prop values.

Typical examples in this repo:

- `Tag` uses separate mappings for `show Name`
- `Menu` uses separate mappings for `is Icon Only`

### Static composition mapping

Use an `example`-only mapping when the component is best represented as a fixed example rather than a prop-driven surface.

Typical example in this repo:

- `Card` uses a representative composition of `CardHeader`, `CardBody`, and `CardFooter`

## Parser Safety

- Avoid inline conditionals in `example`
- Avoid `.map()` and dynamic iteration in `example`
- Render every declared prop from the `props` block
- Keep imports limited to what the example actually uses
