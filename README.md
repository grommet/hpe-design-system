# hpe design-system monorepo

### HPE Design System Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/39e37d4a-4f9f-4946-8aeb-b8328b1821cd/deploy-status)](https://app.netlify.com/sites/keen-mayer-a86c8b/deploys) - https://design-system.hpe.design/

### Storybook

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4cb8d72-f3c0-4490-a4d7-54273ac277ed/deploy-status)](https://app.netlify.com/sites/thirsty-shockley-2b7675/deploys) - http://storybook.hpe.design/

# Welcome to HPE Design System

Aries is a monorepo built from two modules.

1. aries-core
2. aries-site (For designers and developers. This is the documentation site for the HPE Design System.)

The Monorepo is installed using [yarn](https://github.com/yarnpkg/yarn), and relies on [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Packages are automatically linked together, meaning you can do cross-package work within the repo. woot-woot!

### Basic structure and configurations

```
aries/
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

## Getting Started

```
yarn install
```

Running 'yarn install' anywhere in the monorepo hierarchy will always install ALL the modules in the workspaces.

Run aries-site in development mode:

```
cd aries-site
yarn start
```

Running in production mode:

```
yarn build
```


