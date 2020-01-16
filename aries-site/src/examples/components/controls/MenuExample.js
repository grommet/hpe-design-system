import React from 'react';
import { Box } from 'grommet';
import { Menu } from 'aries-core';
import { aries } from '../../../themes/aries';

export const MenuExample = () => {
  const items = [
    { label: 'Past 12 months' },
    { label: 'Past 6 months' },
    { label: 'Past 3 months' },
    { label: 'Past 30 days' },
    { label: 'Past 7 days' },
  ];

  // Once themeMode toggle has been added I will make the background box toggle
  // to the dark. There is a background placed behind the menu because otherwise
  // the menu button blends in completely with the site background making it
  // difficult to distinguish as an interactive component.
  const background = aries.global.colors.background.light;
  return (
    <Box background={background} round="xsmall">
      <Menu label="Choose a timeframe" items={items} width="medium" />
    </Box>
  );
};
