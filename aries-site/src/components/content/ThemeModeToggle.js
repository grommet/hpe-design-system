import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tip } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Toggle to Light Mode' : 'Toggle to Dark Mode';
  const icon = darkMode.value ? <Moon /> : <Sun />;
  return (
    <Tip content={label}>
      <Button
        id="theme-button"
        active={active}
        onClick={() => darkMode.toggle()}
        icon={icon}
        a11yTitle={label}
      />
    </Tip>
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
