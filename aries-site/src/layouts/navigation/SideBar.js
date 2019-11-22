import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorUndecorated } from 'aries-core';

const SideBarItem = ({ item }) => (
  <Box pad={{ vertical: 'small' }}>
    <AnchorUndecorated size="medium">{item}</AnchorUndecorated>
  </Box>
);

export const SideBar = ({ children, items }) => {
  return (
    <Box width="small">
      {items.map(item => (
        <SideBarItem item={item} key={item} />
      ))}
      {children}
    </Box>
  );
};

SideBar.defaultProps = {
  /* eslint-disable-next-line react/default-props-match-prop-types */
  SideBar: true,
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  items: PropTypes.array,
};

SideBar.defaultProps = {
  items: [],
};

SideBarItem.propTypes = {
  item: PropTypes.string,
};

SideBarItem.defaultProps = {
  item: '',
};
