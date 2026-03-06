/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import {
  Anchor,
  Box,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Left } from '@hpe-design/icons-grommet';
import { PlaygroundShell } from './PlaygroundShell';
import { parsePropHandlingSection } from './parsePropHandling';

// --- CSV parser (handles quoted fields) ---

function splitCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCsv(text) {
  const lines = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = splitCsvLine(line);
    return headers.reduce(
      (obj, header, i) => ({
        ...obj,
        [header.trim()]: (values[i] ?? '').trim(),
      }),
      {},
    );
  });
}

// --- enum option parser ---

function parseEnumOptions(enumValues) {
  if (!enumValues) return [];
  return enumValues
    .split(' | ')
    .map(v => v.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

// --- control type helpers ---

// skip functions, objects (too complex), raw array type
// (options is array but handled specially below)
const SKIP_TYPES = ['function', 'object', 'array'];

// Props handled via special-case controls — excluded from
// the generic CSV-driven loop
const SPECIAL_PROPS = ['options', 'size', 'dropHeight'];

const SIZE_OPTIONS = ['', 'small', 'medium', 'large', 'xlarge'];
const DROP_HEIGHT_OPTIONS = [
  '',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

function isEnum(row) {
  return (
    row.normalizedPropType === 'enum' &&
    parseEnumOptions(row.enumValues).length >= 2
  );
}

function getHelpText(row) {
  const { normalizedPropType, documentedValues, objectExample } = row;
  if (normalizedPropType === 'union' && documentedValues) {
    return `union — ${documentedValues}`;
  }
  if (normalizedPropType === 'object' && objectExample) {
    return `object — ${objectExample}`;
  }
  return undefined;
}

// Parse comma-separated string into array of trimmed strings
function parseOptions(str) {
  if (!str) return [];
  return str
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

// --- code generator ---

function generateCode(propValues, optionsRaw) {
  const lines = ['<Select'];
  const opts = parseOptions(optionsRaw);
  if (opts.length) {
    const optStr = opts.map(o => `'${o}'`).join(', ');
    lines.push(`  options={[${optStr}]}`);
  }
  Object.entries(propValues)
    .filter(([, v]) => v !== false && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      if (val === true) {
        lines.push(`  ${key}`);
      } else {
        lines.push(`  ${key}="${val}"`);
      }
    });
  lines.push('/>');
  return `import { Select } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function SelectPlayground({ rows, propHandlingRows }) {
  const [optionsRaw, setOptionsRaw] = useState(
    'Option 1, Option 2, Option 3',
  );
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows
      .filter(
        row =>
          !SKIP_TYPES.includes(row.normalizedPropType) &&
          !SPECIAL_PROPS.includes(row.prop),
      )
      .forEach(row => {
        s[row.prop] =
          row.normalizedPropType === 'boolean' ? false : '';
      });
    s.placeholder = 'Select an option';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const previewOptions = useMemo(
    () => parseOptions(optionsRaw),
    [optionsRaw],
  );

  // Select needs its own value state for the preview
  const [selectedValue, setSelectedValue] = useState('');

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      p[key] = val;
    });
    return p;
  }, [propValues]);

  const code = useMemo(
    () => generateCode(propValues, optionsRaw),
    [propValues, optionsRaw],
  );

  const visibleRows = rows.filter(
    row =>
      !SKIP_TYPES.includes(row.normalizedPropType) &&
      !SPECIAL_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Select
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {/* options — comma-separated */}
      <FormField
        label="options"
        name="options"
        htmlFor="select-options"
        help="Comma-separated list of option values"
      >
        <TextInput
          id="select-options"
          name="options"
          value={optionsRaw}
          placeholder="Option 1, Option 2, Option 3"
          onChange={e => setOptionsRaw(e.target.value)}
        />
      </FormField>

      {/* size */}
      <FormField
        label="size"
        name="size"
        htmlFor="select-size"
      >
        <Select
          id="select-size"
          name="size"
          options={SIZE_OPTIONS}
          value={propValues.size ?? ''}
          placeholder="— none —"
          onChange={({ value: v }) => updateProp('size', v)}
        />
      </FormField>

      {/* dropHeight */}
      <FormField
        label="dropHeight"
        name="dropHeight"
        htmlFor="select-dropHeight"
      >
        <Select
          id="select-dropHeight"
          name="dropHeight"
          options={DROP_HEIGHT_OPTIONS}
          value={propValues.dropHeight ?? ''}
          placeholder="— none —"
          onChange={({ value: v }) =>
            updateProp('dropHeight', v)
          }
        />
      </FormField>

      {/* CSV-driven props */}
      {visibleRows.map(row => {
        const { prop, normalizedPropType, enumValues } = row;
        const value = propValues[prop];

        if (normalizedPropType === 'boolean') {
          return (
            <CheckBox
              key={prop}
              id={`select-${prop}`}
              name={prop}
              label={prop}
              checked={value}
              onChange={e =>
                updateProp(prop, e.target.checked)
              }
            />
          );
        }

        if (isEnum(row)) {
          const options = [
            '',
            ...parseEnumOptions(enumValues),
          ];
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`select-${prop}`}
            >
              <Select
                id={`select-${prop}`}
                name={prop}
                options={options}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) =>
                  updateProp(prop, v)
                }
              />
            </FormField>
          );
        }

        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`select-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`select-${prop}`}
              name={prop}
              value={value}
              placeholder={prop}
              onChange={e =>
                updateProp(prop, e.target.value)
              }
            />
          </FormField>
        );
      })}
    </Form>
  );

  const preview = (
    <Box fill align="center" justify="center" pad="large">
      <Box width="medium">
        <Select
          options={previewOptions}
          value={selectedValue}
          onChange={({ value: v }) => setSelectedValue(v)}
          {...previewProps}
        />
      </Box>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Select"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="Select"
              preview={preview}
              controls={controls}
              code={code}
              propHandlingRows={propHandlingRows}
            />
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

SelectPlayground.getLayout = page => page;

// --- data loading ---

export async function getStaticProps() {
  const csvPath = path.join(
    process.cwd(),
    '..',
    'docs',
    'playground',
    'prop-audit',
    'grommet-props.csv',
  );
  const text = fs.readFileSync(csvPath, 'utf8');
  const allRows = parseCsv(text);
  const rows = allRows
    .filter(row => row.component === 'Select')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Select');
  return { props: { rows, propHandlingRows } };
}
