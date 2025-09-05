import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Pagination, ResponsiveContext, Text } from 'grommet';
import { Card } from '../../templates/Card/Card';

const MOCK_DATA = require('../../../data/mockData/applications.json');

const CardResult = ({ item }) => (
  <Card title={item.title} subtitle={item.publisher} level={3} fill />
);

CardResult.propTypes = {
  item: PropTypes.shape({
    publisher: PropTypes.string,
    title: PropTypes.string,
  }),
};

export const PaginationCardsExample = () => {
  const size = useContext(ResponsiveContext);
  const data = MOCK_DATA;
  const [currentData, setCurrentData] = useState(data.slice(0, 10));
  const [indices, setIndices] = useState([0, 10]);

  const handleChange = ({ startIndex, endIndex }) => {
    const nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return (
    <Box gap="medium" overflow="auto" pad='3xsmall'>
      <Box flex={false} pad='3xsmall'>
        <Grid columns="medium" gap="medium">
          {currentData.map(datum => (
            <CardResult item={datum} key={datum.entry} />
          ))}
        </Grid>
      </Box>
      <Box
        align="center"
        border="top"
        pad={{ vertical: '3xsmall' }}
        direction={
          !['xsmall', 'small'].includes(size) ? 'row' : 'column-reverse'
        }
        justify="between"
        flex={false}
      >
        <Text>
          Showing {indices[0] + 1} - {indices[1]} of {data.length}
        </Text>
        <Pagination numberItems={data.length} onChange={handleChange} />
      </Box>
    </Box>
  );
};
