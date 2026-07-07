import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repoRoot = process.cwd();

const readJson = (relativePath) => {
  const fullPath = path.join(repoRoot, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
};

const toRem = (value) => {
  const rem = Number(value) / 16;
  return `${rem.toFixed(4).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/g, '')}rem`;
};

const listFilesRecursively = (directory) => {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.tmp') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFilesRecursively(fullPath));
    else files.push(fullPath);
  }
  return files;
};

const getLatestMtimeMs = (files) =>
  files.reduce((latest, filePath) => {
    const mtimeMs = fs.statSync(filePath).mtimeMs;
    return Math.max(latest, mtimeMs);
  }, 0);

const failures = [];

const primitivesPath =
  'packages/hpe-design-tokens/tokens/primitive/primitives.default.json';
const primitives = readJson(primitivesPath);
const baseFont100 = primitives?.base?.fontSize?.['100']?.$value;

if (typeof baseFont100 !== 'number') {
  failures.push(`Could not read numeric base.fontSize.100 from ${primitivesPath}`);
}

const tokensRoot = path.join(repoRoot, 'packages/hpe-design-tokens/tokens');
const distRoot = path.join(repoRoot, 'packages/hpe-design-tokens/dist');
const dimensionModulePath = path.join(distRoot, 'grommet/dimension.js');

if (!fs.existsSync(distRoot)) {
  failures.push('Missing packages/hpe-design-tokens/dist (run token build).');
}

if (!fs.existsSync(dimensionModulePath)) {
  failures.push(
    'Missing packages/hpe-design-tokens/dist/grommet/dimension.js (run token build).',
  );
}

if (fs.existsSync(tokensRoot) && fs.existsSync(distRoot)) {
  const tokenFiles = listFilesRecursively(tokensRoot).filter((filePath) =>
    filePath.endsWith('.json'),
  );
  const distFiles = listFilesRecursively(distRoot);

  if (tokenFiles.length === 0) {
    failures.push('No token source JSON files were found under packages/hpe-design-tokens/tokens.');
  } else if (distFiles.length === 0) {
    failures.push('No generated files were found under packages/hpe-design-tokens/dist.');
  } else {
    const newestTokenSource = getLatestMtimeMs(tokenFiles);
    const newestDistArtifact = getLatestMtimeMs(distFiles);

    if (newestTokenSource > newestDistArtifact) {
      failures.push(
        'Token source files are newer than generated dist artifacts. Run pnpm --filter hpe-design-tokens build.',
      );
    }
  }
}

let actualTextMedium;
if (fs.existsSync(dimensionModulePath)) {
  const dimensionModule = await import(pathToFileURL(dimensionModulePath).href);
  actualTextMedium = dimensionModule?.default?.hpe?.text?.medium?.fontSize;
}

if (typeof baseFont100 === 'number' && actualTextMedium) {
  const expectedTextMedium = toRem(baseFont100);
  if (actualTextMedium !== expectedTextMedium) {
    failures.push(
      `text.medium.fontSize mismatch: expected ${expectedTextMedium}, got ${actualTextMedium}`,
    );
  }
}

const verifyWorkspaceLink = (consumerPath) => {
  const depPath = path.join(
    repoRoot,
    consumerPath,
    'node_modules/hpe-design-tokens/package.json',
  );

  if (!fs.existsSync(depPath)) {
    failures.push(
      `Missing dependency at ${consumerPath}/node_modules/hpe-design-tokens`,
    );
    return;
  }

  const realPath = fs.realpathSync(depPath);
  const expectedSuffix = path.join(
    'packages',
    'hpe-design-tokens',
    'package.json',
  );
  if (!realPath.endsWith(expectedSuffix)) {
    failures.push(
      `${consumerPath} resolves hpe-design-tokens outside workspace: ${realPath}`,
    );
  }
};

verifyWorkspaceLink('shared/hooks');
verifyWorkspaceLink('sandbox/grommet-app');

if (failures.length > 0) {
  console.error('Token preview verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Token preview verification passed.');
console.log(`- base.fontSize.100: ${baseFont100}`);
console.log(`- hpe.text.medium.fontSize: ${actualTextMedium}`);
console.log('- tokens/dist build freshness check: passed');
console.log('- @shared/hooks and grommet-app both resolve local workspace tokens.');
