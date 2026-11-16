# External consumption contract

Status: local snapshot, compiled CLI/library, structured results,
packed-consumer checks, Changeset enforcement, and a non-publishing candidate
workflow are implemented. The package remains private. This document does not
announce a release or approve content for publication.

## Product boundary

The first external release will provide one self-contained
`@hpe-design/knowledge-agent` package with:

- The existing `hpe-design-agent` CLI.
- An ESM library with TypeScript declarations.
- A versioned snapshot of component, pattern, and selected implementation
  guidance, including resolved examples and templates.
- Offline query execution after installation, without an LLM, account,
  application framework dependency, or runtime download.

The initial implementation target is React/Grommet. Existing non-React
framework options remain conceptual guidance, not validated implementations.
CommonJS, custom knowledge overlays, embeddings, hosted services, and skill or
agent distribution are outside this first release. A local MCP adapter follows
the two-team pilot rather than blocking the CLI/library release.

The proposed compatibility target is Node.js 22 and 24 on Linux, macOS, and
Windows. This is not a tested support claim: declare support in the package
manifest and consumer documentation only after the packed-artifact matrix
passes.

## Knowledge inventory and inclusion boundary

Keep authored knowledge and types in their existing authoritative locations.
Generated package assets must not become a second manually maintained source.

The initial source inventory contains 62 component definitions and seven
patterns. These counts describe the starting inventory, not permanent build
constants.

| Input                                                                                  | Treatment                                                                                               |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Component definitions](../../knowledge/core/data/components/)                         | Include loader-consumed YAML/JSON definitions after schema validation                                   |
| [Pattern definitions](../../knowledge/core/data/patterns/)                             | Include loader-consumed YAML/JSON definitions after schema validation                                   |
| [Examples and templates](../../knowledge/core/data/examples/)                          | Resolve files referenced by included definitions; do not copy unrelated example trees                   |
| [Canonical types](../../knowledge/core/data/types.ts)                                  | Generate package-local declarations from the shared contract; do not maintain copied source definitions |
| Four standards instructions listed below                                               | Candidate inclusion set; resolve portability findings before release approval                           |
| [Copilot entrypoints](../../.github/instructions/)                                     | Do not bundle mirrors of canonical standards or scan a consumer's repository                            |
| Authoring aids, capability agents, prompts, skills, archive, and repository governance | Exclude from the first package                                                                          |
| Token packages and applications                                                        | Exclude; this package does not provide live token data or application implementations                   |

The candidate instruction allowlist is:

- [Coding guidelines](../../knowledge/core/instructions/standards/coding-guidelines.instructions.md).
- [Layouts](../../knowledge/core/instructions/standards/grommet-layouts.instructions.md).
- [Responsive design](../../knowledge/core/instructions/standards/grommet-responsive.instructions.md).
- [Data collections](../../knowledge/core/instructions/standards/grommet-data.instructions.md).

Use the canonical standards, not their `.github` entrypoints. Preserve
standards-first duplicate handling in source mode. Do not silently include new
instruction files merely because they appear in either directory.

### Portability fixes included in local packaging

- Canonical coding/layout instructions now distinguish installed CLI usage
  from the monorepo contributor command and avoid recursively repeating queries.
- Coding verification now distinguishes consumer-project checks from the
  contributor sandbox. Code Connect remains an addressable reference rather
  than part of the snapshot.
- Relative Markdown links in selected standards become repository URLs at the
  recorded source revision. Missing targets fail loading/building.
- The navigation pattern now references its actual canonical examples instead
  of the nonexistent `examples/NavigationMenu/` location.
- All seven patterns' snippets/templates resolve at build time. Missing files
  fail candidate creation; live authoring retains its warning behavior.

An allowlist is a technical selection boundary, not a confidentiality or
licensing approval. A designated content approver must review the exact
candidate before registry distribution.

## Snapshot and authoring behavior

The installed library and CLI must use package-local assets by default. They
must not discover a repository root, walk parent directories, read a consumer's
`.github` files, or silently fall back to another source.

Keep `pnpm --filter @hpe-design/knowledge-agent generate -- "<query>"` as the
explicit live-source authoring workflow. It must see unbuilt knowledge edits.
Build and live-source loading must share resolution and instruction-selection
logic rather than implement separate retrieval algorithms.

Candidate generation must:

