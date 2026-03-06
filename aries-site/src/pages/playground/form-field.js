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
  RangeInput,
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

const SKIP_TYPES = ['function'];

// --- child type picker ---

const CHILD_TYPES = [
  'TextInput',
  'Select',
  'CheckBox',
  'TextArea',
  'RangeInput',
];

const CHILD_PREVIEW = {
  TextInput: (
    <TextInput
      id="formfield-preview-input"
      name="preview"
      placeholder="Enter a value"
    />
  ),
  Select: (
    <Select
      id="formfield-preview-input"
      name="preview"
      options={['Option 1', 'Option 2', 'Option 3']}
    />
  ),
  CheckBox: (
    <CheckBox
      id="formfield-preview-input"
      name="preview"
      label="Check me"
    />
  ),
  TextArea: (
    <TextArea
      id="formfield-preview-input"
      name="preview"
      placeholder="Enter text"
    />
  ),
  RangeInput: (
    <RangeInput
      id="formfield-preview-input"
      name="preview"
    />
  ),
};

const CHILD_IMPORT = {
  TextInput: 'TextInput',
  Select: 'Select',
  CheckBox: 'CheckBox',
  TextArea: 'TextArea',
  RangeInput: 'RangeInput',
};

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

function generateCode(propValues, childType) {
  const child = childType || 'TextInput';
  const lines = ['<FormField'];
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
  lines.push(`  <${child} />`);
  lines.push('</FormField>');
  const snippet = lines.join('\n');
  const imp = CHILD_IMPORT[child];
  return (
    `import { FormField, ${imp} } from 'grommet';\n\n${snippet}`
  );
}

// --- page component ---

export default function FormFieldPlayground({ rows, propHandlingRows }) {
  const [childType, setChildType] = useState('TextInput');
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.label = 'Field label';
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
    () => generateCode(propValues, childType),
    [propValues, childType],
  );

  const visibleRows = rows.filter(
    row => !SKIP_TYPES.includes(row.normalizedPropType),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        FormField
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {/* child type picker — synthetic, not a FormField prop */}
      <FormField
        label="child input type"
        name="_childType"
        htmlFor="formfield-childType"
        help="The input component rendered inside FormField"
      >
        <Select
          id="formfield-childType"
          name="_childType"
          options={CHILD_TYPES}
          value={childType}
          onChange={({ value: v }) => setChildType(v)}
        />
      </FormField>

      {visibleRows.map(row => {
        const { prop, normalizedPropType, enumValues } = row;
        const value = propValues[prop];

        if (normalizedPropType === 'boolean') {
          return (
            <CheckBox
              key={prop}
              id={`formfield-${prop}`}
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
              htmlFor={`formfield-${prop}`}
            >
              <Select
                id={`formfield-${prop}`}
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
            htmlFor={`formfield-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`formfield-${prop}`}
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
      <Box width="medium">
        <FormField
          htmlFor="formfield-preview-input"
          name="preview"
          {...previewProps}
        >
          {CHILD_PREVIEW[childType]}
        </FormField>
      </Box>
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="FormField"
            parent={
              <Anchor icon={<Left />} href="/playground" label="Index" />
            }
          />
          <Box height="large">
            <PlaygroundShell
              componentName="FormField"
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

FormFieldPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'FormField')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(
    mdText, 'FormField',
  );
  return { props: { rows, propHandlingRows } };
}
