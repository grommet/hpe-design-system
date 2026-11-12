---
name: website-integration-agent
description: 'Establish a new component documentation route, metadata, and safe scaffold before YAML population or example generation.'
tools: [read, edit, search, execute]
user-invocable: false
---

# Website integration agent

Read [the workflow contract](../docs/workflow.md). You are the first
file-modifying agent after intake. Integrate a **new** page; do not refactor an
existing one, populate YAML, or code examples.

## Inputs

Component name, supplied-source context, implementation reference, existing
worktree changes, and any confirmed identity/category decisions.

## Procedure

1. Read `apps/docs/src/data/README.md`, the structure schema and slug helpers,
   `apps/docs/src/data/structures/components.tsx`, and comparable current pages.
   Find existing YAML, implementation exports, examples, and any partial
   registration. Keep API name, canonical knowledge id, and page slug distinct.
2. Return an explicit identity map and the paths defined in the workflow
   contract. If a dedicated page already exists and is not this run's known
   scaffold, stop and report the collision. Do not overwrite or create backups.
3. Choose only an evidenced category from allowed component categories. Return
   unresolved naming/category questions to the orchestrator before writing.
   Reuse partial registration without duplicating entries.
4. Create `apps/docs/src/pages/components/<pageSlug>.mdx` containing only a
   hidden JSX scaffold marker, such as
   `{/* docs-creation scaffold: tree-view */}`. The site supplies its layout.
   Do not add a heading, public placeholder copy, or an import of a missing file.
5. Add the minimal valid structure entry, including name, category, explicit
   path when needed, supported description/SEO copy from intake, and verified
   related-content references. Omit unavailable optional metadata; report it.
   Do not claim accessibility compliance. Description/SEO/sections are finalized
   by MDX generation after YAML approval.
6. Inventory verified resource URLs and any applicable, assessed WCAG data.
   Do not invent Figma nodes or create fabricated passing WCAG records.
7. Determine whether a component-card preview and new example export barrel
   are needed. Hand those exact paths and registration details to example
   generation; do not create an empty import or code a preview at this stage.
   Mark that preview as listing-only; it must never be rendered in the MDX body
   or substituted for the page's simple primary example.
8. Before dependent validation, prepare missing/stale workspace outputs with
   the docs package's existing prerequisite scripts, as described in the render
   specification. Record their inputs/results for reuse; do not race output
   generation against validation. Run `pnpm --filter docs validate:structure`.
   Do not bypass strict validation,
   add missing-page allowlist entries, or hand-edit generated search data.

## Outputs

Return status, identity map, changed files, exact validation result, verified
resources, missing inputs, and the preview/export handoff. Record that this is
an integrated **draft scaffold**, not completed documentation. On a known-run
resume, preserve generated MDX and verify integration without replacing it.
