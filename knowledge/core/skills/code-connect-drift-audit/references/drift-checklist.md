# Code Connect Drift Checklist

Use this checklist when reviewing an existing mapping for correctness drift.

## Compare Against Code

1. Confirm the component import still matches the intended code component.
2. Compare rendered props against the current component API.
3. Flag props that no longer exist or no longer behave the same way.

## Compare Within the Mapping

1. Ensure every declared prop is consumed in `example`.
2. Ensure no rendered prop is hardcoded when it should be driven by Figma.
3. Check whether `variant` is being used for structural states.
4. Check icon imports and helper component imports against nearby mappings.

## Compare Against Repo Patterns

1. Verify the file still fits the existing folder and naming convention.
2. Compare the mapping shape with nearby files in the same component family.
3. Preserve intentional static composition mappings instead of forcing them into `props` form.

## Findings Format

Report findings as concrete drift items:

- stale prop names
- missing prop consumption
- invalid structural assumptions
- parser-hostile JSX
- inconsistent imports or file placement
