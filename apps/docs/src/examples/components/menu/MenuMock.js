/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Box, Button, ThemeContext } from 'grommet';

/**
 * Shared MenuMock components that can be composed
 * to replicate Menu component visual presentation
 */
export const MenuMockItem = ({ label, icon, reverse, ...rest }) => {
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

export const MenuMockContainer = ({ children, ...rest }) => {
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

export const MenuMockGroup = ({
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

export const MenuMockButton = ({ label, icon, ...rest }) => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};

  return (
    <Button
      label={label}
      icon={icon || menuTheme.icons?.down.render()}
      reverse
      margin={{ right: 'small' }}
      tabIndex={-1}
      {...rest}
    />
  );
};

// MenuMock component that replicates
// Menu component visual presentation

export const MenuMock = ({ label, items, icon, kind }) => {
  // Check if items is grouped (array of arrays) or flat (array of objects)
  const isGrouped = items?.length > 0 && Array.isArray(items[0]);

  return (
    <Box align="start">
      <MenuMockButton label={label} icon={icon} kind={kind} />
      <MenuMockContainer>
        {isGrouped ? (
          // Render grouped items with dividers between groups
          items.map((group, groupIndex) => (
            <MenuMockGroup key={groupIndex} showDivider={groupIndex > 0}>
              {group.map((item, itemIndex) => (
                <MenuMockItem
                  key={itemIndex}
                  label={item.label}
                  icon={item.icon}
                  reverse={item.reverse}
                  onClick={item.onClick}
                />
              ))}
            </MenuMockGroup>
          ))
        ) : (
          // Render flat items without dividers
          <MenuMockGroup>
            {items.map((item, itemIndex) => (
              <MenuMockItem
                key={itemIndex}
                label={item.label}
                icon={item.icon}
                reverse={item.reverse}
                onClick={item.onClick}
              />
            ))}
          </MenuMockGroup>
        )}
      </MenuMockContainer>
    </Box>
  );
};
