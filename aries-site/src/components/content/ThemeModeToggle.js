import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { Moon as IconMoon, Sun as IconSun } from 'grommet-icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <IconSun /> : <IconMoon />;
  return (
    <Button
      active={active}
      onClick={() => darkMode.toggle()}
      icon={icon}
      label={label}
    />
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
