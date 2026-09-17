# Dependency Package Risk Tiers

This document encodes the upgrade ordering heuristics used by the `dependency-upgrade-orchestrator` when sequencing major version upgrades. Upgrade lower tiers first — they are less likely to require cascading changes in other packages.

## Tier 1 — Low Risk: Utility Libraries

Safe to upgrade first. These packages have minimal or no configuration surface and no peer-dependency constraints across the monorepo.

**Packages:** `axios`, `zod`, `tsx`, `prop-types`, `gsap`, `react-gsap`, `react-router-dom`, `jscodeshift`, any small runtime utility

**Typical upgrade effort:** Update the version. Run `pnpm install`. Verify builds pass.

**Watch for:** Removed or renamed exports (check the package's CHANGELOG).

---

## Tier 2 — Medium Risk: Build Tools

Require reading the migration guide to confirm config file shape changes. Usually self-contained to a single package's config.

**Packages:** `vite`, `vitest`, `style-dictionary`, `tsx` (major), `rollup`, `esbuild`

**Typical upgrade effort:** Update version + adjust the relevant `vite.config.ts` / `vitest.config.ts`. Run build and tests.

**Watch for:**
- Plugin API changes (renamed options, dropped plugins)
- `vite ^5 → ^6 → ^7`: config format and plugin compatibility changes at each major
- `vitest` config options that moved or were removed between majors

**Monorepo note:** `vite` is currently fragmented — `apps/docs` and `apps/design-tokens-manager` use `^5.x` while `packages/icons-grommet` and `packages/icons-svg` use `^7.x`. Align all packages to the same major before treating as "done".

---

## Tier 3 — High Risk: Peer Ecosystems (Upgrade Together)

These packages must be upgraded as a coordinated group because they have inter-dependent peer requirements. Do not upgrade one without upgrading all.

### React ecosystem
`react` + `react-dom` + `@types/react` + `@types/react-dom`

**Watch for:** New JSX transform requirements, changes to event handler types, dropped lifecycle methods, Suspense/concurrent mode behavior changes.

### Storybook ecosystem
`storybook` + `@storybook/react` + `@storybook/react-vite` (or `@storybook/react-webpack5`) + all `@storybook/*` addons

**Monorepo note:** Currently split — `shared/aries-core` uses `storybook ^10` (webpack5 builder), `packages/icons-grommet` uses `storybook ^8` (vite builder). These may require separate upgrade tracks.

**Watch for:** Builder config changes, addon API changes, story format renames, CSF version bumps.

### styled-components
Treat as a coordinated upgrade with `grommet` since grommet depends on it as a peer.

---

## Tier 4 — High Risk: Framework Tools

Always plan before applying. These packages affect every file in the repo and frequently require config changes across multiple files.

### TypeScript (`typescript`, `typescript-eslint`)
**Watch for:**
- `tsconfig.json` options removed or renamed
- New strict checks that surface in existing code
- `typescript-eslint` major versions are tied to TypeScript majors — upgrade together
- `@types/*` packages may also need updates

### ESLint (`eslint`, `@eslint/js`, `typescript-eslint`, all `eslint-plugin-*`)
**Watch for:**
- The flat config format became default in ESLint 9 (already adopted here)
- Plugin APIs change significantly at each major
- Shareable config formats change between majors
- All plugins must be compatible with the new ESLint major

### Babel (`@babel/core`, `@babel/preset-react`, `@babel/preset-env`, etc.)
**Watch for:** `shared/aries-core` uses webpack + babel — plugin name changes, config option renames.

### Next.js (`next`)
**Watch for:**
- App Router vs Pages Router API changes
- `next.config.mjs` option renames
- Image component API changes
- Bundler changes (Next.js moved from webpack to Turbopack)
- Peer requirements for React

### webpack (`webpack`)
Only in `shared/aries-core`. Coordinate with Storybook upgrade since aries-core uses `@storybook/react-webpack5`.

---

## Upgrade Ordering Summary

```
Tier 1 utilities → Tier 2 build tools → Tier 3 ecosystems → Tier 4 framework tools
```

Within Tier 3, order: `styled-components` → React ecosystem → Storybook

Within Tier 4, order: Babel (if needed) → TypeScript + typescript-eslint → ESLint plugins → Next.js → webpack
