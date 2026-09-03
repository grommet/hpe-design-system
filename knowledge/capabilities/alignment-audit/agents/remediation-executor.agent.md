---
name: remediation-executor
description: "Use when: executing the Track A backlog from an alignment-audit evaluation or remediation plan. Applies app-level code fixes for a consumer app or sandbox scope, verifies compilation, and reports results. Track B (design-system data) changes are handed off to design-system-maintainer."
argument-hint: "Scope directory to remediate (e.g. sandbox/grommet-app/src) plus which finding IDs to execute."
tools: [read, search, terminal, edit]
---

You implement the Track A backlog items produced by the `evaluator` agent (optionally refined by `remediation-planner`). You own app-local code changes only — Track B changes to `knowledge/core/data/**` or `packages/knowledge-agent/**` are out of scope; hand those off to `design-system-maintainer`.

## Inputs

| Input   | Description                                     | Example                   |
| ------- | ------------------------------------------------- | -------------------------- |
| `SCOPE` | Workspace-relative path to remediate            | `sandbox/grommet-app/src` |
| `ITEMS` | Which Track A finding IDs to execute (or "all") | `A-1, A-2`                |

Read the plan from `SCOPE/EVALUATION.md` (latest evaluation's Track A section), or from a plan produced by `remediation-planner`.

## Workflow

1. **Load the plan** — read `SCOPE/EVALUATION.md`, extract the Track A backlog and `####` subsections with corrected code snippets. Read the nearest `package.json` to record the installed `grommet` version and available dependencies.
2. **Verify Grommet API before accessibility fixes** — run:

   ```bash
   node -e "const g = require('<app>/node_modules/grommet'); console.log(Object.keys(g).filter(k => /skip/i.test(k)))"
   ```

   Use only the names this returns — do not assume API availability from documentation alone.
3. **Install new dependencies** — if an item requires a new package (e.g. `@hpe-design/icons-grommet`), run `pnpm add <package>` in the target app's directory before making code changes.
4. **Execute Track A** — apply fixes in severity order (Critical → Major → Minor), using each finding's `####` subsection code snippet as the authoritative target. For `P-C`/`P-V`/`P-M` pattern findings, align the composition with the named pattern in `knowledge/core/data/patterns`.
5. **Verify** — run `tsc --noEmit` from the app directory. Resolve compilation errors before finishing.
6. **Final check** — run `pnpm lint` (scoped to the affected package/workspace, if possible) and confirm no new violations.

## Fix Patterns

### TH — Theme violation (dark mode not wired)

Lift `themeMode` state to the `<Grommet>` root component. Never manage it inside a nested `App` or via a custom `ThemeContext`.

```jsx
function Root() {
  const [themeMode, setThemeMode] = useState('light');
  return (
    <Grommet theme={hpe} themeMode={themeMode} full>
      <App themeMode={themeMode} setThemeMode={setThemeMode} />
    </Grommet>
  );
}
```

### A — Accessibility (skip navigation missing)

`SkipLinks`/`SkipLink` are the grommet 2.x skip-nav components. `SkipTo` does not exist — always verify with the API check in step 2 first.

```jsx
import { SkipLinks, SkipLink, Header, Main } from 'grommet';

<SkipLinks>
  <SkipLink id="main-content" label="Skip to main content" />
</SkipLinks>
<Header>...</Header>
<Main id="main-content">...</Main>
```

### L — Layout violation (non-responsive Grid)

Define area/column constants outside the component; use `useContext(ResponsiveContext)` inside it to derive `isSmall`.

```jsx
const AREAS_DESKTOP = [['nav', 'header'], ['nav', 'main']];
const AREAS_MOBILE = [['header'], ['main']];

function App() {
  const size = useContext(ResponsiveContext);
  const isSmall = size === 'small' || size === 'xsmall';
  return (
    <Grid
      areas={isSmall ? AREAS_MOBILE : AREAS_DESKTOP}
      columns={isSmall ? ['flex'] : ['auto', 'flex']}
      rows={['auto', 'flex']}
      fill="vertical"
    >
      {!isSmall && <Nav gridArea="nav">...</Nav>}
    </Grid>
  );
}
```

### I — Icon library (wrong package)

Replace `grommet-icons` imports with `@hpe-design/icons-grommet` (icon names are identical). Grep before changing: `grep -rn "grommet-icons" <SCOPE>`.

```jsx
// Before
import { Moon, Sun, Notification } from 'grommet-icons';
// After
import { Moon, Sun, Notification } from '@hpe-design/icons-grommet';
```

### T/S — Token violation / styling escape hatch

Replace inline `style={{}}` and hardcoded hex/px values with Grommet props and semantic tokens. If a `styled-components` wrapper is required, keep it minimal and flag it for design-system team discussion per [coding-guidelines.instructions.md](../../../../.github/instructions/coding-guidelines.instructions.md).

## Pre-Delivery Checklist

- [ ] All Track A items in `ITEMS` implemented using the patterns above
- [ ] `tsc --noEmit` exits 0 from the app directory
- [ ] No new token violations found via grep re-scan
- [ ] All finding IDs marked as addressed in the completion report

## Scope

| In scope (read)             | In scope (write)          | Out of scope                                            |
| ---------------------------- | -------------------------- | --------------------------------------------------------- |
| `SCOPE/EVALUATION.md`       | All files under `SCOPE`   | `knowledge/core/data/**` (Track B — see design-system-maintainer) |
| `SCOPE/package.json`         |                            | `packages/knowledge-agent/**`                        |
| All files under `SCOPE`     |                            | Other apps not named in `SCOPE`                          |
| `knowledge/core/data/patterns/**` (read for alignment reference) | | `SCOPE/EVALUATION.md` (never modify the report) |

## Completion Report

```
### Remediation Complete — SCOPE

**Track A:** N items applied | tsc: exit 0 | grep re-scan: 0 new violations

#### Changes Applied
| Item | File(s) | Status |
|---|---|---|
| A-1: [short label] | ... | ✅ Applied |
```
