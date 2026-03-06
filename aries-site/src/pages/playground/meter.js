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
  Meter,
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
import { parsePropHandlingSection } from './parsePropHandling';
import { PlaygroundShell } from './PlaygroundShell';

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

// values conflicts with value and requires complex object shape — skip
// gridArea and margin are layout-only, not useful for isolated preview
const SKIP_PROPS = ['values', 'gridArea', 'margin'];

// Numeric props that must be passed as {number} not "string" in JSX
const NUMERIC_PROPS = new Set(['value', 'max']);

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
  if (normalizedPropType === 'string' && documentedValues) {
    return documentedValues;
  }
  return undefined;
}

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<Meter'];
  Object.entries(propValues)
    .filter(([, v]) => v !== false && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      if (val === true) {
        lines.push(`  ${key}`);
      } else if (NUMERIC_PROPS.has(key)) {
        lines.push(`  ${key}={${val}}`);
      } else {
        lines.push(`  ${key}="${val}"`);
      }
    });
  lines.push('/>');
  return `import { Meter } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function MeterPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_PROPS.includes(row.prop)) return;
      if (row.normalizedPropType === 'boolean') {
        s[row.prop] = false;
      } else {
        s[row.prop] = '';
      }
    });
    // helpful defaults so the preview renders something immediately
    s.value = 40;
    s.max = 100;
    s.type = 'bar';
    return s;
  });

  const updateProp = (prop, value) =>
    setPropValues(prev => ({ ...prev, [prop]: value }));

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      // parse numeric props so Meter receives a number, not a string
      if (NUMERIC_PROPS.has(key)) {
        const n = Number(val);
        if (!Number.isNaN(n)) p[key] = n;
      } else {
        p[key] = val;
      }
    });
    return p;
  }, [propValues]);

  const code = useMemo(() => generateCode(propValues), [propValues]);

  const visibleRows = rows.filter(row => !SKIP_PROPS.includes(row.prop));

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Meter
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {visibleRows.map(row => {
        const { prop, normalizedPropType, enumValues } = row;
        const value = propValues[prop];

        if (normalizedPropType === 'boolean') {
          return (
            <CheckBox
              key={prop}
              id={`meter-${prop}`}
              name={prop}
              label={prop}
              checked={value}
              onChange={e => updateProp(prop, e.target.checked)}
            />
          );
        }

        if (isEnum(row)) {
          const opts = parseEnumOptions(enumValues);
          if (opts.length <= 4) {
            return (
              <FormField
                key={prop}
                label={prop}
                name={prop}
                htmlFor={`meter-${prop}`}
              >
                <RadioButtonGroup
                  id={`meter-${prop}`}
                  name={prop}
                  options={opts}
                  value={String(value)}
                  onChange={e => updateProp(prop, e.target.value)}
                />
              </FormField>
            );
          }
          const options = ['', ...opts];
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`meter-${prop}`}
            >
              <Select
                id={`meter-${prop}`}
                name={prop}
                options={options}
                value={String(value)}
                placeholder="— none —"
                onChange={({ value: v }) => updateProp(prop, v)}
              />
            </FormField>
          );
        }

        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`meter-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`meter-${prop}`}
              name={prop}
              value={String(value)}
              placeholder={prop}
              type={normalizedPropType === 'number' || NUMERIC_PROPS.has(prop)
                ? 'number'
                : 'text'}
              onChange={e => updateProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <Meter {...previewProps} />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Meter"
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
              componentName="Meter"
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

MeterPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Meter')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Meter');
  return { props: { rows, propHandlingRows } };
}
