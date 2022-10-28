import React from 'react';
import {
  Avatar,
  Box,
  DataTable,
  Image,
  ResponsiveContext,
  Text,
} from 'grommet';
import company from '../../../data/mockData/company.json';

export const AvatarDataTableIconExample = ({ bestPractice = true }) => {
  const size = React.useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState([]);

  const data = company.company;

  return (
    <>
      <Box width="medium" height={{ max: 'large' }} overflow="auto">
        <DataTable
          data={data}
          primaryKey="name"
          columns={[
            {
              property: 'name',
              header: 'Name',
              render: datum => (
                <>
                  {bestPractice ? (
                    <Box alignContent="center" gap="small" direction="row">
                      <Avatar
                        src={datum.src}
                        // grommet defines align center whiich we want to overid
                        align="unset"
                        round="medium"
                        size="small"
                        background={{ color: datum.background, dark: false }}
                      />
                      <Text>{datum.name}</Text>
                    </Box>
                  ) : (
                    <Box gap="large" alignContent="center" direction="row">
                      <Box height="24px" align="start">
                        <Image src={datum.src} fit="contain" />
                      </Box>
                      <Text>{datum.name}</Text>
                    </Box>
                  )}
                </>
              ),
            },
          ]}
          select={selected}
          onSelect={setSelected}
        />
      </Box>
    </>
  );
};
