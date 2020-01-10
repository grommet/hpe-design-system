import React from 'react';
import { Box } from 'grommet';
import { Menu } from 'aries-core';

export const MenuExample = () => {
  const items = [
    { label: 'Past 12 months' },
    { label: 'Past 6 months' },
    { label: 'Past 3 months' },
    { label: 'Past 30 days' },
    { label: 'Past 7 days' },
  ];
  return (
    <Box background="light-2" round="xsmall">
      <Menu label="Choose a timeframe" items={items} width="medium" />
    </Box>
  );
};
