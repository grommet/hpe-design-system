import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorUndecorated } from 'aries-core';

const SideBarItem = ({ item, prefix }) => (
  <Box pad={{ vertical: 'small' }}>
    <AnchorUndecorated size="medium" href={`/${prefix}/${item.toLowerCase()}`}>
      {item}
    </AnchorUndecorated>
  </Box>
);

export const SideBar = ({ children, items, prefix }) => {
  return (
    <Box width="small">
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
  prefix: 'start',
};
