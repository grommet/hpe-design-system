/* eslint-disable grommet/datatable-aria-describedby */
import React from 'react';
import { Box, DataTable } from 'grommet';
import { TextEmphasis } from 'aries-core';

const data = [
  {
    type: 'Information',
    state: 'In progress',
    status: 'Critical',
    attentionLevel: 'High',
    actions: 'Dismiss',
    persistence: 'Dismissable',
    placement: 'Banner',
    insight: 'Support',
  },
  {
    type: 'Task',
    state: 'Starting',
    status: 'Normal',
    attentionLevel: 'Medium',
    actions: 'Read',
    persistence: 'Clearable',
    placement: 'Browser',
    insight: 'Progress update',
  },
  {
    type: 'Event',
    state: 'Stopped',
    status: 'Warning',
    attentionLevel: 'Low',
    actions: 'Unread',
    persistence: 'Action required',
    placement: 'Email',
    insight: 'Status/task tracking',
  },
  {
    type: '',
    state: 'Pending',
    status: 'Unknown',
    attentionLevel: '',
    actions: 'Yes',
    persistence: 'Temporary',
    placement: 'Toast',
    insight: 'Created',
  },
  {
    type: '',
    state: 'Success',
    status: '',
    attentionLevel: '',
    actions: 'No',
    persistence: '',
    placement: 'Bell',
    insight: 'Request received',
  },
  {
    type: '',
    state: 'Failure',
    status: '',
    attentionLevel: '',
    actions: '',
    persistence: '',
    placement: 'Badging',
    insight: '',
  },
  {
    type: '',
    state: '',
    status: '',
    attentionLevel: '',
    actions: '',
    persistence: '',
    placement: 'System',
    insight: '',
  },
  {
    type: '',
    state: '',
    status: '',
    attentionLevel: '',
    actions: '',
    persistence: '',
    placement: 'Global',
    insight: '',
  },
  {
    type: '',
    state: '',
    status: '',
    attentionLevel: '',
    actions: '',
    persistence: '',
    placement: 'Inline',
    insight: '',
  },
];

export const columns = [
  {
    property: 'type',
    header: <TextEmphasis color="text-strong">Type</TextEmphasis>,
  },
  {
    property: 'state',
    header: <TextEmphasis color="text-strong">State</TextEmphasis>,
  },
  {
    property: 'status',
    header: <TextEmphasis color="text-strong">Status</TextEmphasis>,
  },
  {
    property: 'attentionLevel',
    header: <TextEmphasis color="text-strong">Attention level</TextEmphasis>,
  },
  {
    property: 'actions',
    header: <TextEmphasis color="text-strong">Actions</TextEmphasis>,
  },
  {
    property: 'persistence',
    header: <TextEmphasis color="text-strong">Persistence</TextEmphasis>,
  },
  {
    property: 'placement',
    header: <TextEmphasis color="text-strong">Placement</TextEmphasis>,
  },
  {
    property: 'insight',
    header: <TextEmphasis color="text-strong">Insight</TextEmphasis>,
  },
];

export const TaxonomyTable = () => (
  <Box pad="small" background="background-front" round="small" overflow="auto">
    <DataTable columns={columns} data={data} primaryKey={false} />
  </Box>
);
