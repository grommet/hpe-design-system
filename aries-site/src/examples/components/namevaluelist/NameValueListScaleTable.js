import React from 'react';

import {
  Box,
  Table,
  TableCell,
  TableHeader,
  TableBody,
  TableRow,
  Text,
} from 'grommet';
import { Checkmark } from 'grommet-icons';

const data = [
  {
    id: 1,
    textStyles: <Text size="large">Text / XSmall</Text>,
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 2,
    textStyles: <Text size="large">Text / Small</Text>,
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 3,
    textStyles: <Text size="large">Text / Default</Text>,
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 4,
    textStyles: <Text size="large">Text / Large</Text>,
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 5,
    textStyles: <Text size="large">Text / XL</Text>,
    name: <Text size="large">n/a</Text>,
    value: <Checkmark />,
  },
  {
    id: 6,
    textStyles: <Text size="large">Text / XXL</Text>,
    name: <Text size="large">n/a</Text>,
    value: <Checkmark />,
  },
];

const columns = [
  {
    property: 'textStyles',
    label: 'Text styles',
  },
  {
    property: 'name',
    label: 'Name',
  },
  {
    property: 'value',
    label: 'Value',
  },
];

export const NameValueListScaleTable = () => (
  <Box pad="small" align="start">
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(c => (
            <TableCell
              size="small"
              align="center"
              border
              key={c.property}
              scope="col"
            >
              <Text color="text-strong" weight="bold" size="xlarge">
                {c.label}
              </Text>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(datum => (
          <TableRow key={datum.id}>
            {columns.map(c => (
              <TableCell align="center" border key={c.property}>
                <Text color="text-strong">{datum[c.property]}</Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
