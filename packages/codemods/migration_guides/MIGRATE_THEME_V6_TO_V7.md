# Grommet Theme HPE v6 to v7 Migration Guide

## Overview

This transform handles the migration of t-shirt size properties from Grommet HPE theme v6 to v7. It uses [jscodeshift](https://github.com/facebook/jscodeshift) to parse and transform JavaScript, TypeScript, JSX, and TSX files, specifically targeting the migration of t-shirt size prop values.

## Property Categories

This transform handles different categories of properties with specific size mappings:

### Spacing Properties

Properties: `gap`, `margin`, `pad`, `thickness`

| v6 Size | v7 Size |
| ------- | ------- |
| xxsmall | 5xsmall |
| xsmall  | 3xsmall |
| small   | xsmall  |
| medium  | medium  |
| large   | xlarge  |
| xlarge  | 3xlarge |

### Border Properties

Properties: `border`

| v6 Size | v7 Size |
| ------- | ------- |
| xlarge  | large   |

### Container Properties

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

### Radius Properties

Properties: `round`

| v6 Size | v7 Size |
| ------- | ------- |
| small   | medium  |
| medium  | xlarge  |
| large   | xxlarge |
| xlarge  | xxlarge |

## Usage

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

## What Gets Transformed

The codemod intelligently handles various code patterns:

### 1. Simple String Props

**Before:**

```jsx
<Box pad="small" margin="large" />
```

**After:**

```jsx
<Box pad="xsmall" margin="xlarge" />
```

### 2. Object Props

**Before:**

```jsx
<Box pad={{ horizontal: 'large', vertical: 'small' }} />
```

**After:**

```jsx
<Box pad={{ horizontal: 'xlarge', vertical: 'xsmall' }} />
```

### 3. Array Props

**Before:**

```jsx
<Grid columns={['xsmall', 'small', 'medium']} />
```

**After:**

```jsx
<Grid columns={['3xsmall', 'xsmall', 'medium']} />
```

### 4. Conditional Expressions

**Before:**

```jsx
<Box margin={isLarge ? 'large' : 'small'} />
```

**After:**

```jsx
<Box margin={isLarge ? 'xlarge' : 'xsmall'} />
```

### 5. Variable Assignments

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

### 6. Complex Nested Structures

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

### 7. Special Properties

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

## What Doesn't Get Transformed

The codemod is designed to be conservative and avoid false positives:

1. **Array.includes() calls**: Size values in `.includes()` method calls are preserved
2. **Non-style objects**: Objects without style-related properties are ignored
3. **Comments and strings**: T-shirt sizes in comments or unrelated strings are preserved
4. **Custom property names**: Only known Grommet properties are transformed

## CLI Options

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

## Related Resources

- [Grommet Documentation](https://v2.grommet.io/)
- [HPE Design System](https://design-system.hpe.design/)
- [jscodeshift Documentation](https://github.com/facebook/jscodeshift)
