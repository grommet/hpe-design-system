---
mode: agent
description: >
  Runs the full component-creation pipeline for a single component.
  Orchestrates spec-writer, props-writer, spec-reviewer, mapping-writer,
  and mapping-reviewer sequentially. This is the single entry point for
  creating a complete component spec from scratch.
---

# Component Creation Orchestrator — notification

You are running the full HPE Design System component spec pipeline for:

| Variable | Value |
|---|---|
| Component | **notification** |
| Reference component | **none** |
| Reference theme | **grommet-theme-hpe** |
| Reference package | **grommet** |
| Target platform | **radix** |
| Platform primitive | **@radix-ui/react-toast** |

You will complete all five steps sequentially. Do not move to the next
step until the current step is fully complete and all output files are
written. Do not ask for confirmation between steps.

---

## Before anything else

Read these files in full before starting Step 1:

1. `knowledge/core/token-conventions.md`
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
3. `knowledge/capabilities/component-creation/spec-writing-context.md`

---

## Step 1 — Spec writer

Follow all instructions in:
`knowledge/capabilities/component-creation/prompts/spec-writer.prompt.md`

Using these values:
- `{{COMPONENT_NAME}}` = notification
- `{{REFERENCE_COMPONENT}}` = none
- `{{REFERENCE_THEME}}` = grommet-theme-hpe
- `{{REFERENCE_PACKAGE}}` = grommet

Produce:
```
knowledge/capabilities/component-creation/component-specs/notification/tokens.md
knowledge/capabilities/component-creation/component-specs/notification/anatomy.md
knowledge/capabilities/component-creation/component-specs/notification/constraints.md
knowledge/capabilities/component-creation/component-specs/notification/gaps.md
```

Do not proceed to Step 2 until all four files are written.

---

## Step 2 — Props writer

Follow all instructions in:
`knowledge/capabilities/component-creation/prompts/props-writer.prompt.md`

Using:
- `{{COMPONENT_NAME}}` = notification

Produce:
```
knowledge/capabilities/component-creation/component-specs/notification/props.md
```

Append any new gaps to `gaps.md`.

Do not proceed to Step 3 until props.md is written.

---

## Step 3 — Spec reviewer

Follow all instructions in:
`knowledge/capabilities/component-creation/prompts/spec-reviewer.prompt.md`

Using:
- `{{COMPONENT_NAME}}` = notification

Review all four agnostic documents. Append findings to `gaps.md`.

If the verdict is **Failed**:
- Log all gaps in `gaps.md`
- Correct the spec documents before proceeding
- Re-run the review mentally to confirm fixes resolve the gaps
- Then proceed to Step 4

If the verdict is **Passed**:
- Proceed directly to Step 4

---

## Step 4 — Mapping writer

Follow all instructions in:
`knowledge/capabilities/component-creation/prompts/mapping-writer.prompt.md`

Using:
- `{{COMPONENT_NAME}}` = notification
- `{{PLATFORM}}` = radix
- `{{PLATFORM_PRIMITIVE}}` = @radix-ui/react-toast

Produce:
```
knowledge/capabilities/component-creation/component-specs/notification/mappings/radix.md
```

Append any new gaps to `gaps.md`.

Do not proceed to Step 5 until the mapping file is written.

---

## Step 5 — Mapping reviewer

Follow all instructions in:
`knowledge/capabilities/component-creation/prompts/mapping-reviewer.prompt.md`

Using:
- `{{COMPONENT_NAME}}` = notification
- `{{PLATFORM}}` = radix

Review the mapping document. Append findings to `gaps.md`.

If the verdict is **Failed**:
- Log all gaps in `gaps.md`
- Correct the mapping document
- Then mark the pipeline complete

If the verdict is **Passed**:
- Mark the pipeline complete

---

## When all steps are complete

Output a single pipeline summary:

```markdown
# Pipeline Complete — notification

## Files produced

- tokens.md
- anatomy.md
- constraints.md
- props.md
- gaps.md
- mappings/radix.md

## Gap summary

| # | Title | Step | Type | Status |
|---|---|---|---|---|
[copy from gaps.md summary table]

## Verdict

Ready for implementation.
OR
[N] open gaps require resolution before implementation.
```