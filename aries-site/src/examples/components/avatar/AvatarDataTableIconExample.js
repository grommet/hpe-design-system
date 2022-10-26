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

  return (
    <>
      <Box width="medium" height={{ max: 'large' }} overflow="auto">
        <DataTable
          data={company}
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
                        align="undefined"
                        round="medium"
                        size="small"
                      />
                      <Text>{datum.name}</Text>
                    </Box>
                  ) : (
                    <Box
                      alignSelf="start"
                      align="center"
                      gap="small"
                      alignContent="center"
                      direction="row"
                    >
                      <Image src={datum.src} />
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
