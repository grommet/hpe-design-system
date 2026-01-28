/* eslint-disable react/prop-types */
import { Box, DataTable, CheckBox, Avatar, Text } from 'grommet';

const data = [
  {
    id: 1,
    initials: 'AL',
    name: 'Alex Lee',
    email: 'alex.lee@example.com',
    status: 'Active',
  },
  {
    id: 2,
    initials: 'SM',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    status: 'Active',
  },
  {
    id: 3,
    initials: 'JR',
    name: 'Jordan Roberts',
    email: 'jordan.roberts@example.com',
    status: 'Pending',
  },
  {
    id: 4,
    initials: 'AK',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    status: 'Inactive',
  },
  {
    id: 5,
    initials: 'DL',
    name: 'Daniel Lopez',
    email: 'daniel.lopez@example.com',
    status: 'Active',
  },
  {
    id: 6,
    initials: 'NP',
    name: 'Nina Patel',
    email: 'nina.patel@example.com',
    status: 'Active',
  },
  {
    id: 7,
    initials: 'MT',
    name: 'Marco Tan',
    email: 'marco.tan@example.com',
    status: 'Pending',
  },
];

export const PageOneContent = ({ onNavigate }) => {
  return (
    <Box pad="medium">
      <DataTable
        data={data}
        columns={[
          {
            property: 'select',
            header: '',
            render: () => <CheckBox />,
            // size: "xsmall",
          },
          {
            property: 'name',
            header: 'User name',
            primary: true,
            render: datum => (
              <Box direction="row" gap="small" align="center">
                <Avatar background="brand" size="small">
                  {datum.initials}
                </Avatar>
                <Text>{datum.name}</Text>
              </Box>
            ),
          },
          {
            property: 'email',
            header: 'Email',
          },
          {
            property: 'status',
            header: 'Status',
            render: datum => <Text>{datum.status}</Text>,
          },
        ]}
      />
    </Box>
  );
};
