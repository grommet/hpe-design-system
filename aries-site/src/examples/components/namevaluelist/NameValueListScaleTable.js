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
import { Checkmark } from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';

const CheckmarkIcon = () => <Checkmark size="small" color="text-strong" />;

const data = [
  {
    id: 1,
    textStyles: <Text>Text / XSmall</Text>,
    name: <CheckmarkIcon />,
    value: <CheckmarkIcon />,
  },
  {
    id: 2,
    textStyles: <Text>Text / Small</Text>,
    name: <CheckmarkIcon />,
    value: <CheckmarkIcon />,
  },
  {
    id: 3,
    textStyles: <Text>Text / Default</Text>,
    name: <CheckmarkIcon />,
    value: <CheckmarkIcon />,
  },
  {
    id: 4,
    textStyles: <Text>Text / Large</Text>,
    name: <CheckmarkIcon />,
    value: <CheckmarkIcon />,
  },
  {
    id: 5,
    textStyles: <Text>Text / XL</Text>,
    name: <Text>n/a</Text>,
    value: <CheckmarkIcon />,
  },
  {
    id: 6,
    textStyles: <Text>Text / XXL</Text>,
    name: <Text>n/a</Text>,
    value: <CheckmarkIcon />,
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
  <Box pad="xsmall" align="start">
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(c => (
            <TableCell
              size="xsmall"
              align="center"
              border
              key={c.property}
              scope="col"
              pad={{ vertical: 'xsmall' }}
            >
              <TextEmphasis>{c.label}</TextEmphasis>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(datum => (
          <TableRow key={datum.id}>
            {columns.map(c => (
              <TableCell
                align="center"
                border
                key={c.property}
                pad={{ vertical: 'xsmall' }}
              >
                <Text color="text-strong">{datum[c.property]}</Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
