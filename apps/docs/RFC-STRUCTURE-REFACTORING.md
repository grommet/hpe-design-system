# RFC: Structure System Refactoring

**Status**: Draft  
**Author**: Design System Team  
**Date**: March 2026  
**Related**: Phase 1 Testing Implementation

---

## Problem Statement

The current structure system in the HPE Design System docs has several critical issues:

### **Critical Issues**
1. **No validation or tests** - 2000+ lines of data with zero runtime validation
2. **Hardcoded route mappings** - Nested pages require manual URL mappings in code
3. **Duplicate category mapping** - categoryMapping must be manually synced
4. **Mixed concerns** - SEO, routing, display, and categorization all in one place
5. **Fragile string references** - No referential integrity, easy to break with typos
6. **50+ dependent files** - Changes ripple across the entire codebase

### **Impact**
- Difficult to add new pages or change structure
- Easy to create bugs that aren't caught until runtime
- Maintainability decreases as system grows
- Onboarding new contributors is difficult

---

## Goals

1. **Safety**: Add comprehensive test coverage before any refactoring
2. **Data-driven**: Remove hardcoded route mappings
3. **DRY**: Eliminate duplicate category definitions
4. **Clarity**: Separate routing, content, and display concerns
5. **Scalability**: Make it easy to add/modify pages
6. **Type Safety**: Enforce schema at build time

---

## Proposed Solution

### **Phase 2: Remove Hardcoded Routes** (2 weeks)

#### **Problem**
`nameToPath()` utility has hardcoded URL mappings:
```typescript
if (name === 'Call to action card') return '/components/card/call-to-action-card';
if (name === 'Center layer') return '/components/layer/center-layer';
// ... 10+ more hardcoded exceptions
```

#### **Proposed Solution**
Add explicit path configuration to PageDetails:

**Option A: Explicit Paths** (Clearer)
```typescript
// structure.d.ts
export interface PageDetails {
  name: string;
  path?: string;  // NEW: explicit URL path
  // ... rest
}

// components.js
{
  name: 'Call to action card',
  path: '/components/card/call-to-action-card',  // Explicit
  parentPage: 'Card',
  category: 'Layouts',
}
```

**Option B: Path Segments** (More Flexible)
```typescript
export interface PageDetails {
  name: string;
  slug?: string;       // NEW: URL slug (defaults to nameToSlug(name))
  parentPath?: string; // NEW: where parent lives
  // ... rest
}

// components.js
{
  name: 'Call to action card',
  slug: 'call-to-action-card',
  parentPath: '/components/card',
  parentPage: 'Card',
}
```

#### **Implementation**
```typescript
// Refactored nameToPath
export const nameToPath = (name: string): string => {
  const page = getPageDetails(name);
  if (!page.name) return '/';
  
  // 1. Explicit path takes precedence
  if (page.path) return page.path;
  
  // 2. External URLs
  if (page.url) return page.url;
  
  // 3. Hub pages
  if (page.pages) return `/${nameToSlug(page.name)}`;
  
  // 4. Home special case
  if (name === 'Home') return '/';
  
  // 5. Build from parent + slug
  const parent = getParentPage(name);
  const slug = page.slug || nameToSlug(name);
  
  if (parent) {
    const parentPath = nameToPath(parent.name);
    return `${parentPath}/${slug}`;
  }
  
  // 6. Section deeplink
  const sectionParent = getSectionParent(name);
  if (sectionParent) {
    return `${nameToPath(sectionParent.name)}#${slug}`;
  }
  
  // 7. Top-level page
  return `/${slug}`;
};
```

#### **Migration Strategy**
1. Add `path` property to all nested pages in data files
2. Update tests to verify paths
3. Deploy and verify no routing breaks
4. Remove hardcoded exceptions from `nameToPath()`
5. Add validation to ensure no hardcoded paths remain

#### **Benefits**
- ✅ All routing configuration in data (no code changes needed)
- ✅ Easy to add/modify nested pages
- ✅ Self-documenting (path is explicit in data)
- ✅ Backwards compatible during migration

#### **Risks**
- 🟡 Need to update ~15 nested page definitions
- 🟡 Must validate all paths are correct

---

### **Phase 3: Auto-Generate Category Mapping** (1 week)

#### **Problem**
`categoryMapping` in structure.js duplicates information already in page definitions:
```javascript
// structure.js - Manual mapping (50+ lines)
export const categoryMapping = {
  Components: {
    'Layouts': ['Card', 'Header', 'Footer', ...],
    'Controls': ['Button', 'Anchor', 'Tabs', ...],
    // ...
  },
};

