import React, { Fragment } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Card,
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
    alignment: 'Left-aligned',
    useCases: [
      {
        label: 'Side Drawers',
        href: '/components/layer#side-drawer-modal',
      },
      {
        label: 'Forms',
        href: '/templates/forms',
      },
      {
        label: 'Filters',
        href: '/templates/filtering',
      },
    ],
  },
  {
    id: 2,
    alignment: 'Right-aligned',
    useCases: [
      {
        label: 'Wizards',
        href: '/templates/wizard',
      },
      {
        label: 'Confirmation Modals',
        href: '/components/fileinput#fileinput-with-file-removal-confirmation',
      },
      {
        label: 'Dialogs',
      },
      {
        label: 'Notifications',
      },
    ],
  },
];

const columns = [
  {
    property: 'alignment',
    label: 'Alignment',
  },
  {
    property: 'useCases',
    label: 'Use Cases',
  },
];

export const ButtonAlignmentTable = () => (
  <Card
    alignSelf="start"
    elevation="none"
    pad="medium"
    width="large"
    round="xsmall"
  >
    {/* style tag is necessary in order for table not 
    to exceed container width */}
    <Table style={{ tableLayout: 'fixed', width: '100%' }}>
      <TableHeader>
        <TableRow>
          {columns.map(c => (
            <TableCell
              border="bottom"
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
                key={c.property}
                border={{ side: 'bottom', color: 'border-weak' }}
                pad={{ vertical: 'small' }}
              >
                {c.property === 'alignment' ? (
                  datum[c.property]
                ) : (
                  <Box direction="row" gap="xsmall" wrap>
                    {datum[c.property].map((item, index) => (
                      <Fragment key={index}>
                        {item.href ? (
                          <Link href={item.href} passHref>
                            <Anchor label={item.label} href={item.href} />
                          </Link>
                        ) : (
                          <Text>{item.label}</Text>
                        )}
                        {index < datum[c.property].length - 1 && (
                          <Text>, </Text>
                        )}
                      </Fragment>
                    ))}
                  </Box>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);
