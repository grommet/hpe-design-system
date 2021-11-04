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
    textStyles: <Text>Text / XSmall</Text>,
    name: <Checkmark size="small"  />,
    value: <Checkmark size="small"  />,
  },
  {
    id: 2,
    textStyles: <Text>Text / Small</Text>,
    name: <Checkmark size="small"  />,
    value: <Checkmark size="small"  />,
  },
  {
    id: 3,
    textStyles: <Text>Text / Default</Text>,
    name: <Checkmark size="small"  />,
    value: <Checkmark size="small"  />,
  },
  {
    id: 4,
    textStyles: <Text>Text / Large</Text>,
    name: <Checkmark size="small"  />,
    value: <Checkmark size="small"  />,
  },
  {
    id: 5,
    textStyles: <Text>Text / XL</Text>,
    name: <Text>n/a</Text>,
    value: <Checkmark size="small"  />,
  },
  {
    id: 6,
    textStyles: <Text>Text / XXL</Text>,
    name: <Text>n/a</Text>,
    value: <Checkmark size="small" />,
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
              <Text color="text-strong" weight="bold">
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
