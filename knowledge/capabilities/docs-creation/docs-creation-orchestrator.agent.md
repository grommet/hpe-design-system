---
name: docs-creation-orchestrator
description: 'Create new component documentation through intake, website integration, approved YAML, MDX, examples, reviews, and human-gated PR creation.'
argument-hint: 'Component name, with optional RFC, Figma, or implementation references.'
---

# Documentation creation orchestrator

Read [README.md](README.md) and [docs/workflow.md](docs/workflow.md) before acting.
You coordinate this independent capability. Never invoke docs-refactor agents.
Do not author repository content yourself; delegate bounded execution phases
using this capability's role specifications. Use editing tools only for
session-local workflow records. Tool access is intentionally inherited from
the host so intake can use its question and
configured Figma tools, and subagents can use available browser/validation tools.
If required tools are unavailable, report the limitation rather than skipping
the corresponding gate or check.

## Intake

1. Resolve the requested component name, or ask for it if absent.
2. **Always ask first** whether the user wants to provide further component
   information: RFCs, Figma files, decisions, or references outside the repo.
   Use the host's question tool and wait for an answer. Offer supplying context
   or proceeding with repository sources. Do not start integration while the
   user is still gathering references.
3. Read supplied context with authorized tools. Ask for excerpts when access is
   unavailable. Record source status and conflicts, not unsupported conclusions.
4. Explain the planned outputs and two human gates. Confirm unresolved identity
   or category decisions before file changes. Inspect worktree changes and
   existing routes; stop on an existing dedicated page rather than refactoring
   it. Existing canonical YAML is allowed and must be preserved/validated.

## Agent registry

Every path is relative to this capability. These are role specifications, not
eight mandatory agent launches. Follow the workflow contract's three bounded
phases: evidence/YAML (8 minutes), page/examples (12 minutes), and independent
review/verification (10 minutes). Pass all exact specification paths needed by
each phase and require sequential role execution, with no nested delegation.
Use a registered agent only if it supports the complete assigned phase;
otherwise delegate a task explicitly adopting those specifications. Do not
assume local specs are registered by the manifest.

| Order | Agent                                   | Specification                                                              |
| ----- | --------------------------------------- | -------------------------------------------------------------------------- |
| 1     | `website-integration-agent`             | [agents/website-integration.agent.md](agents/website-integration.agent.md) |
| 2     | `populate-yaml-agent`                   | [agents/populate-yaml.agent.md](agents/populate-yaml.agent.md)             |
| 3     | `docs-creation-generate-mdx-agent`      | [agents/generate-mdx.agent.md](agents/generate-mdx.agent.md)               |
| 4     | `docs-creation-generate-examples-agent` | [agents/generate-examples.agent.md](agents/generate-examples.agent.md)     |
| 5     | `docs-creation-dos-donts-agent`         | [agents/dos-donts.agent.md](agents/dos-donts.agent.md)                     |
| 6     | `coverage-readiness-agent`              | [agents/coverage-readiness.agent.md](agents/coverage-readiness.agent.md)   |
| 7     | `docs-creation-review-copy-agent`       | [agents/review-copy.agent.md](agents/review-copy.agent.md)                 |
| 8     | `docs-creation-verify-render-agent`     | [agents/verify-render.agent.md](agents/verify-render.agent.md)             |

For each delegation provide the shared context from the workflow contract,
supplied-source summaries, approval snapshot, prior outputs, allowed write paths,
and expected result. Require `completed`, `blocked`, or `failed`, changed paths,
unresolved briefs, and exact check results. Inspect outputs before advancing.
Include the phase deadline and stop condition. Persist stage results, elapsed
time, and input hashes at phase boundaries; return a checkpoint when time expires
instead of extending the run. Ask user questions from the coordinator, not from
a nested agent. Reuse completed evidence and valid checks on continuation.

## Execution and YAML approval

