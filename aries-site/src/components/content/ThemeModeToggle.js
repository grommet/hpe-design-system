import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ResponsiveContext, Tip } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useDarkMode } from '../../utils';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <Sun /> : <Moon />;
  const size = useContext(ResponsiveContext);

  return (
    <>
      {size !== 'small' && (
        <Button
          active={active}
          onClick={() => darkMode.toggle()}
          icon={icon}
          label={label}
        />
      )}
      {size === 'small' && (
        <Tip content={label}>
          <Button
            active={active}
            onClick={() => darkMode.toggle()}
            icon={icon}
          />
        </Tip>
      )}
    </>
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
