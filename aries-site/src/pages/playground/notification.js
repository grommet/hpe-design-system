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
  Notification,
  Page,
  PageContent,
  PageHeader,
  RadioButtonGroup,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import {
  Add,
  Edit,
  Left,
  Refresh,
  Search,
  Settings,
  Trash,
} from '@hpe-design/icons-grommet';
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

const SKIP_TYPES = ['function'];
const SKIP_PROPS = ['onClose'];

const ICON_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Add', value: 'Add' },
  { label: 'Edit', value: 'Edit' },
  { label: 'Refresh', value: 'Refresh' },
  { label: 'Search', value: 'Search' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Trash', value: 'Trash' },
];

const ICON_MAP = { Add, Edit, Refresh, Search, Settings, Trash };

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
  if (normalizedPropType === 'array' && documentedValues) {
    return `array — ${documentedValues}`;
  }
  return undefined;
}

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<Notification'];
  Object.entries(propValues)
    .filter(([, v]) => v !== false && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      if (val === true) {
        lines.push(`  ${key}`);
      } else if (key === 'icon') {
        lines.push(`  icon={<${val} />}`);
      } else {
        lines.push(`  ${key}="${val}"`);
      }
    });
  lines.push('  onClose={() => {}}');
  lines.push('/>');
  return `import { Notification } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function NotificationPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.title = 'Your session has expired.';
    s.status = 'warning';
    return s;
  });

  const updateProp = (prop, value) =>
    setPropValues(prev => ({ ...prev, [prop]: value }));

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      // toast would portal outside the preview frame — omit from live preview
      if (key === 'toast') return;
      if (key === 'icon') {
        const IconComp = ICON_MAP[val];
        if (IconComp) p.icon = <IconComp />;
        return;
      }
      p[key] = val;
    });
    return p;
  }, [propValues]);

  const code = useMemo(() => generateCode(propValues), [propValues]);

  const visibleRows = rows.filter(
    row =>
      !SKIP_TYPES.includes(row.normalizedPropType) &&
      !SKIP_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Notification
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
              id={`notification-${prop}`}
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
                htmlFor={`notification-${prop}`}
              >
                <RadioButtonGroup
                  id={`notification-${prop}`}
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
              htmlFor={`notification-${prop}`}
            >
              <Select
                id={`notification-${prop}`}
                name={prop}
                options={options}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) => updateProp(prop, v)}
              />
            </FormField>
          );
        }

        if (prop === 'icon' && normalizedPropType === 'element') {
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`notification-${prop}`}
            >
              <Select
                id={`notification-${prop}`}
                name={prop}
                options={ICON_OPTIONS}
                labelKey="label"
                valueKey={{ key: 'value', reduce: true }}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) => updateProp(prop, v ?? '')}
              />
            </FormField>
          );
        }

        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`notification-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`notification-${prop}`}
              name={prop}
              value={value}
              placeholder={prop}
              type={normalizedPropType === 'number' ? 'number' : 'text'}
              onChange={e => updateProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <Box width="large">
        <Notification onClose={() => {}} {...previewProps} />
      </Box>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Notification"
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
              componentName="Notification"
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

NotificationPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Notification')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Notification');
  return { props: { rows, propHandlingRows } };
}