// components.js - Already has this info!
{ name: 'Button', category: 'Controls' }
{ name: 'Card', category: 'Layouts' }
```

#### **Proposed Solution**
Build mapping dynamically from structure data:

```typescript
// New file: src/data/buildCategoryMapping.ts
import { structure } from './structure';

export function buildCategoryMapping() {
  const mapping: Record<string, Record<string, string[]>> = {};
  
  // Find parents with categoryOrder
  const parents = structure.filter(p => p.categoryOrder && p.pages);
  
  parents.forEach(parent => {
    mapping[parent.name] = {};
    
    // Initialize categories
    parent.categoryOrder.forEach(category => {
      mapping[parent.name][category] = [];
    });
    
    // Group children by category
    parent.pages.forEach(pageName => {
      const page = structure.find(p => p.name === pageName);
      if (page?.category && mapping[parent.name][page.category]) {
        mapping[parent.name][page.category].push(pageName);
      }
    });
  });
  
  return mapping;
}

// navItems.ts
const categoryMapping = buildCategoryMapping();
```

#### **Migration Strategy**
1. Create `buildCategoryMapping()` function
2. Update `navItems.ts` to use generated mapping
3. Add tests to validate generated mapping matches expected structure
4. Remove manual `categoryMapping` from structure.js
5. Add validation to catch category mismatches

#### **Benefits**
- ✅ Single source of truth (no duplication)
- ✅ Automatic - no manual syncing needed
- ✅ Catches category typos immediately
- ✅ Easier to add/reorganize pages

#### **Risks**
- 🟢 Low risk - can validate output matches current manually
- 🟢 Easy to rollback if issues found

---

### **Phase 4: Separation of Concerns** (2-3 weeks)

#### **Problem**
Structure mixes routing, SEO, display, and categorization:
```typescript
{
  name: 'Button',
  seoDescription: '...',      // SEO
  description: '...',          // Display
  category: 'Controls',        // Navigation
  relatedContent: [...],       // Content
  icon: () => <Icon />,       // Display
  // What's this page's URL? Hidden in logic!
}
```

#### **Proposed Solution Options**

**Option A: Keep Flat Array, Add Indexes** (Conservative)
```typescript
// structure.ts - Keep existing format
export const structure = [ /* existing */ ];

// NEW: Pre-built indexes for performance
export const structureIndex = {
  byName: new Map(structure.map(p => [p.name.toLowerCase(), p])),
  bySlug: new Map(structure.map(p => [nameToSlug(p.name), p])),
  byParent: groupByParent(structure),
  byCategory: groupByCategory(structure),
};

// Utilities become simpler and faster
export const getPageDetails = (name: string) => {
  return structureIndex.byName.get(name.toLowerCase()) || {};
};
```

**Option B: Separate Configuration Files** (Radical)
```typescript
// routes.config.ts - Explicit routing
export const routes = {
  '/': { page: 'Home' },
  '/foundation': { page: 'Foundation' },
  '/foundation/accessibility': { page: 'Accessibility' },
  '/components/button': { page: 'Button' },
  '/components/card': { 
    page: 'Card',
    children: {
      'call-to-action-card': { page: 'Call to action card' },
    }
  },
};

// content.config.ts - Pure metadata (no routing)
export const pages = {
  'Home': {
    seoDescription: '...',
    // No routing info
  },
  'Button': {
    description: '...',
    category: 'Controls',
    relatedContent: ['Anchor', 'Tabs'],
  },
};

// navigation.config.ts - Explicit nav tree
export const navigationTree = {
  label: 'Home',
  url: '/',
  children: [
    {
      label: 'Components',
      children: [
        { label: 'Overview', url: '/components' },
        {
          label: 'Layouts',
          type: 'group',
          children: [
            { label: 'Box', url: '/components/box' },
            // ...
          ]
        },
      ]
    },
  ]
};
```

**Option C: TypeScript Migration with Strict Types**
```typescript
// Convert to .ts files, enable strict mode
// structure.ts
import { z } from 'zod';

const PageSchema = z.object({
  name: z.string().min(1),
  path: z.string().startsWith('/').optional(),
  seoDescription: z.string().optional(),
  pages: z.array(z.string()).optional(),
  category: z.enum(['Layouts', 'Controls', 'Inputs', ...]).optional(),
  // ... all properties with validation
});

