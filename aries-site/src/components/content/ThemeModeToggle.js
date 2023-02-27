import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const icon = darkMode.value ? <Moon /> : <Sun />;
  return (
    <Button
      id="theme-button"
      active={active}
      onClick={() => darkMode.toggle()}
      icon={icon}
      a11yTitle={label}
      tip={label}
    />
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
