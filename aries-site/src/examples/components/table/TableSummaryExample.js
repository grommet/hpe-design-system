import React from 'react';
import { Box, DataTable } from 'grommet';

const data = [
  {
    id: 0,
    application: 'General Purpose VMs',
    requests: 742,
    delivered: 623,
  },
  {
    id: 1,
    application: 'Containers',
    requests: 23,
    delivered: 12,
  },
  {
    id: 2,
    application: 'ML Ops',
    requests: 42,
    delivered: 32,
  },
  {
    id: 3,
    application: 'Private Cloud VMs',
    requests: 654,
    delivered: 516,
  },
  {
    id: 4,
    application: 'Storage Optimized Compute',
    requests: 298,
    delivered: 290,
  },
  {
    id: 5,
    application: 'Hyperconverged VMs',
    requests: 1074,
    delivered: 1052,
  },
  {
    id: 6,
    application: 'Mission Critical Storage',
    requests: 322,
    delivered: 273,
  },
  {
    id: 7,
    application: 'Data Protection',
    requests: 742,
    delivered: 623,
  },
  {
    id: 8,
    application: 'Composable Compute',
    requests: 33,
    delivered: 22,
  },
  {
    id: 9,
    application: 'General Compute',
    requests: 52,
    delivered: 32,
  },
  {
    id: 10,
    application: 'Business Critical Storage',
    requests: 694,
    delivered: 616,
  },
  {
    id: 11,
    application: 'Storage Optimized Compute',
    requests: 298,
    delivered: 220,
  },
  {
    id: 12,
    application: 'Enterprise-Ready VMs',
    requests: 1074,
    delivered: 752,
  },
  {
    id: 13,
    application: 'Mission Critical Storage',
    requests: 322,
    delivered: 213,
  },
];

const enhancedData = data.map(datum => {
  const adjustedDatum = { ...datum };
  adjustedDatum.attachment = datum.delivered / datum.requests;
  return adjustedDatum;
});

const columns = [
  { property: 'application', header: 'Service' },
  {
    property: 'requests',
    header: 'Requests',
    render: datum => `${datum.requests.toLocaleString()}`,
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
  {
    property: 'delivered',
    header: 'Delivered',
    render: datum => `${datum.delivered.toLocaleString()}`,
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
  {
    property: 'attachment',
    header: 'Attachment',
    render: datum => `${(datum.attachment * 100).toFixed([1])}%`,
    align: 'end',
    aggregate: 'avg',
    footer: { aggregate: true },
  },
];

export const TableSummaryExample = () => (
  <Box height="medium" overflow="auto">
    <DataTable data={enhancedData} primaryKey="id" columns={columns} pin />
  </Box>
);
