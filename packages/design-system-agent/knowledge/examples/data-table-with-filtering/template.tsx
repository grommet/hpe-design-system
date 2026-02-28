import { Box, Data, DataTable, DataFilters, DataSearch, Heading, Toolbar } from 'grommet';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Box gap="medium">
      <Heading level={2}>Users</Heading>
      
      <Data data={users}>
        <Toolbar>
          <DataSearch />
          <DataFilters>
            <Box>
              {/* Filters are automatically generated from data properties */}
            </Box>
          </DataFilters>
        </Toolbar>
        
        <DataTable
          columns={[
            {
              property: 'name',
              header: 'Name',
              primary: true,
            },
            {
              property: 'email',
              header: 'Email',
            },
            {
              property: 'role',
              header: 'Role',
            },
            {
              property: 'status',
              header: 'Status',
            },
          ]}
        />
      </Data>
    </Box>
  );
}