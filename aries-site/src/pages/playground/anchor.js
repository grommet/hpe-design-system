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
import {
  Add,
  Edit,
  Filter,
  Left,
  Notification,
  Refresh,
  Search,
  Settings,
  Trash,
} from '@hpe-design/icons-grommet';
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

const ICON_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Add', value: 'Add' },
  { label: 'Edit', value: 'Edit' },
  { label: 'Filter', value: 'Filter' },
  { label: 'Notification', value: 'Notification' },
  { label: 'Refresh', value: 'Refresh' },
  { label: 'Search', value: 'Search' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Trash', value: 'Trash' },
];

const ICON_MAP = {
  Add, Edit, Filter, Notification, Refresh, Search, Settings, Trash,
};

const SKIP_TYPES = ['function'];

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
  const lines = ['<Anchor'];
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
  return `import { Anchor } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function AnchorPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    // Seed label so the preview shows something meaningful
    s.label = 'Anchor text';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      if (key === 'icon') {
        const IconComp = ICON_MAP[val];
        if (IconComp) p.icon = <IconComp />;
        return;
      }
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
        Anchor
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
              id={`anchor-${prop}`}
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
              htmlFor={`anchor-${prop}`}
            >
              <Select
                id={`anchor-${prop}`}
                name={prop}
                options={options}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) => updateProp(prop, v)}
              />
            </FormField>
          );
        }

        if (
          prop === 'icon' &&
          normalizedPropType === 'element'
        ) {
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`anchor-${prop}`}
            >
              <Select
                id={`anchor-${prop}`}
                name={prop}
                options={ICON_OPTIONS}
                labelKey="label"
                valueKey={{ key: 'value', reduce: true }}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) =>
                  updateProp(prop, v ?? '')
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
            htmlFor={`anchor-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`anchor-${prop}`}
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
    <Box align="center" justify="center" pad="large">
      <Anchor {...previewProps} />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Anchor"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="Anchor"
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

AnchorPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Anchor')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Anchor');
  return { props: { rows, propHandlingRows } };
}
