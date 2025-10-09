# HPE Design System Codemods

A codemod project to assist migrations for package versions related to the HPE Design System.

Available codemod transformations:

- [Grommet-icons to @hpe-design/icons-grommet](#grommet-icons-to-hpe-designicons-grommet)
- [Grommet-theme-hpe v6 to v7](#grommet-theme-hpe-v6-to-v7)

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

### grommet-icons to @hpe-design/icons-grommet

Automatically migrates icon imports from `grommet-icons` to `@hpe-design/icons-grommet`, handling:

- Library import updates from `grommet-icons` to `@hpe-design/icons-grommet`
- Icon name remapping (e.g., `StatusCriticalSmall` → `StatusCritical`, `Next` → `Right`)
- JSX element updates when icons are remapped
- Variable and function reference updates
- Aliased import support
- Deprecated icon warnings (logos, brand icons, etc.)

#### Usage

```bash
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe <path> [options]
```

#### Options

- `--dry` Run in dry mode (no changes)
- `--quote` Set quote style (single or double). Default is single
- `--help` Show help message

#### Example usage

```bash
# Migrate all files in src directory
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/

# Dry run to preview changes
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --dry

# Use double quotes
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --quote double
```

#### What it migrates

**Before:**
```jsx
import { StatusCriticalSmall, Next, Previous, BarChart } from 'grommet-icons';

const MyComponent = () => (
  <Box>
    <StatusCriticalSmall />
    <Button icon={<Previous />} />
    <Button icon={<Next />} />
    <BarChart />
  </Box>
);
```

**After:**
```jsx
import { StatusCritical, Right, Left, ChartBar } from '@hpe-design/icons-grommet';

const MyComponent = () => (
  <Box>
    <StatusCritical />
    <Button icon={<Left />} />
    <Button icon={<Right />} />
    <ChartBar />
  </Box>
);
```

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
