import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import {
  Anchor,
  Avatar,
  Box,
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

// --- control type helpers ---

// imageProps requires a complex object shape — not useful as a simple control
const SKIP_PROPS = ['imageProps'];

// size is normalizedPropType=string but has a well-known finite set of tokens
const SIZE_OPTIONS = [
  'xsmall', 'small', 'medium', 'large', 'xlarge',
  '2xl', '3xl', '4xl', '5xl',
];

function getHelpText(row) {
  const { prop, normalizedPropType, documentedValues, objectExample } = row;
  if (prop === 'size') return undefined; // rendered as Select, no help needed
  if (normalizedPropType === 'union' && documentedValues) {
    return `union — ${documentedValues}`;
  }
  if (normalizedPropType === 'object' && objectExample) {
    return `object — ${objectExample}`;
  }
  if (normalizedPropType === 'string' && documentedValues) {
    return documentedValues;
  }
  return undefined;
}

// --- code generator ---

function generateCode(propValues, src) {
  const lines = ['<Avatar'];
  const entries = Object.entries(propValues).filter(([, v]) => v !== '');
  entries.sort(([a], [b]) => a.localeCompare(b)).forEach(([key, val]) => {
    lines.push(`  ${key}="${val}"`);
  });
  // if no src, show initials as children
  if (!src) {
    lines.push('>');
    lines.push('  JD');
    lines.push('</Avatar>');
  } else {
    lines.push('/>');
  }
  return `import { Avatar } from 'grommet';\n\n${lines.join('\n')}`;
}

// --- page component ---

export default function AvatarPlayground({ rows, propHandlingRows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_PROPS.includes(row.prop)) return;
      s[row.prop] = '';
    });
    // start with a placeholder so the preview renders something
    s.src = 'https://www.gravatar.com/avatar/?d=identicon&s=200';
    s.size = 'medium';
    return s;
  });

  const updateProp = (prop, value) =>
    setPropValues(prev => ({ ...prev, [prop]: value }));

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val !== '') p[key] = val;
    });
    return p;
  }, [propValues]);

  const code = useMemo(
    () => generateCode(propValues, propValues.src),
    [propValues],
  );

  const visibleRows = rows.filter(row => !SKIP_PROPS.includes(row.prop));

  const controls = (
    <Form gap="small" onSubmit={e => e.preventDefault()}>
      <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
        Avatar
      </Heading>
      <Text
        size="small"
        color="text-weak"
        margin={{ top: 'none', bottom: 'xsmall' }}
      >
        Configure the component with available props.
      </Text>

      {visibleRows.map(row => {
        const { prop } = row;
        const value = propValues[prop];

        if (prop === 'size') {
          return (
            <FormField
              key={prop}
              label={prop}
              name={prop}
              htmlFor={`avatar-${prop}`}
            >
              <Select
                id={`avatar-${prop}`}
                name={prop}
                options={['', ...SIZE_OPTIONS]}
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
            htmlFor={`avatar-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`avatar-${prop}`}
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
      {previewProps.src ? (
        <Avatar {...previewProps} />
      ) : (
        <Avatar {...previewProps}>JD</Avatar>
      )}
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Avatar"
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
              componentName="Avatar"
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

AvatarPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'Avatar')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  const mdPath = path.join(
    process.cwd(), '..', 'docs', 'playground', 'prop-handling.md',
  );
  const mdText = fs.readFileSync(mdPath, 'utf8');
  const propHandlingRows = parsePropHandlingSection(mdText, 'Avatar');
  return { props: { rows, propHandlingRows } };
}
