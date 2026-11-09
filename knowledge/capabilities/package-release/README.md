# Package Release

Status: active for release preparation and preflight of the HPE icon packages.
Candidate and publisher workflows are implemented. Per NPM's staged-publishing setup,
trusted publishing stages candidates; verify the publisher identity and GitHub protections
for each package before use.

## Purpose

Coordinate safe, auditable releases of `@hpe-design/icons-grommet` and
`@hpe-design/icons-svg`. This capability is the canonical source for release stages,
validation, evidence, and approval gates. The packages are released independently.

## Entry Points

- `@package-release-orchestrator <package-name> <version> <version-pr-number>`
- `/release-hpe-icons <package-name> <version> <version-pr-number>` from `.github/prompts/`

Read the [orchestrator](package-release-orchestrator.agent.md) and
[manifest](manifest.yaml) as the release contract.

## Current Release Contract

- Versioning remains a package-specific `package.json` version update in a reviewed PR;
  do not add Changesets as part of this process.
- The version PR must be approved and merged before a release candidate is prepared.
- The candidate workflow requires the merged version PR number and verifies that the PR
  changed exactly one file: the selected package's `package.json`. It compares the base and
  merged manifests and rejects any change other than the `version` field. Do not run
  `pnpm install` for a version-only update.
- Confirm the merged version PR's required GitHub checks are successful before preparing a
  candidate. The candidate workflow independently runs the selected package's build,
  Grommet lint where applicable, and packed-artifact checks; artifact upload occurs only if
  those checks pass.
- Build each selected package and inspect its packed artifact. Current package manifests
  include `dist` and `package.json`; the package root is the packaging context. Do not
  publish from a directory or artifact other than the one verified for that package.
- After validating the candidate artifact, the protected publisher creates and pushes the
  annotated `<package-name>@<version>` tag at the candidate commit. If the tag already
  exists, it must point to that same commit; a conflicting tag stops the workflow. The
  GitHub release draft is then created against that version tag.
- The publisher uses `npm stage publish` through trusted publishing; it must not have
  permission to run direct `npm publish`. NPM staging is not public publication.
- Every release requires a human to review and approve the staged package in NPM with
  2FA. Trusted publishing only stages the candidate; it cannot approve the stage.
- The GitHub Actions publisher follows the candidate/publisher separation used for design
  tokens. Configure a protected GitHub Environment named `npm-production` with required
  reviewers and attach the NPM staging job to it. This is a pre-stage approval; NPM's own
  staged-package 2FA approval remains required before public release.
- GitHub release notes and the Slack announcement remain human-reviewed. Do not post the
  announcement automatically.
- The candidate workflow `.github/workflows/hpe-icons-release-candidate.yml` builds and
  uploads a package artifact after its package checks pass. It does not
  publish. The publisher `.github/workflows/hpe-icons-publish.yml` validates that exact
  candidate, creates or reuses a draft GitHub release, then waits for the `npm-production`
  environment approval before staging the artifact. The first run reports `staged`, not
  `published`. A maintainer approves the staged package in NPM with 2FA, then reruns the
  same publisher inputs to verify the live registry tarball against the candidate. Before
  staging, the publisher unpacks and repacks the immutable candidate and requires the
  repacked tarball hash to match. It runs `npm stage publish` from the extracted package
  directory and fails the job if that command fails. Workflow scripts use Bash with
  `pipefail`, and archive checks avoid early-closing pipelines, so failed commands cannot
  be hidden behind successful downstream commands. The GitHub release remains a draft for
  separate human review and publication.
- A candidate built before the workflow records `npm_cli_version: 11.15.0` and
  `version_pr_number` does not meet the publisher's artifact contract. Rebuild the
  candidate from updated `master` before retrying the publisher. A publisher run is
  considered staged only if `npm stage publish` succeeds; a green job summary alone is not
  staging evidence.

## Stages

1. `intake` — identify one supported package, an explicitly requested target version, and
   the current branch/worktree state.
2. `version-pr` — prepare or review a package.json-only version update; peer approval and
   merge are required before continuing.
3. `preflight` — build and inspect the package artifact; verify package metadata and
   release-tag/version consistency.
4. `ci-gate` — confirm required GitHub checks passed for the merged version PR.
5. `release-approval` — present candidate evidence and release notes for human review.
6. `publication-blocked` — stop if environment protection, NPM trust, CI evidence,
   or artifact binding is missing.
7. `npm-staged` — the candidate artifact is staged and awaits NPM maintainer review/2FA.
8. `npm-approved` — NPM approval is complete and the public registry tarball matches the candidate.
9. `post-release` — after an authorized publication, verify the GitHub release and NPM
   registry version, then prepare a Slack announcement draft.

## Human Approval Gates

- Peer review and merge of the package version PR.
- Confirmation that required GitHub checks passed for the merged version PR and candidate
  build/preflight succeeded.
- Review and approval of GitHub release title and notes.
- Explicit NPM staged-package review and 2FA approval for every release before it becomes
  public. The GitHub environment approval is an additional pre-stage gate.
- Human review and posting of the Slack announcement.

## Safety Boundaries

- Never create or push tags from Copilot or a developer's local workflow. The protected
  publisher creates/verifies the version tag only after candidate artifact validation.
- Do not merge PRs, publish a GitHub release, or run direct `npm publish` from Copilot or
  a developer's local workflow.
- Never treat a successful build, a trusted-publisher configuration, or an earlier
  approval as approval for the current NPM publication.
- Stop on a dirty worktree, version mismatch, missing CI evidence, conflicting tag or
  registry version, failed validation, or missing approval.
- Do not infer required GitHub checks or NPM/GitHub trusted-publisher configuration from
  repository files. Verify the merged PR checks and record external publisher setup as a
  blocker when needed.

## NPM Trusted Publishing Verification

Verify each NPM package's trusted-publisher entry in its NPM package settings:

1. In each NPM package, add a GitHub Actions publisher for `grommet/hpe-design-system`.
   Use filename `hpe-icons-publish.yml`, not the workflow path.
2. Set its GitHub Environment to the exact protected environment used by the publisher,
   recommended as `npm-production`.
3. Use a GitHub-hosted runner with Node.js 22.14 or newer.
4. Install npm CLI 11.15.0 or newer; Node 24.15.0 currently bundles an older npm.
5. Grant only job-scoped `id-token: write` and allow `npm stage publish` only.
6. Require independent environment reviewers, prevent self-review, and restrict deployment.
7. Require NPM 2FA for approvers. They approve through NPM's Staged Packages page;
   `npm stage approve` requires interactive authentication and is unavailable to OIDC.
8. Complete the first staged publish within two days of creating a trusted publisher,
   or NPM expires it.
9. After stage and approval are verified, review token access and revoke unused automation
   tokens. Keep fallback tokens until the trusted path is proven.

After the workflow reports `staged`, review the package in NPM's Staged Packages page and
approve it with 2FA. Do not rerun staging while that version is pending; staged versions
occupy the package's unique version slot. After approval, rerun the publisher with the same
candidate inputs. It compares the live tarball to the candidate and reports
`published-verified` without staging again. Then review/publish the GitHub draft and post
the Slack announcement manually.

Both package manifests now identify the canonical repository URL and their monorepo
directory. This must remain aligned with the NPM trusted-publisher repository identity.

Official setup and current requirements: [NPM trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Manifest

- `knowledge/capabilities/package-release/manifest.yaml`
