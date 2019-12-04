import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Nav } from 'aries-core';

const sideBarItems = (items, prefix) => {
  const itemArray = [];
  items.forEach(item => {
    const formattedItem = {
      label: item,
      href: `/${prefix}/${item.toLowerCase()}`,
    };
    itemArray.push(formattedItem);
  });
  return itemArray;
};

export const SideBar = ({ children, activePath, items, prefix }) => {
  return (
    <Box width="small" margin={{ right: 'medium' }}>
      <Nav
        level={2}
        activePath={activePath}
        defaultActiveItem={0}
        direction="vertical"
        items={sideBarItems(items, prefix)}
      />
      {children}
    </Box>
  );
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  activePath: PropTypes.string,
  items: PropTypes.array,
  prefix: PropTypes.string,
};

SideBar.defaultProps = {
  items: [],
};
