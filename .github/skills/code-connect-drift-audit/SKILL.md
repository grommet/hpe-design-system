---
name: code-connect-drift-audit
description: 'Audit workflow for HPE Design System Code Connect drift. Use when asked to review an existing `.figma.jsx` mapping, compare mapping props against the current component API, detect stale imports or patterns, check whether Figma properties are still represented correctly, or find gaps before sync.'
---

# Code Connect Drift Audit

Use this skill to review an existing Code Connect mapping for behavioral drift before or after component changes.

## When to Use This Skill

- User asks to audit mappings for drift
- A component API changed and existing mappings may be stale
- Sync failures suggest the mapping no longer matches the component or Figma property set
- A review needs findings on correctness rather than a new mapping from scratch

## Step-by-Step Workflows

### Audit a Mapping

1. Open the target `.figma.jsx` file and identify every declared prop, variant split, import, and rendered prop.
2. Compare the mapping against the current component API and neighboring mappings that use the same family pattern.
3. Check that every declared prop is actually consumed in `example` and that no rendered prop is invented.
4. Verify whether the current file should still be property-driven or should be simplified to a static composition pattern.
5. Report concrete drift as findings first: missing props, stale props, mismatched imports, invalid structural assumptions, or parser-hostile JSX.

## Gotchas

- **Do not treat a successful file parse as correctness**. The file can still drift from the live component API.
- **Do not audit against Figma alone**. The controlling behavior is the component API and the checked-in mapping pattern.
- **Do not normalize away intentional static examples**. Some repo mappings are intentionally representative rather than fully variant-driven.
- **Do not ignore folder conventions**. A drift fix may include relocating or naming a file consistently with the existing package layout.

## References

- See the bundled [drift checklist](./references/drift-checklist.md) for the review pass.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/guidelines.instructions.md](../../instructions/code-connect/guidelines.instructions.md)
- [../../instructions/code-connect/component-guidelines.instructions.md](../../instructions/code-connect/component-guidelines.instructions.md)
- [../../../packages/code-connect/src](../../../packages/code-connect/src)
