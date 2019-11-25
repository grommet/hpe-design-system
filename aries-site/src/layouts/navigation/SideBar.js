import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorUndecorated } from 'aries-core';

const SideBarItem = ({ activeItem, item, prefix }) => (
  <Box pad={{ vertical: 'small' }}>
    <AnchorUndecorated
      size="medium"
      active={activeItem === `/${prefix}/${item.toLowerCase()}`}
      href={`/${prefix}/${item.toLowerCase()}`}
    >
      {item}
    </AnchorUndecorated>
  </Box>
);

export const SideBar = ({ children, activeItem, items, prefix }) => {
  return (
    <Box width="small">
      {items.map(item => (
        <SideBarItem
          activeItem={activeItem}
          item={item}
          key={item}
          prefix={prefix}
        />
      ))}
      {children}
    </Box>
  );
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  activeItem: PropTypes.string,
  items: PropTypes.array,
  prefix: PropTypes.string,
};

SideBar.defaultProps = {
  items: [],
};

SideBarItem.propTypes = {
  activeItem: PropTypes.string,
  item: PropTypes.string,
  prefix: PropTypes.string,
};

SideBarItem.defaultProps = {
  activeItem: '',
  item: '',
  prefix: 'start',
};
