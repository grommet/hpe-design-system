# hpe-design-tokens Release Testing

This procedure is for reviewing the release automation changes without publishing to NPM or
creating a production GitHub release. Complete the candidate and negative-path tests before
performing any real publication test.

## Test Scope

The release automation uses two workflows:

- `design-tokens-release.yml` creates a credential-free candidate artifact.
- `design-tokens-publish.yml` publishes a reviewed candidate from the default branch.

The release process also includes the Changesets check, release PR, and preflight workflows.
The publisher requires a successful candidate run ID, exact package version, exact commit SHA,
and a successful stable synchronization for that commit.

## 1. Local Validation

From the repository root, run:

```bash
pnpm install --frozen-lockfile
pnpm validate:capability-manifests
pnpm validate:knowledge-structure
pnpm validate:design-tokens-changeset
pnpm --filter hpe-design-tokens release:preflight
pnpm --filter hpe-design-tokens release:validate
pnpm --filter hpe-design-tokens release:pack
```

Expected results:

- Capability manifests and knowledge structure validate successfully.
- The package builds successfully.
- Unit, contract, and parity tests pass.
- Generated package exports and package metadata are valid.
- One candidate tarball is created under `packages/hpe-design-tokens/release-artifacts/`.
- The tarball contains the allowlisted runtime artifacts and documentation only.
- The tarball does not contain `.env`, `.tmp`, source files, tests, tokens, or contract fixtures.

Remove the temporary artifact after inspection:

```bash
rm -rf packages/hpe-design-tokens/release-artifacts
```

## 2. Changeset Enforcement

The Changeset check requires a Changeset when token values or contracts change. For package
implementation changes, it builds the pull request merge base and candidate revisions and
requires a Changeset only when their published `dist` artifacts differ. Documentation, tests,
and release-automation-only changes should not require one.

The validator should pass for this release-automation PR when no token source, build, or contract
files are changed:

```bash
pnpm validate:design-tokens-changeset --base=origin/master --head=HEAD
```

To test the failure path safely, use a temporary worktree:

```bash
git worktree add /tmp/hpe-design-tokens-changeset-test HEAD
cd /tmp/hpe-design-tokens-changeset-test
mkdir -p packages/hpe-design-tokens/tokens/test
printf '{"test": {"value": "1px"}}\n' > packages/hpe-design-tokens/tokens/test/changeset-check.json
git add packages/hpe-design-tokens/tokens/test/changeset-check.json
git commit -m "test: verify changeset enforcement"
node scripts/validate-design-tokens-changeset.mjs --base=HEAD^ --head=HEAD
```

Expected result: the command fails and reports that the token change requires a Changeset naming
`hpe-design-tokens`.

For the success path, add a temporary `.changeset/test-release-validation.md` containing:

```md
---
'hpe-design-tokens': patch
---

Test Changeset for release validation.
```

Rerun the validator. Expected result: it passes. Remove the temporary worktree when finished:

```bash
cd -
git worktree remove /tmp/hpe-design-tokens-changeset-test
```

## 3. Candidate Workflow Smoke Test

After the workflows are available on the default branch, run `Release hpe-design-tokens` from
the GitHub Actions tab using:

- `ref`: an approved immutable commit SHA.
- `version`: the exact version in `packages/hpe-design-tokens/package.json`.

The candidate workflow is `.github/workflows/design-tokens-release.yml`.

Expected results:

- The requested commit is checked out.
- Release preflight and package validation pass.
- One immutable candidate artifact is uploaded.
- No NPM secret is accessed.
- No NPM package is published.
- No GitHub tag or release is created.

Record the successful workflow run ID and the checked-out commit SHA from the candidate
`release-metadata.json` artifact. The publisher workflow needs both values, along with the exact
package version. The workflow run's GitHub `head_sha` may reflect the dispatch ref (`master`);
the artifact metadata is the authoritative identity of the code actually packaged.

You can also dispatch the candidate workflow with GitHub CLI:

```bash
gh workflow run design-tokens-release.yml \
  --ref master \
  -f ref=<APPROVED_COMMIT_SHA> \
  -f version=<X.Y.Z>
```

Then find the run:

```bash
gh run list --workflow design-tokens-release.yml --limit 5
```

## 4. Stable Synchronization Gate

Before testing publication, confirm that `Update design-tokens-stable` completed successfully
for the exact candidate commit SHA. The publisher checks this independently and must reject a
candidate when:

- No successful stable-sync run exists.
- The stable-sync run belongs to another commit.
- The supplied candidate SHA differs from the successful candidate run SHA.

## 5. Publisher Negative Tests

The publisher workflow is `.github/workflows/design-tokens-publish.yml`. It must be dispatched
from the default branch.

Before any real publication, test its validation gates with invalid inputs where possible. The
workflow must fail before publication when given:

- A nonexistent candidate run ID.
- A candidate run from the wrong workflow.
- An unsuccessful candidate run.
- A candidate run from a non-default branch.
- A mismatched commit SHA.
- A mismatched package version.
- A candidate commit without successful stable synchronization.

For each failure, verify that the workflow does not publish to NPM or create/publish a GitHub
release. The NPM token must only be used after candidate and stable-sync validation succeeds.

## 6. Real Publication Test

Do not perform this step as ordinary PR review. It requires maintainer approval and a configured
repository-level `NPM_TOKEN` with permission to publish `hpe-design-tokens`.

After the candidate workflow succeeds:

1. Have a second maintainer review the candidate logs, version, changelog, tarball, tests, stable
   synchronization, and commit SHA.
2. Dispatch `Publish hpe-design-tokens` from the default branch with:
   - `candidate_run_id`: the successful candidate workflow run ID.
   - `version`: the candidate package version.
   - `commit_sha`: the exact candidate SHA.
3. Verify the NPM publication, clean-consumer install, GitHub release, release evidence artifact,
   Slack announcement draft, and Actions job summary.

Expected results:

- The exact candidate tarball is published with the `latest` tag and provenance.
- GitHub release notes and Slack highlights come from the changelog section inside the immutable
  candidate tarball, and publication fails when that section is missing or empty.
- The NPM registry exposes the requested version.
- The SHA-256 checksum of the registry tarball matches the approved candidate tarball.
- The published tarball installs in a clean consumer and can be imported.
- The GitHub release targets the candidate SHA and contains the correct changelog section.
- Release evidence includes the candidate run, commit SHA, stable-sync result, and release URLs.
- The Slack announcement is drafted but not posted automatically.

## 7. Rerun and Recovery Testing

To test partial-release recovery, rerun the publisher with the same candidate run ID, version,
and commit SHA after a draft release exists.

Expected results:

- A matching draft GitHub release is reused.
- A published or mismatched release is rejected.
- An already-registered NPM version is verified rather than republished.
- Duplicate tags, releases, and package versions are not created.

## Review Evidence

Record the following in the PR review or test notes:

- Local validation results.
- Changeset enforcement pass and failure results.
- Candidate workflow run URL and commit SHA.
- Candidate artifact name and inspection result.
- Stable-sync workflow run URL for the exact SHA.
- Publisher negative-test results.
- For an approved real release, NPM version, GitHub release URL, clean-consumer result, job
  summary, and Slack draft artifact.

A successful PR review validates the candidate workflow and negative paths. NPM and GitHub
publication remain a separate, explicitly approved operational test.
