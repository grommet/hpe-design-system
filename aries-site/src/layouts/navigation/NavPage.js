import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import { iconsMap } from '../../components/icons/iconsMap';

import { navItemsData } from './navItemsData';

const NavItem = ({ item, prefix }) => {
  const itemLowerCase = item.toLowerCase();
  return (
    <Box
      fill
      direction="row"
      margin={{ vertical: 'large' }}
      onClick={() => (window.location.href = `/${prefix}/${itemLowerCase}`)}
      gap="large"
    >
      {iconsMap[itemLowerCase]('xlarge')}
      <Box>
        <Text weight="bold" size="large">
          {item}
        </Text>
        <Paragraph size="small">
          {navItemsData[prefix][itemLowerCase]}
        </Paragraph>
      </Box>
    </Box>
  );
};

export const NavPage = ({ items, prefix, ...rest }) => {
  return (
    <Box {...rest}>
      {items.map(item => (
        <span key={item}>
          <NavItem item={item} prefix={prefix} />
          <Box border="bottom" />
        </span>
      ))}
    </Box>
  );
};

NavPage.propTypes = {
  items: PropTypes.array,
  prefix: PropTypes.string,
};

NavPage.defaultProps = {
  items: [],
};

NavItem.propTypes = {
  item: PropTypes.string,
  prefix: PropTypes.string,
};

NavItem.defaultProps = {
  item: '',
  prefix: 'guidelines',
};
