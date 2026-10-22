import { spawnSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const EVAL_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(EVAL_DIR, '../../..');
const DEFAULT_CASE = path.join(EVAL_DIR, 'cases/app-dashboard/case.json');
const RESULTS_DIR = path.join(EVAL_DIR, 'results');
const CONDITIONS = new Set(['screenshot', 'mcp-no-cc', 'mcp-cc']);
const COLOR_PATTERN =
  /#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})\b|\brgba?\(\s*[^)]*\)/gi;
const PIXEL_PATTERN = /\b\d+(?:\.\d+)?px\b/gi;

const packageNameFromSpecifier = specifier => {
  if (
    specifier.startsWith('.') ||
    specifier.startsWith('/') ||
    specifier.startsWith('#') ||
    specifier.startsWith('node:')
  )
    return null;
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
};

const jsxElementName = tagName => {
  if (ts.isIdentifier(tagName)) return tagName.text;
  if (
    ts.isPropertyAccessExpression(tagName) &&
    ts.isIdentifier(tagName.expression)
  )
    return `${tagName.expression.text}.${tagName.name.text}`;
  return null;
};

const collectStringLiterals = node => {
  const values = [];
  const visit = current => {
    if (
      ts.isStringLiteral(current) ||
      ts.isNoSubstitutionTemplateLiteral(current)
    )
      values.push(current.text);
    ts.forEachChild(current, visit);
  };
  if (node) visit(node);
  return values;
};

export const scoreSource = (source, caseData, fileName = 'Example.jsx') => {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JSX,
  );
  if (sourceFile.parseDiagnostics.length) {
    const messages = sourceFile.parseDiagnostics
      .map(({ messageText }) =>
        ts.flattenDiagnosticMessageText(messageText, '\n'),
      )
      .join('\n');
    throw new Error(`Unable to parse JSX: ${messages}`);
  }

  const expectedNames = new Set(Object.keys(caseData.expectedMappedInstances));
  const componentBindings = new Map();
  const importedPackages = new Set();
  const disallowedPackages = new Set();
  const findings = [];
  const actualInstances = Object.fromEntries(
    [...expectedNames].map(name => [name, 0]),
  );

  const addFinding = (kind, node, element, prop, value) => {
    const { line } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    );
    findings.push({ kind, line: line + 1, element, prop, value });
  };

  const visit = node => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier.text;
      const packageName = packageNameFromSpecifier(specifier);
      if (packageName) {
        importedPackages.add(packageName);
        if (!caseData.allowedPackages.includes(packageName))
          disallowedPackages.add(packageName);
      }

      if (specifier === 'grommet' && node.importClause?.namedBindings) {
        const bindings = node.importClause.namedBindings;
        if (ts.isNamedImports(bindings)) {
          bindings.elements.forEach(imported => {
            const exportedName =
              imported.propertyName?.text ?? imported.name.text;
            if (expectedNames.has(exportedName))
              componentBindings.set(imported.name.text, exportedName);
          });
        } else if (ts.isNamespaceImport(bindings)) {
          expectedNames.forEach(name => {
            componentBindings.set(`${bindings.name.text}.${name}`, name);
          });
        }
      }
    }

    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const element = jsxElementName(node.tagName);
      const component = element && componentBindings.get(element);
      if (component) actualInstances[component] += 1;

      node.attributes.properties
        .filter(ts.isJsxAttribute)
        .forEach(attribute => {
          const prop = attribute.name.getText(sourceFile);
          if (prop === 'style')
            addFinding('inline-style', attribute, element, prop, 'style prop');

          collectStringLiterals(attribute.initializer).forEach(value => {
            if (caseData.colorProps.includes(prop)) {
              Array.from(value.matchAll(new RegExp(COLOR_PATTERN))).forEach(
                match =>
                  addFinding(
                    'hard-coded-color',
                    attribute,
                    element,
                    prop,
                    match[0],
                  ),
              );
            }
            if (caseData.pixelValueProps.includes(prop)) {
              Array.from(value.matchAll(new RegExp(PIXEL_PATTERN))).forEach(
                match =>
                  addFinding('pixel-value', attribute, element, prop, match[0]),
              );
            }
          });
        });
    }

    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  const components = Object.fromEntries(
    Object.entries(caseData.expectedMappedInstances).map(([name, expected]) => {
      const actual = actualInstances[name];
      return [name, { expected, actual, covered: Math.min(expected, actual) }];
    }),
  );
  const expectedTotal = Object.values(caseData.expectedMappedInstances).reduce(
    (total, count) => total + count,
    0,
  );
  const coveredTotal = Object.values(components).reduce(
    (total, component) => total + component.covered,
    0,
  );
  const hygieneCounts = findings.reduce(
    (counts, { kind }) => ({ ...counts, [kind]: (counts[kind] ?? 0) + 1 }),
    {},
  );

  return {
    coverage: {
      components,
      expectedTotal,
      coveredTotal,
      percent: expectedTotal
        ? Number(((coveredTotal / expectedTotal) * 100).toFixed(2))
        : 100,
      scope: [
        'AST-level component presence only;',
        'mapping semantics and visible intent require review.',
      ].join(' '),
    },
    imports: {
      packages: [...importedPackages].sort(),
      disallowed: [...disallowedPackages].sort(),
    },
    hygiene: {
      clean: findings.length === 0,
      counts: hygieneCounts,
      findings,
    },
  };
};

