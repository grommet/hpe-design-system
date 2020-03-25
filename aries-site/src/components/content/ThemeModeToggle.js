import React from 'react';
import { Box } from 'grommet';
import { IconMoon, IconSun } from '../icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = () => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <IconSun /> : <IconMoon />;
  return (
    <Box
      align="start"
      background={{ dark: 'blue!', light: 'white' }}
      direction="row"
      gap="xsmall"
      justify="center"
      overflow="hidden"
      pad={{ vertical: 'small' }}
      responsive={false}
      round="small"
      margin={{ right: 'medium' }}
      width="small"
      onClick={() => darkMode.toggle()}
    >
      {icon}
      {label}
    </Box>
  );
};
