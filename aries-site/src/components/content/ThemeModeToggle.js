import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Text } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <Sun size="large" /> : <Moon size="large" />;
  return (
    <Box gap="medium">
      {icon}
      <Box>
        <Heading level={2} margin="none" size="xsmall">
          {label}
        </Heading>
        <Text>Have fun switching up themes!</Text>
      </Box>
      <Button
        label={label}
        active={active}
        onClick={() => darkMode.toggle()}
        secondary
        alignSelf="start"
      />
    </Box>
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
