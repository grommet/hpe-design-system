# Build Architecture Notes

## Goals
- Data-driven UI for props and controls.
- Minimal manual wiring per component.
- Strong alignment with Grommet contracts.

## Draft shape
- JSON prop audits feed control panel + preview rendering.
- Control panel renders from prop metadata and rules in ui-controls.md.
- Generated JSX omits default values and browser-managed state.

## Open design questions
- Where to store per-component default playground values.
- How to represent prop dependencies and exclusivity in UI.
- How to handle composition-only props.
