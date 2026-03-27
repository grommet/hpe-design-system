# RFC: Structure System Refactoring

**Status**: Phase 4 Complete (Validation + Indexes Integrated; TypeScript structure entrypoint delivered)  
**Author**: Design System Team  
**Date**: March 2026  
**Related**: Phase 1 Testing (✅ Complete) → Phase 2 Routes (✅ Complete) → Phase 3 Categories (✅ Complete) → Phase 4 Architecture (✅ Complete)

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

## Implemented Solution

### **Phase 2: Remove Hardcoded Routes** ✅ COMPLETE

- Routing is data-driven, including explicit `path` overrides for nested pages.
- Hardcoded route exceptions were removed from runtime path resolution.
- Route parity tests were added to lock URL behavior and prevent regressions.

### **Phase 3: Auto-Generate Category Mapping** ✅ COMPLETE

- Category grouping is generated from structure data via `buildCategoryMapping()`.
- Navigation consumers use generated mappings (no manual sync table).
- Category order/weights are derived from generated mapping for deterministic sorting.

### **Phase 4: Validation, Indexes, and Type Safety** ✅ COMPLETE

- Build-time and runtime validation now run through Zod-backed checks.
- Pre-built indexes (`byName`, `bySlug`, `byParent`, `byCategory`) are generated once and reused.
- Runtime consumers now resolve lookups through index-backed helpers.
- The structure assembly entrypoint is TypeScript (`structure.tsx`) and exports typed indexes/mappings.

### **Current Guardrails in Effect**

- Default strict validation behavior fails build/runtime on structure integrity errors.
- Local warn-only mode is available through env flags for migration/debug workflows.
- CI enforces structure validation, docs unit tests, and docs build gates.

---

## Testing Strategy

### **Implemented Test Coverage**
- Structure validation tests (schema + referential integrity + collision checks)
- Utility/search/navigation tests
- Route parity tests for URL stability
- Category mapping tests (mock + live data integration)

### **CI Integration**
The docs workflow (`.github/workflows/docs-unit-tests.yml`) enforces:

1. `pnpm --filter docs validate:structure`
2. `pnpm --filter docs test:unit`
3. `pnpm --filter docs build` (pull requests)

---

## Migration Timeline

| Phase | Status | Result |
|-------|--------|--------|
| Phase 1: Tests | ✅ Complete | Baseline coverage and guardrails established |
| Phase 2: Routes | ✅ Complete | Data-driven pathing and parity protection shipped |
| Phase 3: Categories | ✅ Complete | Generated category mapping replaced manual mapping |
| Phase 4: Architecture | ✅ Complete | Validation, indexes, and TS entrypoint integrated |

**Progress**: 4 of 4 phases complete
**Current State**: Structure system refactor objectives are implemented and enforced in CI

---

## Success Metrics

- ✅ Route handling is data-driven; hardcoded exception mappings removed.
- ✅ Category mapping is generated from structure data and consumed by navigation.
- ✅ Validation is enforced in both CI and runtime/build flow.
- ✅ Index-backed lookup paths are integrated into runtime consumers.
- ✅ TypeScript structure entrypoint (`structure.tsx`) is active.

---

## Implementation Progress

### ✅ Delivered (March 2026)

- **Phase 1**: Validation/search/navigation tests established as baseline.
- **Phase 2**: Route pathing made data-driven and parity-tested.
- **Phase 3**: Category mapping generation and category-weight sorting integrated.
- **Phase 4**: Zod validation, index generation, strict runtime/build gating, and TypeScript structure entrypoint delivered.

### ✅ Current Status

- No pending RFC phase work remains for this refactor.
- The refactor is now an operational baseline guarded by CI and validation checks.

---

## Resolved Decisions

### Carry-Forward Items (Completed)

1. **Live-data integration tests for category mapping** ✅ RESOLVED
   - **Original goal**: Assert generated `categoryMapping` for `Foundation` and `Components` against live structure data.
   - **Resolution**: Implemented 4 new integration tests in `buildCategoryMapping.test.ts` verifying category grouping and weight derivation for both hubs.
   - **Status**: All passing; provided end-to-end validation that auto-generated mapping matches expected behavior.

2. **TypeScript migration of structure entry point** ✅ RESOLVED
   - **Original goal**: Convert `structure.js` to TypeScript (`structure.tsx`).
   - **Resolution**: Migrated to `structure.tsx` with typed imports, JSX icon functions, and full type coverage for structure assembly.
   - **Status**: Active in production; type safety enforced at module level.

3. **TypeScript Migration of Child Structure Files** ✅ RESOLVED
   - **Original goal**: Migrate all structure data files (components.js, foundation.js, learn.js, tokens.js, templates.js).
   - **Resolution**: Migrated all to TypeScript/TSX (components.tsx, foundation.tsx, learn.tsx, tokens.tsx, templates.tsx, content-layouts.ts).
   - **Status**: Full structure layer is now TypeScript; type safety enforced across all data modules.

### Deferred Decisions (Decision Made)

1. **Option B: Separate Configuration Files**
   - **Question**: Should we split structure into dedicated `routes.config`, `content.config`, `navigation.config` files?
   - **Decision**: Deferred
   - **Rationale**: Option A (flat array + indexes) was lower risk and provided sufficient separation for operational needs. Option B can be revisited if structure complexity grows further.

2. **Warn-only Mode Longevity**
   - **Question**: Should local warn-only validation mode be kept long term?
   - **Decision**: Kept as intended
   - **Rationale**: Strict mode remains default in CI/build. Warn-only flags (`STRICT_STRUCTURE_VALIDATION=false`, `STRUCTURE_VALIDATION_WARN_ONLY=true`) are available for local migration and debug workflows, not production use.

3. **Icon Function Handling in Data**
   - **Question**: Should icon functions be replaced with identifier strings to separate JSX from data?
   - **Decision**: Unchanged
   - **Rationale**: JSX icon lambdas are intentional—they allow lazy evaluation and keep icon rendering at the point of consumption. No refactoring planned; addresses are solved through type clarity and test coverage.

---

## References

- [Phase 1 Test Implementation](apps/docs/src/data/__tests__/)
- [Current Structure System](apps/docs/src/data/structure.tsx)
- [Navigation Implementation](apps/docs/src/layouts/navigation/navItems.ts)
- [Utility Functions](apps/docs/src/utils/search.js)
