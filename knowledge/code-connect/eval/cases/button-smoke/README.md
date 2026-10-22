# Button Smoke

## Fixture

- Figma frame: [Button - V2 (`2133:694`)](https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694).
- Mapped target: [Primary, enabled, no-icon, small Button (`2133:695`)](https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-695).
- Target size: 63 × 28 px.
- Reference: [PNG](assets/button-primary-small.png).
- Code Connect snippet: `import { Button } from 'grommet';` and `<Button label="Label" primary size="small"/>`.
- Mapping source: [Button Code Connect mapping](../../../src/controls/Button.figma.jsx).

The frame contains a sheet of Button variants; this smoke case deliberately scopes the generated output to its representative mapped child. In MCP conditions, query the mapped target node so the comparison can confirm whether the snippet is delivered. Do not manually supply a mapping.

Use the shared condition definitions and run protocol in the [evaluation guide](../../README.md). Create a fresh agent session for each condition, capture the context received, and build/render the output in an isolated sandbox workspace. If Figma MCP returns only metadata for the frame, request design context for the mapped target child. Rerun a failed or broken smoke run; do not score it.