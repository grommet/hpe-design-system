# Structure Data Module

This module assembles and validates the HPE Design System documentation structure—the information architecture that powers routing, navigation, search, and categorization across the docs site.

## Quick Overview

The structure system transforms raw section arrays (components, foundation, learn, tokens, templates) into three integrated exports:

1. **`structure`** — The canonical page hierarchy
2. **`categoryMapping`** — Auto-generated category groupings for navigation
3. **`structureIndexes`** — Pre-built lookup tables for performant runtime access

All three are validated at build time and synchronized at runtime.

## Module Architecture

```
Raw Data (structures/)
  ├── components.tsx → 60+ component pages
  ├── foundation.tsx → accessibility, colors, etc.
  ├── learn.tsx → tutorials and guides
  ├── tokens.tsx → design token documentation
  └── templates/index.ts → use-case templates

        ↓ normalized through Structure model

structure.tsx (assembly & gating)
  ├── imports raw arrays
  ├── applies Structure.from() normalization
  ├── builds categoryMapping via buildCategoryMapping()
  ├── generates structureIndexes via buildStructureIndexes()
  └── validates via structureValidation → throws on error (strict mode) or warns

        ↓ exported as typed module

Consumers (runtime)
  ├── navItems.ts → uses structureIndexes.byCategory (from categoryMapping) for navigation UI
  ├── search.js → uses structureIndexes for search results
  └── _app.js, layouts/ → use getPrimaryPageByName() for page details
```

## File Directory

### Core Assembly

| File | Purpose | Key Exports |
|------|---------|-------------|
| **structure.tsx** | Main entrypoint; assembles raw arrays, applies transformations, enforces validation | `structure`, `categoryMapping`, `structureIndexes` |
| **buildCategoryMapping.ts** | Auto-generates category groups from structure data (replaces manual mapping) | `buildCategoryMapping()`, `getCategoryWeights()` |
| **structureIndexes.ts** | Pre-builds lookup tables for performant access (byName, bySlug, byCategory, etc.) | `buildStructureIndexes()`, `getPrimaryPageByName()`, `nameToSlug()` |
| **structureValidation.ts** | Zod-backed schema validation + referential integrity checks | `validateStructureData()`, `ALLOWED_CATEGORIES` |
| **structures/Structure.ts** | Base model and utility class for structure array manipulation | `Structure` class (sortByName, sortByCategory, etc.) |

### Raw Data (Section Arrays)

| File | Contents | Structure |
|------|----------|-----------|
| **structures/components.tsx** | 60+ UI components | Array of pages with category/parentPage |
| **structures/foundation.tsx** | Accessibility, colors, typography, spacing | Array with cardOrder, category properties |
| **structures/learn.tsx** | Tutorials, how-tos, explanations | Array of pages |
| **structures/tokens.tsx** | Design token reference | Array of pages |
| **structures/templates/index.ts** | Use-case templates + content layouts | Array with cardOrder |

### Tests

| File | Coverage |
|------|----------|
| **structure.validation.test.ts** | Build-time validation, schema, referential integrity |
| **buildCategoryMapping.test.ts** | Category grouping logic + live data integration |
| **structureIndexes.test.ts** | Index generation, slug collisions, lookup behavior |

### Supporting

