# HPE Design System — Copilot Instructions

## Monorepo Overview

pnpm workspace with six workspace/content roots (`apps/*`, `packages/**`, `sandbox/*`, `shared/*`, `knowledge/**`, `scripts/**`). Key packages:

| Path                         | Package                      | Purpose                                       |
| ---------------------------- | ---------------------------- | --------------------------------------------- |
| `apps/docs`                  | `docs`                       | Next.js 15 documentation site (static export) |
| `apps/design-tokens-manager` | `design-tokens-manager`      | Vite app for browsing/managing design tokens  |
| `packages/hpe-design-tokens` | `hpe-design-tokens`          | Design tokens built with Style Dictionary v4  |
| `packages/icons-grommet`     | `@hpe-design/icons-grommet`  | HPE icons for Grommet (Vite build)            |
| `packages/icons-svg`         | `@hpe-design/icons-svg`      | HPE icons in raw SVG format (Vite build)      |
| `packages/codemods`          | `hpe-design-system-codemods` | JSCodeshift transforms for migrations         |
| `shared/aries-core`          | `@shared/aries-core`         | Shared React components + Storybook           |
| `shared/hooks`               | `@shared/hooks`              | Shared React hooks (TypeScript, Vitest)       |
| `sandbox/grommet-app`        | —                            | Prototype app for testing components/tokens   |
| `sandbox/native-web`         | —                            | Prototype sandbox app (native-web)            |
| `sandbox/tailwind-app`       | —                            | Prototype sandbox app (Tailwind)              |
| `knowledge/`                 | —                            | AI-first knowledge system: agents, prompts, skills, capability manifests (see `knowledge/README.md`) |
| `scripts/`                   | —                            | Node validation/tooling scripts used by CI (license headers, changeset checks, knowledge structure) |

Shared dependency versions are managed through `pnpm-workspace.yaml` `catalog:` entries — use `catalog:` references in `package.json` instead of pinned versions for shared deps like `grommet`, `react`, `styled-components`.

**Toolchain**: `packageManager` is pinned to `pnpm@10.30.3` (root `package.json`); CI runs Node `24.15.0`. Match these versions locally.

## Essential Commands

```bash
pnpm install                          # install all workspace deps (run from anywhere)
pnpm start:docs                       # dev server for docs site (Next.js)
pnpm start:design-tokens-manager      # dev server for design tokens manager
pnpm start:grommet-app                # dev server for grommet sandbox app
pnpm --filter hpe-design-tokens build # rebuild tokens (required after token file changes)
pnpm storybook:icons-grommet          # icons Storybook
pnpm storybook:core                   # component Storybook (builds tokens + hooks first)
pnpm --filter docs test:ci            # run TestCafe e2e tests (headless)
pnpm --filter "@shared/hooks" test    # Vitest unit tests for hooks
pnpm lint                             # lint all workspaces (pnpm -r lint --cache)
pnpm license-check                    # verify SPDX headers on authored source files
pnpm validate:knowledge-structure     # validate knowledge/ structure against schema
pnpm validate:capability-manifests    # validate knowledge/capabilities/*/manifest.yaml
pnpm validate:design-tokens-changeset # verify a changeset exists for token-value/contract changes
```

**`pnpm install` gotcha**: the `grommet` stable tarball SHA can go stale, causing an integrity check failure. Fix: `rm pnpm-lock.yaml && pnpm install`.

**Pre-commit hooks** run ESLint, Prettier, and TestCafe e2e tests via Husky. TestCafe launches real browser windows — **keep browser windows in focus** or tests will stall/timeout (>2.5 min = browser is minimized).

## License Headers

Every authored source file under `apps/`, `packages/`, `shared/`, `sandbox/`, and `scripts/` (`.js`/`.jsx`/`.ts`/`.tsx`/`.mjs`/`.cjs`/`.mts`/`.cts`) must start with:

```js
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
```

Run `pnpm license` to insert/fix headers, or `pnpm license-check` to verify without modifying files — this is what CI runs (`.github/workflows/license.yml`).

## CI Validation Checklist

Run the local equivalent of these before opening a PR:

- **Lint**: `pnpm lint`
- **License headers**: `pnpm license-check`
- **Knowledge structure** (if `knowledge/**` changed): `pnpm validate:knowledge-structure` and `pnpm validate:capability-manifests`
- **Design tokens changeset** (if token values/contracts changed): `pnpm validate:design-tokens-changeset`
- **Unit tests**: package-level `test` scripts (e.g. `pnpm --filter "@shared/hooks" test`, `pnpm --filter hpe-design-tokens test`)
- **Docs e2e**: `pnpm --filter docs test:ci` (TestCafe, headless)
- **Visual regression**: Chromatic runs in CI against `shared/aries-core` Storybook builds (`.github/workflows/chromatic.yml`) — no local equivalent; check the Chromatic build link on the PR.

## Generated Output — Do Not Hand-Edit

- `packages/*/dist/` (built package output, including `packages/hpe-design-tokens/dist/`) is generated — edit the source (`src/`, `tokens/`) and rebuild instead.
- Versioned token folders (`.v0`, `.v1`, etc.) under `packages/hpe-design-tokens/tokens/` exist for migration compatibility — do not retroactively edit older versions.

## Adding a Component Page to Docs

Component documentation follows a strict three-part pattern:

1. **Register in structure**: Add an entry to `apps/docs/src/data/structures/components.js` with `name`, `category`, `description`, `seoDescription`, `sections[]`, `preview`, and `relatedContent[]`.

2. **Create examples**: Add a directory `apps/docs/src/examples/components/<ComponentName>/` with individual example files and an `index.js` barrel export. Each example is a named React export (e.g., `export const ButtonExample = () => <Button ... />`).

3. **Write the MDX page**: Create `apps/docs/src/pages/components/<componentname>.mdx`. Import from `../../layouts` (`Example`, `BestPracticeGroup`, `AccessibilitySection`) and `../../examples`. Wrap each example in `<Example componentName="..." code="..." docs="..." figma="...">`.

## Design Token Architecture

Tokens follow W3C Design Token Community Group format (`$type`, `$value`, `$description`). Three layers under `packages/hpe-design-tokens/tokens/`:

- `primitive/` — raw values (colors, sizes)
- `semantic/` — contextual references (`color.light.json`, `color.dark.json`, `dimension.default.json`)
- `component/` — component-specific tokens

Versioned variants exist (`.v0`, `.v1`, current) for migration compatibility. The build is run via Style Dictionary: `pnpm --filter hpe-design-tokens build`. Token outputs land in `packages/hpe-design-tokens/dist/` as ESM, CJS, CSS vars, and a Grommet-compatible format.

Figma ↔ tokens sync is bidirectional via:

```bash
pnpm --filter hpe-design-tokens sync-figma-to-tokens   # Figma → JSON files
pnpm --filter hpe-design-tokens sync-tokens-to-figma   # JSON files → Figma
```

## UI Framework Conventions

- **Must use Grommet components** (`Box`, `Button`, `Text`, etc. from `grommet`) — not custom HTML elements.
- **Icons**: Use `@hpe-design/icons-grommet`, not `grommet-icons`. Run `npx hpe-design-system-codemods migrate-grommet-icons-to-hpe <path>` to migrate.
- **Theming**: Extend `hpe` theme from `grommet-theme-hpe` via `deepMerge(hpe, {...})`. See `apps/docs/src/themes/aries.js`.
- **Dark mode**: Implemented via `ThemeMode` component (`apps/docs/src/layouts/main/ThemeMode.js`); token files have separate `.light.json`/`.dark.json` variants.
- Docs site uses `output: 'export'` (static HTML) in `apps/docs/next.config.mjs` — no server-side rendering at runtime.

## TypeScript Conventions (`shared/hooks`)

`shared/hooks` runs with `strict: true` and `noUncheckedIndexedAccess: true`, and lints with `eslint . --max-warnings 0`, so `any` fails CI. Follow the pattern already established in `useSessionStorage`:

- **Use generics for caller-supplied shapes** instead of `any`: `export const useSessionStorage = <T>(key: string, initialValue: T) => { ... }`.
- **Narrow dynamic values into the generic `T`** rather than typing as `any` — see how `useSessionStorage` round-trips a value through `JSON.parse`.
- If `any` is genuinely unavoidable, prefer `unknown` first and narrow with a type guard; only fall back to `any` with an inline `eslint-disable-next-line` and a comment explaining why.

## Pull Request Conventions

**Branch naming** (descriptive, kebab-case, optionally prefixed by area):

```
docs/colors-layering-update
templates/replace-dashboard-card-image
remove-unused-icons
```

**PR title** format: `[{project}] {subject} – {describe what changed}`

- `[Docs] Colors – Moved background layering approach from tokens to foundations`
- `[Design Tokens] Colors – Updated brand palette and spacing scale`
- `[Icons Grommet] Library – Added new status icons`
- `[Codemod] T-shirt – Added mod for calendar sizes`

**PR description**: Complete all sections of the PR template. Link closing issues with `Closes #1234` (auto-closes on merge); use a plain link for related-but-not-closing issues.

## Versioning & Publishing

- Changesets (`@changesets/cli`) manages versioning for publishable packages (`hpe-design-tokens`, `@hpe-design/icons-grommet`, `@hpe-design/icons-svg`, `hpe-design-system-codemods`).
- The `design-tokens-stable` branch tracks stable token releases.
- `pnpm-workspace.yaml` catalogs (`grommet-stable`, `grommet-theme-hpe-v6`, `grommet-theme-hpe-v7`) allow consuming specific Grommet versions per package.

## Key File Locations

- Site navigation/page metadata: `apps/docs/src/data/structures/`
- Docs layout components (`Example`, `ContentSection`, etc.): `apps/docs/src/layouts/content/`
- Page shell (header, theme toggle): `apps/docs/src/layouts/main/`
- Style Dictionary build config: `packages/hpe-design-tokens/src/scripts/build-style-dictionary.js`
- Custom SD formats/transforms: `packages/hpe-design-tokens/src/formats/` and `packages/hpe-design-tokens/src/transforms/`

## `knowledge/` vs `.github/` — Avoid Divergence

`.github/instructions/*.instructions.md` (top-level files, not `code-connect/`) are manually kept in sync with the authoritative copies in `knowledge/core/instructions/standards/`. If you edit one, check the other and update both — per `knowledge/README.md`'s ownership rules, do not let these two sources of truth silently diverge.

---

Trust the information above as current and validated. Only search the codebase further if something here is missing, ambiguous, or contradicted by what you find.