1. Validate source definitions using the canonical contracts.
2. Resolve included examples and templates, preserving explicit inline example
   code precedence, including an empty string.
3. Validate required references and the final resolved snapshot.
4. Sort inputs deterministically and replace only package-owned generated
   output, so deleted definitions cannot remain in a candidate.
5. Record a snapshot schema version, package/knowledge version, source commit,
   and content digest. Dirty-source builds must not claim that a commit alone
   identifies their content; release candidates must come from a clean checkout.
6. Emit stable logical source identifiers, not local absolute paths.

Missing or corrupt bundled assets are installation errors. Source-authoring
warnings and placeholder behavior remain unchanged unless an intentional
change is separately documented and tested.

## Library and CLI boundary

The initial root exports are:

- `searchDesignSystem(query, framework?)`: structured query results.
- `generateSystemPrompt(query, framework?)`: plain-text context using the same
  retrieval result and preserving the existing default React target.
- The response types and canonical component/pattern types required to consume
  those functions.

These exports are available after a local build. Imports must not parse
arguments, print output, or terminate the process.
Do not expose implementation modules as accidental public subpaths.

Structured results must contain:

| Field                    | Contract                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `schemaVersion`          | Response schema version, initially `1`                                                      |
| `packageVersion`         | Installed code version                                                                      |
| `knowledge`              | Snapshot version, content digest, logical source revision, and explicit source/bundled mode |
| `query`, `framework`     | Original query and effective framework target                                               |
| `status`                 | `matched` or `no-match`; never an installation-error fallback                               |
| `frameworkStatus`        | `react-grommet` or `conceptual`; does not assert universal implementation validation        |
| `components`, `patterns` | Resolved canonical definitions selected by the shared retrieval logic                       |
| `instructions`           | Selected instruction content with logical source identifiers                                |
| `sources`                | Stable provenance for returned definitions and instructions                                 |
| `diagnostics`            | Explicit framework caveats and other nonfatal notices                                       |

Keep existing matching/ranking and related-definition expansion. Retrieval
algorithm changes require separate evidence; portability is not a reason to
change recommendations.

Add CLI `--json` as an adapter over the same result. Machine-readable output and
library context strings must contain no ANSI escapes or local absolute paths.
Terminal-only presentation belongs in the CLI.

| Condition                                      | Library behavior                                      | CLI behavior                                                        |
| ---------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| Valid query with matches                       | Return structured matches or formatted context        | Exit `0` with requested output                                      |
| Valid query without matches                    | Return `no-match`, without fabricated recommendations | Exit `0` with explicit no-match output                              |
| Empty/invalid query or invalid framework       | Throw an explicit argument error                      | Exit `1`, diagnostic on stderr                                      |
| Missing/corrupt snapshot or unsupported schema | Throw an explicit knowledge-loading error             | Exit `1`, diagnostic on stderr; no success-shaped response          |
| Non-React target                               | Return conceptual status and framework caveat         | Exit `0`, preserve warning and omit validated-implementation claims |

Changing the current empty-query library behavior to an argument error is
intentional and must receive a focused regression test. The CLI already
requires a query; whitespace-only inputs should also be rejected.

## Versioning and publication gates

Code and bundled knowledge share one package version. Snapshot and response
schema versions describe format compatibility, not independent package
releases. Consumers receive guidance updates by upgrading the package.

Adopt package-specific Changesets rules without changing icon or token release
contracts:

- Include a release entry for changes to published definitions, snippets,
  selected instructions, or canonical contracts.
- Require an entry for runtime/build/asset-selection changes when published
  behavior or contents change.
- Do not require entries for tests or documentation that cannot affect the
  package's retrieved content.
- Classify backward-compatible fixes as patch and additive consumer features as
  minor. Breaking exports, response formats, and removed supported definitions
  need explicit migration notes and a breaking-change decision.
- Before 1.0, use a minor bump for breaking changes and document them explicitly;
  after 1.0, use a major bump.

The [knowledge validation workflow](../../.github/workflows/validate-knowledge.yml)
enforces these rules across package and canonical-source paths using
`pnpm validate:knowledge-changeset --base=origin/master --head=HEAD`.
The guard compares committed merge-base/head inputs, not dirty edits:

- Canonical component/pattern definitions, shared types, selected standards,
  and the root license require a release entry.
- Potentially published runtime, build, snippet, and root dependency-graph
  changes trigger isolated frozen-install builds when no entry is present.
  Published manifest metadata differences require an entry directly.
