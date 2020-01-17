import React from 'react';
import { Box, Button } from 'grommet';
import { IconMoon, IconSun } from '../icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = () => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <IconSun /> : <IconMoon />;
  return (
    <Box align="start">
      <Button onClick={() => darkMode.toggle()}>
        <Box
          background="blue!"
          direction="row"
          gap="small"
          round="xlarge"
          overflow="hidden"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          responsive={false}
        >
          {icon}
          {label}
        </Box>
      </Button>
    </Box>
  );
};
