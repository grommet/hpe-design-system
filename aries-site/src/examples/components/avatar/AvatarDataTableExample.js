import React from 'react';
import { Avatar, Box, DataTable, ResponsiveContext, Text } from 'grommet';
import users from '../../../data/mockData/users.json';

export const AvatarDataTableExample = ({ bestPractice = true }) => {
  const size = React.useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState([]);

  return (
    <>
      <Box height={{ max: 'large' }} overflow="auto">
        <DataTable
          data={users}
          primaryKey="name"
          columns={[
            {
              property: 'name',
              header: 'Name',
              render: datum => (
                <>
                  {bestPractice ? (
                    <Box alignContent="center" gap="small" direction="row">
                      {' '}
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
                      <Avatar src={datum.avatar?.src} size="small" />
                      <Text>{datum.name}</Text>
                    </Box>
                  )}
                </>
              ),
            },
          ]}
          pin={['xsmall', 'small'].includes(size)}
          select={selected}
          onSelect={setSelected}
        />
      </Box>
    </>
  );
};
