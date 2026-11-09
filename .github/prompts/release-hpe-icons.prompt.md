---
description: 'Prepare and validate an HPE icon package release without publishing it.'
name: 'Release HPE Icons'
agent: agent
tools: [read, search, execute]
argument-hint: 'Package name and exact target version'
---

# Release HPE Icons

## Mission

Prepare and validate release evidence for one HPE icon package by following the canonical
[package-release capability](../../knowledge/capabilities/package-release/README.md) and
its [orchestrator](../../knowledge/capabilities/package-release/package-release-orchestrator.agent.md).

## Scope & Preconditions

- Supported packages are `@hpe-design/icons-grommet` and `@hpe-design/icons-svg`.
- Releases are independent. Require one package name and an exact target version.
- This prompt does not authorize commits, pushes, PR merges, tag creation, GitHub release
  publication, NPM publication, or Slack posting.
- NPM publication always requires explicit human approval for this exact package and
  version, on every release. Trusted publishing does not remove the approval requirement.
- The protected publisher exists, but external GitHub Environment and NPM trusted-publisher
  settings must be verified before dispatch. Never direct the user to publish from a local
  machine.

## Inputs

- Release request: `${input:releaseRequest:package name and exact target version}`.
- If the package or exact version is missing or invalid, ask for the missing value and
  stop before changing files or running release actions.

## Workflow

1. Read and follow `knowledge/capabilities/package-release/README.md`, its manifest, and
   `package-release-orchestrator.agent.md`.
2. Identify the package and requested version, inspect the worktree, and determine the
   current release stage.
3. Run only the package-specific preflight checks required by the capability. Stop on
   failed builds, lint, artifact validation, CircleCI checks, conflicts, or missing
   approvals.
4. Present release evidence and the next required human approval. Keep the version PR,
   CircleCI, GitHub release notes, NPM publication, and Slack announcement gates distinct.
5. Stop publication until `npm-production` reviewers and both NPM trusted publishers are verified.

## Output Expectations

Report the release stage, package/version, worktree and commit state, checks and evidence,
human approvals required, blockers, and the smallest safe next action. Do not claim a
release is published without GitHub and NPM evidence.

## Quality Assurance

- Use the canonical capability as the source of truth; do not duplicate its procedure.
- Preserve the package.json-only version PR and CircleCI as the authoritative CI gate.
- Require explicit human approval for every NPM publication.
- Do not publish, create tags, or post announcements from this prompt.