- Normalized artifact comparison ignores source-revision metadata and generated
  revision URLs, including their derived digest. It preserves actual content,
  runtime files, schema, declarations, file additions/removals, and published
  package metadata. Invalid content digests or failed builds fail closed.
- A qualifying Changeset must be added or modified in the compared range,
  name the package in YAML frontmatter with a patch/minor/major release, and
  contain a nonempty summary. A previously existing entry or body-only mention
  is insufficient.
- Tests and non-bundled documentation do not trigger a release. The consumption
  exemption is restricted to this package's version-only manifest update,
  changelog, and deleted Changesets naming this package, with no other changes.

Leave `"private": true` in place until the registry and access policy are
approved. The root Changesets configuration's public access default is not
permission to publish this package. This contract does not authorize changing
that flag, creating tags, dispatching candidate uploads without content review,
or publishing.

### Non-publishing candidate workflow

The manual
[candidate workflow](../../.github/workflows/knowledge-agent-release-candidate.yml)
accepts an exact committed version and requires default-branch dispatch. It
checks out the dispatch commit, installs frozen dependencies without lifecycle
scripts, validates structure/types/tests, and builds and packs once through
`test:package`. Schema validation is part of that build. Only after the
isolated packed-consumer checks succeed does it preserve:

- The exact tested tarball, without rebuilding/repacking it.
- `tarball.sha256`, the tarball's SHA-256 digest.
- `release-metadata.json`, including version, commit, knowledge schema/content
  digest, clean-source state, validation environment, workflow run/attempt,
  and packed-consumer result.

The candidate check rejects dirty sources, mismatched requested version/commit,
and existing output directories. Local callers can opt into the same export
with `REQUESTED_VERSION`, `EXPECTED_COMMIT`, and
`test:package --candidate-dir /absolute/path/new-directory`.
Without this option, the test still deletes its temporary consumer and tarball.

The workflow uses read-only repository permissions, uploads run-specific
artifacts retained for 30 days, and has no registry write, release, or tag step.
It validates Ubuntu/Node 24 only; verify the separate compatibility matrix for
the same commit before making support claims. No remote execution or registry
verification is claimed by this implementation.

Content approval must precede sharing/uploading a candidate. The workflow is
not itself an enforced content-approval or publication gate; named approvers
and protected publisher controls still need to be established. A future
publisher must consume the approved tarball and verify its recorded identity,
not silently generate a replacement artifact.

Before any registry distribution, record:

| Gate                | Required approval/evidence                                           | Current state                                            |
| ------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Ownership           | Named product, technical, content, release, and support owners       | Unassigned                                               |
| Registry/access     | Public or internal registry and explicit package access              | Undecided                                                |
| Content eligibility | Exact asset inventory and licensing/confidentiality review           | Not approved                                             |
| Compatibility       | Packed-consumer tests across declared runtime/platform matrix        | Local consumer check passed; CI matrix execution pending |
| Publisher setup     | Verified registry identity, permissions, and human approval controls | Not configured for this package                          |
| Pilot               | Two React/Grommet teams, agreed scenarios, and contact owners        | Not recruited                                            |

Existing icon release automation is package-specific. Reuse its candidate
integrity and approval principles, not its package allowlists, version-only PR
requirements, or assumptions about registry configuration.

## Artifact acceptance

The release gate is the exact tarball, not source-test success alone:

- Install production dependencies in a temporary project outside the monorepo,
  without workspace links or development tooling.
- Execute the CLI, import the ESM library, and typecheck declaration consumption
  using the declared Node/platform matrix.
- Verify expected component/pattern IDs, selected instructions, and embedded
  templates for login, app-shell/navigation, and filtering queries.
- Verify no-match, conceptual-framework, invalid-argument, and damaged-asset
  behavior separately.
- Disable networking during queries after installation and confirm that
  neither the consumer working directory nor repo-only files affect results.
- Inspect contents against the package allowlist, including required licensing
  notices and excluding tests, scratch files, and unapproved source content.
- Bind candidate metadata to the package version, source commit, and tarball
  digest; verify the artifact distributed from the approved registry.

The two-team pilot additionally requires real-project CLI and library use
collectively, agreed relevance scenarios, a follow-up-version upgrade, and no
unresolved release-blocking findings before wider rollout.
