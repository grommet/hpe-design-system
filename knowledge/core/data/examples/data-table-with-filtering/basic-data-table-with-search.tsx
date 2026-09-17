import {
  Box,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Pagination,
  Toolbar,
} from 'grommet';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  department: string;
}

const columns = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'email', header: 'Email' },
  { property: 'role', header: 'Role' },
  { property: 'department', header: 'Department' },
];

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Box background="background-front" round="medium" overflow="hidden" pad="medium">
      <Data
        data={users}
        properties={{
          role: { label: 'Role' },
          status: { label: 'Status' },
          department: { label: 'Department' },
        }}
      >
        <Toolbar>
          <DataSearch placeholder="Search..." />
          <DataFilters layer>
            <DataFilter property="role" />
            <DataFilter property="status" />
            <DataFilter property="department" />
          </DataFilters>
        </Toolbar>
        <DataSummary />
        <DataTable columns={columns} sortable pin />
        <Box pad={{ top: 'xsmall' }} border={{ side: 'top' }}>
          <Pagination step={10} summary stepOptions={[10, 20]} />
        </Box>
      </Data>
    </Box>
  );
}