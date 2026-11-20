# Design-to-Code Evaluation

This protocol compares screenshot-only generation with Figma MCP context, with and without repository Code Connect mappings. It accepts a Figma URL supplied by any source owner; HPE ownership or a particular library is not a prerequisite. Runners must have access to the URL. Each case records its node, render, mapped components, and unmapped areas so source-specific gaps are not mistaken for evaluation failures.

## Conditions

| Condition    | Design input                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `screenshot` | Reference screenshot only; no Figma MCP access.                                                  |
| `mcp-no-cc`  | The same Figma node and screenshot through MCP, with Code Connect unavailable or disabled.       |
| `mcp-cc`     | The same Figma node and screenshot through MCP, with repository Code Connect mappings available. |

Only the design-context condition changes. Use the same model, prompt, repository snapshot, viewport, and output path for every run. Do not silently substitute a model or prompt. Record inaccessible source nodes as blocked rather than changing the fixture mid-run.

## Locked Inputs

- Primary model: **Anthropic Claude Sonnet 4.5**, model ID `claude-sonnet-4-5-20250929`.
- Full-page fixture: [App Dashboard case](cases/app-dashboard/README.md).
- Button smoke fixture: [Button smoke case](cases/button-smoke/README.md).
- Output path: `sandbox/grommet-app/src/eval/Example.jsx` in an isolated run workspace.
- Shared prompt: use this text unchanged for every condition and replication. Provide the target screenshot as the visual attachment; provide MCP access only in the two MCP conditions.

```text
Implement the supplied Figma target as a single, default-exported React component in sandbox/grommet-app/src/eval/Example.jsx. Reproduce all visible content and hierarchy within the target, preserving the supplied desktop composition and reflowing cleanly at narrower widths. Use existing repository components, supported Grommet APIs, the HPE theme and tokens, and HPE icons where appropriate. Do not invent or omit visible content, add dependencies, or edit files outside the output path. Return only the component source.
```

## Run Counts

- **9 full-page runs:** 3 independent runs in each of `screenshot`, `mcp-no-cc`, and `mcp-cc`.
- **3 Button smoke runs:** 1 run in each condition, scoped to the Button node and screenshot identified in the case file.
- Total: 12 generated outputs. Smoke runs are a readiness check and are not included in the full-page coverage-gain calculation.

Use a fresh agent context for each run. Preserve the prompt, target, and screenshot exactly. Keep each output and its run metadata separate so repetitions cannot influence one another.

## Measures And Targets

Record each run's build result, visual-fidelity score, mapped-instance coverage, rework category, and reviewer minutes. The case file defines expected page regions, imports, mapped instances, and unmapped regions for the scorer.

- **Component coverage target (`mcp-cc`):** at least 80% in each full-page run. For this case, that is at least 18 of the 22 mapped targets.
- **Mapped-instance coverage gain:** the mean `mcp-cc` coverage must exceed mean `mcp-no-cc` coverage by at least **20 percentage points** across the three full-page runs. For this case, coverage is the number of the 22 template-backed Code Connect targets correctly implemented with their mapped Grommet APIs and matching visible intent, divided by 22. The targets are 21 Buttons and 1 Menu. Do not count unmapped regions or legacy records without usable templates in this denominator.
- **Hygiene target (`mcp-cc`):** at least two of the three full-page runs have no inline styles, hard-coded hex colors, or pixel sizes.
- **Visual fidelity:** score each run from 1 (major mismatch) to 5 (close match) against the reference at the case viewport. Report all three scores and the condition mean. A successful coverage gain must not come with a mean visual-fidelity drop greater than 0.5 points versus `mcp-no-cc`.
- **Build and render target (`mcp-cc`):** all three full-page outputs must build and render in the sandbox.
- **Rework target (`mcp-cc`):** at least two of the three full-page runs require no rework or only minor rework. Measure reviewer time to bring the first generated draft to an acceptable, compiling implementation and classify it using the fixed scale below.

| Rework category | Reviewer minutes | Definition                                                                  |
| --------------- | ---------------: | --------------------------------------------------------------------------- |
| `none`          |                0 | Accepted without code changes.                                              |
| `minor`         |             1–15 | Local corrections; structure and approach remain intact.                    |
| `moderate`      |            16–45 | Several substantive corrections, but the implementation remains usable.     |
| `rewrite`       |              46+ | More than 45 minutes or replacement of the implementation's core structure. |

The targets above are prospective; do not report them as results until the runs and scoring are completed. The scorer verifies AST-level component presence and import usage, not whether each instance semantically matches its Figma mapping or visible intent. Evaluate those aspects visually and through reviewer assessment.

## Scoring

Case contracts are stored beside their human guides in `cases/<case-id>/`. Run records and summaries are stored under `results/<case-id>/`.

Run the scorer tests:

```bash
pnpm --filter @hpe-design/code-connect eval:test
```

Score an output and capture its build result. Use `--case` to select another case; the default is `app-dashboard`. `--results-dir` overrides that case's result root. Each run is written to a new JSON file and existing records are never overwritten.

Every scored run requires a positive `--run-number`, `--model`, and the exact prompt via `--prompt-file` (or `--prompt`). Copy the locked prompt above into `eval/.scratch/prompt.txt` for the examples below. Number repetitions from 1 independently for each case and condition. The record captures the prompt text, Figma identifiers from the case contract, the output path, and the current repository commit as `mappingCommit`; pass `--mapping-commit` to override the commit recorded.

```bash
pnpm --filter @hpe-design/code-connect eval:score -- --source ../../sandbox/grommet-app/src/eval/Example.jsx --condition mcp-cc --build 'pnpm --filter grommet-app build' --cwd "$PWD" --model claude-sonnet-4-5-20250929 --run-number 1 --prompt-file eval/.scratch/prompt.txt

pnpm --filter @hpe-design/code-connect eval:score -- --case eval/cases/button-smoke/case.json --source ../../sandbox/grommet-app/src/eval/Example.jsx --condition mcp-cc --build 'pnpm --filter grommet-app build' --cwd "$PWD" --model claude-sonnet-4-5-20250929 --run-number 1 --prompt-file eval/.scratch/prompt.txt
```

Summarize eligible evaluation runs by condition for the selected case. Tooling smoke records are excluded.

```bash
pnpm --filter @hpe-design/code-connect eval:summary
```
