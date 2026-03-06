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
  RadioButtonGroup,
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

// --- control type helpers ---

// onChange/children/options handled specially; value synced with preview
const SKIP_TYPES = ['function'];
const SKIP_PROPS = ['onChange', 'children', 'options'];

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

// Parse comma-separated string into array of trimmed option strings
function parseOptions(raw) {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

// --- code generator ---

function generateCode(propValues, optionsRaw) {
  const options = parseOptions(optionsRaw);
  const optionsStr = JSON.stringify(options);
  const lines = ['<RadioButtonGroup'];
  lines.push(`  options={${optionsStr}}`);
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
  return (
    `import { RadioButtonGroup } from 'grommet';\n\n${lines.join('\n')}`
  );
}

// --- page component ---

export default function RadioButtonGroupPlayground({ rows, propHandlingRows }) {
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const [optionsRaw, setOptionsRaw] = useState(
    'Option 1, Option 2, Option 3',
  );

  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.name = 'radio-group';
    s.value = 'Option 1';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const setValueProp = val => {
    setSelectedValue(val);
    setPropValues(prev => ({ ...prev, value: val }));
  };

  const previewOptions = useMemo(
    () => parseOptions(optionsRaw),
    [optionsRaw],
  );

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (key === 'value') return; // managed by selectedValue state
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
      !SKIP_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        RadioButtonGroup
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {/* options — synthetic, comma-separated TextInput */}
      <FormField
        label="options"
        name="_options"
        htmlFor="radio-options"
        help="Comma-separated list of option labels"
      >
        <TextInput
          id="radio-options"
          name="_options"
          value={optionsRaw}
          onChange={e => {
            setOptionsRaw(e.target.value);
            setValueProp('');
          }}
        />
      </FormField>

      {/* value — Select from current options */}
      <FormField
        label="value"
        name="value"
        htmlFor="radio-value"
        help="Currently selected option"
      >
        <Select
          id="radio-value"
          name="value"
          options={['', ...previewOptions]}
          value={propValues.value ?? ''}
          placeholder="— none —"
          onChange={({ value: v }) => setValueProp(v)}
        />
      </FormField>

      {visibleRows
        .filter(row => row.prop !== 'value')
        .map(row => {
          const { prop, normalizedPropType } = row;
          const value = propValues[prop];

          if (normalizedPropType === 'boolean') {
            return (
              <CheckBox
                key={prop}
                id={`radio-${prop}`}
                name={prop}
                label={prop}
                checked={value}
                onChange={e => updateProp(prop, e.target.checked)}
              />
            );
          }

          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`radio-${prop}`}
              help={getHelpText(row)}
            >
              <TextInput
                id={`radio-${prop}`}
                name={prop}
                value={value}
                placeholder={prop}
                onChange={e => updateProp(prop, e.target.value)}
              />
            </FormField>
          );
        })}
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <RadioButtonGroup
        id="radio-preview"
        options={previewOptions}
        value={selectedValue}
        onChange={e => setValueProp(e.target.value)}
        {...previewProps}
      />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="RadioButtonGroup"
            parent={
              <Anchor
                icon={<Left />}
                href="/playground"
                label="Index"
              />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="RadioButtonGroup"
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

RadioButtonGroupPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'RadioButtonGroup')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(
    mdText, 'RadioButtonGroup',
  );
  return { props: { rows, propHandlingRows } };
}
