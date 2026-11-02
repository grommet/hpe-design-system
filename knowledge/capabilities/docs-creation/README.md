# docs-creation

Status: active

## Purpose

Create website documentation for a component that does not yet have a dedicated
page. Start from user-supplied context, implementation evidence, and approved
design guidance, not an existing page.

This is an independent capability. It owns every agent and its page contract.
It does not invoke docs-refactor agents, read legacy backups, create deprecated
content reports, or update the refactor checklist. Shared knowledge schemas,
writing guidance, and coding standards remain authoritative.

## Entry point

Select `docs-creation-orchestrator` in Copilot Chat and provide a component name:

```text
@docs-creation-orchestrator TreeView
```

The [Copilot entrypoint](../../../.github/agents/docs-creation-orchestrator.agent.md)
loads the [authoritative orchestrator](docs-creation-orchestrator.agent.md).
Subordinate agents are local specifications invoked by that orchestrator; they
do not need separate discovery wrappers.

## Workflow

1. Ask whether the user wants to provide additional information, including RFCs,
   Figma files, implementation references, or decisions outside the repository.
   Wait for the answer and collect the supplied context.
2. Run website integration first: establish identifiers, register the route and
   metadata, and create a render-safe page scaffold.
3. Run `populate-yaml-agent` to populate or validate the canonical definition.
4. **Human gate:** review the YAML, source conflicts, missing information, and
   planned examples. Do not generate the documentation before approval.
5. Generate MDX with hidden implementation briefs, not coded examples.
6. Generate examples, then Do/Don't previews, using both the approved YAML and
   the hidden MDX briefs.
7. Review coverage/readiness and write `apps/docs/todos/TODO-<page-slug>.md`.
8. Review copy.
9. Verify structure, build, and the rendered page.
10. **Human gate:** request final verification and explicit authorization for PR
    creation. Do not commit, push, or create a PR without that authorization.

Examples and Do/Don't previews run sequentially because both edit MDX and export
barrels. All later stages receive the user's additional context; it is not
discarded after intake.

See the [workflow contract](docs/workflow.md), [page template](docs/COMPONENT_TEMPLATE.md),
and [manifest](manifest.yaml).

## Agent roster

| Specification                                              | Agent name                              | Responsibility                                              |
| ---------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| [Website integration](agents/website-integration.agent.md) | `website-integration-agent`             | Initial route, metadata, scaffold, and integration handoff  |
| [Populate YAML](agents/populate-yaml.agent.md)             | `populate-yaml-agent`                   | Evidence-backed canonical component definition              |
| [Generate MDX](agents/generate-mdx.agent.md)               | `docs-creation-generate-mdx-agent`      | Page prose, tables, wrappers, and hidden example briefs     |
| [Generate examples](agents/generate-examples.agent.md)     | `docs-creation-generate-examples-agent` | Live examples, anatomy, card preview, and export wiring     |
| [Do/Don't previews](agents/dos-donts.agent.md)             | `docs-creation-dos-donts-agent`         | Paired previews from YAML and MDX instructions              |
| [Coverage/readiness](agents/coverage-readiness.agent.md)   | `coverage-readiness-agent`              | Evidence and output audit, including the standard TODO file |
| [Review copy](agents/review-copy.agent.md)                 | `docs-creation-review-copy-agent`       | Writing quality without changing approved semantics         |
| [Verify render](agents/verify-render.agent.md)             | `docs-creation-verify-render-agent`     | Validation and browser verification, with bounded repairs   |

Agent names that overlap refactor roles are capability-prefixed to avoid
discovery collisions. They are separate implementations, not aliases.

## Outputs and completion

- Canonical YAML in `knowledge/core/data/components/<component-id>.yaml`.
- Page at `apps/docs/src/pages/components/<page-slug>.mdx`.
- Registration in `apps/docs/src/data/structures/components.tsx`.
- Examples and exports under `apps/docs/src/examples/`.
- The standard `apps/docs/todos/TODO-<page-slug>.md`, even when no gaps remain.
- Verified accessibility data if a WCAG compliance section is included.
- Exact verification commands/results and a final human review handoff.
- A PR only when the user explicitly authorizes it.

The knowledge identifier and page slug can differ: for example, `toggle-group`
and `togglegroup`. Resolve them explicitly; use the **page slug** in the TODO
filename, matching the documentation page convention.

Unresolved publication blockers mean the work is a draft, not complete. Optional
follow-ups may remain only when the human reviewer explicitly accepts them.

## Validation

For changes to this capability:

```sh
pnpm validate:capability-manifests
pnpm validate:knowledge-structure
```

These commands validate manifests and repository knowledge conventions, not agent
execution. Check frontmatter, referenced assets, and the ordered workflow too.
An end-to-end pilot needs a real component and both human approvals; do not
describe static validation as a successful documentation-generation run.

For generated documentation, use the verification procedure in the
[render agent](agents/verify-render.agent.md).
