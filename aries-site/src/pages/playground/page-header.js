/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Heading,
  Menu,
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

// --- actions preset patterns ---

const ACTIONS_OPTIONS = ['Primary button', 'Two buttons', 'Menu'];

const ACTIONS_PREVIEW = {
  'Primary button': <Button label="Edit" primary />,
  'Two buttons': (
    <Box direction="row" gap="small">
      <Button label="Delete" />
      <Button label="Edit" primary />
    </Box>
  ),
  Menu: (
    <Menu
      label="Actions"
      items={[{ label: 'Edit' }, { label: 'Delete' }]}
    />
  ),
};

const ACTIONS_CODE = {
  'Primary button': {
    snippet: '  actions={<Button label="Edit" primary />}',
    imports: ['Button'],
  },
  'Two buttons': {
    snippet:
      '  actions={\n'
      + '    <Box direction="row" gap="small">\n'
      + '      <Button label="Delete" />\n'
      + '      <Button label="Edit" primary />\n'
      + '    </Box>\n'
      + '  }',
    imports: ['Box', 'Button'],
  },
  Menu: {
    snippet:
      '  actions={'
      + '<Menu label="Actions"'
      + " items={[{ label: 'Edit' }, { label: 'Delete' }]}"
      + ' />}',
    imports: ['Menu'],
  },
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
    return documentedValues;
  }
  if (normalizedPropType === 'object' && objectExample) {
    return objectExample;
  }
  return undefined;
}

// --- code generator ---

function generateCode(propValues) {
  const lines = ['<PageHeader'];
  let needsAnchor = false;
  let needsLeftIcon = false;
  let actionsGrommetImports = [];
  Object.entries(propValues)
    .filter(([, v]) => v !== false && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, val]) => {
      if (key === 'parent') {
        needsAnchor = true;
        needsLeftIcon = true;
        lines.push(
          `  parent={<Anchor icon={<Left />} label="${val}" />}`,
        );
      } else if (key === 'actions' && ACTIONS_CODE[val]) {
        lines.push(ACTIONS_CODE[val].snippet);
        actionsGrommetImports = ACTIONS_CODE[val].imports;
      } else if (val === true) {
        lines.push(`  ${key}`);
      } else {
        lines.push(`  ${key}="${val}"`);
      }
    });
  lines.push('/>');
  const allGrommet = [
    'PageHeader',
    ...(needsAnchor ? ['Anchor'] : []),
    ...actionsGrommetImports,
  ].sort();
  const grommetImports = allGrommet.join(', ');
  const iconImport = needsLeftIcon
    ? "import { Left } from '@hpe-design/icons-grommet';\n"
    : '';
  const grommetLine =
    `import { ${grommetImports} } from 'grommet';`;
  return `${grommetLine}\n${iconImport}\n${lines.join('\n')}`;
}

// --- page component ---

export default function PageHeaderPlayground({ rows }) {
  const [propValues, setPropValues] = useState(() => {
    const s = {};
    rows.forEach(row => {
      if (SKIP_TYPES.includes(row.normalizedPropType)) return;
      s[row.prop] =
        row.normalizedPropType === 'boolean' ? false : '';
    });
    s.title = 'Page title';
    s.subtitle = 'A short description of this page.';
    return s;
  });

  const updateProp = (prop, value) => {
    setPropValues(prev => ({ ...prev, [prop]: value }));
  };

  const previewProps = useMemo(() => {
    const p = {};
    Object.entries(propValues).forEach(([key, val]) => {
      if (val === false || val === '') return;
      if (key === 'parent') {
        p.parent = <Anchor icon={<Left />} label={val} />;
        return;
      }
      if (key === 'actions') {
        p.actions = ACTIONS_PREVIEW[val];
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
        PageHeader
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
              id={`pageheader-${prop}`}
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
              htmlFor={`pageheader-${prop}`}
            >
              <Select
                id={`pageheader-${prop}`}
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
          prop === 'actions' &&
          normalizedPropType === 'element'
        ) {
          return (
            <FormField
              key={prop}
              label="actions"
              name={prop}
              htmlFor={`pageheader-${prop}`}
              help="Choose a preset actions pattern"
            >
              <Select
                id={`pageheader-${prop}`}
                name={prop}
                options={['', ...ACTIONS_OPTIONS]}
                value={value}
                placeholder="— none —"
                onChange={({ value: v }) => updateProp(prop, v)}
              />
            </FormField>
          );
        }

        if (
          prop === 'parent' &&
          normalizedPropType === 'element'
        ) {
          return (
            <FormField
              key={prop}
              label="parent — Left link label"
              name={prop}
              htmlFor={`pageheader-${prop}`}
              help='Renders as <Anchor icon={<Left />} label="..." />'
            >
              <TextInput
                id={`pageheader-${prop}`}
                name={prop}
                value={value}
                placeholder="Left"
                onChange={e => updateProp(prop, e.target.value)}
              />
            </FormField>
          );
        }

        return (
          <FormField
            key={prop}
            label={prop}
            name={prop}
            htmlFor={`pageheader-${prop}`}
            help={getHelpText(row)}
          >
            <TextInput
              id={`pageheader-${prop}`}
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
    <Box fill pad="medium">
      <PageHeader {...previewProps} />
    </Box>
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <Heading level={2} margin={{ bottom: 'small' }}>
            PageHeader playground
          </Heading>
          <Box height="large">
            <PlaygroundShell
              componentName="PageHeader"
              preview={preview}
              controls={controls}
              code={code}
            />
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

PageHeaderPlayground.getLayout = page => page;

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
    .filter(row => row.component === 'PageHeader')
    .sort((a, b) => a.prop.localeCompare(b.prop));
  return { props: { rows } };
}
