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
  RadioButton,
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

// --- control type helpers ---

// only onChange/children are functions — everything else is configurable
const SKIP_TYPES = ['function'];
const SKIP_PROPS = ['onChange', 'children'];

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
  const lines = ['<RadioButton'];
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
  return `import { RadioButton } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function RadioButtonPlayground({ rows, propHandlingRows }) {
  // Preview manages checked state; keep in sync with the checked control
  const [previewChecked, setPreviewChecked] = useState(false);

  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.label = 'Option A';
    s.name = 'radio';
    s.id = 'radiobutton-preview';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  // Keep checked prop and preview state in sync
  const updateChecked = val => {
    setPreviewChecked(val);
    setPropValues(prev => ({ ...prev, checked: val }));
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      // checked and id are passed explicitly to the preview element
      if (key === 'checked' || key === 'id') return;
      if (val === false || val === '') return;
      p[key] = val;
    });
    return p;
  }, [propValues]);

  // Use the id prop value if set, otherwise fall back to default
  const previewId = propValues.id || 'radiobutton-preview';

  const code = useMemo(
    () => generateCode(propValues),
    [propValues],
  );

  const visibleRows = rows.filter(
    row =>
      !SKIP_TYPES.includes(row.normalizedPropType) &&
      !SKIP_PROPS.includes(row.prop),
  );

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        RadioButton
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {visibleRows.map(row => {
        const { prop, normalizedPropType } = row;
        const value = propValues[prop];

        if (normalizedPropType === 'boolean') {
          // checked syncs with preview state
          const handleChange = prop === 'checked'
            ? e => updateChecked(e.target.checked)
            : e => updateProp(prop, e.target.checked);
          return (
            <CheckBox
              key={prop}
              id={`radiobutton-ctrl-${prop}`}
              name={prop}
              label={prop}
              checked={prop === 'checked' ? previewChecked : value}
              onChange={handleChange}
            />
          );
        }

        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`radiobutton-ctrl-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`radiobutton-ctrl-${prop}`}
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
      <RadioButton
        id={previewId}
        checked={previewChecked}
        onChange={e => updateChecked(e.target.checked)}
        {...previewProps}
      />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="RadioButton"
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
              componentName="RadioButton"
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

RadioButtonPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'RadioButton')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(
    mdText, 'RadioButton',
  );
  return { props: { rows, propHandlingRows } };
}
