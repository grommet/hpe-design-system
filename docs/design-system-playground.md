# Design System Playground - Prop Audit and Build Primer

## Goal
Define the functional architecture for a Design System Component Playground using Grommet components rendered with the HPE theme. This is a prop-aware exploration tool aligned to real component contracts, not a visual demo.

## Constraints
- Render all components with the Grommet HPE theme.
- Use HPE-styled FormField and Input patterns in the control panel.
- Avoid token exposure.
- Avoid custom styling overrides.
- No theme switching.

## Selected Initial Components
- Box
- Button
- FormField
- TextInput

## Objective for Copilot
- Understand Grommet component contracts (docs + TS definitions).
- Perform structured prop audits.
- Classify props into logical groupings.
- Auto-document findings.
- Reflect on patterns across components.
- Produce JSON that can drive the playground UI.
- Suggest a scalable build approach.

## Order of Operations
### Step 1 - Understand Component Contract
For each component:
- Extract all available props (docs + TS definitions).
- Ignore theme-level configuration.
- Ignore generic DOM pass-through unless meaningful.

### Step 2 - Perform Prop Audit
For each prop, classify across:

A. Purpose classification
- preview-user: best demonstrated through direct interaction in the preview pane (value, selected, checked)
- control-implementor: developer-configured prop via control panel (disabled, size, align)
- layout-positional: self alignment, child alignment, grid placement
- relationship: relevant in parent/child composition
- event: callback props (onChange, onClick)

B. Relationship mapping
Determine for each prop:
- dependency on another prop
- mutual exclusivity with another prop
- visual or functional override behavior
- composition-only meaning
- browser-managed state implications (focus, hover)

Do not assume cascade behavior without verification.

C. Structural grouping
Group props by a logical mental model such as:
- State
- Content
- Behavior
- Layout
- Advanced
- Composition

Grouping should follow visual order, dependency, and the implementation contract.

## JSON Output Specification
Each component should emit structured JSON per prop.

```json
{
  "component": "Button",
  "props": [
    {
      "prop": "disabled",
      "type": "boolean",
      "purpose": "control-implementor",
      "group": "State",
      "dependsOn": [],
      "exclusiveWith": [],
      "priority": 3,
      "uiControl": "toggle",
      "defaultInPlayground": false,
      "omitWhenDefault": true
    }
  ]
}
```

Required fields:
- prop
- type
- purpose
- group
- dependsOn
- exclusiveWith
- uiControl
- defaultInPlayground
- omitWhenDefault

Optional:
- priority

## Cross-Component Reflection
After auditing the selected components:
- Identify common prop patterns.
- Identify consistent grouping models.
- Map consistent UI control types per prop type.
- Distinguish intrinsic layout props vs environmental layout props.
- Document common relationship patterns (wrapper + input).
- Summarize reusable design rules.

## Control Panel Design Principles
Differentiate between preview-user inputs and control-implementor inputs.

Example:
- TextInput value -> preview pane
- TextInput placeholder -> control panel

Boolean controls
- Use consistent rules for Toggle vs CheckBox.
- Prefer grouped controls for related state flags.

Example grouping:
- State
  - Disabled
  - Active
  - Busy
  - Success

These are not mutually exclusive but may have priority relationships.

## Code Generation Rules
- Emit only explicitly applied props in generated JSX.
- Do not emit default values.
- Avoid browser-managed state props.
- Align with Grommet best practices.
- If code editing is enabled, define a validation strategy.

## Risks
- Cognitive overload from exposing every prop.
- Incorrect modelling of parent/child relationships.
- Confusion between preview-user vs implementor inputs.
- Layout prop misuse.
- Feature creep.

## Deliverables
For the selected components:
- Structured prop audit JSON.
- Auto-generated documentation summary per component.
- Cross-component pattern summary.
- Suggested UI control schema.
- Suggested scalable build architecture.

## Final Goal
Produce a prop-aware foundation that:
- Drives playground UI generation.
- Ensures consistency across components.
- Supports scalable growth.
- Aligns with developer mental models.
- Uses the playground as a dogfooding validation tool.
