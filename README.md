# hpe design-system monorepo

### HPE Design System Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/39e37d4a-4f9f-4946-8aeb-b8328b1821cd/deploy-status)](https://app.netlify.com/sites/keen-mayer-a86c8b/deploys) - https://design-system.hpe.design/

# Welcome to HPE Design System

This is a monorepo built from two modules.

1. **site**: This is the documentation site for the HPE Design System.
2. **library**: This library contains templates that demonstrate best practices for how to compose atomic components together into resuable patterns. In some cases, the templates may graduate into formalized Grommet components. This library is a work in progress, and we'd greatly accept feedback about which templates are valuable.

The monorepo is installed using [yarn](https://github.com/yarnpkg/yarn), and relies on [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Packages are automatically linked together, meaning you can do cross-package work within the repo. woot-woot!

### Basic structure and configurations

```
hpe-design-system/
  site/ OR library/
    package.json         // package-specific deps and scripts
    README.md            // shown in npmjs.com. included in npm artifact

.eslintignore            // eslint (linter) ignored directories/files
.eslintrc                // eslint (linter) configuration based on @hpe/project-scripts
.gitignore               // github's default node gitignore with customizations
.prettierrc.js           // prettier (formatter) configuration based on @hpe/project-scripts
package.json             // common dev deps and workspace-wide scripts
README.md                // workspace-wide information. shown in github
yarn.lock                // the only lock file in the repo. all packages combined
```

## Getting Started

```
yarn install
```

Running 'yarn install' anywhere in the monorepo hierarchy will always install ALL the modules in the workspaces.

Note: When installing, you may get and error saying "Integrity check failed for 'grommet' (computed integrity doesn't match our records...".
`site` references the latest stable branch of grommet. Any new commits added to grommet's stable branch cause its SHA hash to be updated and become out of sync with the SHA in the yarn.lock file.

To fetch the latest grommet stable, remove yarn.lock and clean yarn cache, then yarn install. For example: `rm yarn.lock && yarn cache clean && yarn install`

Run site in development mode:

```
cd site
yarn start
```

Running in production mode:

```
yarn build && yarn next start
```
