# @hpe-design/knowledge-agent

Offline HPE Design System context for React/Grommet projects. Query component
and pattern definitions, foundation rules, glossary terms, examples, templates,
and selected implementation standards through a CLI or typed ESM library.

This is a context generator, not an LLM service or autonomous implementation
agent. React/Grommet is the implementation source of truth. Other framework
targets return conceptual guidance, not validated implementations.

**Status:** local packaging, external-consumer validation, Changeset enforcement,
and a non-publishing candidate workflow are implemented. The package remains
private. Registry choice, content approval, publisher setup, and the two-team
pilot are still required before wider distribution.

## Architecture and direction

The package separates design-system knowledge and retrieval from the surfaces
that expose them:

```text
Bundled knowledge snapshot
           |
Shared retrieval and formatting core
           |
           +-- Typed library API   [implemented]
           +-- CLI adapter         [implemented]
           +-- Local MCP adapter   [planned, after pilot]
           `-- HTTP API adapter    [exploratory, deferred]
```

The CLI and library already share retrieval and formatting logic. Future
adapters should use the public typed library rather than introduce separate
loaders, matching rules, or manually maintained knowledge formats. Live-source
authoring remains an explicit contributor workflow, not an installed-runtime
fallback.

The CLI/library are the initial consumption surfaces. MCP provides a planned
agent-native interface over the same capabilities; an HTTP API remains an
option only if demonstrated centralized-service needs justify its operational
and access-control requirements. Neither requires replacing offline package
consumption.

## Try the package in another project

Until registry distribution is approved, a maintainer can build a local
tarball from this repository:

```sh
pnpm --dir packages/knowledge-agent pack --out /absolute/path/knowledge-agent.tgz
```

Create the destination directory first. Packing automatically runs the package's
`prepack` build, so a separate build command is unnecessary. Use `--dir` here
rather than `--filter` to avoid recursive execution.

In the consumer project, install that tarball as a pinned dependency:

```sh
npm install /absolute/path/knowledge-agent.tgz
npx --no-install hpe-design-agent "Build a login form"
npx --no-install hpe-design-agent "Create an app shell" --json
npx --no-install hpe-design-agent --checklist
npx --no-install hpe-design-agent --rule color-names-its-target
```

Installation may require network access for dependencies. Queries require no
network connection, API key, development tooling, or design-system checkout.
The package does not read the consumer's `.github` directory.

Node.js 22 and 24 on Linux, macOS, and Windows are the proposed compatibility
matrix exercised by packed-consumer CI. Do not treat an unexecuted CI matrix as
a completed compatibility certification. The initial API is ESM-only.

## Library

```ts
import {
  searchDesignSystem,
  generateSystemPrompt,
  type QueryResult,
} from '@hpe-design/knowledge-agent';

const result: QueryResult = searchDesignSystem('Build a login form');
console.log(result.patterns.map(pattern => pattern.id));
console.log(result.knowledge.version, result.knowledge.contentDigest);