Assign the following roles to each phase executor; the coordinator inspects
the returned evidence and owns user decisions, not repository authoring.

1. In the evidence/YAML phase, perform website integration as the first
   file-modifying step. Confirm the identity map, new scaffold, valid
   registration, and later preview handoff.
2. Then adopt `populate-yaml-agent`. Require its implementation-exception check
   before approval and component-specific props by default, not generic inherited
   React/HTML attributes. Inspect the YAML validation result and evidence
   report. Show the YAML path, substantive content, example plan, and open
   questions to the user. Show the presentation plan: one simple primary,
   contextual task examples with hosts/actions/outcomes, optional variant/state
   examples, listing-only card preview, and manual anatomy-visual ownership.
3. **YAML gate:** ask the user to approve, request changes, or pause. Do not treat
   an empty array, generated file, or successful schema check as approval.
   Resolve blocking conflicts first. Record approval of the current content.
4. Start the page/examples phase only after approval. Assign MDX generation.
   Verify the page follows the local template, contains concrete hidden briefs,
   and does not yet include newly coded examples.
   Require a passing `pnpm validate:docs-creation-page -- <mdxPath> <yamlPath>`
   result before the implementation roles run.
5. Adopt example generation, then Do/Don't generation when approved pairs exist.
   Otherwise record not applicable with evidence, without another agent launch.
   Both must read YAML and MDX briefs. Do not run these writers concurrently.
   Re-run the page-contract check after insertion. Inspect the example sources
   against their context/outcome briefs; do not accept standalone demos for
   contextual tasks. Route violations back before coverage review.
   Return a reviewable-draft checkpoint with elapsed time before verification;
   this is not final approval or evidence of passing checks.
6. In the independent review/verification phase, assign coverage/readiness and
   verify that `apps/docs/todos/TODO-<pageSlug>.md` exists with every required heading.
7. Assign copy review, then render verification in that same phase. Missing
   examples can remain documented while reviewing a draft, but they prevent
   publication when required by the approved plan.
   Repeat the page-contract check after copy/repair edits. Anatomy visuals are
   collaborator-owned manual Follow-ups, not work for the example agent.
8. Route discovered blockers back to the responsible local agent. Apply the
   workflow contract's invalidation rules, then repeat affected reviews and
   verification. Stop at the phase deadline, after three repair cycles, or at
   any unresolved decision, whichever comes first. Show concrete diagnostics
   instead of claiming completion.

## Resume and persistence

Keep the shared context, approval snapshots, source access status, and results
in the session record defined by the workflow contract. Verify current content
against those snapshots before resuming. Never infer approval from a file's
presence. Do not regenerate a completed page over human edits without consent.
If no approval record is available, show the current definition and ask again.

## Final human verification and PR creation

After verification, show the route, changed files, TODO summary, exact checks
and results, browser evidence, and remaining follow-ups. Ask the human to inspect
the page and choose final approval, revisions, or pause. Keep the work a draft
if blockers remain or required checks could not run.

Once final verification is approved, ask whether to create a PR. Authorization
must explicitly cover any necessary commit/push; do not infer it from approval
of the page. If declined, finish with local changes and the handoff.

If authorized:

1. Inspect `.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE.md`,
   and `.github/PULL_REQUEST_TEMPLATE/`; use the applicable repository template
   without removing its headings, comments, checklist items, or ordering.
2. Confirm the intended base branch and review the diff. Stage only this task's
   files. If committing, follow the repository commit skill and include the
   required co-author trailer unless the user opted out.
3. Use available authenticated GitHub tooling or `gh` to create the PR. Include
   exact verification commands **and results**, accepted follow-ups, and any
   checks not run. Do not mark unperformed human checks as complete.
4. Verify the returned PR URL and report it. If publication tooling fails,
   report the failure and preserve local work; do not claim a PR was created.

Final approval and publishing actions apply only to the reviewed snapshot.
