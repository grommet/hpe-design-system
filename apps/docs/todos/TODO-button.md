# TODO — Button component refactor

Review date: 2026-03-19
Reviewer: Julia Mayer-Lauren
Branch: project-sanderson-refactor-button-julia

---

## Missing visual assets

- [ ] **Anatomy diagram image** — No PNG/SVG anatomy diagram exists for Button. The anatomy table is populated in the MDX but the visual diagram above it is a placeholder comment `{/* TODO: Insert anatomy diagram image here */}`. A diagram illustrating the button container (1), label (1a), icon (1b), and badge indicator (1c) needs to be created by the design team.

---

## Missing or unverified coded examples

All 13 example files referenced in `button.yaml` were confirmed to exist in `apps/docs/src/examples/components/button/` at time of refactor. No missing files identified.

The following example is referenced in the anatomy table and general behaviors section but is a utility component, not a standalone demo:
- `ButtonAlignmentTable.js` — renders a table of alignment guidance; not listed in `examples` array of YAML (intentional — not a standalone example).

---

## Props present in Grommet but not documented in YAML

The following props exist in the [Grommet Button API](https://v2.grommet.io/button?theme=hpe#props) but were not captured in `button.yaml` because they are either advanced/rarely used or already handled by the theme:

- `color` — overrides theme button color; too low-level for design system guidance
- `fill` — fills container width/height; the responsive guidance in General Behaviors covers the common use case
- `gap` — spacing between icon and label; theme-controlled
- `justify` — label alignment within button; theme-controlled
- `margin` — layout spacing; not component-specific
- `pad` — internal padding; theme-controlled
- `plain` — removes all styling; advanced escape hatch, no design system guidance authored
- `reverse` — flips icon/label order; not commonly recommended
- `tip` — tooltip prop; documented separately under Tooltip component
- `type` — `"button" | "reset" | "submit"`; implementation detail, not design system guidance
- `as` — renders as a custom element; advanced escape hatch

Consider a follow-up task to document `plain`, `fill`, and `type` if usage patterns emerge from teams.

---

## Behaviors or states not captured in new structure

- **Toggle button icon state pattern** — The original MDX described showing the current state via icon AND informing the user of the next action via `a11yTitle`. This pattern (show current state through icon + describe next action in label) is present in Content Guidelines > Toggle button labels but is not demonstrated with a live coded example. A `ToggleButtonExample.js` would strengthen this guidance.
- **Success state** — The original MDX mentioned "busy and success states" together. The `success` visual state after an async operation resolves is not currently documented or demonstrated. If Grommet exposes a success state on Button, it should be added to Application States and the YAML `behaviors.applicationStates` array.