const context = generateSystemPrompt('Create an app shell with navigation');
```

Both functions default to `react`. Accepted framework targets are `react`,
`vue`, `angular`, `web-components`, and `agnostic`.

`searchDesignSystem` returns resolved components, patterns, selected
instructions, foundation rules, glossary terms, logical source IDs,
query/framework status, diagnostics, and
version metadata. `--json` emits the same response shape. A non-React result
includes `frameworkStatus: "conceptual"` and a framework diagnostic; its raw
definitions still describe the React/Grommet source, not a port to that target.

`generateSystemPrompt` formats the shared retrieval result as ANSI-free text.
Its optional third argument selects foundation-rule detail: `checklist`
(default), `full`, or `none`. The CLI provides the same text control through
`--rules <detail>`. Structured JSON results always include foundations and
glossary data; `--rules` changes text formatting only.

Non-React context omits React import claims and TSX pattern templates.
Importing the library does not parse arguments, print output, or exit.

Use `--checklist` for all foundation rules or `--rule <id>` for one rule with
rationale, examples, and related glossary terms. Both work without a query;
`--checklist` also accepts a query but prints only the checklist. These two
commands are mutually exclusive and text-only; combining either with `--json`
fails explicitly without JSON stdout.

| Condition                                       | Behavior                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| No matching definitions                         | `status: "no-match"`; CLI exits `0`                                               |
| Empty/whitespace query or unsupported framework | Library throws `TypeError`; CLI exits `1`                                         |
| Missing, invalid, or corrupt bundled assets     | Library throws a knowledge-loading error; CLI exits `1`, with no success response |
| CLI `--json` error                              | Diagnostic on stderr; stdout remains empty                                        |

## Knowledge versions and provenance

Code and bundled knowledge share the package version. `schemaVersion` identifies
the response format. `knowledge` includes the snapshot schema version, source
revision, SHA-256 content digest, and `mode: "bundled"`.

Builds from uncommitted sources report `dirty: true`; the revision alone must not
be treated as proof of that content. Candidate publication must use a clean
checkout and bind the actual tarball digest to the approved source commit.
Related instruction links are rewritten to addressable repository URLs.

Knowledge is not updated live. Upgrade the pinned package/tarball to receive
new guidance; restore the previous verified version to roll back. Never
overwrite a released version or hand-edit installed assets to repair it.

## Monorepo authoring

Query live sources, including unbuilt edits:

```sh
pnpm --filter @hpe-design/knowledge-agent generate -- "Build a login form"
pnpm --filter @hpe-design/knowledge-agent generate -- "Create an app shell" --json
pnpm --filter @hpe-design/knowledge-agent generate -- "Create a dashboard" --framework react
pnpm --filter @hpe-design/knowledge-agent generate -- "Create a dashboard" --rules none
pnpm --filter @hpe-design/knowledge-agent generate -- --rule color-names-its-target
pnpm --filter @hpe-design/knowledge-agent generate -- --checklist
```

This path reports `mode: "source"`. The installed bin instead requires a build
and always uses its bundled snapshot. Neither mode silently falls back to the
other. Missing snippets retain warning/placeholder behavior for live authoring,
but fail a strict package build. Builders and validators can use `--checklist`
for a lean constraint list and fetch individual rules by ID when explaining
or reporting a failure. Rules are not relevance-filtered by the query.

The canonical contract remains `knowledge/core/data/types.ts`; package
declarations are generated from it, not separately maintained. A build validates
source schemas, resolves snippets/templates, checks resolved snapshot schemas,
and bundles foundation/glossary data plus four explicitly selected canonical
standards. Authoring aids,
capability agents, prompts, skills, archive content, and token packages are not
included.

```sh
pnpm validate:knowledge-schema
pnpm validate:knowledge-structure
pnpm --filter @hpe-design/knowledge-agent typecheck
pnpm --filter @hpe-design/knowledge-agent test
pnpm --filter @hpe-design/knowledge-agent test:package
```

`test:package` builds and packs an artifact, checks an exact file allowlist,
installs only production dependencies into an unrelated temporary project, and
tests CLI/library use, declarations, source/bundled parity, network-blocked
queries, and corrupt/missing-asset failures. It deletes its temporary consumer
and tarball afterward.

Generated files remain under `dist`. The nested compiled layout preserves
canonical type-relative imports entirely inside the package; only the declared
root export is public. The Apache-2.0 license is included as `dist/LICENSE`.

## Changesets and release candidates

The [distribution contract](./DISTRIBUTION.md) records publication prerequisites
and versioning policy. The pull-request check requires an added or modified
Changeset whose frontmatter names `@hpe-design/knowledge-agent`, specifies a
patch/minor/major release, and has a nonempty summary. An unchanged Changeset or
a package mention only in the summary does not cover new changes.

Check a committed branch against its fetched base locally:

```sh
pnpm validate:knowledge-changeset --base=origin/master --head=HEAD
```

This compares commits, not uncommitted edits. Canonical definitions, types,
selected standards, and licensing changes require an entry. Runtime/build,
snippet, and root dependency-graph changes are built in isolated checkouts when
needed; unchanged normalized published output does not require an entry.
Commit-derived links and their digest are normalized, but runtime, schema,
content, and published package metadata differences are not ignored. Build
failures fail the check. Non-bundled docs/tests are excluded. A narrowly scoped
version/changelog update that consumes this package's Changesets is exempt.

After maintainer/content review, a maintainer can dispatch the
[candidate workflow](../../.github/workflows/knowledge-agent-release-candidate.yml)
from the default branch with its exact committed package version. It validates
and preserves the same tarball that passes packed-consumer checks, alongside
`release-metadata.json` and `tarball.sha256`. The uploaded artifact is
run/attempt-specific and retained for 30 days. It does not publish to a registry,
create a tag, or change another package's release flow.

For the equivalent local check, use a clean checkout and a new output directory
outside it:

```sh
REQUESTED_VERSION=0.1.0 EXPECTED_COMMIT="$(git rev-parse HEAD)" \
  pnpm --filter @hpe-design/knowledge-agent test:package \
  --candidate-dir /absolute/path/new-candidate-directory
