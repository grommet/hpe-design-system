# Primer and Scope

## Purpose
Define the functional architecture for a Design System Component Playground using Grommet components rendered with the HPE theme. This is a prop-aware exploration tool aligned to real component contracts, not a visual demo.

## Constraints
- Render all components with the Grommet HPE theme.
- Use HPE-styled FormField and Input patterns in the control panel.
- Avoid token exposure.
- Avoid custom styling overrides.
- No theme switching.

## Initial components
- Box
- Button
- FormField
- TextInput

## Process summary
1. Understand component contract (docs + TS defs).
2. Perform prop audit with purpose, relationships, grouping.
3. Produce JSON output per component.
4. Reflect patterns across components.
5. Evolve UI control schema and build approach.
