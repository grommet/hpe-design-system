---
description: 'Prepare and validate an HPE icon package release without publishing it.'
name: 'Release HPE Icons'
agent: agent
tools: [read, search, execute]
argument-hint: 'Package name, exact target version, and merged version PR number'
---

# Release HPE Icons

## Mission

Prepare and validate release evidence for one HPE icon package by following the canonical
[package-release capability](../../knowledge/capabilities/package-release/README.md) and
its [orchestrator](../../knowledge/capabilities/package-release/package-release-orchestrator.agent.md).

## Scope & Preconditions

- Supported packages are `@hpe-design/icons-grommet` and `@hpe-design/icons-svg`.
- Releases are independent. Require one package name, exact target version, and merged
  version PR number.
- This prompt does not authorize commits, pushes, PR merges, tag creation, GitHub release
  publication, NPM publication, or Slack posting.
- Every staged NPM package requires human review and NPM 2FA approval before it becomes
  public. Trusted publishing cannot approve a stage.
- The protected publisher exists, but external GitHub Environment and NPM trusted-publisher
  settings must be verified before dispatch. Never direct the user to publish from a local
  machine.

## Inputs

- Release request: `${input:releaseRequest:package, version, and merged version PR number}`.
- If any required value is missing or invalid, ask for it and stop before release actions.

## Workflow

1. Read and follow `knowledge/capabilities/package-release/README.md`, its manifest, and
   `package-release-orchestrator.agent.md`.
2. Identify the package and requested version, inspect the worktree, and determine the
   current release stage.
3. Run the package preflight. Stop on failed builds, lint, artifact or GitHub checks,
   conflicts, or missing approvals.
4. Present release evidence and the next required human approval. Keep the version PR,
   GitHub checks, GitHub release notes, NPM stage approval, and Slack announcement gates
   distinct.
5. Stop publication until `npm-production` reviewers and both NPM trusted publishers are verified.

## Output Expectations

Report the release stage, package/version, worktree and commit state, checks and evidence,
human approvals required, blockers, and the smallest safe next action. Do not claim a
release is published without GitHub and NPM evidence.

## Quality Assurance

- Use the canonical capability as the source of truth; do not duplicate its procedure.
- Preserve the package.json-only version PR and verify its required GitHub checks.
- Require explicit human approval for every NPM publication.
- Do not publish, create tags, or post announcements from this prompt.