export const runBuild = (command, cwd = process.cwd()) => {
  const startedAt = Date.now();
  const result = spawnSync(command, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
    shell: true,
  });
  return {
    command,
    cwd,
    status: !result.error && result.status === 0 ? 'pass' : 'fail',
    exitCode: result.status,
    signal: result.signal,
    durationMs: Date.now() - startedAt,
    stdout: (result.stdout ?? '').slice(-4000),
    stderr: (result.stderr ?? result.error?.message ?? '').slice(-4000),
  };
};

const safeFilePart = value => value.replace(/[^a-zA-Z0-9._-]+/g, '-');

const writeJsonExclusive = async (directory, fileName, data) => {
  await mkdir(directory, { recursive: true });
  const filePath = path.join(directory, fileName);
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, {
    flag: 'wx',
  });
  return filePath;
};

export const writeRunRecord = async (directory, record) => {
  const fileName = `${[record.caseId, record.condition, record.runId]
    .map(safeFilePart)
    .join('-')}.json`;
  return writeJsonExclusive(directory, fileName, record);
};

export const summarizeRuns = (records, caseId) => {
  const eligibleRuns = records.filter(
    record =>
      record.caseId === caseId && record.metadata?.isEvaluation !== false,
  );
  const grouped = eligibleRuns.reduce((groups, record) => {
    const current = groups[record.condition] ?? {
      runCount: 0,
      buildPasses: 0,
      totalCoverage: 0,
      cleanHygieneRuns: 0,
      importedPackages: new Set(),
    };
    return {
      ...groups,
      [record.condition]: {
        runCount: current.runCount + 1,
        buildPasses:
          current.buildPasses + (record.build.status === 'pass' ? 1 : 0),
        totalCoverage: current.totalCoverage + record.metrics.coverage.percent,
        cleanHygieneRuns:
          current.cleanHygieneRuns + (record.metrics.hygiene.clean ? 1 : 0),
        importedPackages: new Set([
          ...current.importedPackages,
          ...record.metrics.imports.packages,
        ]),
      },
    };
  }, {});
  const conditions = Object.fromEntries(
    Object.entries(grouped).map(([condition, group]) => [
      condition,
      {
        runCount: group.runCount,
        buildPasses: group.buildPasses,
        meanCoveragePercent: Number(
          (group.totalCoverage / group.runCount).toFixed(2),
        ),
        cleanHygieneRuns: group.cleanHygieneRuns,
        importedPackages: [...group.importedPackages].sort(),
      },
    ]),
  );
  return { caseId, generatedAt: new Date().toISOString(), conditions };
};

const parseOptions = args => {
  const options = {};
  const normalizedArgs = args.filter(argument => argument !== '--');
  for (let index = 0; index < normalizedArgs.length; index += 1) {
    const key = normalizedArgs[index];
    if (
      !key.startsWith('--') ||
      !normalizedArgs[index + 1] ||
      normalizedArgs[index + 1].startsWith('--')
    )
      throw new Error(`Expected a value after ${key}`);
    options[key.slice(2)] = normalizedArgs[index + 1];
    index += 1;
  }
  return options;
};

const resolvePrompt = async options => {
  if (options.prompt && options['prompt-file'])
    throw new Error('Use either --prompt or --prompt-file, not both');
  if (options.prompt?.trim()) return { text: options.prompt, filePath: null };
  if (options['prompt-file']) {
    const filePath = path.resolve(options['prompt-file']);
    const text = await readFile(filePath, 'utf8');
    if (text.trim()) return { text, filePath };
  }
  throw new Error('score requires a non-empty --prompt or --prompt-file');
};