| File | Purpose |
|------|---------|
| **index.js** | Exports all public types and utilities for consumers |
| **color.js, featured.js, toolkitItems.js** | Display/formatting utilities (not part of core structure) |
| **mockData/**, **wcag/** | Test fixtures and accessibility reference data |

## How to Add a Page

### 1. Add to the appropriate section array

Edit the relevant structure file (e.g., `structures/components.tsx`):

```typescript
export const components = [
  // ... existing pages
  {
    name: 'New Component',
    parentPage: 'Parent Component Name',  // links to parent hub
    category: 'Controls',                  // must be in ALLOWED_CATEGORIES
    description: 'Brief description',
    seoDescription: 'SEO-friendly description',
    relatedContent: ['Related Page 1', 'Related Page 2'],  // must exist in structure
    cardOrder: 5,                          // optional: controls sort order within category
  },
];
```

### 2. Page Properties

All pages must include:
- **`name`** (string, required) — Unique page identifier
- **`description`** (string, optional) — Display description
- **`seoDescription`** (string, optional) — Search engine description
- **`category`** (string, optional) — One of ALLOWED_CATEGORIES
- **`parentPage`** (string, optional) — Parent page name (must exist)
- **`pages`** (string[], optional) — Child page names (must all exist)
- **`relatedContent`** (string[], optional) — Related page names (must all exist)
- **`path`** (string, optional) — Explicit URL override (must start with `/`)
- **`href`** (string, optional) — External URL reference
- **`url`** (string, optional) — External website link
- **`cardOrder`** (number, optional) — Sort weight within siblings
- **`icon`** (function, optional) — React component lambda for rendering

### 3. Validation happens automatically

On next build:
```bash
pnpm --filter docs validate:structure
```

Validation will check:
- ✅ All referenced pages exist
- ✅ Parent/child relationships are bidirectional
- ✅ No slug collisions
- ✅ No duplicate explicit paths
- ✅ Categories are in allowlist

### Example: Adding a new Controls subcategory page

**File**: `structures/components.tsx`

```typescript
{
  name: 'Input Field',
  parentPage: 'Inputs',  // lives under Inputs hub
  category: 'Inputs',     // groups with other input controls
  description: 'Flexible text input for forms and searches.',
  seoDescription: 'Typography, sizing, validation, and state handling for text input fields.',
  relatedContent: ['Select', 'Checkbox', 'Radio Button'],
  cardOrder: 2,  // appears second among Inputs
}
```

After adding, validation ensures:
- ✅ 'Inputs' parent page exists
- ✅ 'Select', 'Checkbox', 'Radio Button' all exist
- ✅ Category 'Inputs' is allowed
- ✅ No slug collisions for 'input-field'

## Common Patterns

### Looking up a page by name

```typescript
import { getPrimaryPageByName, structureIndexes } from '../data';

const page = getPrimaryPageByName('Button', structureIndexes);
// Returns: { name: 'Button', category: 'Controls', parentPage: 'Components', ... }
```

### Getting all pages in a category

```typescript
import { structureIndexes } from '../data';

const controlsPages = structureIndexes.byCategory.Components.Controls;
// Returns: [{ name: 'Button', ... }, { name: 'Anchor', ... }, ...]
```

### Building navigation for a hub

```typescript
import { categoryMapping } from '../data';

const componentCategories = categoryMapping.Components;
// Returns: { Controls: ['Button', 'Anchor', ...], Layouts: ['Card', ...], ... }
```

### Finding a page by URL slug

```typescript
import { structureIndexes, nameToSlug } from '../data';

const slug = nameToSlug('Call to action card');  // → 'call-to-action-card'
const pages = structureIndexes.bySlug[slug];
// Returns: [{ name: 'Call to action card', ... }]
```

## Validation & Build Flow

### Default (Strict)
Validation errors **fail** the build:
```bash
pnpm --filter docs build
# ✗ Structure validation failed: Parent mismatch...
# Exit code 1
```

### Local Debug (Warn Only)
Override to warnings for local iteration:
```bash
STRICT_STRUCTURE_VALIDATION=false pnpm --filter docs build
# ⚠ Structure validation warnings: Parent mismatch...
# Exit code 0 (build continues)
```

### CI Always Strict
GitHub Actions always runs strict validation:
```yaml
- name: Validate docs structure data
  run: pnpm --filter docs validate:structure
```

## Further Reading

- **RFC & Decision History**: [RFC-STRUCTURE-REFACTORING.md](../../RFC-STRUCTURE-REFACTORING.md) — Why this architecture was chosen, deferred decisions, and resolved tradeoffs
- **Architecture Patterns**: See "Architecture & Developer Guide" section in the RFC for deeper patterns, extensibility, and anti-patterns
- **Implementation Details**:
  - [Structure Model & Utilities](structures/Structure.ts)
  - [Validation Schema](structureValidation.ts)
  - [Index Generation](structureIndexes.ts)
  - [Category Mapping](buildCategoryMapping.ts)
