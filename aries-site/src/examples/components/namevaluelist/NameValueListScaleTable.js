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
    textStyles: 'Text / XSmall',
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 2,
    textStyles: 'Text / Small',
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 3,
    textStyles: 'Text / Default',
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 4,
    textStyles: 'Text / Large',
    name: <Checkmark />,
    value: <Checkmark />,
  },
  {
    id: 5,
    textStyles: 'Text / XL',
    name: 'n/a',
    value: <Checkmark />,
  },
  {
    id: 6,
    textStyles: 'Text / XXL',
    name: 'n/a',
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
  <Box align="start" pad="large">
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
              <Text weight="bold" size="large">
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
                <Text>{datum[c.property]}</Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
