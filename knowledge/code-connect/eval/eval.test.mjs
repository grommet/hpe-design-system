import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
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
const appDashboardFixture = JSON.parse(
  await readFile(
    path.join(evalDirectory, 'fixtures/app-dashboard/fixture.json'),
    'utf8',
  ),
);
const buttonSmokeFixture = JSON.parse(
  await readFile(
    path.join(evalDirectory, 'fixtures/button-smoke/fixture.json'),
    'utf8',
  ),
);
const fixture = name =>
  readFile(path.join(evalDirectory, 'fixtures', name), 'utf8');

test('counts mapped components through aliased imports', async () => {
  const metrics = scoreSource(
    await fixture('passing-page.jsx'),
    appDashboardFixture,
  );
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
  const metrics = scoreSource(source, buttonSmokeFixture);
  assert.equal(metrics.coverage.coveredTotal, 1);
  assert.equal(metrics.coverage.percent, 100);
});

test('reports coverage, import, and hygiene failures', async () => {
  const metrics = scoreSource(
    await fixture('failing-page.jsx'),
    appDashboardFixture,
  );
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
  const metrics = scoreSource(source, appDashboardFixture);
  assert.equal(metrics.hygiene.clean, true);
});

test('captures successful and failed build results', () => {
  assert.equal(runBuild('node -e "process.exit(0)"').status, 'pass');
  const failure = runBuild('node -e "process.exit(7)"');
  assert.equal(failure.status, 'fail');
  assert.equal(failure.exitCode, 7);
});

test('writes records without overwriting and summarizes per fixture', async () => {
  assert.deepEqual(summarizeRuns([], appDashboardFixture.id).conditions, {});
  const directory = await mkdtemp(path.join(os.tmpdir(), 'code-connect-eval-'));
  const record = {
    fixtureId: appDashboardFixture.id,
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
          fixtureId: 'another-page',
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
      appDashboardFixture.id,
    );
    assert.equal(summary.fixtureId, appDashboardFixture.id);
    assert.equal(summary.conditions['mcp-cc'].runCount, 1);
    assert.equal(summary.conditions['mcp-cc'].meanCoveragePercent, 100);
    assert.equal(summary.conditions.screenshot, undefined);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('records CLI run provenance', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'code-connect-cli-'));
  const promptPath = path.join(directory, 'prompt.txt');
  const prompt = 'Use the supplied Figma design as the implementation target.';
  const repoRoot = path.resolve(evalDirectory, '../../..');
  const sourcePath = path.join(evalDirectory, 'fixtures/passing-page.jsx');
  await writeFile(promptPath, prompt);

  try {
    const result = spawnSync(
      process.execPath,
      [
        path.join(evalDirectory, 'eval.mjs'),
        'score',
        '--source',
        sourcePath,
        '--condition',
        'screenshot',
        '--fixture',
        path.join(evalDirectory, 'fixtures/app-dashboard/fixture.json'),
        '--build',
        'node -e "process.exit(0)"',
        '--cwd',
        repoRoot,
        '--results-dir',
        path.join(directory, 'results'),
        '--run-number',
        '2',
        '--run-id',
        'provenance-check',
        '--model',
        'test-model',
        '--prompt-file',
        promptPath,
        '--mapping-commit',
        'test-mapping-commit',
      ],
      { cwd: repoRoot, encoding: 'utf8' },
    );
    assert.equal(result.status, 0, result.stderr);

    const recordPath = path.join(
      directory,
      'results/runs/app-dashboard-screenshot-provenance-check.json',
    );
    const record = JSON.parse(await readFile(recordPath, 'utf8'));
    assert.equal(record.schemaVersion, 1);
    assert.equal(record.fixtureId, appDashboardFixture.id);
    assert.equal(record.runNumber, 2);
    assert.equal(record.metadata.model, 'test-model');
    assert.equal(record.metadata.prompt, prompt);
    assert.equal(record.metadata.figmaFileKey, '4iURKcNplsUigS8LcGtVH0');
    assert.equal(record.metadata.figmaNodeId, '1:978');
    assert.equal(record.metadata.mappingCommit, 'test-mapping-commit');
    assert.equal(
      record.metadata.outputPath,
      path.relative(repoRoot, sourcePath),
    );
    assert.equal(
      record.metadata.promptFile,
      path.relative(repoRoot, promptPath),
    );
    assert.equal(
      record.metadata.fixtureFile,
      'knowledge/code-connect/eval/fixtures/app-dashboard/fixture.json',
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('rejects unknown options instead of silently using the default fixture', () => {
  const script = path.join(evalDirectory, 'eval.mjs');
  const result = spawnSync(
    process.execPath,
    [script, 'summary', '--fixtur', 'example.json'],
    { encoding: 'utf8' },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown option: --fixtur/);
});
