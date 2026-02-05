import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ThemeContext } from 'grommet';

// Mock MenuItem component that replicates Menu item
// visual presentation without using the actual Menu component
const MenuItem = ({ label, icon, reverse, ...rest }) => {
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

MenuItem.propTypes = {
  label: PropTypes.node,
  icon: PropTypes.node,
  reverse: PropTypes.bool,
};

// MenuMock component that replicates Menu visual presentation
// without using the actual Menu component

export const MenuMock = ({ label, items, iconDown }) => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};
  const dropTheme = theme?.global.drop || {};

  // Check if items is grouped (array of arrays) or flat (array of objects)
  const isGrouped = items?.length > 0 && Array.isArray(items[0]);

  return (
    <Box align="start">
      <Button
        label={label}
        icon={iconDown || menuTheme.icons?.down.render()}
        reverse
        tabIndex={-1}
      />
      <Box
        {...dropTheme}
        border={undefined}
        elevation={dropTheme.shadowSize}
        round={dropTheme.border.radius}
      >
        {isGrouped ? (
          // Render grouped items with dividers between groups
          items.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {groupIndex > 0 && (
                <Box
                  {...menuTheme.group.separator}
                  border={{ ...menuTheme.group.separator, side: 'top' }}
                />
              )}
              <Box {...menuTheme.container} {...menuTheme.group.container}>
                {group.map((item, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    label={item.label}
                    icon={item.icon}
                    reverse={item.reverse}
                    onClick={item.onClick}
                  />
                ))}
              </Box>
            </React.Fragment>
          ))
        ) : (
          // Render flat items without dividers
          <Box {...menuTheme.container}>
            {items.map((item, itemIndex) => (
              <MenuItem
                key={itemIndex}
                label={item.label}
                icon={item.icon}
                reverse={item.reverse}
                onClick={item.onClick}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

MenuMock.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  iconDown: PropTypes.node,
};