export const structure = pageSchemaArray.parse([
  // Validated at build time!
]);
```

#### **Recommendation: Option A + Option C**
- Keep existing structure format (low migration risk)
- Add build-time validation with Zod
- Add performance indexes
- Convert to TypeScript for type safety

#### **Migration Strategy**
1. **Week 1**: Add Zod schema and validation
2. **Week 2**: Convert structure files to TypeScript
3. **Week 3**: Add pre-built indexes, update utilities
4. **Week 4**: Testing and rollout

#### **Benefits**
- ✅ Build-time validation catches errors early
- ✅ Better TypeScript support and IDE autocomplete
- ✅ Performance improvements from indexed lookups
- ✅ Easier to refactor further if needed

#### **Risks**
- 🟡 TypeScript migration requires updating all structure files
- 🟡 Team must learn Zod if using validation
- 🟢 Can validate incrementally (start with structure.ts, then children)

---

## Testing Strategy

### **Phase 1: Comprehensive Test Suite** (✅ Implemented)
- Structure data validation tests
- Utility function tests
- Navigation generation tests
- Referential integrity checks

### **Phases 2-4: Test-Driven Refactoring**
For each change:
1. Write tests for desired behavior (red)
2. Implement changes (green)
3. Refactor for clarity (refactor)
4. Validate no regressions

### **CI Integration**
```yaml
# .github/workflows/test.yml
- name: Unit Tests
  run: pnpm test:unit
  
- name: Validate Structure
  run: pnpm test:unit --grep "Structure Data Validation"
```

---

## Migration Timeline

| Phase | Duration | Risk | Prerequisites |
|-------|----------|------|---------------|
| Phase 1: Tests | 1 week | 🟢 Low | None |
| Phase 2: Routes | 2 weeks | 🟡 Medium | Phase 1 complete |
| Phase 3: Categories | 1 week | 🟢 Low | Phase 1 complete |
| Phase 4: Architecture | 2-3 weeks | 🟡 Medium | Phases 1-3 complete |

**Total**: 6-7 weeks for complete refactoring

---

## Success Metrics

- ✅ 100% test coverage for structure system
- ✅ Zero hardcoded routes in utilities
- ✅ Single source of truth for categories
- ✅ Build-time validation catches schema errors
- ✅ No production routing issues during migration
- ✅ Faster onboarding for new contributors
- ✅ Easy to add/modify pages (< 5 min)

---

## Alternatives Considered

### **Do Nothing**
- **Pros**: No migration risk
- **Cons**: Technical debt increases, harder to maintain
- **Verdict**: ❌ Not sustainable

### **Big Bang Rewrite**
- **Pros**: Clean slate, ideal architecture
- **Cons**: High risk, long downtime, potential for bugs
- **Verdict**: ❌ Too risky for production system

### **Incremental Refactoring** (Recommended)
- **Pros**: Test-driven, low risk, reversible
- **Cons**: Takes longer (6-7 weeks)
- **Verdict**: ✅ Recommended approach

---

## Open Questions

1. **Should we adopt Option B (separate config files)?**
   - More architectural change but cleaner separation
   - Team discussion needed

2. **Should we use Zod or another validation library?**
   - Zod is popular and TypeScript-first
   - Alternatives: Yup, io-ts, AJV

3. **Should structure files remain .js or convert to .ts?**
   - .ts provides better type checking
   - May require build process changes

4. **How do we handle icon functions in data?**
   - Current approach mixes JSX with data
   - Consider icon identifier strings instead

---

## Next Steps

1. **Review and approve Phase 1 tests** ← YOU ARE HERE
2. **Run Phase 1 tests for 1-2 weeks** to ensure coverage
3. **Team review of RFC** - discuss Phase 2-4 approach
4. **Prioritize phases** based on pain points
5. **Create implementation tickets** for approved phases
6. **Begin Phase 2 implementation**

---

## References

- [Phase 1 Test Implementation](apps/docs/src/data/__tests__/)
- [Current Structure System](apps/docs/src/data/structure.js)
- [Navigation Implementation](apps/docs/src/layouts/navigation/navItems.ts)
- [Utility Functions](apps/docs/src/utils/search.js)

---

## Appendix: Current System Metrics

- **Total structure entries**: ~200 pages
- **Files depending on structure**: 50+
- **Lines of structure data**: 2000+
- **Hardcoded routes**: 15+
- **Manual category mappings**: 2 (Foundation, Components)
- **Test coverage**: 0% → **Target: 100%**
