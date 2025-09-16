# HPE Design System Codemods

A codemod project to assist migrations for package versions related to the HPE Design System.

Available codemod transformations:

- [Grommet-theme-hpe v6 to v7](#Grommet-theme-hpe-v6-to-v7)

## Features

- Handles JS, JSX, TS, and TSX files
- Dry run and verbose options

## Usage

### 1. Install dependencies

```
yarn install
```

### 2. Run the codemod

you can run the codemod directly with npx:

```
npx hpe-design-system-codemods <codemod-transform> <path> [options]
```

## Codemod transforms

### Grommet-theme-hpe v6 to v7

- Automated migration of t-shirt size props (e.g., `gap`, `margin`, `pad`, `thickness`, `border`, `height`, `width`, `round`, etc.)
- Scan mode to detect t-shirt sizes without making changes.

#### Usage

```
npx hpe-design-system-codemods migrate-theme-v6-to-v7 <path> [options]
```

#### Options

- `--dry` Run in dry mode (no changes)
- `--scan` Scan for t-shirt sizes without transforming
- `--verbose` Set verbosity level (0, 1, or 2). Default is 0
- `--quote` Set quote style (single or double). Default is double
- `--help` Show help message

#### Example usage

```
node bin/cli.js migrate-theme-v6-to-v7 src/ --scan
node bin/cli.js migrate-theme-v6-to-v7 src/
node bin/cli.js migrate-theme-v6-to-v7 src/ --dry
node bin/cli.js migrate-theme-v6-to-v7 src/ --quote single --dry
node bin/cli.js migrate-theme-v6-to-v7 src/ --verbose 1 --dry
node bin/cli.js migrate-theme-v6-to-v7 src/ --verbose 2
```