```

Replace `0.1.0` with the exact committed package version. Dirty sources,
version/revision mismatches, failed consumer checks, and existing output
directories are rejected. Candidate evidence records the source revision,
knowledge digest, tarball hash, and validation environment; it is not content
approval or compatibility certification. The workflow tests Ubuntu/Node 24
only; review the separate six-job compatibility matrix at the same commit.
The workflow has not yet been remotely verified.

## Product roadmap

This roadmap distinguishes working capabilities from planned and exploratory
directions. It is not a release announcement or a commitment to every adapter.
The [distribution contract](./DISTRIBUTION.md) defines release approval and
artifact-acceptance requirements.

| Milestone                      | Status                                  | Outcome / exit gate                                                                                                                                                                          |
| ------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portable CLI and typed library | Implemented; package remains private    | Bundled validated knowledge, offline queries, structured results, and isolated packed-consumer checks.                                                                                       |
| Controlled distribution        | In progress; approval-gated             | Choose registry/access, assign owners, approve content, and distribute the verified artifact through a protected publisher; verify an external registry installation.                        |
| Two-team React/Grommet pilot   | Planned; requires approved distribution | Validate agreed real-project scenarios, CLI/library use collectively, and an upgrade; resolve release-blocking findings.                                                                     |
| Wider team availability        | Planned; after successful pilot         | Provide verified releases, support ownership, installation/upgrade guidance, and known limitations.                                                                                          |
| Local MCP adapter              | Planned; after successful pilot         | Expose structured tools through a thin local stdio adapter over the public library, preserving offline behavior and retrieval parity. Can proceed alongside wider rollout.                   |
| HTTP API / hosted service      | Exploratory; deferred                   | Revisit only for demonstrated centralized-service needs, with explicit hosting, authentication, content-access, and operating-ownership decisions. Not required for the CLI/library release. |

Keep the initial code and knowledge in one package. Separate data or adapter
packages only when actual consumers, dependency weight, or release cadences
justify the split. Broader framework implementations and hosted transports are
not implicit commitments of the current API.

## Feedback

For pilot issues, use the repository issue tracker and include the package
version, content digest, Node/platform details, reproduction query, expected
definition IDs/guidance, actual result, and whether setup or task completion is
blocked. Do not attach confidential application code or credentials. Named
support ownership and registry authentication instructions must be established
before registry distribution.

The pilot requires two React/Grommet teams to demonstrate CLI/library use and
an upgrade against agreed scenarios. Resolve release-blocking findings before
wider rollout.
