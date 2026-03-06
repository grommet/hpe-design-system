#!/usr/bin/env node
/**
 * generate-prop-handling.js
 *
 * Reads grommet-props.csv and emits draft `## ComponentName` sections in the
 * prop-handling.md table format, applying normalizedPropType heuristics.
 *
 * Usage:
 *   node generate-prop-handling.js                        # built pages not yet in prop-handling.md
 *   node generate-prop-handling.js --component Meter      # single component
 *   node generate-prop-handling.js --all                  # all 61 CSV components (skips existing)
 *   node generate-prop-handling.js --all --overwrite      # regenerate all, including existing
 *   node generate-prop-handling.js --write                # append new sections to prop-handling.md
 *
 * Output goes to stdout unless --write is specified.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.resolve(__dirname, 'grommet-props.csv');
const HANDLING_PATH = path.resolve(ROOT, 'prop-handling.md');

// ---------------------------------------------------------------------------
// Per-component page configuration
// Mirrors the constants in each playground page file.
// ---------------------------------------------------------------------------
const PAGE_CONFIGS = {
  // --- Layout ---
  Box: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  Grid: {
    skipTypes: ['function', 'array'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },

  // --- Typography ---
  Anchor: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {
      icon: 'Select (icon picker)',
    },
  },
  Heading: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },

  // --- Controls ---
  Button: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {
      icon: 'Select (icon picker)',
    },
  },
  CheckBox: {
    skipTypes: ['function'],
    skipProps: ['checked', 'onChange', 'id', 'children'],
    managedProps: ['checked'],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  RadioButton: {
    skipTypes: ['function'],
    skipProps: ['onChange', 'children'],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  RadioButtonGroup: {
    skipTypes: ['function'],
    skipProps: ['onChange', 'children', 'options'],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  Select: {
    skipTypes: ['function', 'object', 'array'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },

  // --- Form ---
  FormField: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  TextInput: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },

  // --- Navigation ---
  PageHeader: {
    skipTypes: ['function'],
    skipProps: [],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },

  // --- Visualizations ---
  Avatar: {
    skipTypes: [],
    skipProps: ['imageProps'],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {
      size: 'Select (curated)',
    },
  },
  Meter: {
    skipTypes: [],
    skipProps: ['values', 'gridArea', 'margin'],
    managedProps: [],
    numericProps: ['value', 'max'],
    objectProps: [],
    curatedSelects: {},
  },
  NameValueList: {
    skipTypes: [],
    skipProps: ['margin'],
    managedProps: [],
    numericProps: [],
    objectProps: ['nameProps', 'pairProps', 'valueProps'],
    curatedSelects: {},
  },
  Notification: {
    skipTypes: ['function', 'element'],
    skipProps: ['onClose'],
    managedProps: [],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  Pagination: {
    skipTypes: [],
    skipProps: ['gridArea', 'margin', 'messages', 'onChange', 'page'],
    managedProps: ['page'],
    numericProps: ['numberEdgePages', 'numberItems', 'numberMiddlePages', 'step'],
    objectProps: [],
    curatedSelects: {},
  },
  TextArea: {
    skipTypes: ['function'],
    skipProps: ['value'],
    managedProps: ['value'],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
  Paragraph: {
    skipTypes: [],
    skipProps: ['gridArea', 'margin'],
    managedProps: [],
    numericProps: ['maxLines'],
    objectProps: [],
    curatedSelects: {},
  },
  StarRating: {
    skipTypes: ['function'],
    skipProps: ['value'],
    managedProps: ['value'],
    numericProps: [],
    objectProps: [],
    curatedSelects: {},
  },
};

// Built playground pages (filename → component name)
const BUILT_PAGES = new Set(Object.keys(PAGE_CONFIGS));

// Components already documented in prop-handling.md
function getDocumentedComponents(mdContent) {
  const matches = [...mdContent.matchAll(/^## (.+)$/gm)];
  return new Set(matches.map(m => m[1].trim()).filter(n => n !== 'Handling vocabulary'));
}

// ---------------------------------------------------------------------------
// Heuristic: assign a handling label to one CSV row
// ---------------------------------------------------------------------------
function inferHandling(row, config) {
  const { prop, normalizedPropType, enumValues } = row;
  const {
    skipTypes = [],
    skipProps = [],
    managedProps = [],
    numericProps = [],
    objectProps = [],
    curatedSelects = {},
  } = config;

  // 1. Managed / controlled state
  if (managedProps.includes(prop)) return 'skipped — managed';

  // 2. Skipped props
  if (skipProps.includes(prop)) {
    // Try to give a reason based on type
    if (normalizedPropType === 'function') return 'skipped — function';
    if (normalizedPropType === 'array') return 'skipped — array';
    if (normalizedPropType === 'object') return 'skipped — object';
    return 'skipped — prop';
  }

  // 3. Skipped types
  if (skipTypes.includes(normalizedPropType)) {
    if (normalizedPropType === 'function') return 'skipped — function';
    if (normalizedPropType === 'element') return 'skipped — element';
    if (normalizedPropType === 'array') return 'skipped — array';
    if (normalizedPropType === 'object') return 'skipped — object';
    return `skipped — ${normalizedPropType}`;
  }

  // 4. Curated override
  if (curatedSelects[prop]) return curatedSelects[prop];

  // 5. Numeric
  if (numericProps.includes(prop)) return 'TextInput';

  // 6. Object props (rendered as JSON TextInput)
  if (objectProps.includes(prop)) return 'TextInput';

  // 7. Type-based heuristics
  switch (normalizedPropType) {
    case 'boolean':
      return 'CheckBox';
    case 'enum':
      return 'Select (enum)';
    case 'string':
    case 'number':
    case 'ReactNode':
      return 'TextInput';
    case 'union':
      return 'TextInput';
    case 'object':
      return 'skipped — object';
    case 'array':
      return 'skipped — array';
    case 'function':
      return 'skipped — function';
    case 'element':
      return 'skipped — element';
    default:
      return 'TextInput';
  }
}

// ---------------------------------------------------------------------------
// Rationale notes
// ---------------------------------------------------------------------------
function inferRationale(row, config, handling) {
  const { prop, normalizedPropType } = row;
  const { numericProps = [], objectProps = [], managedProps = [], skipProps = [] } = config;

  if (managedProps.includes(prop)) return 'controlled by preview state';
  if (handling === 'skipped — function') return 'event handler';
  if (handling === 'skipped — element') return 'element type cannot be free-typed';
  if (handling === 'skipped — array') return 'complex array shape; omitted for simplicity';
  if (handling === 'skipped — object') return 'complex object shape; omitted for simplicity';
  if (handling === 'skipped — prop') return '—';
  if (handling === 'Select (icon picker)') return "element type can't be free-typed; curated icons";
  if (handling === 'Select (curated)') return 'curated safe values';
  if (numericProps.includes(prop)) return 'parsed as Number before passing to prop';
  if (objectProps.includes(prop)) return 'JSON text input; validated before apply';
  if (normalizedPropType === 'union') return 'help: union values';
  return '—';
}

// ---------------------------------------------------------------------------
// Generate a single ## ComponentName section
// ---------------------------------------------------------------------------
function generateSection(component, rows, config) {
  const {
    skipTypes = [],
    skipProps = [],
  } = config;

  const skipTypesStr = skipTypes.length ? `\`[${skipTypes.map(t => `'${t}'`).join(', ')}]\`` : 'none';
  const skipPropsStr = skipProps.length ? `\`[${skipProps.map(p => `'${p}'`).join(', ')}]\`` : 'none';

  const lines = [
    `## ${component}`,
    '',
    `SKIP_TYPES: ${skipTypesStr} · SKIP_PROPS: ${skipPropsStr}`,
    '',
    '| prop | CSV type | handling | rationale |',
    '|---|---|---|---|',
  ];

  for (const row of rows) {
    const handling = inferHandling(row, config);
    const rationale = inferRationale(row, config, handling);
    lines.push(`| \`${row.prop}\` | ${row.normalizedPropType} | ${handling} | ${rationale} |`);
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Parse CSV (minimal; assumes no embedded newlines in fields)
// ---------------------------------------------------------------------------
function parseCsv(content) {
  const [headerLine, ...dataLines] = content.trim().split('\n');
  // handle quoted fields
  function splitLine(line) {
    const result = [];
    let inQuote = false;
    let field = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { field += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        result.push(field);
        field = '';
      } else {
        field += ch;
      }
    }
    result.push(field);
    return result;
  }
  const headers = splitLine(headerLine);
  return dataLines.map(line => {
    const values = splitLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim(); });
    return obj;
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const allMode = args.includes('--all');
  const overwriteMode = args.includes('--overwrite');
  const singleIdx = args.indexOf('--component');
  const singleComponent = singleIdx !== -1 ? args[singleIdx + 1] : null;

  const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCsv(csvContent);

  const mdContent = fs.readFileSync(HANDLING_PATH, 'utf8');
  const alreadyDocumented = getDocumentedComponents(mdContent);

  // Group rows by component
  const byComponent = {};
  for (const row of rows) {
    if (!byComponent[row.component]) byComponent[row.component] = [];
    byComponent[row.component].push(row);
  }

  // Determine which components to generate
  let targets;
  if (singleComponent) {
    targets = [singleComponent];
  } else if (allMode) {
    targets = Object.keys(byComponent).sort();
  } else {
    // Default: built pages not yet in prop-handling.md
    targets = [...BUILT_PAGES].filter(c => !alreadyDocumented.has(c)).sort();
  }

  const sections = [];
  const skipped = [];

  for (const component of targets) {
    if (!byComponent[component]) {
      process.stderr.write(`Warning: component '${component}' not found in CSV\n`);
      continue;
    }

    if (!overwriteMode && !singleComponent && alreadyDocumented.has(component)) {
      skipped.push(component);
      continue;
    }

    const config = PAGE_CONFIGS[component] || {
      skipTypes: ['function'],
      skipProps: [],
      managedProps: [],
      numericProps: [],
      objectProps: [],
      curatedSelects: {},
    };

    const section = generateSection(component, byComponent[component], config);
    sections.push({ component, section });
  }

  if (skipped.length) {
    process.stderr.write(`Skipped (already documented): ${skipped.join(', ')}\n`);
  }

  if (sections.length === 0) {
    process.stderr.write('No new sections to generate.\n');
    return;
  }

  const output = sections.map(s => s.section).join('\n');

  if (writeMode) {
    // Strip trailing --- from the md file if present, append new sections
    let existing = mdContent;
    if (existing.trimEnd().endsWith('---')) {
      existing = existing.trimEnd().slice(0, -3).trimEnd() + '\n\n---\n\n';
    } else {
      existing = existing.trimEnd() + '\n\n';
    }
    const newContent = existing + output;
    fs.writeFileSync(HANDLING_PATH, newContent, 'utf8');
    process.stdout.write(`Written ${sections.length} section(s) to ${HANDLING_PATH}\n`);
    for (const { component } of sections) {
      process.stdout.write(`  + ${component}\n`);
    }
  } else {
    process.stdout.write(output);
    process.stderr.write(`\n--- ${sections.length} section(s) generated for: ${sections.map(s => s.component).join(', ')} ---\n`);
    process.stderr.write('Run with --write to append to prop-handling.md\n');
  }
}

main();
