/* eslint-disable react/prop-types */
import React from 'react';
import fs from 'fs';
import path from 'path';
import { hpe } from 'grommet-theme-hpe';
import {
  Box,
  CheckBoxGroup,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableColumns,
  Grommet,
  Page,
  PageContent,
  Heading,
  Pagination,
  Text,
  Tip,
  Toolbar,
} from 'grommet';

// --- filter + column configuration ---

const properties = {
  normalizedPropType: {
    label: 'Prop grouping',
  },
  prop: {
    label: 'Prop name',
    search: true,
  },
  component: {
    label: 'Component',
    search: true,
  },
  componentCategory: {
    label: 'Category',
  },
  propCategory: {
    label: 'Prop group',
  },
};

const columns = [
  {
    property: 'component',
    header: 'component',
    sortable: true,
    size: 'xsmall',
    render: datum => <Text size="small">{datum.component}</Text>,
  },
  {
    property: 'componentCategory',
    header: 'componentCategory',
    sortable: true,
    size: 'xsmall',
    render: datum => <Text size="small">{datum.componentCategory}</Text>,
  },
  {
    property: 'prop',
    header: 'prop',
    primary: true,
    sortable: true,
    size: 'small',
    render: datum => (
      <Text weight="bold" size="small">
        {datum.prop}
      </Text>
    ),
  },
  {
    property: 'propType',
    header: 'propType',
    sortable: false,
    size: 'small',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.propType}
      </Text>
    ),
  },
  {
    property: 'normalizedPropType',
    header: 'normalizedPropType',
    sortable: true,
    size: 'xsmall',
    render: datum => (
      <Text size="small" color="text-weak">
        {datum.normalizedPropType}
      </Text>
    ),
  },
  {
    property: 'propCategory',
    header: 'propCategory',
    sortable: true,
    size: 'xsmall',
    render: datum => <Text size="small">{datum.propCategory}</Text>,
  },
  {
    property: 'defaultValue',
    header: 'defaultValue',
    sortable: false,
    size: 'xsmall',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.defaultValue}
      </Text>
    ),
  },
  {
    property: 'acceptsObject',
    header: 'acceptsObject',
    sortable: true,
    size: 'xsmall',
    render: datum => <Text size="xsmall">{datum.acceptsObject}</Text>,
  },
  {
    property: 'objectExample',
    header: 'objectExample',
    sortable: false,
    size: 'small',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.objectExample}
      </Text>
    ),
  },
  {
    property: 'acceptsNode',
    header: 'acceptsNode',
    sortable: true,
    size: 'xsmall',
    render: datum => <Text size="xsmall">{datum.acceptsNode}</Text>,
  },
  {
    property: 'enumValues',
    header: 'enumValues',
    sortable: false,
    size: 'medium',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.enumValues}
      </Text>
    ),
  },
  {
    property: 'documentedValues',
    header: 'documentedValues',
    sortable: false,
    size: 'medium',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.documentedValues}
      </Text>
    ),
  },
  {
    property: 'description',
    header: 'description',
    sortable: false,
    size: 'medium',
    render: datum => (
      <Tip
        content={
          <Box width="medium" pad="xxsmall">
            <Text size="small">{datum.description}</Text>
          </Box>
        }
      >
        <Text size="xsmall" color="text-weak" truncate>
          {datum.description}
        </Text>
      </Tip>
    ),
  },
  {
    property: 'conditionalRelationship',
    header: 'conditionalRelationship',
    sortable: false,
    size: 'small',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.conditionalRelationship}
      </Text>
    ),
  },
  {
    property: 'childSupport',
    header: 'childSupport',
    sortable: false,
    size: 'small',
    render: datum => (
      <Text size="xsmall" color="text-weak" truncate>
        {datum.childSupport}
      </Text>
    ),
  },
];

// --- page ---

const columnOptions = [
  { property: 'component', label: 'component' },
  { property: 'componentCategory', label: 'componentCategory' },
  { property: 'prop', label: 'prop' },
  { property: 'propType', label: 'propType' },
  { property: 'normalizedPropType', label: 'normalizedPropType' },
  { property: 'propCategory', label: 'propCategory' },
  { property: 'defaultValue', label: 'defaultValue' },
  { property: 'acceptsObject', label: 'acceptsObject' },
  { property: 'objectExample', label: 'objectExample' },
  { property: 'acceptsNode', label: 'acceptsNode' },
  { property: 'enumValues', label: 'enumValues' },
  { property: 'documentedValues', label: 'documentedValues' },
  { property: 'description', label: 'description' },
  { property: 'conditionalRelationship', label: 'conditionalRelationship' },
  { property: 'childSupport', label: 'childSupport' },
];

const DataPager = () => (
  <Box
    direction="row"
    border="top"
    align="center"
    justify="end"
    pad={{ vertical: '3xsmall', horizontal: 'xsmall' }}
    width="full"
  >
    <Pagination summary stepOptions pad="3xsmall" />
  </Box>
);

export default function PropsExplorer({ rows }) {
  return (
    <Grommet theme={hpe} full>
    <Page>
      <PageContent gap="medium" pad={{ vertical: 'large' }}>
        <Box gap="xsmall">
          <Heading id="prop-explorer-heading" level={2} margin="none">
            Grommet prop explorer
          </Heading>
          <Text color="text-weak">
            {rows.length} props across{' '}
            {new Set(rows.map(r => r.component)).size} components.
            Source: grommet-props.csv
          </Text>
        </Box>

        <Data
          data={rows}
          properties={properties}
          pad="medium"
          background="background-back"
          round="medium"
        >
          <Toolbar>
            <DataSearch />
            <DataFilters layer>
              <DataFilter property="normalizedPropType" />
              <DataFilter property="componentCategory" />
              <DataFilter property="propCategory">
                <CheckBoxGroup
                  name="propCategory"
                  options={[
                    'accessibility',
                    'behavior',
                    'content',
                    'event',
                    'layout',
                    'state',
                  ]}
                />
              </DataFilter>
            </DataFilters>
            <DataTableColumns options={columnOptions} drop />
          </Toolbar>
          <DataSummary />
          <Box overflow="auto">
            <DataTable
              columns={columns}
              sortable
              aria-describedby="prop-explorer-heading"
            />
          </Box>
          <DataPager />
        </Data>
      </PageContent>
    </Page>
    </Grommet>
  );
}

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
  const lines = text.replace(/\r\n/g, '\n').split('\n').filter(Boolean);
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

// --- data loading ---

// Bypass the docs layout — no nav/header needed for this internal tool
PropsExplorer.getLayout = page => page;

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
  const rows = parseCsv(text).map((row, i) => ({ id: i, ...row }));
  return { props: { rows } };
}
