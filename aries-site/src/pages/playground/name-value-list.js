import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import {
  Anchor,
  Box,
  Form,
  FormField,
  Grommet,
  Heading,
  NameValueList,
  NameValuePair,
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

// margin: layout-only
const SKIP_PROPS = ['margin'];

// Object props — rendered as JSON text inputs
const OBJECT_PROPS = new Set(['nameProps', 'pairProps', 'valueProps']);

function isEnum(row) {
  return (
    row.normalizedPropType === 'enum' &&
    parseEnumOptions(row.enumValues).length >= 2
  );
}

// Safely parse a JSON string; return null on failure
function tryParseJson(str) {
  if (!str || !str.trim()) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// --- code generator ---

function generateCode(propValues, objectValues) {
  const lines = ['<NameValueList'];

  Object.entries(propValues)
    .filter(([, v]) => v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      lines.push(`  ${key}="${val}"`);
    });

  Object.entries(objectValues)
    .filter(([, v]) => tryParseJson(v) !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      lines.push(`  ${key}={${val}}`);
    });

  lines.push('>');
  lines.push('  <NameValuePair name="Name">Value</NameValuePair>');
  lines.push('  <NameValuePair name="Role">Engineer</NameValuePair>');
  lines.push('  <NameValuePair name="Location">Remote</NameValuePair>');
  lines.push('</NameValueList>');
  const imports = "import { NameValueList, NameValuePair } from 'grommet';";
  return `${imports}\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function NameValueListPlayground({ rows, propHandlingRows }) {
  // enum / string prop values
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_PROPS.includes(row.prop)) return;
      if (OBJECT_PROPS.has(row.prop)) return;
      s[row.prop] = '';
    });
    return s;
  });

  // object prop values (stored as JSON strings for editing)
  const [objectValues, setObjectValues] = useState({
    nameProps: '',
    pairProps: '',
    valueProps: '',
  });

  const updateProp = (prop, value) =>
    setPropValues(prev => ({ ...prev, [prop]: value }));

  const updateObjectProp = (prop, value) =>
    setObjectValues(prev => ({ ...prev, [prop]: value }));

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val !== '') p[key] = val;
    });
    Object.entries(objectValues).forEach(([key, val]) => {
      const parsed = tryParseJson(val);
      if (parsed !== null) p[key] = parsed;
    });
    return p;
  }, [propValues, objectValues]);

  const code = useMemo(
    () => generateCode(propValues, objectValues),
    [propValues, objectValues],
  );

  const enumRows = rows.filter(
    row => !SKIP_PROPS.includes(row.prop) && !OBJECT_PROPS.has(row.prop),
  );
  const objectRows = rows.filter(row => OBJECT_PROPS.has(row.prop));

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        NameValueList
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {enumRows.map(row => {
        const { prop, enumValues } = row;
        const value = propValues[prop];

        if (isEnum(row)) {
          const opts = parseEnumOptions(enumValues);
          if (opts.length <= 4) {
            return (
              <FormField
                key={prop}
                label={prop}
                name={prop}
                htmlFor={`nvl-${prop}`}
              >
                <RadioButtonGroup
                  id={`nvl-${prop}`}
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
              htmlFor={`nvl-${prop}`}
            >
              <Select
                id={`nvl-${prop}`}
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
            htmlFor={`nvl-${prop}`}
          >
            <TextInput
              id={`nvl-${prop}`}
              name={prop}
              value={value}
              placeholder={prop}
              onChange={e => updateProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}

      {objectRows.map(row => {
        const { prop, objectExample } = row;
        const parsed = tryParseJson(objectValues[prop]);
        const isInvalid = objectValues[prop] !== '' && parsed === null;
        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`nvl-${prop}`}
            help={objectExample ? `e.g. ${objectExample}` : undefined}
            error={isInvalid ? 'Invalid JSON' : undefined}
          >
            <TextInput
              id={`nvl-${prop}`}
              name={prop}
              value={objectValues[prop]}
              placeholder="{ } JSON"
              onChange={e => updateObjectProp(prop, e.target.value)}
            />
          </FormField>
        );
      })}
    </Form>
  );

  const preview = (
    <Box fill pad="medium" align="center" justify="center">
      <NameValueList {...previewProps}>
        <NameValuePair name="Name">Seamus</NameValuePair>
        <NameValuePair name="Role">Engineer</NameValuePair>
        <NameValuePair name="Location">Remote</NameValuePair>
        <NameValuePair name="Department">Design Systems</NameValuePair>
      </NameValueList>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="NameValueList"
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
              componentName="NameValueList"
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

NameValueListPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'NameValueList')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'NameValueList');
  return { props: { rows, propHandlingRows } };
}
