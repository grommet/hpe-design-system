import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { NavLink } from 'aries-core';

const SideBarItem = ({ item, topic }) => (
  <NavLink href={`/${topic}/${item.toLowerCase()}`}>{item}</NavLink>
);

export const SideBar = ({ items, topic }) => {
  return (
    <Box
      border={{ side: 'left' }}
      gap="medium"
      margin={{ left: 'xlarge' }}
      pad={{ left: 'medium' }}
      width="small"
    >
      {items.map(item => (
        <SideBarItem item={item} key={item} topic={topic} />
      ))}
    </Box>
  );
};

SideBar.propTypes = {
  items: PropTypes.array,
  topic: PropTypes.string,
};

SideBar.defaultProps = {
  items: [],
};

SideBarItem.propTypes = {
  item: PropTypes.string,
  topic: PropTypes.string,
};

SideBarItem.defaultProps = {
  item: '',
  topic: 'guidelines',
};
