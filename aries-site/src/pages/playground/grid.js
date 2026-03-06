/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import {
  Box,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Grid,
  Heading,
  Page,
  PageContent,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
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

// skip function props and array props (e.g. areas)
const SKIP_TYPES = ['function', 'array'];

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

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<Grid'];
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
  lines.push('>');
  lines.push('  {/* children */}');
  lines.push('</Grid>');
  return `import { Grid } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function GridPlayground({ rows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.columns = 'small';
    s.gap = 'small';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      p[key] = val;
    });
    return p;
  }, [propValues]);

  const code = useMemo(
    () => generateCode(propValues),
    [propValues],
  );

  const visibleRows = rows.filter(
    row => !SKIP_TYPES.includes(row.normalizedPropType),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Grid
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
              id={`grid-${prop}`}
              name={prop}
              label={prop}
              checked={value}
              onChange={e => updateProp(prop, e.target.checked)}
            />
          );
        }

        if (isEnum(row)) {
          const options = ['', ...parseEnumOptions(enumValues)];
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`grid-${prop}`}
            >
              <Select
                id={`grid-${prop}`}
                name={prop}
                options={options}
                value={value}
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
            htmlFor={`grid-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`grid-${prop}`}
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
    <Box fill align="center" justify="center" pad="medium">
      <Grid
        border={{ color: 'brand', style: 'dashed' }}
        {...previewProps}
      >
        {[1, 2, 3, 4, 5, 6].map(n => (
          <Box
            key={n}
            background={n % 2 === 0 ? 'brand' : 'light-4'}
            pad="small"
            align="center"
            justify="center"
          >
            <Text
              size="small"
              color={n % 2 === 0 ? 'white' : undefined}
            >
              Cell {n}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <Heading level={2} margin={{ bottom: 'small' }}>
            Grid playground
          </Heading>
          <Box height="large">
            <PlaygroundShell
              componentName="Grid"
              preview={preview}
              controls={controls}
              code={code}
            />
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

GridPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Grid')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  return { props: { rows } };
}
