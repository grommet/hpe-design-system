# Quick Start: Figma Cleanup & Sync

## Problem
Your component file has duplicate remote library bindings causing sync-tokens-to-figma to fail.

## Solution: 3 Phases

### Phase 1: Manual Figma Cleanup (in Figma UI)
1. Open Component file
2. Assets → Libraries
3. Remove duplicate color binding (key: b58247...)
4. Remove duplicate dimension binding (key: 4906e1...)
5. Let Figma rebind orphaned components
6. Save

**Time estimate:** 5-10 minutes

---

### Phase 2: Verify Cleanup (automated script)
```bash
chmod +x scripts/verify-figma-cleanup.sh
./scripts/verify-figma-cleanup.sh
```

**Expected output:**
- ✓ Color collection: Only 1 remote source (cleanup successful)
- ✓ Dimension collection: Only 1 remote source (cleanup successful)

**If you see ✗:** Go back to Figma and re-check step 3-4

---

### Phase 3: Retry Sync
```bash
pnpm sync-tokens-to-figma
```

**What happens:**
- Validates references (should now pass)
- Generates token files
- Updates Figma variables
- Publishes library

---

## Supporting Files

- **[FIGMA_CLEANUP_GUIDE.md](FIGMA_CLEANUP_GUIDE.md)** — Comprehensive guide with detailed steps, troubleshooting, and manual verification options
- **[scripts/verify-figma-cleanup.sh](scripts/verify-figma-cleanup.sh)** — Automated verification script

## Key Facts

**Duplicate keys to remove:**
- color: **b58247...** (remove this)
- dimension: **4906e1...** (remove this)

**Canonical keys to keep:**
- color: dc07d8... ✓
- dimension: b1da8e... ✓

**Why this matters:**
The sync tool requires exactly ONE remote source per collection name. With duplicates, variables point to conflicting libraries, causing reference validation to fail.

---

## Need More Details?

See [FIGMA_CLEANUP_GUIDE.md](FIGMA_CLEANUP_GUIDE.md) for:
- Step-by-step Figma UI instructions with screenshots (conceptual)
- Manual verification commands
- Troubleshooting guide
- Complete success criteria
