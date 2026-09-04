Goal: I would like to automate the release process for hpe-design-tokens, including pre-release checks, Github release, NPM release, and post-release steps.

I think this should be added as a [capability in the DS knowledge base](../../knowledge/capabilities/design-tokens-publishing) and a agent discoverable instruction, skill, or prompt in `.github` which routes to the canonical release capability in the knowledge base. Please create a plan to evaluate which skills, tools, instructions, agents, and processes are needed to fully automate the release process.

Review the current manual release process and identify areas that can be automated and where human approval is required. There may be substeps that should be their skill, tool, or capability.

## Current manual release process

### Pre-release

1. Pull the latest changes for hpe-design-system - make sure it is all cleaned up without any local changes on your master branch.
   - `git pull` - make sure you are up to date with the master branch.
1. Update CHANGELOG.md with relevant changes since the last release.
   - This is not automated at this time. Please create a recommended approach to automate this step.
   - One possible approach is to use a tool like [changesets](https://github.com/changesets/changesets) to automatically generate and update the changelog based on commit messages or pull requests.
   - `yarn changeset version` - This takes any [changesets](https://github.com/changesets/changesets) and:
     - Consolidates the changes into CHANGELOG.md
     - Bumps the hpe-design-tokens `package.json` version to the appropriate semantic version value based on the changesets.
1. `git checkout -b update-version-[X.Y.Z]` - Switch to a branch (e.g. update-version-[X.Y.Z]).
1. `git add . && git commit -m "Update version"` - Commit the changes.
1. `git push --set-upstream origin update-version-[X.Y.Z]` - Push the changes.
1. Create a PR and have one other developer review the CHANGELOG and version number change.
   - PR description: `yarn changeset version`
1. Merge the PR
   - :warning: check that ["Update design-tokens-stable" Github action](https://github.com/grommet/hpe-design-system/actions/workflows/update-design-tokens-stable.yml) passes before proceeding.
   - Only proceed with the Github release if the action passes successfully.

### Github release

1. Return to `master` branch and `git pull`.
1. Create Github tag `git tag hpe-design-tokens@X.Y.Z` (replace X.Y.Z with the appropriate version).
1. Push the tag to Github `git push origin hpe-design-tokens@X.Y.Z`
1. In Github, [draft a new release](https://github.com/grommet/hpe-design-system/releases). 1.
   1. Select tag and the corresponding branch for the release.
   1. Title the release `hpe-design-tokens@X.Y.Z`.
   1. Paste the content for this release from [CHANGELOG.md](https://github.com/grommet/hpe-design-system/blob/master/design-tokens/CHANGELOG.md?plain=1) into the release notes.
   1. Hit publish 👏 . (NOTE: This will only publish the release on Github. See next steps for publishing the NPM package).

### NPM release

1. Return to local clone of hpe-design-system.
1. `git checkout design-tokens-stable` - Go to the stable branch.
1. `git pull` - Make sure you have the latest.
   - Inspect the `dist/` content to make sure the expected changes are coming through.
1. 🚀 Publish the package! `npm publish`

## Post release

1. Check that the [version has been registered by NPM](https://www.npmjs.com/package/hpe-design-tokens).
1. Draft a release announcement to be posted in #hpe-design-system Slack channel.

Are my goals clear? Do you have any questions or need further clarification?
