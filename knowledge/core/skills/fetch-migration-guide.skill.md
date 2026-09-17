---
name: fetch-migration-guide
description: Retrieves migration documentation for an npm package between two major versions. Given a package name and a from/to version pair, locates and fetches the most authoritative source of breaking change information available.
inputs:
  - Package name (e.g. vite, eslint, typescript)
  - Current major version (integer)
  - Target major version (integer)
outputs:
  - Migration guide content (markdown or structured text)
  - Source URL used
  - Coverage assessment (does it address the specific major version gap?)
version: 1.0.0
---

## Purpose

Locate and return the most authoritative migration documentation for a given package's major version upgrade so that the `major-upgrade-planner` agent can identify required changes without guessing.

## Inputs

- **Package name**: the exact npm package name (e.g. `vite`, `@eslint/js`, `typescript`)
- **Current major**: integer of the installed major version
- **Target major**: integer of the target major version

## Outputs

- **Migration guide content**: the relevant sections of the migration doc
- **Source URL**: the URL from which content was fetched
- **Coverage assessment**: confirmation that the doc covers the specific major gap, or a note if coverage is partial

## Procedure

1. **Construct candidate URLs** to check, in priority order:
   1. Official docs migration page (e.g. `https://vitejs.dev/guide/migration.html`, `https://eslint.org/docs/latest/use/migrating-to-*`)
   2. GitHub releases page for the target major: `https://github.com/<org>/<repo>/releases?q=v<target-major>&expanded=true`
   3. GitHub CHANGELOG.md in the default branch: `https://raw.githubusercontent.com/<org>/<repo>/main/CHANGELOG.md`
   4. npm package page: `https://www.npmjs.com/package/<pkg>?activeTab=versions`

2. **Look up the GitHub org/repo** for the package by fetching `https://registry.npmjs.org/<pkg>` and reading the `repository.url` field.

3. **Fetch each candidate URL** in priority order until useful content is found. "Useful" means it mentions the target major version and includes at least one breaking change or migration step.

4. **Extract the relevant section**: from the fetched content, isolate the content specific to the major version range being upgraded (discard unrelated version history).

5. **Return** the extracted content, the source URL, and a one-sentence coverage assessment.

## Failure Handling

- If no candidate URL returns useful content, return the npm registry `readme` field as a fallback and mark coverage as "partial — no dedicated migration guide found".
- If network fetch fails for all URLs, return an empty result with the list of attempted URLs so the planner agent can ask the user to provide the guide manually.
- Never fabricate migration steps — if uncertain, mark as "unverified" and surface the raw content.

## Reuse Constraints

- This skill is read-only. It fetches and returns content; it does not apply any changes.
- May be called multiple times in a single upgrade session (once per package).
- Content freshness is not guaranteed — always note the fetch date in the returned output.
