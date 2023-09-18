import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, DataTable, Text } from 'grommet';
import users from '../../../data/mockData/users.json';

export const AvatarDataTableExample = ({ bestPractice = true }) => {
  const [selected, setSelected] = React.useState([]);

  const data = users.users;

  return (
    <Box height={{ max: 'large' }} overflow="auto">
      <DataTable
        data={data}
        primaryKey="name"
        aria-describedby="ds-users"
        columns={[
          {
            property: 'name',
            header: 'Name',
            render: datum =>
              bestPractice ? (
                <Box alignContent="center" gap="small" direction="row">
                  <Avatar
                    a11yTitle={datum.avatar.name}
                    background="purple!"
                    src={datum.avatar.src}
                    size="small"
                  >
                    <Text size="xsmall">{datum.avatar.inital}</Text>
                  </Avatar>
                  <Text>{datum.name}</Text>
                </Box>
              ) : (
                <Box gap="small" alignContent="center" direction="row">
                  <Avatar src={datum.avatar.src} size="small" />
                  <Text>{datum.name}</Text>
                </Box>
              ),
          },
        ]}
        select={selected}
        onSelect={setSelected}
      />
    </Box>
  );
};

AvatarDataTableExample.propTypes = {
  bestPractice: PropTypes.bool,
};
