# Test Plan: New Test Figma Environment Setup

**Document ID:** TP-FIGMA-ENV-SETUP-001  
**Version:** 1.0  
**Owner:** design-tokens maintainers  
**Scope:** End-to-end setup and validation of a new test Figma environment including bootstrap, collection key discovery, bidirectional sync, idempotency, and production guardrail verification.

---

## Prerequisites

Before beginning, confirm all of the following are in place:

- [ ] Node.js and pnpm installed
- [ ] Repository dependencies installed: `pnpm install` from workspace root
- [ ] Three empty Figma files created (primitive tier, semantic tier, component tier) with a Figma account that has edit access to all three
- [ ] Figma Personal Access Token (PAT) for the test account is available — do **not** store in `.env`; export in shell or load from a secure store (Keychain, 1Password, etc.)
- [ ] No existing `TEST_FIGMA_*_COLLECTION_KEY` values are set — these will be discovered during the test

---

## Phase 1: Environment Configuration

### TC-01 — Copy environment template

| Field | Value |
|---|---|
| **ID** | TC-01 |
| **Goal** | Create a local `.env` file from the template |
| **Command** | `cp packages/hpe-design-tokens/.env.example packages/hpe-design-tokens/.env` |

**Steps:**
1. From the repository root, run the command above.
2. Confirm `.env` exists at `packages/hpe-design-tokens/.env`.

**Expected result:** File created successfully. Contents match `.env.example`.

**Pass / Fail:** ___

---

### TC-02 — Populate test Figma file keys

| Field | Value |
|---|---|
| **ID** | TC-02 |
| **Goal** | Record the file keys for each of the three test Figma files |

**Steps:**
1. Open each Figma file in the browser.
2. Extract the file key from the URL: `figma.com/design/<FILE_KEY>/...`
3. Set the following values in `.env`:
   - `TEST_FILE_KEY_PRIMITIVE=<primitive file key>`
   - `TEST_FILE_KEY_SEMANTIC=<semantic file key>`
   - `TEST_FILE_KEY_COMPONENT=<component file key>`
4. Confirm all three values are non-empty.
5. Confirm `TEST_FIGMA_*_COLLECTION_KEY` values remain blank (these are discovered later).

**Expected result:** Three distinct file keys recorded. Collection key fields are empty.

**Pass / Fail:** ___

---

### TC-03 — Set test personal access token

| Field | Value |
|---|---|
| **ID** | TC-03 |
| **Goal** | Make the test PAT available in the shell session without storing it in a file |

**Steps:**
1. Export the PAT in the terminal session:
   ```bash
   export TEST_PERSONAL_ACCESS_TOKEN=<your-test-pat>
   ```
2. Confirm the variable is present: `echo $TEST_PERSONAL_ACCESS_TOKEN`

**Expected result:** Variable echoes a non-empty value. Not written to `.env`.

**Pass / Fail:** ___

---

## Phase 2: Pre-Flight Verification

### TC-04 — Run package tests

| Field | Value |
|---|---|
| **ID** | TC-04 |
| **Goal** | Confirm package is healthy before touching Figma |
| **Commands** | `pnpm --filter hpe-design-tokens test` then `pnpm --filter hpe-design-tokens test:contracts` |

**Steps:**
1. From the repository root, run:
   ```bash
   pnpm --filter hpe-design-tokens test
   ```
2. Confirm all tests pass.
3. Run:
   ```bash
   pnpm --filter hpe-design-tokens test:contracts
   ```
4. Confirm all contract schema tests pass.

**Expected result:** All tests pass. No failures or skipped tests.

**Pass / Fail:** ___

---

## Phase 3: Bootstrap Push

### TC-05 — Bootstrap dry-run

