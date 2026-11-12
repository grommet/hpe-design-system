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

Use a fresh agent context for each run. Preserve the prompt, target, and screenshot exactly. Keep each output and its run metadata separate so repetitions cannot influence one another. Never supply or paste a Code Connect mapping manually.

## Button Smoke Run Procedure

The smoke fixture is [Button smoke](cases/button-smoke/README.md): frame `2133:694`, representative mapped Button target `2133:695`, with its reference image and case contract under `cases/button-smoke/`.

Run one valid attempt in each condition. Start each in a new agent session and a clean, isolated workspace at the same repository snapshot. Use the same model, locked prompt, output path, viewport, and fixture image. Do not let an agent see another run's output or context.

### Prepare each run

1. Copy the locked prompt above unchanged to `knowledge/code-connect/eval/.scratch/prompt.txt`.
2. Create a clean workspace for the run and place the generated component only at `sandbox/grommet-app/src/eval/Example.jsx`.
3. Use the Button reference image at `knowledge/code-connect/eval/cases/button-smoke/assets/button-primary-small.png`. Attach it as the visual target in every condition.
4. Capture the context actually available to the agent in a file beside that run's output. Preserve the raw MCP response/snippet or the screenshot-only input and record the prompt, condition, model ID, and repository commit. Do not substitute a summary for the received context.

### Provide condition-specific context

| Condition | Agent input |
| --- | --- |
| `screenshot` | The reference image only. Do not call or provide Figma MCP context. |
| `mcp-no-cc` | The reference image and Figma MCP context for frame `2133:694`, with Code Connect disabled. |
| `mcp-cc` | The reference image and Figma MCP context for frame `2133:694`, with repository Code Connect enabled by default. Do not paste a mapping into the prompt or context. |

For either MCP condition, request design context for the frame with its screenshot. If the response contains only page/frame metadata and no useful target details, request context for mapped child `2133:695` and preserve both responses. The expected connected snippet is `import { Button } from 'grommet';` and `<Button label="Label" primary size="small"/>`; use its appearance in the captured context to verify delivery, not as manually supplied input.

### Build, render, and record

Build and render the generated component in a disposable copy/worktree of `sandbox/grommet-app`; do not change the working application or use a build result that does not compile the generated component. In the disposable workspace, add a temporary Vite entry that imports `src/eval/Example.jsx` and wraps it in the sandbox HPE theme, then build that entry and render it at the fixture viewport. Keep the temporary harness out of the committed results. Save the build output and rendered screenshot with the run evidence.

Before scoring, confirm the attempt completed without tool/context errors, its received context matches its condition, and its component builds and renders. Rerun a failed or broken attempt in a new clean session; do not score it or include it in the summary.

After each valid run, save the received context, generated `Example.jsx`, build log, and render screenshot beside its scorer record in `knowledge/code-connect/eval/results/button-smoke/runs/`. Use distinct filenames containing the condition and run number. Generate the case summary under `knowledge/code-connect/eval/results/button-smoke/summaries/`. The expected outcome is that the Button Code Connect snippet appears in the received context only for `mcp-cc`.

Score only the three valid runs, after their context, build, and render have been verified. In each isolated workspace, run the scorer from the repository root; the temporary sandbox entry must point to `src/eval/main.jsx`, which imports and renders `Example.jsx`.

```bash
pnpm --filter @hpe-design/code-connect eval:score -- \
  --case eval/cases/button-smoke/case.json \
  --source sandbox/grommet-app/src/eval/Example.jsx \
  --condition screenshot \
  --build 'pnpm --filter grommet-app exec vite build --config eval.config.js' \
  --cwd "$PWD" \
  --model claude-sonnet-4-5-20250929 \
  --run-number 1 \
  --prompt-file eval/.scratch/prompt.txt
```

Repeat with `--condition mcp-no-cc` and `--condition mcp-cc` in their respective clean workspaces. Confirm the three JSON records and their evidence files are under `eval/results/button-smoke/runs/`. Then generate the condition summary:

```bash
pnpm --filter @hpe-design/code-connect eval:summary -- \
  --case eval/cases/button-smoke/case.json
```

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
