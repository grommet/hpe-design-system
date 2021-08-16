import React from 'react';
import { Box, DataTable, Text } from 'grommet';

const data = [
    {
        type: 'Information',
        state: 'In-Progress',
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
        insight: 'Progress Update',
    },
    {
        type: 'Event',
        state: 'Stopped',
        status: 'Warning',
        attentionLevel: 'Low',
        actions: 'Unread',
        persistence: 'Action Required',
        placement: 'Email',
        insight: 'Status/Task Tracking',
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
        insight: 'Request Received',
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
        header: <Text weight="bold">Type</Text>,
    },
    {
        property: 'state',
        header: <Text weight="bold">State</Text>,
    },
    {
        property: 'status',
        header: <Text weight="bold">Status</Text>,
    },
    {
        property: 'attentionLevel',
        header: <Text weight="bold">Attention Level</Text>,
    },
    {
        property: 'actions',
        header: <Text weight="bold">Actions</Text>,
    },
    {
        property: 'persistence',
        header: <Text weight="bold">Persistence</Text>,
    },
    {
        property: 'placement',
        header: <Text weight="bold">Placement</Text>,
    },
    {
        property: 'insight',
        header: <Text weight="bold">Insight</Text>,
    },
  ];

export const TaxonomyTable = () => (
    <Box pad="small" background="background-front" round="small" overflow="auto" >
        <DataTable 
            columns={columns} 
            data={data} 
            primaryKey={false} 
        />
    </Box>
);
