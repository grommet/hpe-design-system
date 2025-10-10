# HPE Design System Codemods Documentation

> **Quick Start:** See [README.md](README.md) for basic usage and examples.

## Overview

This documentation provides comprehensive information about the HPE Design System codemods, including advanced features, troubleshooting, and development guidelines.

Available transforms:

- [migrate-grommet-icons-to-hpe](#migrate-grommet-icons-to-hpe) - Icon library migration
- [migrate-theme-v6-to-v7](#migrate-theme-v6-to-v7) - Theme size property migration

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Transforms](#transforms)
- [CLI Options](#cli-options)
- [Usage Examples](#usage-examples)
- [Migration Details](#migration-details)
- [Advanced Features](#advanced-features)
- [Testing](#testing)
- [Development](#development)
- [License](#license)

## Installation

### Using npx (Recommended)

No installation required - run codemods directly:

```bash
npx hpe-design-system-codemods <transform-name> <path> [options]
```

### Local Development

For contributing or customizing:

```bash
git clone https://github.com/grommet/hpe-design-system.git
cd hpe-design-system/packages/codemods
yarn install
```

## Quick Start

### 1. Preview Changes (Dry Run)

See what changes would be made without modifying files:

```bash
npx hpe-design-system-codemods <codemod transform> <path> --dry
```

### 2. Apply Transformations

Apply the actual transformations:

```bash
npx hpe-design-system-codemods <codemod transform> <path> src/
```

### 3. Scan for Changes

Scan your codebase to see areas that need manual transforming.

```bash
npx hpe-design-system-codemods <codemod transform> <path> --scan
```

## Supported File Types

- `.js` - JavaScript files
- `.jsx` - React JSX files
- `.ts` - TypeScript files
- `.tsx` - TypeScript JSX files

## Transforms

### migrate-grommet-icons-to-hpe

Automatically migrates icon imports from `grommet-icons` to `@hpe-design/icons-grommet`.

**Key Features:**
- Updates library imports from `grommet-icons` to `@hpe-design/icons-grommet`
- Remaps icon names (e.g., `StatusCriticalSmall` → `StatusCritical`, `Next` → `Right`)
- Updates JSX elements and all identifier references
- Supports aliased imports
- Warns about deprecated icons (logos, brand icons, etc.)

**Quick Example:**

```jsx
// Before
import { StatusCriticalSmall, Next, BarChart } from 'grommet-icons';

// After
import { StatusCritical, Right, ChartBar } from '@hpe-design/icons-grommet';
```

**📖 For detailed migration information, see:** [Icon Migration Guide](migration_guides/GROMMET_ICONS_TO_HPE.md)

### migrate-theme-v6-to-v7

Automatically migrates t-shirt size properties from Grommet HPE theme v6 to v7.

**Key Features:**
- Transforms spacing properties (`gap`, `margin`, `pad`, `thickness`)
- Handles container properties (`height`, `width`, `columns`, `rows`)
- Updates border and radius properties
- Supports complex nested structures and conditionals
- Scan mode to identify areas needing manual review

**Quick Example:**

```jsx
// Before
<Box pad="small" margin="large" />

// After
<Box pad="xsmall" margin="xlarge" />
```

**📖 For detailed migration information, see:** [Theme Migration Guide](migration_guides/MIGRATE_THEME_V6_TO_V7.md)

## CLI Options

### Core Options

| Option      | Description                                        | Default  | Applies To |
| ----------- | -------------------------------------------------- | -------- | ---------- |
| `--dry`     | Run in dry mode (preview changes without applying) | false    | All        |
| `--scan`    | Scan for changes without transforming              | false    | v6-to-v7   |
| `--verbose` | Set verbosity level (0, 1, or 2)                   | 0        | v6-to-v7   |
| `--quote`   | Set quote style ('single' or 'double')             | varies*  | All        |
| `--help`    | Show help message                                  | -        | All        |

*Default quote style: `single` for `migrate-grommet-icons-to-hpe`, `double` for `migrate-theme-v6-to-v7`

### Verbosity Levels (v6-to-v7 only)

- **Level 0** (default): Minimal output, only shows essential information
- **Level 1**: Shows file processing information and summary (includes files with no changes)
- **Level 2**: Shows files that were successfully transformed

### Scan Mode (v6-to-v7 only)

The `--scan` mode scans the entire project to look for areas that may need manual transforming without making any changes.

## Usage Examples

### migrate-grommet-icons-to-hpe

```bash
# Basic usage - migrate all files in src directory
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/

# Dry run to preview changes
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --dry

# Use double quotes instead of single quotes
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --quote double

# Development commands
node bin/cli.js migrate-grommet-icons-to-hpe src/
node bin/cli.js migrate-grommet-icons-to-hpe src/ --dry
```

### migrate-theme-v6-to-v7

```bash
# Basic usage - transform all files in src directory
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/

# Scan entire project for changes
npx hpe-design-system-codemods migrate-theme-v6-to-v7 . --scan

# Dry run with single quotes
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry --quote single

# Dry run with verbose output (shows all files including NOC)
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry --verbose 1

# Development commands
node bin/cli.js migrate-theme-v6-to-v7 src/ --scan
node bin/cli.js migrate-theme-v6-to-v7 src/ --dry
node bin/cli.js migrate-theme-v6-to-v7 src/
```

## Advanced Features

### Icon Migration (migrate-grommet-icons-to-hpe)

- **Smart remapping**: Automatically maps 100+ icon names to new conventions
- **Deprecation warnings**: Alerts about icons removed from the library
- **Alias preservation**: Maintains custom import aliases
- **Complete updates**: Updates imports, JSX, and all code references

### Theme Migration (migrate-theme-v6-to-v7)

- **Intelligent pattern recognition**: Uses AST analysis to distinguish style-related usage
- **Deep structure handling**: Processes nested objects and arrays
- **Scan mode analysis**: Provides file-by-file reporting and manual review flagging
- **Format preservation**: Maintains code formatting, comments, and TypeScript annotations

### Error Handling

- **Parse error recovery**: Continues processing other files if one file has syntax errors
- **Backup recommendations**: Suggests creating backups before transformation
- **Validation**: Includes comprehensive test suite to ensure transformation accuracy

## Testing

### Running Tests

```bash
# Run all tests
yarn test
```

### Test Coverage

The test suite covers:

**migrate-grommet-icons-to-hpe:**
- ✅ Library import updates
- ✅ Icon name remapping (100+ icons)
- ✅ JSX element updates
- ✅ Identifier reference updates
- ✅ Aliased imports
- ✅ Deprecated icon warnings
- ✅ Edge cases and real-world scenarios

**migrate-theme-v6-to-v7:**
- ✅ Simple prop transformations
- ✅ Object and array handling
- ✅ Conditional expressions
- ✅ Variable assignments
- ✅ Nested structures
- ✅ TypeScript compatibility
- ✅ Scan mode functionality

### Adding Tests

When contributing, add tests for new scenarios:

```javascript
// Example for migrate-grommet-icons-to-hpe
it('transforms your new icon scenario', () => {
  const input = "import { OldIcon } from 'grommet-icons';";
  const output = runCodemod(input);
  expect(output).toContain('NewIcon');
});

// Example for migrate-theme-v6-to-v7
it('transforms your new size scenario', () => {
  const input = '<Box pad="small" />';
  const output = runCodemod(input);
  expect(output).toContain('xsmall');
});
```

## Development

### Project Structure

```
hpe-design-system-codemods/
├── bin/
│   └── cli.js                                # Command-line interface
├── transforms/
│   ├── migrate-grommet-icons-to-hpe.js      # Icon migration logic
│   └── migrate-theme-v6-to-v7.js            # Theme size migration logic
├── __tests__/
│   ├── migrate-grommet-icons-to-hpe.test.js # Icon migration tests
│   └── migrate-theme-v6-to-v7.test.js       # Theme migration tests
├── migration_guides/
│   ├── GROMMET_ICONS_TO_HPE.md              # Icon migration guide
│   └── MIGRATE_THEME_V6_TO_V7.md            # Theme migration guide
├── package.json                              # Package configuration
├── LICENSE                                   # Apache 2.0 license
├── README.md                                 # Basic usage guide
└── DOCUMENTATION.md                          # This file
```

### Architecture

1. **CLI Layer** (`bin/cli.js`): Handles command-line parsing and file discovery
2. **Transform Layer** (`transforms/`): Contains the core AST transformation logic
3. **Test Layer** (`__tests__/`): Comprehensive test coverage for all scenarios

### Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Development Commands

```bash
# Install dependencies
yarn install

# Run all tests
yarn test

# Run tests for specific transform
yarn test migrate-grommet-icons-to-hpe
yarn test migrate-theme-v6-to-v7

# Test local CLI
node bin/cli.js --help
node bin/cli.js migrate-grommet-icons-to-hpe --help
node bin/cli.js migrate-theme-v6-to-v7 --help

# Debug with dry run and verbose output
node bin/cli.js migrate-grommet-icons-to-hpe src/ --dry
node bin/cli.js migrate-theme-v6-to-v7 src/ --dry --verbose 2
```

## Troubleshooting

### Common Issues

#### "No files found to process"

- Ensure the path exists and contains `.js`, `.jsx`, `.ts`, or `.tsx` files
- Check file permissions
- Use absolute paths if relative paths don't work

#### "Parse error in file X"

- File may have syntax errors
- Ensure file is valid JavaScript/TypeScript
- Check for unsupported syntax or experimental features

#### "Unexpected transformations"

- Use `--dry` mode to preview changes before applying
- Review the migration guides for expected transformations
- Check if custom property/icon names conflict with known patterns

#### Deprecated icon warnings (migrate-grommet-icons-to-hpe)

When you see warnings about deprecated icons:
1. Review the warning message for the icon name
2. Check the migration guide for suggested alternatives
3. Manually replace with an appropriate icon from `@hpe-design/icons-grommet`
4. Consider if the icon is still needed for your use case

#### "Verbose mode shows too many NOC (No Changes) files" (migrate-theme-v6-to-v7)

The verbose mode (`--verbose 1`) shows all files being processed, including those with no changes. This is a limitation of jscodeshift.

**Workarounds to see only changed files:**

```bash
# Option 1: Use scan mode first to identify files with changes
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --scan

# Option 2: Run without verbose, then check git diff
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/
git diff --name-only

# Option 3: Use git to track changes during transformation
git status --porcelain
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/
git status --porcelain
```

## Best Practices

### Before Running Any Codemod

1. **Create a backup** or ensure your code is in version control (Git recommended)
2. **Run dry mode** (`--dry`) to preview changes before applying
3. **Test on a small subset** of files first
4. **Review the migration guides** to understand expected transformations:
   - [Icon Migration Guide](migration_guides/GROMMET_ICONS_TO_HPE.md)
   - [Theme v6-to-v7 Guide](migration_guides/MIGRATE_THEME_V6_TO_V7.md)

### For migrate-grommet-icons-to-hpe

**Before:**
1. Read through the deprecation warnings
2. Identify which icons you're using
3. Check the mapping reference for remapped icons

**After:**
1. Review console warnings for deprecated icons
2. Manually replace deprecated icons with suitable alternatives
3. Install `@hpe-design/icons-grommet` and uninstall `grommet-icons`
4. Run your tests to ensure functionality is preserved
5. Test the UI to verify icons render correctly

### For migrate-theme-v6-to-v7

**Before:**
1. Run scan mode (`--scan`) to identify files needing changes
2. Review property categories and size mappings

**After:**
1. Run your tests to ensure functionality is preserved
2. Review changes manually, especially items flagged in scan mode
3. Test the UI to ensure visual consistency
4. Verify responsive behavior with different screen sizes

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Related Resources

- [HPE Design System](https://design-system.hpe.design/)
- [@hpe-design/icons-grommet](https://www.npmjs.com/package/@hpe-design/icons-grommet)
- [Grommet Documentation](https://v2.grommet.io/)
- [jscodeshift Documentation](https://github.com/facebook/jscodeshift)

---

## See Also

- **[README.md](README.md)** - Quick start guide and basic usage
- **[Icon Migration Guide](migration_guides/GROMMET_ICONS_TO_HPE.md)** - Detailed icon migration information
- **[Theme Migration Guide](migration_guides/MIGRATE_THEME_V6_TO_V7.md)** - Detailed theme migration information

---

_This documentation is for hpe-design-system-codemods. For the latest updates and changes, please refer to the project's repository._
