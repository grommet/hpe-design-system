# Evaluation Run Guide

Follow this workflow to generate, capture, build, render, and score an evaluation batch. The [evaluation protocol](README.md) defines the conditions, locked model and shared prompt, run counts, and assessment criteria; keep those inputs authoritative there.

## Worked example: Button smoke

The smoke fixture is [Button smoke](fixtures/button-smoke/README.md): frame `2133:694`, representative mapped Button target `2133:695`, with its reference image and fixture contract under `fixtures/button-smoke/`.

Run one valid attempt in each condition. Start each in a new agent session and a clean, isolated workspace at the same repository snapshot. Use the same model, locked prompt, output path, viewport, and fixture image. Do not let an agent see another run's output or context.

For another fixture, use its fixture contract and human guide to replace the target URL/node, reference image, expected connected snippets, viewport, and fixture-specific result paths below. Keep the shared prompt unchanged. Repeat the workflow with a fresh workspace and session for every replication required by the protocol; the Button example needs only one valid run per condition.

## Prepare each run

Use a client that can select the locked model, control Figma tool access, and export tool inputs and raw results from the generation session. Authenticate with Figma before starting. Confirm dependencies are available using the repository's pinned pnpm version; if a new worktree has missing dependencies, restore them with `pnpm install --frozen-lockfile` at its root.

1. Choose one full repository commit SHA for the whole batch. It must include the fixture and scorer. Record it before generation; do not change snapshots between conditions.
2. Create a detached worktree for each condition. From the repository root, replace `<commit-sha>` once, then run:

   ```bash
   SNAPSHOT=<commit-sha>
   git worktree add --detach ../hpe-eval-screenshot "$SNAPSHOT"
   git worktree add --detach ../hpe-eval-mcp-no-cc "$SNAPSHOT"
   git worktree add --detach ../hpe-eval-mcp-cc "$SNAPSHOT"
   ```

   Use unused paths; do not overwrite existing worktrees. Choose a snapshot without previous evaluation outputs or context. Keep all other run workspaces and result archives outside the agent's accessible workspace.
3. Open only that condition's worktree in the client and start a new chat. Select `claude-sonnet-5.5` explicitly. Do not reuse a generation chat or attach another run's output.
4. Attach `knowledge/code-connect/eval/fixtures/button-smoke/assets/button-primary-small.png` in every condition. In the MCP conditions, also supply the [mapped target URL](https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-695). Do not supply the fixture README's expected snippet or open a local mapping as design input.
5. Apply the condition setup below, then send the shared prompt unchanged. Keep setup instructions and target attachment/URL separate from the locked prompt, and preserve both in the transcript.
6. Preserve the first generated `Example.jsx` unchanged. The operator, not the generation agent, adds the temporary harness after generation. If the client returns source without writing the file, save that source verbatim at the locked output path.

All commands below run from the condition worktree root unless stated otherwise.

## Provide condition-specific context

| Condition | Client setup and verification |
| --- | --- |
| `screenshot` | Disable Figma MCP in the chat's tool picker before generation. Attach only the reference image as design input. Save the tool configuration and confirm no Figma tools were called. A message asking the agent not to call MCP is not proof that the tools were unavailable. |
| `mcp-no-cc` | Enable Figma MCP. In a separate setup message, instruct the agent to request `get_design_context` for target `2133:695` with `disableCodeConnect: true`. Verify that exact argument in the successful tool call and inspect the actual response for absence of a connected snippet. |
| `mcp-cc` | Enable Figma MCP with access to the published repository mappings. In a separate setup message, instruct the agent to request `get_design_context` for the same target with Code Connect enabled (`disableCodeConnect: false`, or omitted when enabled by default). Verify that the successful response actually contains the connected Button snippet. |

Tool names may have client-specific prefixes. If the client cannot enforce the requested setting, the model is unavailable, or the MCP response is missing or erroneous, stop and record the attempt as blocked. Do not silently substitute another tool or condition. Do not publish or change mappings during the batch.

