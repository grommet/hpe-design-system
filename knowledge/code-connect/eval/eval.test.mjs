import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  runBuild,
  scoreSource,
  summarizeRuns,
  writeRunRecord,
} from './eval.mjs';

const evalDirectory = path.dirname(fileURLToPath(import.meta.url));
const appDashboardCase = JSON.parse(
  await readFile(
    path.join(evalDirectory, 'cases/app-dashboard/case.json'),
    'utf8',
  ),
);
const buttonSmokeCase = JSON.parse(
  await readFile(
    path.join(evalDirectory, 'cases/button-smoke/case.json'),
    'utf8',
  ),
);
const fixture = name =>
  readFile(path.join(evalDirectory, 'fixtures', name), 'utf8');

test('counts mapped components through aliased imports', async () => {
  const metrics = scoreSource(await fixture('passing.jsx'), appDashboardCase);
  assert.equal(metrics.coverage.coveredTotal, 22);
  assert.equal(metrics.coverage.percent, 100);
  assert.deepEqual(metrics.coverage.components.Button, {
    expected: 21,
    actual: 21,
    covered: 21,
  });
  assert.deepEqual(metrics.coverage.components.Menu, {
    expected: 1,
    actual: 1,
    covered: 1,
  });
  assert.deepEqual(metrics.imports.disallowed, []);
  assert.equal(metrics.hygiene.clean, true);
});

test('scores the single Button smoke target', async () => {
  const source = `import { Button as Action } from 'grommet';
    export default () => <Action label="Label" primary size="small" />;`;
  const metrics = scoreSource(source, buttonSmokeCase);
  assert.equal(metrics.coverage.coveredTotal, 1);
  assert.equal(metrics.coverage.percent, 100);
});

test('reports coverage, import, and hygiene failures', async () => {
  const metrics = scoreSource(await fixture('failing.jsx'), appDashboardCase);
  assert.equal(metrics.coverage.coveredTotal, 2);
  assert.deepEqual(metrics.imports.disallowed, ['not-allowed-package']);
  assert.deepEqual(metrics.hygiene.counts, {
    'inline-style': 1,
    'hard-coded-color': 2,
    'pixel-value': 2,
  });
});

test('ignores ordinary text and unconfigured props', () => {
  const source =
    'export default () => <div title="24px #fff rgb(0,0,0)" ' +
    'data-size="10px" width="100%">#000</div>';
  const metrics = scoreSource(source, appDashboardCase);
  assert.equal(metrics.hygiene.clean, true);
});

test('captures successful and failed build results', () => {
  assert.equal(runBuild('node -e "process.exit(0)"').status, 'pass');
  const failure = runBuild('node -e "process.exit(7)"');
  assert.equal(failure.status, 'fail');
  assert.equal(failure.exitCode, 7);
});

test('writes records without overwriting and summarizes per case', async () => {
  assert.deepEqual(summarizeRuns([], appDashboardCase.id).conditions, {});
  const directory = await mkdtemp(path.join(os.tmpdir(), 'code-connect-eval-'));
  const record = {
    caseId: appDashboardCase.id,
    runId: 'first-run',
    condition: 'mcp-cc',
    metadata: { isEvaluation: true },
    metrics: {
      coverage: { percent: 100 },
      hygiene: { clean: true },
      imports: { packages: ['grommet'] },
    },
    build: { status: 'pass' },
  };
  try {
    const recordPath = await writeRunRecord(directory, record);
    await assert.rejects(writeRunRecord(directory, record), { code: 'EEXIST' });
    assert.deepEqual(JSON.parse(await readFile(recordPath, 'utf8')), record);

    const summary = summarizeRuns(
      [
        record,
        {
          ...record,
          caseId: 'another-page',
          condition: 'screenshot',
        },
        {
          ...record,
          runId: 'tooling-check',
          metadata: { isEvaluation: false },
          metrics: {
            ...record.metrics,
            coverage: { percent: 0 },
          },
        },
      ],
      appDashboardCase.id,
    );
    assert.equal(summary.caseId, appDashboardCase.id);
    assert.equal(summary.conditions['mcp-cc'].runCount, 1);
    assert.equal(summary.conditions['mcp-cc'].meanCoveragePercent, 100);
    assert.equal(summary.conditions.screenshot, undefined);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