| Field | Value |
|---|---|
| **ID** | TC-05 |
| **Goal** | Verify bootstrap mode resolves config correctly without making writes |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --bootstrap --dry-run` |

**Steps:**
1. Run the command above from the repository root.
2. Inspect the output for a `run-summary` JSON payload.
3. Check the following fields in the output:

**Expected result:**
- Exit code: `0`
- `mutationsApplied: false`
- `productionGuardrailPassed: true`
- No Figma API write calls made

**Pass / Fail:** ___

---

### TC-06 — Bootstrap push (live)

| Field | Value |
|---|---|
| **ID** | TC-06 |
| **Goal** | Push all token stages to fresh Figma files for the first time |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --bootstrap` |

**Steps:**
1. Run the command above from the repository root.
2. Inspect the output for `stage-status` events and final `run-summary`.
3. In the Figma browser, open each of the three test files and confirm variable collections are now present.

**Expected result:**
- Exit code: `0`
- All 3 stages succeed: `primitive`, `semantic`, `component`
- `run-summary` shows `status: success`, `errors: 0`, `unresolvedAliases: 0`
- Variable collections visible in all three Figma files

**Pass / Fail:** ___

---

## Phase 4: Collection Key Discovery

### TC-07 — Run discovery

| Field | Value |
|---|---|
| **ID** | TC-07 |
| **Goal** | Discover collection keys assigned by Figma after bootstrap |
| **Command** | `pnpm --filter hpe-design-tokens sync-discover-figma-collection-keys -- --env=test --pretty --output contracts/generated/figma-collection-key-discovery.test.json` |

**Steps:**
1. Run the command above from the repository root.
2. Open the generated file at `contracts/generated/figma-collection-key-discovery.test.json`.
3. Inspect the `conflicts` array and each entry in `collections`.

**Expected result:**
- Exit code: `0`
- `conflicts` array is empty (`[]`)
- Each of `color`, `dimension`, `primitives`, `global` has:
  - `candidates` array with exactly 1 entry
  - `recommendation.reason: "single-candidate"`
  - `recommendation.key` is a non-empty string

**Pass / Fail:** ___

---

### TC-08 — Populate collection keys

| Field | Value |
|---|---|
| **ID** | TC-08 |
| **Goal** | Record discovered keys into `.env` for all future operations |

**Steps:**
1. Open `contracts/generated/figma-collection-key-discovery.test.json`.
2. For each collection, copy `recommendation.key` into the corresponding `.env` variable:
   - `collections.color.recommendation.key` → `TEST_FIGMA_COLOR_COLLECTION_KEY`
   - `collections.dimension.recommendation.key` → `TEST_FIGMA_DIMENSION_COLLECTION_KEY`
   - `collections.primitives.recommendation.key` → `TEST_FIGMA_PRIMITIVES_COLLECTION_KEY`
   - `collections.global.recommendation.key` → `TEST_FIGMA_GLOBAL_COLLECTION_KEY`
3. Confirm all four values are non-empty in `.env`.

**Expected result:** All four `TEST_FIGMA_*_COLLECTION_KEY` values populated in `.env`.

**Pass / Fail:** ___

---

## Phase 5: Normal Sync Validation

### TC-09 — Dry-run push with collection keys set

| Field | Value |
|---|---|
| **ID** | TC-09 |
| **Goal** | Verify preflight passes cleanly now that collection keys are configured |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test --dry-run` |

**Steps:**
1. Run the command above (no `--bootstrap` flag).
2. Inspect the `preflight-validation` and `run-summary` output.

**Expected result:**
- Exit code: `0`
- `preflight-validation` emitted with no errors
- `mutationsApplied: false`
- `productionGuardrailPassed: true`
- No `PREFLIGHT_FAILED` error code

**Pass / Fail:** ___

---

### TC-10 — Live push without bootstrap

| Field | Value |
|---|---|
| **ID** | TC-10 |
| **Goal** | Confirm normal (non-bootstrap) push succeeds |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test` |

**Steps:**
1. Run the command above from the repository root.
2. Inspect stage-status events and final run-summary.

**Expected result:**
- Exit code: `0`
- All 3 stages succeed
- `run-summary` shows `errors: 0`, `unresolvedAliases: 0`

