# HPE Design System Codemods

A collection of codemods to assist with migrations for the HPE Design System.

## Quick Start

Run codemods directly with npx (no installation required):

```bash
npx hpe-design-system-codemods <transform-name> <path> [options]
```

## Available Transforms

- **[migrate-grommet-icons-to-hpe](#migrate-grommet-icons-to-hpe)** - Migrate from `grommet-icons` to `@hpe-design/icons-grommet`
- **[migrate-theme-v6-to-v7](#migrate-theme-v6-to-v7)** - Migrate Grommet HPE theme v6 to v7 t-shirt sizes

## Features

- ✅ Handles JS, JSX, TS, and TSX files
- ✅ Dry run mode to preview changes
- ✅ Comprehensive test coverage
- ✅ Detailed migration guides

## 📚 Documentation

- **[Complete Documentation](DOCUMENTATION.md)** - Comprehensive guide with advanced features
- **[Migration Guides](migration_guides/)** - Detailed migration information for each transform

## Codemod transforms

## Transform Details

### migrate-grommet-icons-to-hpe

Migrates icon imports from `grommet-icons` to `@hpe-design/icons-grommet` with automatic name remapping.

**Quick Start:**
```bash
# Basic usage
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/

# Preview changes first
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --dry
```

**Key Features:**
- ✅ Updates library imports
- ✅ Remaps 100+ icon names (e.g., `StatusCriticalSmall` → `StatusCritical`) 
- ✅ Updates JSX elements and references
- ✅ Handles aliased imports
- ✅ Warns about deprecated icons

**📖 [Complete Migration Guide →](migration_guides/GROMMET_ICONS_TO_HPE.md)**

**Before/After Example:**
```jsx
// Before
import { StatusCriticalSmall, Next, BarChart } from 'grommet-icons';

// After  
import { StatusCritical, Right, ChartBar } from '@hpe-design/icons-grommet';
```

### migrate-theme-v6-to-v7

Migrates Grommet HPE theme v6 to v7 t-shirt size properties with intelligent pattern recognition.

**Quick Start:**
```bash
# Basic usage
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/

# Scan for changes without transforming
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --scan

# Preview changes first
npx hpe-design-system-codemods migrate-theme-v6-to-v7 src/ --dry
```

**Key Features:**
- ✅ Migrates spacing properties (`gap`, `margin`, `pad`, `thickness`)
- ✅ Updates container properties (`height`, `width`, `columns`, `rows`) 
- ✅ Handles border and radius properties
- ✅ Scan mode for manual review identification
- ✅ Preserves complex nested structures

**📖 [Complete Migration Guide →](migration_guides/MIGRATE_THEME_V6_TO_V7.md)**

**Before/After Example:**
```jsx
// Before
<Box pad="small" margin="large" />

// After
<Box pad="xsmall" margin="xlarge" />
```

---

## Need Help?

- 📖 **[Complete Documentation](DOCUMENTATION.md)** - Advanced features, troubleshooting, development
- 🔧 **[Migration Guides](migration_guides/)** - Detailed transformation information
- 🐛 **Issues?** Open an issue in the [HPE Design System repository](https://github.com/grommet/hpe-design-system)
