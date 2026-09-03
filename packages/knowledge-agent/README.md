# @hpe-design/knowledge-agent

CLI/package that reads `knowledge/core/data` (components and patterns) and relevant `.github/instructions` files to answer natural-language implementation queries against the HPE Design System's knowledge base. It powers the `alignment-audit` capability's evaluation step and is the canonical way to check what the knowledge base currently surfaces for a given feature request.

## Usage

From the repository root:

```bash
pnpm --filter @hpe-design/knowledge-agent generate -- "Build a login form"
pnpm --filter @hpe-design/knowledge-agent generate -- "Create a dashboard" --framework react
pnpm --filter @hpe-design/knowledge-agent test
```

The bin command (`hpe-design-agent`) mirrors the same interface once the package is installed:

```bash
hpe-design-agent "Build a login form"
```

## Architecture

- `src/data-loader.ts` reads `knowledge/core/data/components/*.yaml` and `knowledge/core/data/patterns/*.yaml`.
- `src/context-generator.ts` combines that data with matching `.github/instructions/*.instructions.md` files and `src/vector-search.ts` similarity matching to produce a natural-language response. This module is intentionally surface-agnostic — it has no CLI, process, or console dependencies — so it can be imported by any future adapter (CLI, MCP server, HTTP API) without pulling in argument-parsing or output-formatting concerns.
- `src/cli.ts` is the CLI adapter: it owns argument parsing (`--framework`, `--help`) and output formatting, and is the only module that calls `console.log`/`process.exit`. It is the single entry point used by both the `pnpm run generate` script and the `hpe-design-agent` bin.
- All paths are resolved **relative to this package's own location inside the `hpe-design-system` monorepo** — there is currently no build step; YAML is read live at request time.

## Future Consideration: Multi-Surface Distribution

Today this package exposes one surface — a CLI — but the underlying knowledge (components, patterns, instructions, and `knowledge/core/skills/*.skill.md`) is expected to be consumed through multiple surfaces over time: this CLI, an MCP server, and potentially an HTTP API or other integrations. The recommended shape for that is a **core library with thin surface adapters**, not one surface bolted onto another:

```
@hpe-design/knowledge-core   (surface-agnostic: data-loader, vector-search, generateSystemPrompt)
        ↑                ↑                ↑
   CLI adapter      MCP adapter      (future) HTTP API adapter
  (knowledge-agent)  (knowledge-mcp)
```

Each adapter should only handle protocol/argument parsing and response formatting — never knowledge-retrieval logic — so that a fix in one surface can't silently drift from the others. `context-generator.ts` and `data-loader.ts` are already written this way (see Architecture above); `cli.ts` is the first adapter built on top of them.

**MCP is likely the more important long-term surface for AI agents than the CLI**, since it gives agents native structured primitives instead of requiring them to shell out and parse text. The existing repo structure maps onto MCP's primitives unusually well:

| MCP primitive | Natural mapping here |
| --- | --- |
| **Tools** | `search_design_system(query, framework?)`, `get_component(id)`, `get_pattern(id)`, `list_components()` — i.e. `generateSystemPrompt()` and `data-loader.ts` exposed as callable tools. |
| **Resources** | Direct, addressable access to component/pattern YAML and instruction files, for an agent that wants a specific definition rather than a synthesized answer. |
| **Prompts** | `knowledge/core/skills/*.skill.md` files (`instruction-writer`, `code-connect-authoring`, etc.) map closely onto MCP's reusable prompt-template primitive — something the CLI has no distribution story for today. |

### Cross-Repo Distribution

This package is `"private": true` and currently only works when run from inside the `hpe-design-system` monorepo, because `data-loader.ts` and `context-generator.ts` resolve `knowledge/core/data` and `.github/instructions` via relative paths from the package's own install location. If this is installed in another HPE repository, those directories do not exist there and the tool would return empty or degraded results. A local MCP server would have the identical problem if it read local files the same way; only a remote/hosted MCP server or a self-contained data distribution avoids it.

Before this package (or an MCP adapter built on the same core) can be distributed to and consumed by other HPE repositories, the following need to be decided and implemented:

1. **Decouple knowledge data from the monorepo layout.** Options, roughly in order of implementation cost:
   - **Bundle the data into the published package** (ship `knowledge/core/data/**` as package assets). Simplest, but consumers only get fresh guidance when they upgrade the package — not live.
   - **Split into two packages** — a versioned data package (e.g. `@hpe-design/knowledge-data`) that ships the aggregated component/pattern content, and thin CLI/MCP packages that depend on it. This matches the real separation of concerns (data vs. query logic vs. surface) and lets consumers pick up fresh knowledge via normal semver bumps, without duplicating loader logic per surface.
   - **Fetch from a hosted source at runtime** (e.g. an endpoint served alongside `design-system.hpe.design`, reachable by a remote MCP server over HTTP/SSE transport). Always fresh and works identically for every surface at once, but requires real infrastructure and reintroduces an aggregation/build step (similar to the `build:data` step used by the original Tanuki prototype, which was deliberately dropped when this was ported into `hpe-design-system`). This option scales best as more surfaces are added.
2. **Choose a registry.** Public npm (matching `hpe-design-tokens` and `@hpe-design/icons-grommet`, which are already public) vs. an internal-only registry — depends on whether any bundled instruction or component content is HPE-internal and shouldn't be published publicly.
3. **Clarify framework scope.** The underlying data is Grommet/React-specific. If cross-repo distribution targets teams on other stacks, the pitch and docs should make clear this tool is for HPE teams building on Grommet, not a universal design-system tool.
4. **Adopt real versioning discipline.** Once external repos (or other surfaces) depend on this knowledge, changes to `knowledge/core/data` need a proper release process (the repo already has `@changesets/cli` available at the root) rather than the current model of editing YAML and having it read live.
5. **Bin naming.** The current bin name is `hpe-design-agent`, chosen so it reads correctly standalone (no monorepo context) once this tool is used from other repositories. Revisit if the tool's scope or branding changes before publishing.

