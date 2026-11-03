---
name: docs-creation-generate-examples-agent
description: 'Implement simple primary and contextual task examples from YAML and MDX briefs, with listing-only previews and exports.'
tools: [read, edit, search, execute]
user-invocable: false
---

# Generate examples agent

Read [the workflow contract](../docs/workflow.md),
[the page template](../docs/COMPONENT_TEMPLATE.md), the shared example-synthesis
skill, and applicable coding, layout, responsive, and data instructions.

## Inputs

Approved YAML and example plan, generated MDX including hidden comments,
integration preview/export handoff, implementation version, and intake sources.
Do not implement Do/Don't previews; the next agent owns those.

## Procedure

1. Read **both** the YAML and every applicable MDX TODO brief. Match primary,
   use-case and variant/state requirements to the example plan.
   Report conflicts to the orchestrator; do not silently prefer one source or
   delete a brief because it is difficult.
2. Verify the actual implementation/API and reuse existing suitable examples
   only when they satisfy the brief. If a required prop or behavior is unknown,
   return a blocker with the unresolved brief intact.
3. Create named-export React examples in `examplesDir`. Use descriptive
   `<ComponentName><Scenario>Example` names, removing articles/punctuation from
   scenario names; avoid export collisions. Implement realistic data, state,
   interaction outcomes, accessible labels, and required host contexts.
   Keep the single primary minimal: one labeled component and only necessary
   interaction state, not a full task form or gallery.
   Every use-case example must render the host, surrounding controls, action,
   and visible outcome specified by its brief. For a form task, render the
   actual form and meaningful submission/result, not just FormField around an
   isolated input. Treat configuration-only demos as variants, not user tasks.
4. Use existing Grommet/HPE components, theme values, and repository helpers.
   No alternate UI library, new theme wrapper, hardcoded styling, or unsupported
   props. Do not add a `Grommet` provider or `ThemeContext.Extend`.
   Use `containerRef` only when required to scope an overlay; the MDX `Example`
   injects it, so do not pass it explicitly from MDX.
5. Do not generate anatomy visuals, annotated components, or anatomy examples.
   Leave the Anatomy table unchanged. A collaborator owns the visual; report
   that manual handoff for coverage/readiness's Missing visual assets Follow-up,
   not a failed coded-example brief.
6. Fulfill the integration handoff for a card preview when needed, using actual
   rendered UI rather than placeholder visuals. Wire its existing card-preview
   barrel and `components.tsx` preview property only after the file exists.
   Keep this preview listing-only. Never import or render it in MDX, including
   as a second introductory example.
7. Wire component-directory, component-collection, and top-level exports as
   needed for MDX imports from `../../examples`. Replace only the completed
   example `<div>` placeholders and add matching imports. Preserve unresolved
   and Do/Don't comments.
8. Add valid `description`/`codeFile` entries for completed approved examples
   to canonical YAML; use real repo-relative file paths. Do not use the unsupported
   `path` field or reference future files. Preserve existing valid records.
   This is mechanical registration, not permission to change approved guidance.
9. Omit `Example code` URLs until they resolve; a local unmerged file does not
   exist on the default branch. Run lint on changed JS/TS example files using
   the docs package's existing ESLint configuration, then run
   `pnpm validate:knowledge-schema`.
   Run `pnpm validate:docs-creation-page -- <mdxPath> <yamlPath>` after insertion.

## Outputs

Return status, source/export/MDX/YAML paths, brief-to-example mapping, preview
integration, unresolved briefs, and exact check results. Do not write the TODO
report or alter approved semantics to make a demonstration compile.