const resolveMappingCommit = override => {
  if (override) return override;
  const result = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  if (result.error || result.status !== 0)
    throw new Error(
      'Unable to determine mapping commit; pass --mapping-commit',
    );
  return result.stdout.trim();
};

const scoreRun = async options => {
  if (
    !options.source ||
    !options.condition ||
    !options.build ||
    !options.model ||
    !options['run-number']
  )
    throw new Error(
      'score requires --source, --condition, --build, --model, ' +
        'and --run-number',
    );
  if (!CONDITIONS.has(options.condition))
    throw new Error(`Unknown condition: ${options.condition}`);
  const runNumber = Number(options['run-number']);
  if (!Number.isSafeInteger(runNumber) || runNumber < 1)
    throw new Error('--run-number must be a positive integer');

  const casePath = path.resolve(options.case ?? DEFAULT_CASE);
  const sourcePath = path.resolve(options.source);
  const caseData = JSON.parse(await readFile(casePath, 'utf8'));
  const source = await readFile(sourcePath, 'utf8');
  const prompt = await resolvePrompt(options);
  const mappingCommit = resolveMappingCommit(options['mapping-commit']);
  const metrics = scoreSource(source, caseData, sourcePath);
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const build = runBuild(options.build, cwd);
  const runId =
    options['run-id'] ?? new Date().toISOString().replace(/[:.]/g, '-');
  const record = {
    schemaVersion: 1,
    caseId: caseData.id,
    runNumber,
    runId,
    condition: options.condition,
    recordedAt: new Date().toISOString(),
    metadata: {
      purpose: options.purpose ?? 'evaluation',
      isEvaluation: options.purpose !== 'tooling-smoke',
      model: options.model,
      prompt: prompt.text,
      promptFile: prompt.filePath
        ? path.relative(REPO_ROOT, prompt.filePath)
        : null,
      promptVersion: options['prompt-version'] ?? null,
      figmaFileKey: caseData.figmaFileKey ?? null,
      figmaNodeId: caseData.figmaNodeId ?? caseData.figmaTargetNodeId ?? null,
      figmaFrameNodeId: caseData.figmaFrameNodeId ?? null,
      mappingCommit,
      outputPath: path.relative(REPO_ROOT, sourcePath),
      source: path.relative(REPO_ROOT, sourcePath),
      caseFile: path.relative(REPO_ROOT, casePath),
    },
    metrics,
    build,
  };
  const resultsDir = path.resolve(
    options['results-dir'] ?? path.join(RESULTS_DIR, caseData.id),
  );
  const recordPath = await writeRunRecord(
    path.join(resultsDir, 'runs'),
    record,
  );
  process.stdout.write(
    `${JSON.stringify({ ...record, recordPath }, null, 2)}\n`,
  );
  if (build.status !== 'pass' || metrics.imports.disallowed.length)
    process.exitCode = 1;
};

const summarize = async options => {
  const casePath = path.resolve(options.case ?? DEFAULT_CASE);
  const caseData = JSON.parse(await readFile(casePath, 'utf8'));
  const resultsDir = path.resolve(
    options['results-dir'] ?? path.join(RESULTS_DIR, caseData.id),
  );
  const runsDir = path.join(resultsDir, 'runs');
  await mkdir(runsDir, { recursive: true });
  const files = (await readdir(runsDir, { withFileTypes: true })).filter(
    entry => entry.isFile() && entry.name.endsWith('.json'),
  );
  const records = await Promise.all(
    files.map(({ name }) =>
      readFile(path.join(runsDir, name), 'utf8').then(JSON.parse),
    ),
  );
  const summary = summarizeRuns(records, caseData.id);
  const outputDir = path.resolve(
    options['output-dir'] ?? path.join(resultsDir, 'summaries'),
  );
  const fileName = `conditions-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const summaryPath = await writeJsonExclusive(outputDir, fileName, summary);
  process.stdout.write(
    `${JSON.stringify({ ...summary, summaryPath }, null, 2)}\n`,
  );
};

const main = async () => {
  const [command, ...args] = process.argv.slice(2);
  const options = parseOptions(args);
  if (command === 'score') await scoreRun(options);
  else if (command === 'summary') await summarize(options);
  else
    throw new Error(
      'Usage: eval.mjs score --source <jsx> --condition <condition> ' +
        '--build <command> [options] | summary [options]',
    );
};

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
