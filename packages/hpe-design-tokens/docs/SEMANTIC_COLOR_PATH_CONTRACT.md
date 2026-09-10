# Semantic Color Path Contract

This document defines the path structures used by semantic color tokens and
Figma variable names.

Use this as the canonical reference for:

- Canonical token paths stored in token JSON files.
- Figma variable names used by sync import/export.
- Alias path conversion between canonical token form and Figma form.
- Known exception paths and normalization rules.

## Scope

Applies to semantic color path handling in:

- src/semantic_color_core.ts
- src/semantic_color_normalization.ts
- src/semantic_color_parser.ts
- src/semantic_color_figma_adapter.ts

## Vocabulary

- target: one of `background`, `border`, `dataVis`, `decorative`, `focus`,
  `foreground`, `icon`, `text`, `transparent`.
- role: top-level semantic role segment for a target.
- family: role that introduces a nested subrole namespace.
- subrole: role name inside a family namespace.
- scale: `xweak`, `weak`, `default`, `strong`, `xstrong`.
- state: `REST`, `hover`, `focus`, `active`.

## Canonical Token Path Shapes

Canonical token paths are slash-delimited and include normalization placeholders
for scale and state when present.

### Standard semantic color

`color/<target>/<role>/<scale>/<state>`

Examples:

- `color/background/primary/strong/REST`
- `color/text/default/DEFAULT/REST`

Notes:

- `DEFAULT` and `REST` can appear in input and are normalized as scale/state
  placeholders.
- For single-slot roles, `role` is a direct role name.

### Family-based semantic color

`color/<target>/<family>/<subrole>/<scale>/<state>`

Examples:

- `color/background/accent/purple/strong/REST`
- `color/background/selected/primary/DEFAULT/REST`
- `color/dataVis/categorical/40/DEFAULT/REST`

### Exceptions

These are kept stable and do not force default scale/state insertion:

- `color/transparent`
- `color/focus/support`

## Figma Variable Name Shapes

Figma names are optimized for authoring and may compress scale/state into
hyphen suffixes.

### Standard role

`color/<target>/<role>-<scale>[-<state>]`

Examples:

- `color/background/primary-strong`
- `color/background/primary-strong-hover`

### Segmented family role

Some families remain explicit path segments in Figma names:

`color/<target>/<family>/<subrole>-<scale>[-<state>]`

Examples:

- `color/background/accent/purple-strong`
- `color/background/accent/purple-strong-hover`

Current segmented family map is defined by:

- `SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET`

## Canonical <-> Figma Alias Conversion

### Figma -> canonical token path

`normalizeColorVariableNameFromFigmaCore` applies:

1. Split and normalize compact forms.
2. Preserve segmented families where configured.
3. Append `REST` when no interaction state is present.
4. Insert `DEFAULT` when no explicit scale is present.
5. Preserve exception aliases unchanged.

Examples:

- `color/background/accent/purple-strong` ->
  `color/background/accent/purple/strong/REST`
- `color/background/accent/purple-strong-hover` ->
  `color/background/accent/purple/strong/hover`
- `color/background/accent/purple` ->
  `color/background/accent/purple/DEFAULT/REST`

### Canonical token alias -> Figma alias

`tokenAliasToFigmaAliasCore` applies:

1. Remove normalization placeholders (`DEFAULT`, `REST`) from output path.
2. Keep configured families segmented in Figma naming.
3. Collapse remaining role and suffix parts using `-`.
4. Preserve exception section handling (`color/focus`).

Examples:

- `color/background/accent/purple/strong/REST` ->
  `color/background/accent/purple-strong`
- `color/focus/support/DEFAULT/REST` -> `color/focus-support`
- `color/background/accent/purple/custom/REST` ->
  `color/background/accent/purple-custom`

## Validation vs Serialization Maps

Two core maps represent different concerns:

1. Validation map:
   `SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY`
   - shape: target -> family -> allowed subroles
   - purpose: parser/normalization validation and expansion

2. Serialization map:
   `SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET`
   - shape: target -> families kept segmented in Figma names
   - purpose: alias and variable name serialization behavior

Expected relationship:

- For each target, segmented Figma families should be a subset of the family
  keys in `SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY[target]`.

## Where To Update

If path behavior changes, update all of the following:

1. This contract document.
2. `src/semantic_color_core.ts` map comments.
3. `src/semantic_color_normalization.ts` function comments.
4. Relevant tests:
   - `src/tests/semantic_color_normalization.test.ts`
   - `src/tests/semantic_color_figma_adapter.test.ts`
   - `src/tests/semantic_color_parser.test.ts`
