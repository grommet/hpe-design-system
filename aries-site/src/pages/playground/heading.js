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

const SKIP_TYPES = ['function'];

const LEVEL_OPTIONS = ['', '1', '2', '3', '4', '5', '6'];
const SIZE_OPTIONS = [
  '',
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

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<Heading'];
  let headingText = '';
  Object.entries(propValues)
    .filter(([, v]) => v !== false && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      if (key === 'textContent') {
        headingText = val;
      } else if (val === true) {
        lines.push(`  ${key}`);
      } else {
        lines.push(`  ${key}="${val}"`);
      }
    });
  lines.push('>');
  lines.push(`  ${headingText || 'Heading text'}`);
  lines.push('</Heading>');
  return `import { Heading } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function HeadingPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.level = '2';
    s.textContent = 'Heading text';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (key === 'textContent' || val === false || val === '') return;
      if (key === 'level') {
        p.level = Number(val);
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

  // Exclude textContent from CSV-driven rows (it's a synthetic prop)
  const visibleRows = rows.filter(
    row => !SKIP_TYPES.includes(row.normalizedPropType),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Heading
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {/* Synthetic text control */}
      <FormField
        label="text content"
        name="textContent"
        htmlFor="heading-textContent"
      >
        <TextInput
          id="heading-textContent"
          name="textContent"
          value={propValues.textContent}
          placeholder="Heading text"
          onChange={e => updateProp('textContent', e.target.value)}
        />
      </FormField>

      {/* level — special-cased Select */}
      <FormField
        label="level"
        name="level"
        htmlFor="heading-level"
      >
        <Select
          id="heading-level"
          name="level"
          options={LEVEL_OPTIONS}
          value={propValues.level}
          placeholder="— none —"
          onChange={({ value: v }) => updateProp('level', v)}
        />
      </FormField>

      {visibleRows
        .filter(row => row.prop !== 'level')
        .map(row => {
          const { prop, normalizedPropType, enumValues } = row;
          const value = propValues[prop];

          if (prop === 'size') {
            return (
              <FormField
                key={prop}
                label={prop}
                name={prop}
                htmlFor="heading-size"
                help="small | medium | large | xlarge"
              >
                <Select
                  id="heading-size"
                  name={prop}
                  options={SIZE_OPTIONS}
                  value={value}
                  placeholder="— none —"
                  onChange={({ value: v }) =>
                    updateProp(prop, v)
                  }
                />
              </FormField>
            );
          }

          if (normalizedPropType === 'boolean') {
            return (
              <CheckBox
                key={prop}
                id={`heading-${prop}`}
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
                htmlFor={`heading-${prop}`}
              >
                <Select
                  id={`heading-${prop}`}
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
              htmlFor={`heading-${prop}`}
              help={getHelpText(row)}
            >
              <TextInput
                id={`heading-${prop}`}
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
      <Heading {...previewProps}>
        {propValues.textContent || 'Heading text'}
      </Heading>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Heading"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="Heading"
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

HeadingPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Heading')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(
    mdText, 'Heading',
  );
  return { props: { rows, propHandlingRows } };
}
