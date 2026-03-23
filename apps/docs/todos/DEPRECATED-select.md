# Deprecated Select Documentation Content

The following legacy prose was removed from the original `select.mdx` during migration because it was unstructured, catch-all, or did not fit the new template format.

## `## Guidance` section — dropped

The original file opened with a large `## Guidance` section that included:
- A general prose paragraph describing Select as "flexible" and encouraging designers to consider alternatives.
- A `### When to use Select` subsection with a bullet-list of decision questions (e.g. "Is there a need to conserve screen space?").
- A `### Selecting multiple options` subsection redirecting to SelectMultiple or CheckBoxGroup.

**Why removed:** The `## Guidance` section was an unstructured catch-all. The decision questions were designer-focused rationales, not user tasks. The relevant guidance has been redistributed:
- Valid `whenToUse` scenarios moved to `usage.whenToUse` in `select.yaml`.
- Counter-indications moved to `usage.whenToAvoid` in `select.yaml`.
- The multi-select redirect is now captured in `relatedComponents`.

## `## Variants` intro paragraph — dropped

> The Select input is flexible and may be extended to allow for multi-select, search, and create options.

**Why removed:** Catch-all prose above a Variants list is disallowed by the component template. The variants speak for themselves.

## `### Disabled` as a Variant — restructured

Disabled was listed as a `### Variant` in the original file but is an application state, not a morphological type. Moved to `## Behaviors and States > ### Application States > #### Disabled`.
