# hpe-design-system

### HPE Design System Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/39e37d4a-4f9f-4946-8aeb-b8328b1821cd/deploy-status)](https://app.netlify.com/sites/keen-mayer-a86c8b/deploys)

https://design-system.hpe.design/

# Welcome to HPE Design System

hpe-design-system is a monorepo containing core assets and documentation for the HPE Design System.

- aries-site: The documentation site for the design system.
- design-tokens: The source code for [hpe-design-tokens](https://www.npmjs.com/package/hpe-design-tokens).
- aries-core: Used for accessibility testing.

The monorepo is installed using [yarn](https://github.com/yarnpkg/yarn), and relies on [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

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
yarn.lock                // the only lock file in the repo. all packages combined
```

## Getting started

```
yarn install
```

Running 'yarn install' anywhere in the monorepo hierarchy will always install ALL the modules in the workspaces.

Note: When installing, you may get and error saying "Integrity check failed for 'grommet' (computed integrity doesn't match our records...". 
`aries-site` references the latest stable branch of grommet. Any new commits added to grommet's stable branch cause its SHA hash to be updated and become out of sync with the SHA in the yarn.lock file. 

To fetch the latest grommet stable, remove yarn.lock and clean yarn cache, then yarn install. For example: `rm yarn.lock && yarn cache clean && yarn install`

Run aries-site in development mode:

```
cd aries-site
yarn start
```

Run in production mode:

```
yarn start-server
```