**Pass / Fail:** ___

---

### TC-11 — Repeat push idempotency check

| Field | Value |
|---|---|
| **ID** | TC-11 |
| **Goal** | Confirm running the same push twice does not produce unintended changes |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=test` (run again) |

**Steps:**
1. Immediately re-run the live push command from TC-10.
2. Compare the `run-summary` output to the first run.

**Expected result:**
- Exit code: `0`
- Stage counts indicate a no-op or zero mutations applied
- No errors

**Pass / Fail:** ___

---

### TC-12 — Pull tokens back

| Field | Value |
|---|---|
| **ID** | TC-12 |
| **Goal** | Confirm tokens can be pulled from the test Figma files |
| **Command** | `pnpm --filter hpe-design-tokens sync-figma-to-tokens -- --env=test --output tokens_qa` |

**Steps:**
1. Run the command above from the repository root.
2. Confirm the `tokens_qa/` directory is created and contains JSON files.
3. Inspect the `run-summary` in the output.

**Expected result:**
- Exit code: `0`
- `tokens_qa/` written with token JSON files organized by tier
- `run-summary` emitted with `status: success`

**Pass / Fail:** ___

---

### TC-13 — Round-trip diff

| Field | Value |
|---|---|
| **ID** | TC-13 |
| **Goal** | Confirm pulled tokens match the local source token files |

**Steps:**
1. From `packages/hpe-design-tokens/`, run:
   ```bash
   diff -r tokens/ tokens_qa/
   ```
2. Review any output.

**Expected result:** No meaningful differences. Round-trip content is identical to source JSON.

> Note: If minor whitespace or ordering differences appear due to Prettier or JSON serialization, confirm they are non-semantic before marking as pass.

**Pass / Fail:** ___

---

## Phase 6: Production Safety Guardrails

### TC-14 — Production push without confirmation flag is blocked

| Field | Value |
|---|---|
| **ID** | TC-14 |
| **Goal** | Confirm local production mutations are blocked without the required flag |
| **Command** | `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=production` |

**Steps:**
1. Run the command above (no `PRODUCTION_*` credentials set; no `--confirm-production`).
2. Check exit code and output.

**Expected result:**
- Exit code: non-zero
- Error code `PRODUCTION_GUARDRAIL_BLOCKED` or config resolution failure
- No Figma API writes made

**Pass / Fail:** ___

---

### TC-15 — CI production write gate is enforced

| Field | Value |
|---|---|
| **ID** | TC-15 |
| **Goal** | Confirm CI-context production push requires `ALLOW_PRODUCTION_WRITES=true` |

**Steps:**
1. Set `CI=true` in the environment: `export CI=true`
2. Run: `pnpm --filter hpe-design-tokens sync-tokens-to-figma -- --env=production`
3. Confirm it fails before any writes.
4. Unset `CI` when done: `unset CI`

**Expected result:**
- Exit code: non-zero
- Guardrail blocks execution
- No Figma API writes made

**Pass / Fail:** ___

---

## Results Summary

| Test Case | Description | Pass / Fail | Notes |
|---|---|---|---|
| TC-01 | Copy environment template | | |
| TC-02 | Populate test file keys | | |
| TC-03 | Set test PAT | | |
| TC-04 | Run package tests | | |
| TC-05 | Bootstrap dry-run | | |
| TC-06 | Bootstrap push (live) | | |
| TC-07 | Collection key discovery | | |
| TC-08 | Populate collection keys | | |
| TC-09 | Dry-run with keys set | | |
| TC-10 | Live push without bootstrap | | |
| TC-11 | Repeat push idempotency | | |
| TC-12 | Pull tokens back | | |
| TC-13 | Round-trip diff | | |
| TC-14 | Production push blocked locally | | |
| TC-15 | CI production write gate | | |

**Overall result:** Pass / Fail  
**Tester:** ___  
**Date:** ___  
**Environment notes:** ___
