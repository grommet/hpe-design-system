# Dependency Upgrade Agents

Subordinate agents invoked by `dependency-upgrade-orchestrator`. Each handles one phase of the major version upgrade workflow.

| Agent | Phase | Modifies files? |
|---|---|---|
| `scan-outdated` | Audit — inventories all outdated packages | State file only |
| `major-upgrade-planner` | Research — fetches migration guide, identifies required changes | State file only |
| `major-upgrade-executor` | Apply — makes version bumps and config changes | Yes — records all in state |
| `verify-upgrade` | Verify — builds, tests, repairs; triggers rollback on failure | Yes (repairs only) |
| `rollback-upgrade` | Revert — `git restore`s all executor + repair changes | Reverts changes |

## Invoke order

```
scan-outdated → [per package] major-upgrade-planner → major-upgrade-executor → verify-upgrade
                                                                                      ↓ (on failure)
                                                                              rollback-upgrade
```

## State file

All agents read from and write to `knowledge/capabilities/dependency-upgrade/dependency-upgrade-state.json`. Delete this file to start a fresh scan session.
