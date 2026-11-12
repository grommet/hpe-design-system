# Code Connect Drift Checklist

Use this checklist when reviewing an existing mapping for correctness drift.

## Compare Against Code

1. Confirm the component import still matches the intended code component.
2. Compare rendered props against the current component API.
3. Flag props that no longer exist or no longer behave the same way.

## Compare Within the Mapping

1. Ensure every property accessor's value is consumed in the exported snippet.
2. Ensure no rendered prop is hardcoded when it should be driven by Figma.
3. Check whether TypeScript branches correctly select structural states.
4. Check icon imports and helper component imports against nearby mappings.

## Compare Against Repo Patterns

1. Verify the file still fits the existing folder and naming convention.
2. Compare the mapping shape with nearby files in the same component family.
3. Preserve intentional static compositions instead of forcing them to be property-driven.

## Findings Format

Report findings as concrete drift items:

- stale prop names
- missing prop consumption
- invalid structural assumptions
- invalid structured template rendering
- inconsistent imports or file placement
