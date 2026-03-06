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
  TextArea,
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

// onChange: wired internally; value: managed as bidirectional controlled state
const SKIP_TYPES = ['function'];
const SKIP_PROPS = ['value'];

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

function generateCode(propValues, textValue) {
  const lines = ['<TextArea'];
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
  if (textValue) lines.push(`  value="${textValue}"`);
  lines.push('  onChange={e => setValue(e.target.value)}');
  lines.push('/>');
  return `import { TextArea } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function TextAreaPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] = row.normalizedPropType === 'boolean' ? false : '';
    });
    return s;
  });

  // value managed bidirectionally so the preview textarea is actually typeable
  const [textValue, setTextValue] = useState('Sample text');

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
    () => generateCode(propValues, textValue),
    [propValues, textValue],
  );

  const visibleRows = rows.filter(
    row =>
      !SKIP_TYPES.includes(row.normalizedPropType) &&
      !SKIP_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        TextArea
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
              id={`text-area-${prop}`}
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
              htmlFor={`text-area-${prop}`}
            >
              <Select
                id={`text-area-${prop}`}
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
            htmlFor={`text-area-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`text-area-${prop}`}
              name={prop}
              value={String(value)}
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
      <TextArea
        {...previewProps}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="TextArea"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="TextArea"
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

TextAreaPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'TextArea')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'TextArea');
  return { props: { rows, propHandlingRows } };
}
