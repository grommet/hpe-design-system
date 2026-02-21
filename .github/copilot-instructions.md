# HPE Design System — Copilot Instructions

## Monorepo Overview

pnpm workspace with five workspace roots (`apps/*`, `packages/**`, `sandbox/*`, `shared/*`). Key packages:

| Path                         | Package                      | Purpose                                       |
| ---------------------------- | ---------------------------- | --------------------------------------------- |
| `apps/docs`                  | `docs`                       | Next.js 15 documentation site (static export) |
| `packages/hpe-design-tokens` | `hpe-design-tokens`          | Design tokens built with Style Dictionary v4  |
| `packages/icons-grommet`     | `@hpe-design/icons-grommet`  | HPE icons for Grommet (Vite build)            |
| `packages/icons-svg`         | `@hpe-design/icons-svg`      | HPE icons in raw SVG format (Vite build)      |
| `packages/codemods`          | `hpe-design-system-codemods` | JSCodeshift transforms for migrations         |
| `shared/aries-core`          | `@shared/aries-core`         | Shared React components + Storybook           |
| `shared/hooks`               | `@shared/hooks`              | Shared React hooks (TypeScript, Vitest)       |
| `sandbox/grommet-app`        | —                            | Prototype app for testing components/tokens   |
| `sandbox/mcp-ui`             | —                            | Future development — do not treat as active   |

Shared dependency versions are managed through `pnpm-workspace.yaml` `catalog:` entries — use `catalog:` references in `package.json` instead of pinned versions for shared deps like `grommet`, `react`, `styled-components`.

## Essential Commands

```bash
pnpm install                          # install all workspace deps (run from anywhere)
pnpm start:docs                       # dev server for docs site (Next.js)
pnpm --filter hpe-design-tokens build # rebuild tokens (required after token file changes)
pnpm storybook:icons-grommet                          # icons Storybook
pnpm storybook:core                                   # component Storybook
pnpm --filter docs test:ci            # run TestCafe e2e tests (headless)
pnpm --filter "@shared/hooks" test    # Vitest unit tests for hooks
```

**Pre-commit hooks** run ESLint, Prettier, and TestCafe e2e tests via Husky. TestCafe launches real browser windows — **keep browser windows in focus** or tests will stall/timeout (>2.5 min = browser is minimized).

## Adding a Component Page to Docs

Component documentation follows a strict three-part pattern:

1. **Register in structure**: Add an entry to `apps/docs/src/data/structures/components.js` with `name`, `category`, `description`, `seoDescription`, `sections[]`, `preview`, and `relatedContent[]`.

2. **Create examples**: Add a directory `apps/docs/src/examples/components/<ComponentName>/` with individual example files and an `index.js` barrel export. Each example is a named React export (e.g., `export const ButtonExample = () => <Button ... />`).

3. **Write the MDX page**: Create `apps/docs/src/pages/components/<componentname>.mdx`. Import from `../../layouts` (`Example`, `BestPracticeGroup`, `AccessibilitySection`) and `../../examples`. Wrap each example in `<Example componentName="..." code="..." docs="..." figma="...">`.

## Design Token Architecture

Tokens follow W3C Design Token Community Group format (`$type`, `$value`, `$description`). Three layers:

- `tokens/primitive/` — raw values (colors, sizes)
- `tokens/semantic/` — contextual references (`color.light.json`, `color.dark.json`, `dimension.default.json`)
- `tokens/component/` — component-specific tokens

Versioned variants exist (`.v0`, `.v1`, current) for migration compatibility. The build is run via Style Dictionary: `pnpm --filter hpe-design-tokens build`. Token outputs land in `packages/hpe-design-tokens/dist/` as ESM, CJS, CSS vars, and a Grommet-compatible format.

Figma ↔ tokens sync is bidirectional via:

```bash
pnpm --filter hpe-design-tokens sync-figma-to-tokens   # Figma → JSON files
pnpm --filter hpe-design-tokens sync-tokens-to-figma   # JSON files → Figma
```

## UI Framework Conventions

- **Always use Grommet components** (`Box`, `Button`, `Text`, etc. from `grommet`) — not custom HTML elements.
- **Icons**: Use `@hpe-design/icons-grommet`, not `grommet-icons`. Run `npx hpe-design-system-codemods migrate-grommet-icons-to-hpe <path>` to migrate.
- **Theming**: Extend `hpe` theme from `grommet-theme-hpe` via `deepMerge(hpe, {...})`. See `apps/docs/src/themes/aries.js`.
- **Dark mode**: Implemented via `ThemeMode` component (`apps/docs/src/layouts/main/ThemeMode.js`); token files have separate `.light.json`/`.dark.json` variants.
- Docs site uses `output: 'export'` (static HTML) in `apps/docs/next.config.mjs` — no server-side rendering at runtime.

## Versioning & Publishing

- Changesets (`@changesets/cli`) manages versioning for publishable packages (`hpe-design-tokens`, `@hpe-design/icons-grommet`, `hpe-design-system-codemods`).
- The `design-tokens-stable` branch tracks stable token releases.
- `pnpm-workspace.yaml` catalogs (`grommet-stable`, `grommet-theme-hpe-v6`, `grommet-theme-hpe-v7`) allow consuming specific Grommet versions per package.

## Key File Locations

- Site navigation/page metadata: `apps/docs/src/data/structures/`
- Docs layout components (`Example`, `ContentSection`, etc.): `apps/docs/src/layouts/content/`
- Page shell (header, theme toggle): `apps/docs/src/layouts/main/`
- Style Dictionary build config: `packages/hpe-design-tokens/src/scripts/build-style-dictionary.js`
- Custom SD formats/transforms: `packages/hpe-design-tokens/src/formats/` and `src/transforms/`
