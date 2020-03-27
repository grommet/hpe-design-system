import React from 'react';
import { Box, Button } from 'grommet';
import { IconMoon, IconSun } from '../icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = () => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <IconSun /> : <IconMoon />;
  return (
    <Box width={{ max: 'small' }}>
      <Button
        color={{ dark: 'blue!', light: 'white' }}
        label={label}
        icon={icon}
        primary
        onClick={() => darkMode.toggle()}
      />
    </Box>
  );
};
