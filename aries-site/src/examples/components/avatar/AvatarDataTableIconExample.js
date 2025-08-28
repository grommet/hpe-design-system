import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  DataTable,
  Image,
  Text,
} from 'grommet';
import company from '../../../data/mockData/company.json';

export const AvatarDataTableIconExample = ({ bestPractice = true }) => {
  const [selected, setSelected] = React.useState([]);

  const data = company.company;

  return (
    <Box width="medium" height={{ max: 'xlarge' }} overflow="auto">
      <DataTable
        data={data}
        primaryKey="name"
        aria-describedby="company-logos"
        columns={[
          {
            property: 'name',
            header: 'Name',
            render: datum => (
              <Box justify="start" align="center" gap='xsmall' direction="row">
                {bestPractice ? (
                  <Avatar
                    src={datum.src}
                    // grommet defines align center which we want to overid
                    align="unset"
                    round='xlarge'
                    size="small"
                    background={{ color: datum.background, dark: false }}
                  />
                ) : (
                  <Box align="start">
                    <Image
                      alignSelf="start"
                      alt={datum.name}
                      src={datum.src}
                      fit="contain"
                      style={{ height: '24px' }}
                    />
                  </Box>
                )}
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

AvatarDataTableIconExample.propTypes = {
  bestPractice: PropTypes.bool,
};


