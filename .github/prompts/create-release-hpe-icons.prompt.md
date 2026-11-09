---
description: 'Evaluate and plan approval-gated release automation for the HPE icon packages.'
name: 'Plan HPE Icon Releases'
agent: agent
tools: [read, search]
argument-hint: 'Package targets (default: both) and any release-automation questions'
---

# Plan HPE Icon Release Automation

## Mission

Evaluate the current release process for `@hpe-design/icons-grommet` and
`@hpe-design/icons-svg`. Produce a repository-grounded, phased plan for automating
their releases while preserving required human approvals. Treat the two packages as
independent release targets.

This prompt is for research and planning only. Do not edit files, create branches or
tags, open or merge pull requests, configure NPM, publish packages or GitHub releases,
or post Slack messages.

## Scope & Preconditions

- Use `knowledge/capabilities/package-release` as the canonical release policy.
- Evaluate remaining automation gaps and capability scope.
- A discoverable `.github` prompt, instruction, agent, or skill should route to that
  canonical capability rather than duplicate its policy.
- Preserve the current versioning process for this evaluation: a reviewed PR that only
  updates the selected package's `package.json` version, with no Changesets updates.
- Verify required GitHub checks on the merged version PR; do not infer them.
- NPM publication always requires explicit human approval for every release.
- Automation may prepare and execute the publish step only after approval.
- Trusted publishing does not remove this approval gate.
- Assess NPM trusted publishing for each package. Distinguish repository changes from
  one-time NPM or GitHub organization configuration that must be verified externally.
- Treat the current release notes and workflow below as the process to evaluate, not as
  a requirement that every manual action remain unchanged.
- Follow the repository's [prompt authoring guidelines](../instructions/prompts.instructions.md)
  and inspect the [package-release capability](../../knowledge/capabilities/package-release/README.md)
  before recommending changes.

## Inputs

- Package targets: `${input:packageTargets:both}`. Accept `both`, `@hpe-design/icons-grommet`,
  or `@hpe-design/icons-svg`. Evaluate each selected package independently and call out
  differences. If the value is missing or invalid, ask the user to select a target before
  continuing.
- Additional questions or constraints: `${input:releaseQuestions:none}`.

## Workflow

1. Inspect the selected packages' manifests, build configuration, scripts, existing
   release/versioning conventions, and the files actually included in their package
   artifacts. Do not assume the publish directory is the package root or `dist`; report
   what repository evidence establishes and what still needs a pack/build check.
2. Inspect the package-release capability and its manifest/orchestrator, the related
   knowledge-base indexes and validators, and the existing design-token release prompt
   and workflows. Identify reusable conventions and gaps without treating token-specific
   behavior as automatically applicable to the icon packages.
3. Review the manual process below and map every stage—pre-release, version PR, CI gate,
   GitHub tag/release, NPM build/publication, and post-release—to its current owner and
   automation opportunity.
4. Evaluate which work belongs in the canonical capability and which, if any, merits a
   separate reusable skill, agent, instruction, prompt, script, or protected GitHub
   Actions workflow. Explain the boundary and avoid duplicating policy across artifacts.
5. Assess NPM trusted publishing separately for each package. Identify the expected
   repository/workflow/branch/environment trust configuration, minimal workflow
   permissions, provenance considerations, prerequisites, and facts that require
   verification in NPM or GitHub settings. Consult authoritative current documentation
   when available; otherwise label those details unverified.
6. Define explicit human approval gates, required evidence, failure handling, safe
   reruns, and package/version/tag conflict checks. Require a separate, explicit human
   approval for NPM publication on every release, even when a protected workflow and
   trusted publishing perform the actual publish. Do not bypass the reviewed version PR,
   required GitHub checks, or per-release NPM approval.
7. Produce a phased implementation roadmap with dependencies and validation criteria.
   Separate verified findings, recommendations, assumptions, and open questions.

### Manual process to evaluate

1. Start from a clean, up-to-date `master` branch and create a version-update branch.
2. Update only the selected package's `package.json` version, then commit and push the
   branch.
3. Open a version-update PR for peer review and merge it after approval.
4. Confirm all required GitHub checks pass before starting release publication.
5. From the merged version on `master`, create and push a package-scoped tag using the
   convention `<package-name>@<version>`; draft a GitHub release with a human-reviewed
   title and notes.
6. Build and publish the selected public NPM package. Determine the correct publish
   directory and artifact contents from each package's build and packaging behavior;
   do not assume `dist` is either required or incorrect.
7. Verify the published NPM version and draft an announcement for the
   `#hpe-design-system` Slack channel. Posting remains a human action unless a separately
   approved integration is recommended.

## Output Expectations

Return the evaluation in the chat using these sections:

1. **Executive summary** — recommended automation architecture and key risks.
2. **Verified current state** — package-specific findings with workspace-relative file
   links; clearly label anything that could not be verified.
3. **Step-by-step automation assessment** — a table with manual step, current state,
   proposed automation/owner, evidence or validation, human approval, and failure/retry
   behavior.
4. **Artifact recommendations** — proposed capability, prompt/instruction/skill/agent,
   workflow, and script changes; explain what should not be created and why.
5. **Trusted publishing assessment** — separate entries for each package, prerequisites,
   configuration to verify, security controls, and unresolved external setup.
6. **Approval and safety gates** — identify which decisions/actions require human approval
   and what evidence should be presented at each gate.
7. **Phased implementation roadmap** — ordered work items, dependencies, and acceptance
   criteria.
8. **Open questions** — only questions that cannot be answered from repository evidence
   or the stated requirements.

Do not claim that a setting, CI check, workflow, or trusted publisher exists unless it was
verified. Do not make edits or perform release actions as part of this evaluation.

## Quality Assurance

- Cover both packages independently when `packageTargets` is `both`.
- Preserve the package.json-only version PR and verify its required GitHub checks.
- Require explicit human approval for every NPM publication.
- Treat trusted publishing as authentication, not authorization.
- Do not assume where the package should be published from; require artifact/build
  evidence for that recommendation.
- Separate repository facts from external NPM, GitHub, and CI configuration.
- Include approval gates, secrets/permissions boundaries, failure cases, and safe reruns.
- Recommend a skill or tool only when it has a reusable responsibility distinct from the
  canonical capability and protected release workflow.
- Ensure the roadmap routes discoverable `.github` guidance to the canonical capability
  and does not duplicate its release policy.
