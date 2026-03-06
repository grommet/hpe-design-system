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
  Pagination,
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

// gridArea/margin: layout-only; messages: complex i18n object
// onChange: wired internally for controlled page interaction
// page: managed via internal activePage state (shown as read-only info)
const SKIP_PROPS = ['gridArea', 'margin', 'messages', 'onChange', 'page'];

// Props that must be passed as numbers
const NUMERIC_PROPS = new Set([
  'numberEdgePages', 'numberItems', 'numberMiddlePages', 'step',
]);

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

function generateCode(propValues, activePage) {
  const lines = ['<Pagination'];
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
  lines.push(`  page={${activePage}}`);
  lines.push('  onChange={({ page: p }) => setPage(p)}');
  lines.push('/>');
  return `import { Pagination } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function PaginationPlayground({ rows, propHandlingRows }) {
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
    // defaults so the preview renders a meaningful component
    s.numberItems = 100;
    s.step = 10;
    return s;
  });

  // controlled page state — lets the user actually click through pages
  const [activePage, setActivePage] = useState(1);

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
    // reset to page 1 when numberItems or step changes
    if (prop === 'numberItems' || prop === 'step') setActivePage(1);
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      if (NUMERIC_PROPS.has(key)) {
        const n = Number(val);
        if (!Number.isNaN(n) && n > 0) p[key] = n;
      } else {
        p[key] = val;
      }
    });
    return p;
  }, [propValues]);

  const code = useMemo(
    () => generateCode(propValues, activePage),
    [propValues, activePage],
  );

  const visibleRows = rows.filter(row => !SKIP_PROPS.includes(row.prop));

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Pagination
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
              id={`pagination-${prop}`}
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
                htmlFor={`pagination-${prop}`}
              >
                <RadioButtonGroup
                  id={`pagination-${prop}`}
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
              htmlFor={`pagination-${prop}`}
            >
              <Select
                id={`pagination-${prop}`}
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
            htmlFor={`pagination-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`pagination-${prop}`}
              name={prop}
              value={String(value)}
              placeholder={prop}
              type={
                normalizedPropType === 'number' || NUMERIC_PROPS.has(prop)
                  ? 'number'
                  : 'text'
              }
              onChange={e => updateProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}

      <Text size="small" color="text-weak">
        Current page: {activePage}
      </Text>
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <Pagination
        {...previewProps}
        page={activePage}
        onChange={({ page: p }) => setActivePage(p)}
      />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Pagination"
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
              componentName="Pagination"
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

PaginationPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Pagination')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Pagination');
  return { props: { rows, propHandlingRows } };
}
