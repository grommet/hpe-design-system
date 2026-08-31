# First Week: AI Workflow Contributor

Use this checklist to establish a shared operating model before changing a
pipeline, mapping, prompt, or knowledge asset. This path assumes familiarity
with Git and AI-assisted software delivery; use the linked product references
for component-level React and Figma details.

## Day 1: Set Up The Workspace

- [ ] Install the Node.js version used by CI (currently 24.15.0) and pnpm.
- [ ] Run `pnpm install` from the repository root. This installs all pnpm
      workspace dependencies.
- [ ] Read the [repository overview](../../README.md), this
      [onboarding orientation](README.md), and the [knowledge index](../README.md).
- [ ] Run `pnpm validate:capability-manifests` and record any existing failures
      before starting an unrelated change.
- [ ] Open the [Grommet sandbox](../../sandbox/grommet-app/) and the
      [design-to-code evaluation plan](../../docs/DESIGN_TO_CODE_EVAL.md) to see the
      initial environment used for generated-code assessment.

## Days 2-3: Trace The System

- [ ] Read [the token package guide](../../packages/hpe-design-tokens/README.md)
      and identify the difference between source tokens, generated outputs, and the
      Grommet export.
- [ ] Read [the Code Connect guide](../code-connect/README.md), then trace one
      existing `.figma.jsx` mapping from its Figma component URL through its mapped
      JSX example.
- [ ] Read [the skills index](../core/skills/README.md), then inspect the active
      [docs-refactor manifest](../capabilities/docs-refactor/manifest.yaml) as an
      example of a capability composed from data, skills, agents, stages, and
      verification.
- [ ] Run `pnpm --filter @hpe-design-system/agent generate -- "build a login form"`
      to see how the [design-system-agent](../../packages/design-system-agent/)
      package turns `knowledge/core/data/components` and `knowledge/core/data/patterns`
      into agent-ready context, then run `pnpm --filter @hpe-design-system/agent test`.
- [ ] Inspect a component or pattern in the docs application and identify the
      Grommet primitive, HPE theme/token usage, and HPE icon choice it teaches.
- [ ] Review the [icon package README](../../packages/icons-grommet/README.md)
      to understand the distinction between raw SVG source and themed React icons.

## Days 3-4: Observe The Workflow

- [ ] Choose a simple, high-quality HPE design artifact, such as a Button or
      Badge layout, as the evaluation plan recommends.
- [ ] Describe the intended component, state, content, layout, tokens, and icon
      constraints from the available design context. Record uncertainty rather than
      inventing a design-system rule.
- [ ] Produce a small implementation draft using the approved Grommet and HPE
      icon vocabulary.
- [ ] Render the draft in `sandbox/grommet-app/src/` and record visible issues,
      console errors, and system-alignment gaps.
- [ ] Capture the artifact, agent inputs, generated output, checks performed,
      and recommendation in the evaluation record described in
      [the playbook](design-to-code-playbook.md).

## Days 4-5: Make A Small Contribution

Choose one scoped contribution with a maintainer. Good first changes include:

- Clarifying a reusable knowledge instruction, skill, prompt, or structured
  data entry with evidence from existing sources.
- Adding an evaluation result for a simple artifact.
- Repairing an established Code Connect mapping after verifying the Figma
  property names and component node.
- Improving an existing workflow checklist or validation note.

Before review, verify the relevant result: a schema or structure check for
knowledge and docs work, a build or rendered sandbox result for code generation,
or a successful publish plus Dev Mode inspection for Code Connect work.

## Figma Code Connect Access

Code Connect work requires access to the HPE Design System Components Figma file
and a personal Figma access token with `file_content:read` and
`file_code_connect:write` scopes. Store it only in the ignored
`knowledge/code-connect/.env` file as `FIGMA_ACCESS_TOKEN`; never commit a
token. Use the canonical [Code Connect setup instructions](../code-connect/README.md)
when access is available.

For a first mapping, scaffold from the Figma component URL, retain the generated
property names, map them to real Grommet props, publish with
`pnpm --filter @hpe-design/code-connect figma:sync`, then inspect the result in
Figma Dev Mode. Publishing updates Dev Mode metadata; it does not generate an
application implementation or alter visual Figma content.

On corporate networks that intercept TLS, configure Node with
`NODE_EXTRA_CA_CERTS` pointing to the approved corporate CA certificate. Do not
disable TLS verification to work around a Figma API certificate error.

## Week-One Completion Evidence

By the end of the week, be ready to show that you can:

- Explain the product map and source-of-truth boundaries from [the orientation](README.md).
- Trace one Figma component to a Code Connect mapping and a Grommet-oriented
  implementation example.
- Run and interpret a scoped validation, including distinguishing an existing
  repository failure from one caused by your change.
- Produce a small, reviewed change that improves a reusable knowledge asset,
  evaluation record, or verified mapping.
