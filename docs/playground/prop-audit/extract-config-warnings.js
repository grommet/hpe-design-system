#!/usr/bin/env node
/**
 * extract-config-warnings.js
 *
 * Scans each audited component's source files for console.warn calls,
 * extracts the triggering condition and message, classifies the warning type,
 * and writes the results to config-warnings.csv.
 *
 * Usage:
 *   node prop-audit/extract-config-warnings.js
 *
 * Output:
 *   prop-audit/config-warnings.csv
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Components to scan — same 43 as the prop audit
// ---------------------------------------------------------------------------
const COMPONENTS = [
  { name: 'Box',              category: 'Layout'   },
  { name: 'Card',             category: 'Layout'   },
  { name: 'Footer',           category: 'Layout'   },
  { name: 'Grid',             category: 'Layout'   },
  { name: 'Header',           category: 'Layout'   },
  { name: 'Layer',            category: 'Layout'   },
  { name: 'Main',             category: 'Layout'   },
  { name: 'Page',             category: 'Layout'   },
  { name: 'PageHeader',       category: 'Layout'   },
  { name: 'Sidebar',          category: 'Layout'   },
  { name: 'Stack',            category: 'Layout'   },
  { name: 'Heading',          category: 'Type'     },
  { name: 'Markdown',         category: 'Type'     },
  { name: 'Paragraph',        category: 'Type'     },
  { name: 'Text',             category: 'Type'     },
  { name: 'Tag',              category: 'Type'     },
  { name: 'Accordion',        category: 'Controls' },
  { name: 'Anchor',           category: 'Controls' },
  { name: 'Button',           category: 'Controls' },
  { name: 'Drop',             category: 'Controls' },
  { name: 'DropButton',       category: 'Controls' },
  { name: 'Menu',             category: 'Controls' },
  { name: 'Nav',              category: 'Controls' },
  { name: 'Tabs',             category: 'Controls' },
  { name: 'Tip',              category: 'Controls' },
  { name: 'ToggleGroup',      category: 'Controls' },
  { name: 'CheckBox',         category: 'Input'    },
  { name: 'CheckBoxGroup',    category: 'Input'    },
  { name: 'DateInput',        category: 'Input'    },
  { name: 'FileInput',        category: 'Input'    },
  { name: 'MaskedInput',      category: 'Input'    },
  { name: 'RadioButton',      category: 'Input'    },
  { name: 'RadioButtonGroup', category: 'Input'    },
  { name: 'RangeInput',       category: 'Input'    },
  { name: 'RangeSelector',    category: 'Input'    },
  { name: 'Select',           category: 'Input'    },
  { name: 'SelectMultiple',   category: 'Input'    },
  { name: 'StarRating',       category: 'Input'    },
  { name: 'TextArea',         category: 'Input'    },
  { name: 'TextInput',        category: 'Input'    },
  { name: 'ThumbsRating',     category: 'Input'    },
  { name: 'FormField',        category: 'Input'    },
  { name: 'Form',             category: 'Input'    },
];

// ---------------------------------------------------------------------------
// Tokens to strip when extracting prop names from a condition string
// ---------------------------------------------------------------------------
const IGNORE_TOKENS = new Set([
  'if', 'else', 'return', 'const', 'let', 'var', 'function', 'typeof',
  'undefined', 'null', 'true', 'false', 'new', 'this', 'process', 'env',
  'NODE_ENV', 'production', 'Array', 'isArray', 'find', 'indexOf', 'length',
  'current', 'message', 'name', 'kind', 'item', 'obj', 'ref', 'props',
  'theme', 'global', 'deprecated', 'button', 'backgrounds', 'type',
]);

// ---------------------------------------------------------------------------
// Classify the warning based on the condition and message text
//
// warningType values:
//   mutual_exclusion  — two props that cannot both be truthy
//   conflict          — one usage mode conflicts with another (|| in condition)
//   dependency        — prop A requires prop B to be set
//   api_misuse        — prop used in wrong context (e.g. checked inside group)
//   deprecation       — use of a deprecated prop or API
//   incompatibility   — two features that technically cannot work together
//   other             — anything that doesn't fit the above
// ---------------------------------------------------------------------------
function classifyWarning(condition, message) {
  const msg  = message.toLowerCase();
  const cond = condition.toLowerCase();

  if (
    msg.includes('deprecated') ||
    (msg.includes('use') && msg.includes('instead'))
  ) return 'deprecation';

  if (
    msg.includes("shouldn't be used in") ||
    (msg.includes('use the') && msg.includes('prop instead'))
  ) return 'api_misuse';

  if (
    msg.includes('incompatible') ||
    msg.includes('cannot find') ||
    msg.includes("doesn't support") ||
    msg.includes('requires') && msg.includes('and')
  ) return 'incompatibility';

  // dependency: condition contains && ! (one is truthy, one is falsy/missing)
  if (cond.match(/&&\s*!/)) return 'dependency';

  // conflict: condition uses || (one of several props triggers the guard)
  if (cond.includes('||')) return 'conflict';

  // mutual exclusion: condition is purely && (both must be truthy to warn)
  if (cond.includes('&&') && !cond.includes('!')) return 'mutual_exclusion';

  return 'other';
}

// ---------------------------------------------------------------------------
// Extract likely prop names from a condition string
// ---------------------------------------------------------------------------
function extractPropNames(condition) {
  const tokens = condition.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
  const seen   = new Set();
  return tokens
    .filter(t => !IGNORE_TOKENS.has(t))
    .filter(t => t.length > 1)
    .filter(t => /[a-z]/.test(t)) // must contain at least one lowercase letter
    .filter(t => {
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    })
    .join(', ');
}

// ---------------------------------------------------------------------------
// Parse a source file and extract all { condition, message, lineNumber }
// tuples from console.warn call sites.
//
// Uses full-source scanning instead of line-by-line to correctly handle
// multi-line strings, eslint-disable comments, and deeply indented warns.
// ---------------------------------------------------------------------------

function captureParens(source, startIdx) {
  // startIdx is the char AFTER the opening `(` of console.warn(
  let depth = 1, content = '';
  for (let i = startIdx; i < source.length; i++) {
    const ch = source[i];
    if      (ch === '(') depth++;
    else if (ch === ')') { depth--; if (depth === 0) break; }
    content += ch;
  }
  return content;
}

function findEnclosingIf(source, warnIdx) {
  // Search up to 600 chars backwards for the nearest if(
  const slice   = source.slice(Math.max(0, warnIdx - 600), warnIdx);
  const matches = [...slice.matchAll(/\bif\s*\(/g)];
  if (!matches.length) return '';

  const last      = matches[matches.length - 1];
  const condStart = last.index + last[0].length;
  let depth = 1, cond = '';
  for (let i = condStart; i < slice.length; i++) {
    const ch = slice[i];
    if      (ch === '(') depth++;
    else if (ch === ')') { depth--; if (depth === 0) break; }
    cond += ch;
  }
  return cond.replace(/\s+/g, ' ').trim();
}

function cleanMessage(raw) {
  return raw
    .replace(/\/\/\s*eslint-disable[^\n]*/g, '') // strip eslint-disable comments
    .replace(/\/\*[^*]*\*\//g, '')               // strip inline block comments
    .replace(/^[\s\n,]+/, '')                    // strip leading whitespace and commas
    .replace(/[\s\n,]+$/, '')                    // strip trailing whitespace and commas
    .replace(/\s+/g, ' ')
    .replace(/^\S+\.message\s*\|\|\s*/, '')      // `x.message || 'fallback'` → keep fallback
    .replace(/^['"`]/, '').replace(/['"`]$/, '') // strip surrounding quotes/backticks
    .trim();
}

function parseWarnings(source) {
  const results = [];
  const warnRe  = /console\.warn\s*\(/g;
  let match;

  while ((match = warnRe.exec(source)) !== null) {
    const warnIdx  = match.index;
    const argStart = match.index + match[0].length; // char after `(`

    const rawMessage = captureParens(source, argStart);
    const message    = cleanMessage(rawMessage);
    if (!message || message.length <= 3) continue;

    const condition  = findEnclosingIf(source, warnIdx);
    const lineNumber = source.slice(0, warnIdx).split('\n').length;

    results.push({
      condition:  condition || '(no enclosing condition found)',
      message,
      lineNumber,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// CSV utilities
// ---------------------------------------------------------------------------
const CSV_COLUMNS = [
  'component',
  'componentCategory',
  'propsInvolved',
  'warningType',
  'message',
  'condition',
  'sourceFile',
  'lineNumber',
];

function csvEscape(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n'))
    return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const COMPONENTS_DIR = path.join(__dirname, '../src/js/components');
  const allRows        = [];

  for (const { name, category } of COMPONENTS) {
    const dir = path.join(COMPONENTS_DIR, name);
    if (!fs.existsSync(dir)) {
      console.log(`SKIP ${name} — directory not found`);
      continue;
    }

    // Scan .js files in the component directory (not subdirectories)
    // Exclude Styled* files, tests, and stories — they are not runtime code
    const files = fs.readdirSync(dir).filter(f =>
      f.endsWith('.js')         &&
      !f.includes('test')       &&
      !f.includes('stories')    &&
      !f.includes('Styled')     &&
      !f.includes('styled')
    );

    let found = 0;
    for (const file of files) {
      const absPath = path.join(dir, file);
      const relPath = `src/js/components/${name}/${file}`;
      const source  = fs.readFileSync(absPath, 'utf8');
      const warnings = parseWarnings(source);

      for (const { condition, message, lineNumber } of warnings) {
        allRows.push({
          component:         name,
          componentCategory: category,
          propsInvolved:     extractPropNames(condition),
          warningType:       classifyWarning(condition, message),
          message,
          condition,
          sourceFile:        relPath,
          lineNumber,
        });
        found++;
      }
    }

    console.log(`${name.padEnd(20)} ${found} warning(s)`);
  }

  // Write CSV
  const csv = [
    CSV_COLUMNS.join(','),
    ...allRows.map(row =>
      CSV_COLUMNS.map(col => csvEscape(row[col])).join(',')
    ),
  ].join('\n');

  const outPath = path.join(__dirname, 'config-warnings.csv');
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log(`\n✓ Written ${allRows.length} warnings to ${outPath}`);

  // Summary by warningType
  const dist = {};
  allRows.forEach(r => { dist[r.warningType] = (dist[r.warningType] || 0) + 1; });
  console.log('\nwarningType distribution:');
  Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .forEach(([t, n]) => console.log(`  ${t.padEnd(22)} ${n}`));
}

main();
