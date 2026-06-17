import { execFileSync } from 'child_process';
import { createHash } from 'crypto';
import * as fs from 'fs';
import path from 'path';

function getCliArgValue(args: string[], option: string): string | undefined {
  const optionIndex = args.indexOf(option);
  if (optionIndex >= 0 && optionIndex + 1 < args.length) {
    return args[optionIndex + 1];
  }

  const prefixedMatch = args.find(arg => arg.startsWith(`${option}=`));
  if (prefixedMatch) {
    return prefixedMatch.slice(option.length + 1);
  }

  return undefined;
}

function collectFilesRecursively(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFilesRecursively(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function snapshotDirectory(directory: string): Map<string, string> {
  const snapshot = new Map<string, string>();
  const files = collectFilesRecursively(directory)
    .map(filePath => path.relative(directory, filePath))
    .sort((a, b) => a.localeCompare(b));

  for (const relativeFilePath of files) {
    const absoluteFilePath = path.join(directory, relativeFilePath);
    const fileContents = fs.readFileSync(absoluteFilePath);
    const hash = createHash('sha256').update(fileContents).digest('hex');
    snapshot.set(relativeFilePath, hash);
  }

  return snapshot;
}

function diffSnapshots(
  first: Map<string, string>,
  second: Map<string, string>,
): string[] {
  const allPaths = new Set([...first.keys(), ...second.keys()]);
  const changedPaths: string[] = [];

  for (const filePath of allPaths) {
    if (first.get(filePath) !== second.get(filePath)) {
      changedPaths.push(filePath);
    }
  }

  return changedPaths.sort((a, b) => a.localeCompare(b));
}

function runSyncTwiceAndCheckRepeatability() {
  const forwardedArgs = process.argv.slice(2);
  const outputDirArg =
    getCliArgValue(forwardedArgs, '--output') || 'tokens_new';
  const outputDir = path.resolve(process.cwd(), outputDirArg);

  console.log('Running first sync pass...');
  execFileSync('pnpm', ['sync-figma-to-tokens', '--', ...forwardedArgs], {
    stdio: 'inherit',
  });

  if (!fs.existsSync(outputDir)) {
    throw new Error(
      `Output directory does not exist after first pass: ${outputDir}`,
    );
  }

  const firstSnapshot = snapshotDirectory(outputDir);

  console.log('Running second sync pass...');
  execFileSync('pnpm', ['sync-figma-to-tokens', '--', ...forwardedArgs], {
    stdio: 'inherit',
  });

  const secondSnapshot = snapshotDirectory(outputDir);
  const changedPaths = diffSnapshots(firstSnapshot, secondSnapshot);

  if (changedPaths.length > 0) {
    throw new Error(
      `Repeatability check failed. ${changedPaths.length} file(s) changed on second pass: ${changedPaths.join(', ')}`,
    );
  }

  console.log(
    `Repeatability check passed. No files changed on second pass in ${outputDirArg}.`,
  );
}

runSyncTwiceAndCheckRepeatability();
