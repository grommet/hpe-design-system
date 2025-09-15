#!/usr/bin/env node
/**
 * Enhanced Codemod dispatcher CLI for grommet-theme-hpe
 * Usage: node bin/cli.js <transform> <path> [options]
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

const getAllFiles = (dir, exts) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else if (exts.includes(path.extname(filePath).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results;
};

const printHelp = () => {
  const usage = [
    '',
    'HPE Design System Codemods',
    '',
    'Usage: node bin/cli.js <transform> <path> [options]',
    '',
    'Transforms:',
    '  migrate-theme-v6-to-v7   Migrate v6 theme to v7',
    '',
    'Options:',
    '  --dry      Run in dry mode (no changes)',
    '  --scan     Scan for changes without transforming',
    '  --verbose  Set verbosity level (0, 1, or 2). Default is 0',
    '             0: Minimal output, only shows essential information',
    '             1: Shows files that contain no changes (default jscodeshift output)',
    '             2: Shows only files that were successfully updated (recommended)',
    '  --quote    Set quote style (single or double). Default is double',
    '  --help     Show this help message',
    '',
    'Example usage:',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --scan',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --dry',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --quote single --dry',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --verbose 0 --dry',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --verbose 1',
    '  node bin/cli.js migrate-theme-v6-to-v7 src/ --verbose 2',
    '',
  ];
  console.log(usage.join('\n'));
};

// Handle --help flag
if (args.includes('--help') || args.length < 2) {
  printHelp();
  process.exit(0);
}

const transform = args[0];
const target = args[1];

const transforms = {
  'migrate-theme-v6-to-v7': path.join(
    __dirname,
    '../transforms/migrate-theme-v6-to-v7.js',
  ),
  // Add more transforms here aka v7-to-v8
};

if (!transforms[transform]) {
  console.error(`Unknown transform: ${transform}`);
  printHelp();
  process.exit(1);
}

// Handle --dry flag
const dry = args.includes('--dry');
const dryFlag = dry ? '--dry' : '';

// Handle --verbose level flag
let verboseLevel = 0;
const verboseIndex = args.indexOf('--verbose');
if (
  verboseIndex !== -1 &&
  args[verboseIndex + 1] &&
  (args[verboseIndex + 1] === '0' ||
    args[verboseIndex + 1] === '1' ||
    args[verboseIndex + 1] === '2')
) {
  verboseLevel = Number(args[verboseIndex + 1]);
}
const verboseFlag = `-v ${verboseLevel}`;

// Handle --quote flag
let quoteFlag = '--quote=double';
const quoteIndex = args.indexOf('--quote');
if (quoteIndex !== -1 && args[quoteIndex + 1]) {
  const quoteValue = args[quoteIndex + 1];
  if (quoteValue === 'single' || quoteValue === 'double') {
    quoteFlag = `--quote=${quoteValue}`;
  }
}

let filesToProcess = [];
if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
  filesToProcess = getAllFiles(target, ['.js', '.jsx', '.ts', '.tsx']);
} else {
  filesToProcess = [target];
}

// Batch files by extension for faster processing
const tsFiles = filesToProcess.filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return ext === '.ts' || ext === '.tsx';
});
const jsFiles = filesToProcess.filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return ext === '.js' || ext === '.jsx';
});

let hadError = false;

function runJscodeshift({ files, parser, extensions, scan }) {
  if (files.length === 0) return;

  let cmd = `npx jscodeshift`;
  if (parser) cmd += ` --parser=${parser}`;
  if (scan) cmd += ` --scan=true`;
  if (extensions) cmd += ` --extensions=${extensions}`;
  cmd += ` -t "${transforms[transform]}"`;
  if (!scan) {
    if (dryFlag) cmd += ` ${dryFlag}`;
    if (verboseFlag) cmd += ` ${verboseFlag}`;
    if (quoteFlag) cmd += ` ${quoteFlag}`;
  }
  cmd += ` ${files.map((f) => `"${f}"`).join(' ')}`;

  // For verbose 2, process files individually to show which ones are changed
  if (!scan && verboseLevel === 2) {
    let changedFiles = 0;
    let totalFiles = 0;

    try {
      const output = execSync(cmd, { encoding: 'utf8' });
      // For verbose level 2, parse output to show individual file successes
      output.split('\n').forEach(line => {
        const file = line.split(' ')[2];
        if (line.includes(target)) {
          totalFiles++;
          if (line.includes('OK')){
            changedFiles++;
            if (dry) {
              console.log(`🔍 Would update t-shirt sizes: ${file}`);
            }
            else {
              console.log(`✅ Updated t-shirt sizes: ${file}`);
            } 
          }
        }
      });
    } catch (err) {
      hadError = true;
      console.log(err);
      if (scan) {
        console.error('Scan failed:', err.message);
      } else {
        const type = parser === 'tsx' ? 'TypeScript' : 'JS/JSX';
        console.error(`Error processing ${type} files`);
      }
    }

    // Only show summary if there were files to process and some changes or errors occurred
    if (totalFiles > 0 && (changedFiles > 0 || hadError)) {
      if (dry) {
        console.log(
          `\n🔍 T-shirt size migration preview: ${changedFiles} files would be updated, ${totalFiles - changedFiles} files unchanged (${totalFiles} total files processed)`,
        );
      } else {
        console.log(
          `\n🎯 T-shirt size migration complete: ${changedFiles} files updated, ${totalFiles - changedFiles} files unchanged (${totalFiles} total files processed)`,
        );
      }
    }
    return;
  }

  // Regular processing for other verbose levels
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
  } catch (err) {
    hadError = true;
    if (scan) {
      console.error('Scan failed:', err.message);
    } else {
      const type = parser === 'tsx' ? 'TypeScript' : 'JS/JSX';
      console.error(`Error processing ${type} files`);
    }
  }
}

if (args.includes('--scan')) {
  console.log('🔍 Scanning for changes...\n');
  runJscodeshift({
    files: tsFiles,
    parser: 'tsx',
    extensions: 'ts,tsx',
    scan: true,
  });
  runJscodeshift({
    files: jsFiles,
    parser: null,
    extensions: 'js,jsx',
    scan: true,
  });
  if (hadError) process.exit(1);
  console.log(
    '\n✅ Scan complete. Files listed above may need review and manual changes.',
  );
  process.exit(0);
}

runJscodeshift({
  files: tsFiles,
  parser: 'tsx',
  extensions: 'ts,tsx',
  scan: false,
});
runJscodeshift({
  files: jsFiles,
  parser: null,
  extensions: 'js,jsx',
  scan: false,
});

if (hadError) {
  process.exit(1);
}

if (!args.includes('--scan')) {
  console.log('');
  if (dry) {
    console.log('🔍 Dry run complete! No files were actually changed.');
    console.log('');
    console.log('📋 What would happen:');
    console.log(
      '   • Would automatically identify and update t-shirt size values with high confidence',
    );
    console.log(
      '   • Would transform props like pad, margin, gap, height, width, round, etc.',
    );
    console.log('');
    console.log('🔍 Next steps:');
    console.log(
      ' • Remove --dry flag to apply the changes',
    );
    console.log(
      ' • Use --scan to see potential manual changes that may need manual review or fix',
    );
  } else {
    console.log('✅ Grommet Theme HPE v6 → v7 migration complete!');
    console.log('');
    console.log('📋 What happened:');
    console.log(
      '   • Automatically identified and updated t-shirt size values with high confidence',
    );
    console.log(
      '   • Transformed props like pad, margin, gap, height, width, round, etc.',
    );
    console.log('');
    console.log('🔍 Next step:');
    console.log(
      ' Use --scan to see potential manual changes that may need manual review or fix',
    );
  }
}
