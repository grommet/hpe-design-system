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
  Paragraph,
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

// gridArea/margin: layout-only props
const SKIP_TYPES = [];
const SKIP_PROPS = ['gridArea', 'margin'];

// maxLines must be passed as a number
const NUMERIC_PROPS = new Set(['maxLines']);

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

const PREVIEW_TEXT =
  'The quick brown fox jumps over the lazy dog. ' +
  'Design systems help teams build consistent, accessible products ' +
  'at scale by providing shared language and reusable components.';

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<Paragraph'];
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
  lines.push('>');
  lines.push(`  ${PREVIEW_TEXT}`);
  lines.push('</Paragraph>');
  return `import { Paragraph } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function ParagraphPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] = row.normalizedPropType === 'boolean' ? false : '';
    });
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
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

  const code = useMemo(() => generateCode(propValues), [propValues]);

  const visibleRows = rows.filter(
    row =>
      !SKIP_TYPES.includes(row.normalizedPropType) &&
      !SKIP_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Paragraph
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
              id={`paragraph-${prop}`}
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
              htmlFor={`paragraph-${prop}`}
            >
              <Select
                id={`paragraph-${prop}`}
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
            htmlFor={`paragraph-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`paragraph-${prop}`}
              name={prop}
              value={String(value)}
              placeholder={prop}
              type={NUMERIC_PROPS.has(prop) ? 'number' : 'text'}
              onChange={e => updateProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <Paragraph {...previewProps}>{PREVIEW_TEXT}</Paragraph>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Paragraph"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="Paragraph"
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

ParagraphPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Paragraph')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Paragraph');
  return { props: { rows, propHandlingRows } };
}
