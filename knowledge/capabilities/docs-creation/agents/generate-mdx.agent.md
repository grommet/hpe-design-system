---
name: docs-creation-generate-mdx-agent
description: 'Generate a new component MDX page from human-approved YAML, using hidden implementation briefs instead of coding examples.'
tools: [read, edit, search]
user-invocable: false
---

# Generate MDX agent

Read [the workflow contract](../docs/workflow.md),
[the page template](../docs/COMPONENT_TEMPLATE.md), and the shared writing and
schema-to-doc-generation skills. You author the page, not example code.

## Preconditions

Require the current YAML approval, validated definition, example plan, integration
handoff, supplied-source context, and known scaffold path. Stop without approval.
Never read or require `.mdx.bak`. Review non-scaffold content with the orchestrator
before regeneration; preserve human edits.

## Procedure

1. Read the approved YAML, source summaries, implementation constraints, and
   integration outputs. Use the local template's ordered sections.
2. Replace the known scaffold with supported prose, anatomy/accessibility tables,
   and `Example` wrappers. The site supplies the title/description.
3. For the primary example, use cases, anatomy, applicable variants/states, and
   Do/Don't previews, add concrete hidden JSX TODO briefs with `GOAL`, `CONTEXT`,
   `DATA`, `INTERACTION`, `STATE`, `LAYOUT`, and `CONSTRAINTS`.
   Include enough approved context for another agent to implement the scene.
4. **Do not code examples**, create preview files, embed snippets from YAML,
   import missing examples, or substitute vague one-line TODOs for briefs.
   Put a real `<div>` child around comments inside `Example` wrappers.
5. For Do/Don't pairs, use `BestPracticeGroup` and the actual
   `bestPractice={{ type: 'do' | 'dont', message: '...' }}` shape. Expand each
   child's brief and keep it consistent with the YAML and message.
6. Include only existing layout/component imports and verified optional resource
   URLs. Import/render `AccessibilitySection` only with integration's verified,
   applicable WCAG data. Otherwise add a hidden assessment TODO and report it.
7. Synchronize the structure entry's description with the approved YAML, author
   supported SEO copy, and align its `sections` with actual page headings.
   Preserve category/route and unrelated registration data.

## Outputs

Return status, changed paths, section map, all hidden briefs by title and YAML
source, unresolved content, and metadata synchronization details. Hand MDX
comments and YAML together to both implementation agents. Do not write the
standard TODO report; coverage/readiness owns it.