For either MCP condition, request design context for the mapped target with its screenshot. If a page or frame request returns only metadata, request context for the relevant child node and preserve both responses. The expected connected snippet is `import { Button } from 'grommet';` and `<Button label="Label" primary size="small"/>`; use its appearance in the captured context to verify delivery, not as manually supplied input.

## Capture received context

Export evidence from the generation session itself, not from a later investigator's MCP request. Save it as `context.json` (or raw transcript files with an index) alongside the generated source. Include:

- Every setup and generation message, the image attachment path, and the target URL where supplied.
- The selected and actual resolved model, condition, repository SHA, and session identifier.
- Tool-call names and inputs, raw results actually delivered to the agent, and errors. Preserve the returned code/text, not just a tool-success flag or the agent's summary.
- For screenshot-only runs, the disabled-tool configuration and tool-call history. For MCP runs, the successful `get_design_context` inputs and response.

Inspect the returned design markup: the connected Button snippet or `CodeConnectSnippet` wrapper must appear only in `mcp-cc`. Generic MCP instructions can mention Code Connect even when it is disabled; those mentions alone are not connected snippets.

Export only evaluation-relevant evidence. Exclude credentials, account metadata, unrelated chats, private reasoning, and private memories. Document any redactions and export limitations without removing the design payload needed to verify the condition. If the client cannot preserve the received design context, treat the attempt as blocked.

## Build and render in isolation

Do not use the normal sandbox build as evidence: its entry renders the existing application, not necessarily `Example.jsx`. After generation, create the following temporary files in the disposable worktree. This harness uses the sandbox's HPE v8 theme in light mode and does not import `App`, its routes, or its styles.

`sandbox/grommet-app/eval.config.js`:

```js
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import base from './vite.config.js';

export default mergeConfig(base, {
  root: fileURLToPath(new URL('./src/eval/', import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL('./.eval-dist/', import.meta.url)),
    emptyOutDir: true,
  },
});
```

`sandbox/grommet-app/src/eval/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Button smoke evaluation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.jsx"></script>
  </body>
</html>
```

`sandbox/grommet-app/src/eval/main.jsx`:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe-v8';
import { createGlobalStyle } from 'styled-components';
import Example from './Example.jsx';

const GlobalStyle = createGlobalStyle`
  body { margin: 0; }
`;

createRoot(document.getElementById('root')).render(
  <Grommet theme={hpe} themeMode="light">
    <GlobalStyle />
    <Example />
  </Grommet>,
);
```

Create the evidence directory and archive the unchanged source. Set `CONDITION` to the current condition; use a new run number for additional attempts rather than overwriting evidence.

```bash
CONDITION=screenshot
RUN_NUMBER=1
EVIDENCE="knowledge/code-connect/eval/results/button-smoke/evidence/$CONDITION/run-$RUN_NUMBER"
mkdir -p "$EVIDENCE"
cp sandbox/grommet-app/src/eval/Example.jsx "$EVIDENCE/Example.jsx"
```

Save the context export there. Build the isolated entry and keep the full log. `pipefail` ensures a failed build is not hidden by `tee`.

```bash
set -o pipefail
pnpm --filter grommet-app exec vite build --config eval.config.js \
  2>&1 | tee "$EVIDENCE/build.log"
