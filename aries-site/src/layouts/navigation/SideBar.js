import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { NavLink } from 'aries-core';

const SideBarItem = ({ item, prefix }) => (
  <NavLink href={`/${prefix}/${item.toLowerCase()}`}>{item}</NavLink>
);

export const SideBar = ({ items, prefix }) => {
  return (
    <Box
      border={{ side: 'left' }}
      gap="medium"
      margin={{ left: 'xlarge' }}
      pad={{ left: 'medium' }}
      width="small"
    >
      {items.map(item => (
        <SideBarItem item={item} key={item} prefix={prefix} />
      ))}
    </Box>
  );
};

SideBar.propTypes = {
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
