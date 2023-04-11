# grommet-theme-hpe

Hewlett Packard Enterprise design system theme.

## Installation

```
  $ yarn add grommet-theme-hpe
```

_NOTE: To install `grommet-theme-hpe` from a branch, use the `yarn` package
manager, since `npm install` fails to install from a branch name. `npm install`
will produce the error:_

```
$ npm install
npm ERR! code ENOPACKAGEJSON
...
```

## Usage

```
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

<Grommet theme={hpe} />
```

## stable

The `stable` branch includes all changes that have been merged to `master`. This branch can be used to experiment with changes that will be included in the next release. From your package.json point to stable.

```
"grommet-theme-hpe": "https://github.com/grommet/grommet-theme-hpe/tarball/stable",
```

## NEXT-stable

The `NEXT-stable` branch is used to prepare and stage changes for the next major theme release. The contents of `NEXT` branch are available on `NEXT-stable`. From your package.json point to NEXT-stable.

_NOTE: This branch should never be used in production as it contains work in progress and is a feature branch meant for experimentation._

```
"grommet-theme-hpe": "https://github.com/grommet/grommet-theme-hpe/tarball/NEXT-stable",
```

## AUDIT-stable

The `AUDIT-stable` branch is used to increase UI consistency and velocity across HPE applications by ensuring implementations use theme design tokens and avoid use of custom style overrides. Clean implmentations allow for evolving HPE brand styles and best practices to be seamlessly incorporated into HPE applications.

This branch serves as tool to help audit implementations by applying visual highlights to UI components whose implementations may prevent theme styles from being applied cleanly. An accompanying legend provides each highlight paired with an issue description and suggested remedy.

The contents of `AUDIT` branch are available on `AUDIT-stable`. From your package.json point to AUDIT-stable.

_NOTE: This branch should never be used in production as it is a branch meant for use as a tool to help teams maintain best practices for consuming `grommet-theme-hpe`._

```
"grommet-theme-hpe": "https://github.com/grommet/grommet-theme-hpe/tarball/AUDIT-stable",
```
