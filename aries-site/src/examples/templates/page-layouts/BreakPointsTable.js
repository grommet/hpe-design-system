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

const data = [
  {
    id: 1,
    size: (
      <Text color="text-strong" weight="bold">
        XSmall
      </Text>
    ),
    range: <Text>576 and below</Text>,
    margin: <Text>12</Text>,
  },
  {
    id: 2,
    size: (
      <Text color="text-strong" weight="bold">
        Small
      </Text>
    ),
    range: <Text>577 - 768</Text>,
    margin: <Text>24</Text>,
  },
  {
    id: 3,
    size: (
      <Text color="text-strong" weight="bold">
        Medium
      </Text>
    ),
    range: <Text>769 - 1080</Text>,
    margin: <Text>24</Text>,
  },
  {
    id: 4,
    size: (
      <Text color="text-strong" weight="bold">
        Large
      </Text>
    ),
    range: <Text>1081 - 1439</Text>,
    margin: <Text>48</Text>,
  },
  {
    id: 5,
    size: (
      <Text color="text-strong" weight="bold">
        XLarge
      </Text>
    ),
    range: <Text>1440 and above</Text>,
    margin: <Text>48</Text>,
  },
];

const columns = [
  {
    property: 'size',
    label: 'Size',
  },
  {
    property: 'range',
    label: 'Range (px)',
  },
  {
    property: 'margin',
    label: 'Margin',
  },
];

export const BreakPointsTable = () => (
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
              pad={{ vertical: 'small' }}
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
              <TableCell
                align="center"
                border
                key={c.property}
                pad={{ vertical: 'small' }}
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
