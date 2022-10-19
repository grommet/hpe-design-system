import React from 'react';
import { Avatar, Box, DataTable, ResponsiveContext, Text } from 'grommet';

const data = [
  {
    name: 'Kenny Tran',
    avatar: {
      src: '/Kenny.png',
    },
    status: 'Verified',
    platformRole: 'Admin',
    lastActive: '4 hours ago',
  },
  {
    name: 'Vicky Avalos Campos',
    avatar: {
      src: '/Vicky.png',
    },
    status: 'Invite Pending',
    platformRole: 'Editor',
    lastActive: '2 days ago',
  },
  {
    name: 'Brittany Archibeque',
    status: 'Verified',
    platformRole: 'Viewer',
    lastActive: 'April 15, 2022',
  },
  {
    name: 'Matt Glissman',
    avatar: {
      src: '/Matt.png',
    },
    status: 'Verified',
    platformRole: 'Editor',
    lastActive: '',
  },
  {
    name: 'Taylor Seamans',
    avatar: {
      src: '/Taylor.png',
    },
    status: 'Invite Pending',
    platformRole: 'Admin',
    lastActive: '1 hour ago',
  },
  {
    name: 'Eric Soderberg',
    avatar: {
      src: '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
    },
    status: 'Verified',
    platformRole: 'Admin',
    lastActive: '',
  },
  {
    name: 'Jessica Filben',
    status: 'Invite Pending',
    platformRole: 'Invite Pending',
    lastActive: '3 hours ago',
  },
];

const columns = [
  {
    property: 'name',
    header: 'Name',
    render: datum => (
      <Box alignContent="center" gap="small" direction="row">
        <Avatar src={datum.avatar?.src} size="small" />
        <Text>{datum.name}</Text>
      </Box>
    ),
    primary: true,
  },
  {
    property: 'status',
    header: 'Status',
  },
  {
    property: 'platformRole',
    header: 'Platform Role',
  },
  {
    property: 'lastActive',
    header: 'Last Active',
    render: datum => <Text a11yTitle={!datum.lastActive ? "No value" : undefined}>{datum.lastActive || '--'}</Text>,
  },
];

export const AvatarDataTableExampleDont = () => {
  const size = React.useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState([]);

  return (
    <>
      <Box height={{ max: 'large' }} overflow="auto">
        <DataTable
          aria-describedby="orders-heading"
          data={data}
          primaryKey="name"
          columns={columns}
          pin={['xsmall', 'small'].includes(size)}
          select={selected}
          onSelect={setSelected}
        />
      </Box>
    </>
  );
};
