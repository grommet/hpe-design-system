# Grommet Theme HPE Codemod Documentation

## Overview

`hpe-design-system-codemods` is a sophisticated code transformation tool designed to automatically migrate Grommet HPE theme code from version 6 to version 7. It uses [jscodeshift](https://github.com/facebook/jscodeshift) to parse and transform JavaScript, TypeScript, JSX, and TSX files, specifically targeting the migration of t-shirt size prop values.

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

### Global Installation (Recommended)

```bash
yarn install -g hpe-design-system-codemods
```

### Using npx (No Installation Required)

```bash
npx hpe-design-system-codemods migrate-theme-v6-to-v7 <path> [options]
```

### Local Development

```bash
git clone <repository-url>
cd hpe-design-system-codemods
yarn install
```

## Quick Start

### 1. Preview Changes (Dry Run)

See what changes would be made without modifying files:

```bash
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry
```

### 2. Apply Transformations

Apply the actual transformations:

```bash
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/
```

### 3. Scan for Changes

Scan your codebase to see areas that need manual transforming.

```bash
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --scan
```

## Transforms

### migrate-theme-v6-to-v7

This transform handles the migration of t-shirt size properties from Grommet HPE theme v6 to v7. It automatically updates size values across different property categories.

#### Supported File Types

- `.js` - JavaScript files
- `.jsx` - React JSX files
- `.ts` - TypeScript files
- `.tsx` - TypeScript JSX files

#### Property Categories

The codemod handles different categories of properties with specific size mappings:

##### Spacing Properties

Properties: `gap`, `margin`, `pad`, `thickness`

| v6 Size | v7 Size |
| ------- | ------- |
| xxsmall | 5xsmall |
| xsmall  | 3xsmall |
| small   | xsmall  |
| medium  | medium  |
| large   | xlarge  |
| xlarge  | 3xlarge |

##### Border Properties

Properties: `border`

| v6 Size | v7 Size |
| ------- | ------- |
| xlarge  | large   |

##### Container Properties

Properties: `height`, `width`, `columns`, `rows`

| v6 Size | v7 Size |
| ------- | ------- |
| xxsmall | 5xsmall |
| xsmall  | 3xsmall |
| small   | xsmall  |
| medium  | medium  |
| large   | xlarge  |
| xlarge  | xxlarge |
| xxlarge | 3xlarge |

##### Radius Properties

Properties: `round`

| v6 Size | v7 Size |
| ------- | ------- |
| small   | medium  |
| medium  | xlarge  |
| large   | xxlarge |
| xlarge  | xxlarge |

## CLI Options

### Core Options

| Option      | Description                                        | Default  |
| ----------- | -------------------------------------------------- | -------- |
| `--dry`     | Run in dry mode (preview changes without applying) | false    |
| `--scan`    | Scan for t-shirt sizes without transforming        | false    |
| `--verbose` | Set verbosity level (0, 1, or 2)                   | 0        |
| `--quote`   | Set quote style ('single' or 'double')             | 'double' |
| `--help`    | Show help message                                  | -        |

### Verbosity Levels

- **Level 0** (default): Minimal output, only shows essential information
- **Level 1**: Shows file processing information and summary (includes files in which have no changes)
- **Level 2**: Shows files that were successfully transformed

The `--scan` mode scans the entire project to look for areas that may need manual transforming.

## Usage Examples

### Basic Usage

```bash
# Transform all files in src directory
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/

# Transform specific file
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/components/MyComponent.jsx
```

### Scan Mode

```bash
# Scan entire project
npx hpe-design-system-codemods migrate-theme-v6-to-v7 . --scan

# Scan with verbose output
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --scan --verbose 2
```

### Dry Run Mode

```bash
# Preview changes with single quotes
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry --quote single

# Preview with detailed output (shows all files including NOC)
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry --verbose 1
```

### Development Commands

```bash
# Using local installation
node bin/cli.js migrate-theme-v6-to-v7 src/ --scan
node bin/cli.js migrate-theme-v6-to-v7 src/ --dry
node bin/cli.js migrate-theme-v6-to-v7 src/
```

## Migration Details

### What Gets Transformed

The codemod intelligently handles various code patterns:

#### 1. Simple String Props

**Before:**

```jsx
<Box pad="small" margin="large" />
```

**After:**

```jsx
<Box pad="xsmall" margin="xlarge" />
```

#### 2. Object Props

**Before:**

```jsx
<Box pad={{ horizontal: 'large', vertical: 'small' }} />
```

**After:**

```jsx
<Box pad={{ horizontal: 'xlarge', vertical: 'xsmall' }} />
```

#### 3. Array Props

**Before:**

```jsx
<Grid columns={['xsmall', 'small', 'medium']} />
```

**After:**

```jsx
<Grid columns={['3xsmall', 'xsmall', 'medium']} />
```

#### 4. Conditional Expressions

**Before:**

```jsx
<Box margin={isLarge ? 'large' : 'small'} />
```

**After:**

```jsx
<Box margin={isLarge ? 'xlarge' : 'xsmall'} />
```

#### 5. Variable Assignments

**Before:**

```javascript
const padding = 'small';
const spacing = { top: 'large', bottom: 'xsmall' };
```

**After:**

```javascript
const padding = 'xsmall';
const spacing = { top: 'xlarge', bottom: '3xsmall' };
```

#### 6. Complex Nested Structures

**Before:**

```javascript
const theme = {
  button: {
    pad: {
      small: { horizontal: 'xsmall', vertical: 'xxsmall' },
      medium: { horizontal: 'small', vertical: 'xsmall' },
    },
  },
};
```

**After:**

```javascript
const theme = {
  button: {
    pad: {
      small: { horizontal: '3xsmall', vertical: '5xsmall' },
      medium: { horizontal: 'xsmall', vertical: '3xsmall' },
    },
  },
};
```

#### 7. Special Properties

The codemod handles special properties like `nameProps` and `valueProps`:

**Before:**

```jsx
<NameValueList
  nameProps={{ width: 'xsmall' }}
  valueProps={{ width: ['small', 'medium'] }}
/>
```

**After:**

```jsx
<NameValueList
  nameProps={{ width: '3xsmall' }}
  valueProps={{ width: ['xsmall', 'medium'] }}
/>
```

### What Doesn't Get Transformed

The codemod is designed to be conservative and avoid false positives:

1. **Array.includes() calls**: Size values in `.includes()` method calls are preserved
2. **Non-style objects**: Objects without style-related properties are ignored
3. **Comments and strings**: T-shirt sizes in comments or unrelated strings are preserved
4. **Custom property names**: Only known Grommet properties are transformed

## Advanced Features

### Intelligent Pattern Recognition

The codemod uses sophisticated AST (Abstract Syntax Tree) analysis to:

- Distinguish between style-related and unrelated usage of size strings
- Handle deeply nested object and array structures
- Preserve code formatting and comments
- Maintain TypeScript type annotations

### Scan Mode Analysis

The scan mode provides detailed analysis:

- **File-by-file reporting**: Shows which files contain t-shirt sizes
- **Line-level precision**: Identifies exact locations of size usage
- **Pattern detection**: Distinguishes between different usage patterns
- **Manual review flagging**: Highlights cases that may need manual review

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

- ✅ Simple prop transformations
- ✅ Object and array handling
- ✅ Conditional expressions
- ✅ Variable assignments
- ✅ Nested structures
- ✅ Edge cases and error scenarios
- ✅ TypeScript compatibility
- ✅ Scan mode functionality

### Adding Tests

When contributing, add tests for new scenarios:

```javascript
// __tests__/migrate-theme-v6-to-v7.test.js
it('transforms your new scenario', () => {
  const input = 'your input code';
  const output = runCodemod(input);
  expect(output).toContain('expected output');
});
```

## Development

### Project Structure

```
hpe-design-system-codemods/
├── bin/
│   └── cli.js                    # Command-line interface
├── transforms/
│   └── migrate-theme-v6-to-v7.js # Main transformation logic
├── __tests__/
│   └── migrate-theme-v6-to-v7.test.js # Test suite
├── package.json                  # Package configuration
├── LICENSE                       # Apache 2.0 license
└── README.md                     # Basic usage guide
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

# Run tests
yarn test

# Test local CLI
node bin/cli.js migrate-theme-v6-to-v7 --help

# Debug with verbose output
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

- Use `--dry` mode to preview changes
- Check if custom property names conflict with standard Grommet props

#### "Verbose mode shows too many NOC (No Changes) files"

The verbose modes (`--verbose 1`) show NOC files being processed. This is a limitation of jscodeshift.

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

### Before Running the Codemod

1. **Create a backup** or ensure your code is in version control
2. **Run dry mode** to understand the scope of changes
3. **Test on a small subset** of files first
4. **Review the migration mappings** to understand the changes
5. **Run a scan mode** to understand the files that need manually reviewed

### After Running the Codemod

1. **Run your tests** to ensure functionality is preserved
2. **Review the changes** manually, especially flagged items from scan mode
3. **Test the UI** to ensure visual consistency

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Related Resources

- [Grommet Documentation](https://v2.grommet.io/)
- [HPE Design System](https://design-system.hpe.design/)
- [jscodeshift Documentation](https://github.com/facebook/jscodeshift)

---

_This documentation covers version 0.1.0 of hpe-design-system-codemods. For the latest updates and changes, please refer to the project's repository._
