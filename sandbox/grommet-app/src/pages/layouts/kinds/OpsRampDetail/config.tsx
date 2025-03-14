import React from 'react';
import { Anchor, Box, Button, ColumnConfig } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
} from 'grommet-icons';

export type Node = {
  name: string;
  'ip address': string;
  make: string;
  model: string;
  state: string;
};

export interface nodeTableProps {
  showResultDetails: boolean;
  setShowResultDetails: (showResultDetails: boolean) => void;
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIpAddress: (ip: string) => void;
}

export const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' as 'asc' | 'desc' },
  step: 10,
  properties: {},
  page: 1,
};

export type resultType = {
  data: Node[];
  filteredTotal: number;
  page: number;
};

export const columns: (
  setShowResultDetails: (showResultDetails: boolean) => void,
  setName: (name: string) => void,
  setIpAddress: (ip: string) => void,
) => ColumnConfig<Node>[] = (setShowResultDetails, setName, setIpAddress) => [
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
          <StatusGoodSmall aria-label="up status" color="status-ok" />
        ) : datum.state === 'down' ? (
          <StatusCriticalSmall
            aria-label="down status"
            color="status-critical"
          />
        ) : datum.state === 'unknown' ? (
          <StatusUnknownSmall
            aria-label="unknown status"
            color="status-unknown"
          />
        ) : datum.state === 'undefined' ? (
          <StatusPlaceholderSmall aria-label="undefined status" />
        ) : null}
        <Anchor
          as={Button}
          onClick={() => {
            setShowResultDetails(true);
            setName(datum.name);
            setIpAddress(datum['ip address']);
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

export const properties = {
  model: {
    label: 'Model',
    options: ['VirtualMachine', 'VMware Virtual Platform'],
  },
  state: {
    label: 'State',
    options: ['up', 'down', 'unknown', 'undefined'],
  },
};
