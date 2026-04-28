# Figma Sync Phase 5 Rollout and Rollback Drill

## Objective

Operationalize the environment-isolated sync flow with repeatable pilot checks and a documented rollback drill.

## Pilot Run Checklist

1. Verify test environment configuration is present and scoped.
2. Run pull from test and confirm summary emits `eventType=run-summary`.
3. Run push in dry-run mode and verify `mutationsApplied=false`.
4. Run push to test (non-dry-run) and verify expected stage progression.
5. Repeat the same push and confirm no-op behavior in stage counts.
6. Run pull again and diff token output against expected snapshot.

## Recommended Commands

```bash
pnpm sync-figma-to-tokens -- --env=test --output tokens_new_phase5
pnpm sync-tokens-to-figma -- --env=test --dry-run
pnpm sync-tokens-to-figma -- --env=test
pnpm sync-tokens-to-figma -- --env=test
pnpm sync-figma-to-tokens -- --env=test --output tokens_new_phase5_after
```

## Production Safety Verification

1. Local production mutation without confirmation must fail.
2. Local production mutation with `--confirm-production` may proceed.
3. CI production mutation without `ALLOW_PRODUCTION_WRITES=true` must fail.
4. CI production mutation with `ALLOW_PRODUCTION_WRITES=true` may proceed.

## Rollback Drill

1. Capture the latest successful run-summary payload from CI logs.
2. Trigger rollback mode by switching CI to the legacy sync path.
3. Re-run the legacy sync from JSON source-of-truth.
4. Confirm stage failures clear and error count returns to baseline.
5. Record drill completion with timestamp and owner in release notes.

## Rollback Trigger Conditions

- Alias mismatch or collision above agreed threshold.
- Repeated stage failures during pilot window.
- Any production guardrail bypass or unexpected mutation.

## Exit Criteria

- Pilot checklist completed in test environment.
- Rollback drill completed and documented.
- Machine-readable run-summary validated in CI.
