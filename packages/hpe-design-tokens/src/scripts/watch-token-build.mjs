import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

// Watches token source files and reruns the Style Dictionary build so token
// outputs stay current during local development without manual rebuilds.

const workspaceRoot = path.resolve(process.cwd(), '../..');
const tokensDirectory = path.join(process.cwd(), 'tokens');

const buildTokens = () =>
  new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['build-style-dictionary'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: process.env,
    });

    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`build-style-dictionary failed with exit code ${code}`),
        );
    });
  });

const listTokenFiles = directory =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(({ name }) => name !== '.tmp')
    .flatMap(entry => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) return listTokenFiles(fullPath);
      if (entry.name.endsWith('.json')) return [fullPath];
      return [];
    });

const getSnapshot = () => {
  const files = listTokenFiles(tokensDirectory);
  const latestMtime = files.reduce((latest, filePath) => {
    const { mtimeMs } = fs.statSync(filePath);
    return Math.max(latest, mtimeMs);
  }, 0);

  return {
    count: files.length,
    latestMtime,
  };
};

let building = false;
let queued = false;
let lastSnapshot = getSnapshot();

const runBuild = async () => {
  if (building) {
    queued = true;
    return;
  }

  building = true;
  try {
    await buildTokens();
    console.log('[watch-token-build] Build complete.');
  } catch (error) {
    console.error('[watch-token-build] Build failed:', error.message);
  } finally {
    building = false;
    if (queued) {
      queued = false;
      await runBuild();
    }
  }
};

console.log(
  `[watch-token-build] Watching ${tokensDirectory} for token changes...`,
);
console.log(`[watch-token-build] Workspace root: ${workspaceRoot}`);
await runBuild();

setInterval(async () => {
  const current = getSnapshot();
  if (
    current.count !== lastSnapshot.count ||
    current.latestMtime !== lastSnapshot.latestMtime
  ) {
    lastSnapshot = current;
    console.log('[watch-token-build] Token changes detected. Rebuilding...');
    await runBuild();
  }
}, 800);
