# Figma Cleanup & Sync Verification Guide

## Overview
This guide walks you through verifying the Figma cleanup and retrying the sync-tokens-to-figma process.

## What Was Wrong
Your component file had duplicate remote library bindings:
- **color** collection: Bound to TWO sources (dc07d8... + b58247...)
- **dimension** collection: Bound to TWO sources (b1da8e... + 4906e1...)

This caused the `sync-tokens-to-figma` to fail at reference validation with ~500 invalid variable reference errors.

## After Manual Cleanup: Verification Steps

### 1. Make Your Component File Key Accessible
Before running verification, ensure your environment variables are set:

```bash
export FILE_KEY_COMPONENT="<your-component-file-key>"
export FIGMA_COMPONENT_COLLECTION_KEY="<your-component-remote-collection-key>"
export PERSONAL_ACCESS_TOKEN="<your-figma-pat>"
```

These should already be set if you ran the earlier collection discovery. Check with:
```bash
env | grep FIGMA_
env | grep FILE_KEY_
```

### 2. Run the Verification Script

Make the script executable:
```bash
chmod +x scripts/verify-figma-cleanup.sh
```

Run verification:
```bash
./scripts/verify-figma-cleanup.sh
```

**What it checks:**
- ✓ Environment variables are set
- ✓ Component file contains only 1 remote source for "color"
- ✓ Component file contains only 1 remote source for "dimension"
- ✓ Remote sources match expected canonical keys

**Expected output:**
```
✓ Color collection: Only 1 remote source (cleanup successful)
✓ Dimension collection: Only 1 remote source (cleanup successful)
```

If you see ✗ instead of ✓, the duplicate still exists. Go back to Figma and repeat the manual cleanup steps.

### 3. Manual Verification (Alternative)

If you prefer to verify manually without the script:

```bash
# Query all collections in component file
pnpm figma-variables-cli -- \
  --non-interactive \
  --strict-flags \
  --action=collections \
  --source=local \
  --file-key=$FILE_KEY_COMPONENT \
  --format=json
```

In the JSON output, look for:
- Under "collections", find items with `"name": "color"` and `"name": "dimension"`
- For each, check if `"remote": true`
- Each should have exactly ONE entry (or all should be `remote: false`)

```bash
# Drill down to specific collection to see remote sources
pnpm figma-variables-cli -- \
  --non-interactive \
  --strict-flags \
  --action=collection-by-id \
  --source=local \
  --file-key=$FILE_KEY_COMPONENT \
  --collection-id=<collection-id-from-previous-output> \
  --format=json
```

The `collections` array should have exactly 1 entry per collection.

## After Verification: Retry the Sync

Once verification shows ✓ for both color and dimension:

### Option 1: Full Sync Run
```bash
pnpm sync-tokens-to-figma
```

This will:
1. Validate reference integrity (should now pass)
2. Generate token files
3. Update variables in Figma
4. Publish library updates

### Option 2: Dry Run First (Recommended)
Check if there's a dry-run or verbose mode available:

```bash
pnpm sync-tokens-to-figma --help
```

If available, use it to preview changes before committing.

## Troubleshooting

### Verification Shows Still Multiple Remote Sources
**Symptom:** ✗ indicates color or dimension still has 2+ remote sources
**Solution:** 
1. Go back to Figma
2. Open the component file again
3. Check Assets → Libraries for the collection
4. Make sure you removed BOTH duplicate bindings
5. Re-run verification

### Sync Still Fails at Reference Validation
**Symptom:** sync-tokens-to-figma fails with "invalid variable references"
**Cause:** Not all duplicates were removed, or there are other unmapped variables
**Solution:**
1. Re-run verification to confirm cleanup
2. Check `.tmp/invalidVariables.json` for details:
   ```bash
   cat .tmp/invalidVariables.json | head -20
   ```
3. Look for variable IDs pointing to keys other than the canonical ones

**Canonical keys (from semantic file):**
- primitives: 929fbd...
- global: b224a1...
- color: dc07d8...
- dimension: b1da8e...

If you see other keys in the error output, those variables are still pointing to old sources.

### Environment Variables Not Set
**Symptom:** "FILE_KEY_COMPONENT is not set" or similar
**Solution:**
Run the collection discovery to re-populate them:
```bash
pnpm figma-variables-cli
# Select "collections" option
# Select "local" source
# Select each role (primitive, semantic, component)
# Note the file keys
export FILE_KEY_PRIMITIVE="<key>"
export FILE_KEY_SEMANTIC="<key>"
export FILE_KEY_COMPONENT="<key>"
```

## Success Criteria

✓ **After cleanup is successful:**
- [ ] Verification script shows ✓ for color and dimension
- [ ] No manual Figma UI conflicts or warnings
- [ ] .tmp/invalidVariables.json is empty (if created, deleted after sync)
- [ ] sync-tokens-to-figma passes all validation steps
- [ ] Figma library is updated with token changes

## Next Steps

Once sync completes successfully:
1. Check Figma notifications for any library publish updates
2. Verify that component bindings were updated automatically
3. Run any downstream tests that depend on the token sync
4. Document the issue and resolution for team reference

## Need Help?

If issues persist:
1. Check the full sync output: `pnpm sync-tokens-to-figma 2>&1 | tee sync-log.txt`
2. Review `.tmp/` directory for generated files
3. Compare manifests between local and Figma to identify mismatches
