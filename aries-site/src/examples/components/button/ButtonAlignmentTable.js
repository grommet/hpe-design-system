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
import { TextEmphasis } from 'aries-core';

const data = [
  {
    id: 1,
    alignment: 'Left-aligned',
    useCases: [
      {
        label: 'Side drawers',
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
        label: 'Confirmation modals',
        href: '/components/fileinput#fileinput-with-file-removal-confirmation',
      },
      {
        label: 'Dialog modals',
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
    label: 'Use cases',
  },
];

export const ButtonAlignmentTable = () => (
  <Card
    alignSelf="start"
    elevation="none"
    pad="medium"
    width="xlarge"
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
                key={c.property}
                border={{ side: 'bottom', color: 'border-weak' }}
                pad={{ vertical: 'xsmall' }}
              >
                {c.property === 'alignment' ? (
                  datum[c.property]
                ) : (
                  <Box direction="row" gap="3xsmall" wrap>
                    {datum[c.property].map((item, index) => (
                      <Fragment key={index}>
                        {item.href ? (
                          <Link href={item.href} passHref legacyBehavior>
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
