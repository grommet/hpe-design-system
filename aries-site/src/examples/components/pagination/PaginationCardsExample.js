import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Card, Grid, Pagination, ResponsiveContext, Text } from 'grommet';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

function CardResult({ item }) {
  return <Card fill pad="medium">
    {item.entry}
  </Card>;
}

CardResult.propTypes = {
  item: PropTypes.shape({
    entry: PropTypes.string,
  }),
};

export function PaginationCardsExample() {
  const size = useContext(ResponsiveContext);
  const [currentData, setCurrentData] = useState(data.slice(0, 10));
  const [indices, setIndices] = useState([0, 10]);

  const handleChange = ({ startIndex, endIndex }) => {
    const nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return (
    <Box gap="medium" overflow="auto" pad="xsmall">
      <Box flex={false} pad="xsmall">
        <Grid
          columns="small"
          rows="small"
          gap="medium"
          justify="center"
          width="medium"
        >
          {currentData.map(datum => (
            <CardResult item={datum} key={datum.entry} />
          ))}
        </Grid>
      </Box>
      <Box
        align="center"
        border="top"
        pad={{ vertical: 'xsmall' }}
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
}
