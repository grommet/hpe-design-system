import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { IconMoon, IconSun } from '../icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const [hover, setHover] = useState(false);
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <IconSun /> : <IconMoon />;
  return (
    <Box width={{ max: 'small' }}>
      <Button
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        color="background-back"
        alignSelf='start'
        primary
        onClick={() => darkMode.toggle()}
      >
        <Box
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round="xxsmall"
          background={active || hover ? 'active-background' : undefined}
          direction="row"
          gap="xsmall"
        >
          {icon}
          <Text weight="bold" margin="none">
            {label}
          </Text>
        </Box>
      </Button>
    </Box>
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
