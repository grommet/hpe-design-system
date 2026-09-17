# Design To HPE Design System-Aligned Code

Use this playbook to create or evaluate an AI-assisted implementation from an
HPE design artifact. A successful result is a reviewable draft that uses
approved HPE Design System primitives, accurately expresses the supplied design
intent, and has evidence of its behavior. It is not final code simply because
an agent generated it.

## Operating State

| Area                                                | Current state                                                                               | Contributor response                                                                                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens, Grommet/theme, icons, and docs              | Established system assets with local source and consumer references.                        | Use their established vocabulary and validate against their package or docs guidance.                                                                            |
| Code Connect mappings                               | Operational for the mappings already present in [knowledge/code-connect](../code-connect/). | Treat mappings as a production-oriented starting point for Figma Dev Mode and contextual agent generation; validate property mappings before publishing changes. |
| Design-to-code evaluation                           | Intentionally early-stage and focused on simple artifacts.                                  | Begin with a Button, Badge, or similarly bounded interface and capture repeatable evidence.                                                                      |
| Broader capability automation and MCP configuration | Evolving; many capability manifests are marked planned.                                     | Use the active assets as evidence, and do not represent a planned workflow as automated or available.                                                            |

## Workflow

### 1. Establish The Evidence

Record the design artifact, Figma node or inspection context when available, and
the target user interaction. Identify the intended HPE component, variants,
content, layout, states, token semantics, and icon needs. Mark unknown values as
unknown. Do not reconstruct a rule from pixel values when an approved component
or token reference can answer it.

### 2. Choose System Primitives

Find the closest documented Grommet primitive and HPE theme behavior. Use
`hpe-design-tokens` outputs for design values and
`@hpe-design/icons-grommet` for approved icons. For a component represented in
Figma, inspect its Code Connect mapping before prompting an agent: it supplies
the approved import and the translation between Figma properties and React props.
Run `pnpm --filter @hpe-design/knowledge-agent generate -- "<feature description>"`
to confirm what `knowledge/core/data/components` and `knowledge/core/data/patterns`
currently surface for the request before assembling agent context.

### 3. Assemble The Agent Context

Give the agent constrained, attributable context:

- The source artifact or design specifications and the target state.
- The named HPE component, token semantics, and icon requirements.
- The relevant Code Connect mapping or documented JSX usage.
- Repository-local instructions, skills, or structured data that apply to the
  task.
- The expected output surface and acceptance checks.

Do not use a broad prompt as a substitute for missing design context. Ask for a
draft with explicit assumptions when the artifact does not resolve an important
implementation choice.

### 4. Generate A Small Draft

Start with the minimum component or layout needed to exercise the design
decision. Keep the first evaluation artifact simple, as specified by
[the evaluation plan](design-to-code-evaluation-plan.md). Generated code should
import Grommet components directly, apply the HPE theme through the existing
application setup, and use existing HPE icons where applicable.

### 5. Render And Inspect

Place the candidate in `sandbox/grommet-app/src/` when evaluating a new workflow,
or in the owning application’s established test surface for a contribution.
Render it and inspect at the relevant viewport and interaction states. Check for
runtime or console errors, visual mismatch, inaccessible interaction, incorrect
component behavior, and token or icon substitutions.

### 6. Record The Evaluation

Capture the work in [the design-to-code evaluation plan](design-to-code-evaluation-plan.md)
or a linked result record with:

1. The design artifact and source context used.
2. The workflow and agent inputs tested.
3. The generated code output and any manual adaptation.
4. Rendered evidence and notes on visual fidelity.
5. Code-quality and HPE design-system-alignment findings.
6. A recommendation on whether to invest further in that workflow.

### 7. Review And Reuse

Ask design and engineering reviewers to evaluate the result against the same
artifact and system constraints. When a finding exposes reusable guidance,
improve the relevant instruction, skill, structured data, prompt, or Code
Connect mapping instead of retaining the learning only in a one-off chat.

## Quality Gates

Do not send a result for approval until these checks are true:

- [ ] The design source and its known constraints are recorded.
- [ ] The selected Grommet component and HPE icon are approved system assets.
- [ ] Token semantics or theme values are used instead of hard-coded visual
      substitutes.
- [ ] Figma property names came from scaffolding or verified inspection, not
      guesswork.
- [ ] The code renders in its intended validation surface without relevant
      runtime or console failures.
- [ ] Code Connect changes have a successful publish and Figma Dev Mode check.
- [ ] An engineer and designer have an opportunity to review the draft.
- [ ] Reusable lessons are captured in a versioned knowledge asset or evaluation
      record.

## Contribution Tracks

### Improve Code Connect

For a mapped component, use the canonical [Code Connect workflow](../code-connect/README.md):
scaffold from the actual Figma component URL, retain API-provided property names,
map properties to real Grommet props, publish, and inspect the Dev Mode output.
Code Connect mapping files are integration metadata, so confirm both the Figma
node and JSX behavior before treating a change as complete.

### Improve Reusable Knowledge

Use [the skills index](../core/skills/README.md) to choose an appropriate
repository-scoped skill. Place guidance in the correct layer:

- Structured component or pattern facts belong in `knowledge/core/data/`.
- Durable operating rules belong in `knowledge/core/instructions/`.
- Repeatable procedures belong in `knowledge/core/skills/`.
- Task-specific entrypoints and staged workflow definitions belong in
  `knowledge/capabilities/` and should follow the active
  [docs-refactor manifest](../capabilities/docs-refactor/manifest.yaml) model.

Validate capability-manifest changes with `pnpm validate:capability-manifests`.
This validates manifest schema, not generated code, Figma output, or a workflow’s
real-world usefulness; retain behavior evidence as well.

### Improve Evaluation Evidence

Keep evaluation scope small and comparable. An evidence record should make it
possible for a maintainer to reproduce the source context, understand what the
agent was asked to do, inspect the output, and judge the resulting investment
decision without relying on a contractor’s memory.

## Non-Negotiable Boundaries

- Do not substitute raw CSS for an available Grommet/HPE theme behavior simply
  to match a pixel measurement.
- Do not use an inline SVG replacement when an approved HPE icon exists.
- Do not invent Figma property names, node URLs, token semantics, or component
  variants.
- Do not publish Code Connect mappings without validating the mapping and
  inspecting Dev Mode.
- Do not present AI output as production-ready before rendering, system-alignment
  checks, and human review.
