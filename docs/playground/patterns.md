# Cross-Component Patterns

Record reusable rules and patterns discovered during audits.

## Template
- Pattern:
- Evidence (components):
- Rule:
- Implications for UI controls:

## Entries

- **Pattern**: Shared layout and spacing vocabulary
  - Evidence: Box, Button, FormField, TextInput
  - Rule: Prefer consistent grouping for layout (align, alignSelf, gridArea) and spacing (margin, pad, gap).
  - Implications for UI controls: Keep layout and spacing panels stable across components.

- **Pattern**: Accessibility title prop
  - Evidence: Box, Button, TextInput
  - Rule: Surface `a11yTitle` under Accessibility even when the component also accepts label or placeholder.
  - Implications for UI controls: Use a single text input for `a11yTitle` in the control panel.

- **Pattern**: Event handlers are documented but not controlled
  - Evidence: Box, Button, FormField, TextInput
  - Rule: Treat event props as documentation-only entries in audits.
  - Implications for UI controls: Use a non-interactive control type (`event`) to avoid UI clutter.

- **Pattern**: Mutually exclusive state groups
  - Evidence: Button (active, disabled, busy, success)
  - Rule: Some boolean state props form a constraint matrix where enabling one must disable others. The relationship is bidirectional — if A excludes B, B must also exclude A. Exclusion rules must be fully specified in `exclusiveWith` on both sides.
  - Implications for UI controls: Toggle handlers must enforce exclusions at interaction time, not just at codegen time. Turning on `disabled` clears `active`, `busy`, `success`. Turning on `busy` clears `success` and `disabled`.

- **Pattern**: Prop suppression by context
  - Evidence: Button (`busy`/`success` suppressed when `href` is set)
  - Rule: Some props become no-ops when another prop has a certain value. These should be recorded in `suppressedWhen` with a `reason`. In the playground, suppressed controls should be hidden (not just disabled) to avoid user confusion.
  - Implications for UI controls: Check `suppressedWhen` before rendering a control. Hidden controls should also have their state reset when the suppression condition becomes true.

- **Pattern**: Composite props with fundamentally different modes
  - Evidence: Button `badge` (dot vs counter), Button `tip` (string vs configured object)
  - Rule: When a prop accepts a union type where different branches imply completely different UX, treat each branch as a named mode. Document modes in the `modes` array with `id`, `label`, `shape`, and `description`. A single JSON input is never sufficient.
  - Implications for UI controls: Render a mode selector (e.g. radio or segmented control) first, then conditionally show the relevant sub-controls. Codegen must map the selected mode back to the correct value shape.

- **Pattern**: Usage combinations that are not props
  - Evidence: Button icon-only (icon set + label omitted), likely search TextInput (icon + placeholder)
  - Rule: Some meaningful usage patterns have no corresponding prop. They are emergent from prop combinations. These must be documented in the `patterns` section of the component JSON, not in `props`.
  - Implications for UI controls: Implement as a checkbox or mode toggle that sets multiple underlying state values simultaneously. The pattern may also enforce other props (e.g. icon-only forces `a11yTitle` required) or hide irrelevant ones (e.g. icon-only hides `reverse`).

- **Pattern**: API shape inconsistency within a mutually exclusive group
  - Evidence: Button `primary` (boolean), `secondary` (boolean), `kind="toolbar"` (string)
  - Rule: When multiple props represent variants of the same concept but use different API shapes, collapse them into a single Select in the playground. Codegen maps the selected value back to the correct prop shape.
  - Implications for UI controls: Mark these props `collaborationRequired: true`. The mapping (Select value → emitted prop) must be agreed before building.

- **Pattern**: Progressive disclosure of dependent controls
  - Evidence: Button reverse (only shown with icon + label), target (only shown with href), badge sub-controls (only shown with badge enabled)
  - Rule: Controls dependent on another prop being set should be hidden until the parent condition is true, rendered in a `NestedBox` (indented, left-border) to signal the relationship.
  - Implications for UI controls: Use conditional rendering (`{condition && <NestedBox>...</NestedBox>}`), not disabled state, for dependent controls.