```

After a successful build, serve its output:

```bash
pnpm --filter grommet-app exec vite preview --config eval.config.js \
  --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/` in a browser. Use a **63 x 28 CSS-pixel viewport at device scale factor 1**, matching the Button reference. Wait for fonts and assets to finish loading, confirm the Button is visible, and check the browser console for runtime errors. Save a viewport screenshot as `render.png`, not the Figma reference image or an MCP screenshot. Record the browser/version, viewport, scale factor, theme, console result, and visual observations in `render-notes.txt`. Stop the preview server after capture.

A bundle passing is not proof of rendering or visual fidelity. Record visual differences honestly; component presence does not establish exact prop or appearance equivalence. Keep the temporary harness and build output out of committed results.

## Score and collect valid runs

Before scoring, confirm the attempt completed without tool/context errors, its received context matches its condition, and its unchanged component builds and renders. Rerun failed or broken attempts in a new clean session; retain their failure notes separately, but do not place their records in the scored `runs/` directory.

Copy the [locked prompt](README.md#locked-inputs) unchanged to `knowledge/code-connect/eval/.scratch/prompt.txt`. Score the archived source so the record points to the committed evidence. The scorer rebuilds the matching sandbox entry. Use a fresh scratch results directory for each attempt to avoid mixing old records into a new summary.

The filtered pnpm script runs from `knowledge/code-connect`, so `--fixture`, `--source`, `--prompt-file`, and `--results-dir` below are relative to that package. `--cwd "$PWD"` sets the build command's working directory to the worktree root.

```bash
pnpm --filter @hpe-design/code-connect eval:score -- \
  --fixture eval/fixtures/button-smoke/fixture.json \
  --source "eval/results/button-smoke/evidence/$CONDITION/run-$RUN_NUMBER/Example.jsx" \
  --condition "$CONDITION" \
  --build 'pnpm --filter grommet-app exec vite build --config eval.config.js' \
  --cwd "$PWD" \
  --model claude-sonnet-5.5 \
  --run-number "$RUN_NUMBER" \
  --prompt-file eval/.scratch/prompt.txt \
  --results-dir "eval/.scratch/button-smoke-$CONDITION-run-$RUN_NUMBER"
```

A failed score can still write a record; inspect its result and exclude failed attempts before collecting. Do not repair the archived first draft and call it the same valid run.

After all three generations are finished, collect exactly one validated record per condition from each scratch `runs/` directory into a separate results workspace. Preserve the source and context at the paths referenced by those records. The committed layout is:

```text
results/button-smoke/
  evidence/
    screenshot/run-1/{Example.jsx,context.json,build.log,render.png,render-notes.txt}
    mcp-no-cc/run-1/{Example.jsx,context.json,build.log,render.png,render-notes.txt}
    mcp-cc/run-1/{Example.jsx,context.json,build.log,render.png,render-notes.txt}
  runs/
    <three scorer-generated JSON records>
  summaries/
    <condition summary JSON>
```

This is the required evidence layout for new runs, not a claim that every historical run has every artifact. The archived `context.json` files and render notes are verbatim captures of the original sessions, so they reference the earlier `cases/button-smoke/` paths from before fixtures were renamed; do not rewrite them. Additional raw transcript or configuration files can live in the corresponding evidence directory.

Do not put supporting JSON files such as `context.json` directly in `runs/`: the summary reads every top-level JSON file there as a run record. Do not mix earlier batches, invalid attempts, or duplicate rescoring records into the three-run smoke summary. When intentionally replacing a batch, review and remove only its superseded records and summary.

Generate the summary in the results workspace:

```bash
pnpm --filter @hpe-design/code-connect eval:summary -- \
  --fixture eval/fixtures/button-smoke/fixture.json
```

Check that each condition has `runCount: 1` and `buildPasses: 1`. Review context and rendering separately: the summary does not validate either, and does not automatically discard failed builds. Commit the guide, three records, summary, and evidence together; do not commit disposable harness files.

## Completion checklist

- [ ] Same model, prompt, snapshot, target, and reference image across all clean sessions.
- [ ] Actual context and tool configuration saved; connected snippet present only in `mcp-cc`.
- [ ] All unchanged outputs built and rendered using the isolated HPE-themed entry.
- [ ] Build logs, generated-render screenshots, and render notes preserved.
- [ ] Invalid attempts excluded; required number of valid records per condition summarized.
- [ ] Guide and evidence committed, reviewed, and merged.
