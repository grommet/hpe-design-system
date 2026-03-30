import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Data,
  DataTable,
  Pagination,
  Box,
  Text,
  Toolbar,
  DataSearch,
  DataSort,
  DataFilters,
  DataSummary,
  DataView,
  DataTableColumns,
  ResponsiveContext,
  DropButton,
  Menu,
  ToggleGroup,
} from 'grommet';
import { More, List, Table, Map } from '@hpe-design/icons-grommet';
import { useContext } from 'react';
import { useLoading } from '../../utils/skeleton';
import { DensityControl } from './components';
import { devices } from './data';

const columns = [
  {
    property: 'serialNumber',
    header: 'Serial number',
    primary: true,
  },
  {
    property: 'name',
    header: 'Name',
    render: datum => (datum.name ? datum.name : '--'),
  },
  {
    property: 'type',
    header: 'Type',
  },
  {
    property: 'make',
    header: 'Make',
  },
  {
    property: 'country',
    header: 'Country',
  },
  {
    property: 'state',
    header: 'State',
  },
  {
    property: 'city',
    header: 'City',
    render: datum => <Text truncate="tip">{datum.city}</Text>,
  },
  {
    property: 'model',
    header: 'Model',
    render: datum => <Text truncate="tip">{datum.model}</Text>,
    size: 'medium',
  },
  {
    property: 'totalEnergy',
    header: 'Total energy',
    units: 'kWh',
    align: 'end',
    render: datum => (
      <Text>{Intl.NumberFormat().format(datum.totalEnergy)}</Text>
    ),
  },
];

const options = columns.map(column => ({
  property: column.property,
  label: column.header,
}));

export const Devices = () => {
  const size = useContext(ResponsiveContext);
  const skeleton = useLoading(1000);
  return (
    <Data
      data={devices}
      views={
        !skeleton
          ? [
              {
                name: 'My devices',
                properties: {
                  type: ['Compute'],
                  make: ['HPE'],
                },
              },
              {
                name: 'My other devices',
                properties: {
                  type: ['Compute'],
                  make: ['HPE'],
                },
              },
            ]
          : undefined
      }
      properties={{
        serialNumber: { filter: false },
        name: { filter: false },
        type: { label: 'Type' },
        make: { label: 'Make' },
        country: { label: 'Country' },
        state: { label: 'State' },
        city: { label: 'City' },
        model: { label: 'Model' },
        totalEnergy: { label: 'Total energy' },
      }}
      animation={!skeleton ? 'fadeIn' : undefined}
    >
      <Toolbar gap="medium" skeleton={skeleton}>
        <Toolbar>
          <DataSearch placeholder="Search" />
          <DataSort drop />
          <DataFilters layer />
        </Toolbar>
        {!['xsmall', 'small', 'medium'].includes(size) ? (
          <>
            <DataView />
            <Toolbar>
              <ToggleGroup
                options={[
                  {
                    icon: <Table a11yTitle="Map view" />,
                    value: 'table',
                  },
                  {
                    icon: <List a11yTitle="List view" />,
                    value: 'list',
                  },
                  {
                    icon: <Map a11yTitle="Map view" />,
                    value: 'map',
                  },
                ]}
                defaultValue="table"
              />
              <DataTableColumns drop options={options} />
              {/* add back when density tokens are added */}
              {/* <DensityControl /> */}
            </Toolbar>
          </>
        ) : undefined}
        {['xsmall', 'small', 'medium'].includes(size) ? (
          <DropButton
            kind="toolbar"
            icon={<More />}
            dropAlign={{ top: 'bottom', left: 'left' }}
            dropContent={
              <Box align="start" gap="small" pad="small">
                <DataView />
                <Toolbar>
                  <DataTableColumns drop options={options} />
                  {/* add back when density tokens are added */}
                  {/* <DensityControl /> */}
                </Toolbar>
              </Box>
            }
          />
        ) : undefined}
        <Box flex align="end">
          <Menu label="Actions" secondary />
        </Box>
      </Toolbar>
      <Box skeleton={skeleton}>
        <DataSummary margin={{ bottom: 'none', top: 'xsmall' }} />
      </Box>
      <Box overflow={{ horizontal: 'auto' }} skeleton={skeleton}>
        <DataTable
          columns={columns}
          onSelect={() => {}}
          sortable
          verticalAlign={{ body: 'top' }}
          onClickRow="select"
          id="devices-table"
          primaryKey="serialNumber"
        />
      </Box>
      <Pagination
        summary
        stepOptions={!skeleton ? true : false}
        border="top"
        pad={{ vertical: 'xsmall' }}
        skeleton={skeleton}
      />
    </Data>
  );
};
