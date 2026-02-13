/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Box, Button, ThemeContext } from 'grommet';

/**
 * Shared Menu components that replicates Menu item visual presentation
 */
export const MockMenuItem = ({ label, icon, reverse, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Button
      kind="option"
      align="start"
      tabIndex={-1}
      label={label}
      icon={icon}
      reverse={reverse}
      {...theme.menu.item}
      {...rest}
    />
  );
};

export const MockMenuContainer = ({ children, ...rest }) => {
  const theme = useContext(ThemeContext);
  const dropTheme = theme?.global.drop || {};

  return (
    <Box
      {...dropTheme}
      border={undefined}
      elevation={dropTheme.shadowSize}
      round={dropTheme.border.radius}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const MockMenuGroup = ({
  children,
  showDivider = false,
  dividerProps = {},
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};

  return (
    <>
      {showDivider && (
        <Box
          {...menuTheme.group.separator}
          border={{ ...menuTheme.group.separator, side: 'top' }}
          {...dividerProps}
        />
      )}
      <Box {...menuTheme.container} {...menuTheme.group?.container} {...rest}>
        {children}
      </Box>
    </>
  );
};

export const MockMenuButton = ({ label, iconDown, ...rest }) => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};

  return (
    <Button
      label={label}
      icon={iconDown || menuTheme.icons?.down.render()}
      reverse
      tabIndex={-1}
      {...rest}
    />
  );
};
