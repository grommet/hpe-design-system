import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { NavLink } from 'aries-core';

const SideBarItem = ({ item, prefix }) => (
  <Box pad={{ vertical: 'small' }}>
    <NavLink href={`/${prefix}/${item.toLowerCase()}`}>{item}</NavLink>
  </Box>
);

export const SideBar = ({ children, items, prefix }) => {
  return (
    <Box width="small" margin={{ right: 'medium' }}>
      {items.map(item => (
        <SideBarItem item={item} key={item} prefix={prefix} />
      ))}
      {children}
    </Box>
  );
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  items: PropTypes.array,
  prefix: PropTypes.string,
};

SideBar.defaultProps = {
  items: [],
};

SideBarItem.propTypes = {
  item: PropTypes.string,
  prefix: PropTypes.string,
};

SideBarItem.defaultProps = {
  item: '',
  prefix: 'guidelines',
};
