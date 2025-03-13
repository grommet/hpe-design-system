import React from 'react';
import { Box, Anchor, ColumnConfig } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
} from 'grommet-icons';

type Node = {
  name: string;
  'ip address': string;
  make: string;
  model: string;
  state: string;
};

export interface NodeTableProps {
  showResultDetails: boolean;
  setShowResultDetails: (showResultDetails: boolean) => void;
}

export const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' as 'asc' | 'desc' },
  step: 10,
  properties: {},
  page: 1,
};

export const columns: (
  setShowResultDetails: (showResultDetails: boolean) => void,
) => ColumnConfig<Node>[] = setShowResultDetails => [
  {
    property: 'name',
    pin: true,
    primary: true,
    header: 'Name',
    render: datum => (
      <Box
        align="center"
        direction="row"
        gap="xsmall"
        width={{ min: 'max-content' }}
      >
        {datum.state === 'up' ? (
          <StatusGoodSmall color="status-ok" />
        ) : datum.state === 'down' ? (
          <StatusCriticalSmall color="status-critical" />
        ) : datum.state === 'unknown' ? (
          <StatusUnknownSmall color="status-unknown" />
        ) : datum.state === 'undefined' ? (
          <StatusPlaceholderSmall />
        ) : null}
        <Anchor
          onClick={() => {
            // Call setShowResultDetails from props
            setShowResultDetails(true);
          }}
        >
          {datum.name}
        </Anchor>
      </Box>
    ),
  },
  {
    property: 'ip address',
    header: 'IP Address',
    sortable: false,
  },
  {
    property: 'make',
    header: 'Make',
    sortable: false,
  },
  {
    property: 'model',
    header: 'Model',
    sortable: false,
  },
];

export const Properties = {
  model: {
    label: 'Model',
    options: ['VirtualMachine', 'VMware Virtual Platform'],
  },
  state: {
    label: 'State',
    options: ['up', 'down', 'unknown', 'undefined'],
  },
};
