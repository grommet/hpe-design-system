import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'grommet';
import { More } from '@hpe-design/icons-grommet';

export const ActionMenu = ({ items }) => (
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    items={items}
    icon={<More />}
  />
);

ActionMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};
