# hpe-design-system

### HPE Design System Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/39e37d4a-4f9f-4946-8aeb-b8328b1821cd/deploy-status)](https://app.netlify.com/sites/keen-mayer-a86c8b/deploys)

https://design-system.hpe.design/

# Welcome to HPE Design System

hpe-design-system is a monorepo containing core assets and documentation for the HPE Design System.

- aries-site (apps/aries-site): The documentation site for the design system.
- design-tokens (packages/hpe-design-tokens): The source code for [hpe-design-tokens](https://www.npmjs.com/package/hpe-design-tokens).
- aries-core (shared/aries-core): Used for accessibility testing.

The monorepo is installed using [pnpm](https://pnpm.io/), and relies on [pnpm workspaces](https://pnpm.io/workspaces).

Packages are automatically linked together, meaning you can do cross-package work within the repo. woot-woot!

### Basic structure and configurations

```
hpe-design-system/
  aries-*/
    src/js/
      index.js
    package.json         // package-specific deps and scripts
    README.md            // shown in npmjs.com. included in npm artifact

.eslintignore            // eslint (linter) ignored directories/files
.eslintrc                // eslint (linter) configuration based on @hpe/project-scripts
.gitignore               // github's default node gitignore with customizations
.prettierrc.js           // prettier (formatter) configuration based on @hpe/project-scripts
package.json             // common dev deps and workspace-wide scripts WIP
README.md                // workspace-wide information. shown in github
pnpm-lock.yaml           // the only lock file in the repo. all packages combined
pnpm-workspace.yaml      // list of workspaces/packages and common dependency catalogs
```

## design-tokens structure

- `design-tokens/`
   - `tokens/`: The design tokens source files.
   - `src/`:
      - `formats/`: Custom [style-dictionary format functions](https://styledictionary.com/reference/hooks/formats/).
      - `scripts/`: Build, pre-commit, and Github Actions related scripts.
      - `tests/`: Vitests that run pre-commit to ensure no unexpected changes to tokens output formats. These tests do not test the actual design token outputs, but rather use mock design token objects to ensure predictable, consistent output.
      - `transforms/`: Custom [style-dictionary transforms](https://styledictionary.com/reference/hooks/transforms/).
      - `types/`: Type declarations for package exports. These should be enhanced in future to include auto-generated type definitions that match the full outputs.
    
## Getting started

```
pnpm install
```

Running 'pnpm install' anywhere in the monorepo hierarchy will always install ALL the modules in the workspaces.

Note: When installing, you may get and error saying "Integrity check failed for 'grommet' (computed integrity doesn't match our records...". 
`aries-site` references the latest stable branch of grommet. Any new commits added to grommet's stable branch cause its SHA hash to be updated and become out of sync with the SHA in the pnpm-lock.yaml file. 

To fetch the latest grommet stable, remove pnpm-lock.yam and clean cache (TBD), then pnpm install. For example: `rm pnpm-lock.yaml && pnpm install`

Run aries-site in development mode:

```
pnpm start:aries-site
```

Run in production mode:

```
pnpm build
pnpm --filter aries-site start-server
```


