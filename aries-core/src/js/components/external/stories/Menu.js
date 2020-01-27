import React from 'react';
import { Box, Grommet, Menu } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Menu',
};

export const Simple = () => {
  const items = [
    { label: 'Past 12 months' },
    { label: 'Past 6 months' },
    { label: 'Past 3 months' },
    { label: 'Past 30 days' },
    { label: 'Past 7 days' },
  ];

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Box round="xsmall">
          <Menu label="Choose a timeframe" items={items} width="medium" />
        </Box>
      </Box>
    </Grommet>
  );
};
