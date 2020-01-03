import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph, ResponsiveContext } from 'grommet';
import { iconsMap } from '../../components/icons/iconsMap';

import { navItemsData } from './navItemsData';

const NavItem = ({ item, prefix }) => {
  const size = useContext(ResponsiveContext);
  const itemLowerCase = item.toLowerCase();
  return (
    <Box
      fill
      direction="row"
      margin={{ vertical: 'large' }}
      onClick={() => (window.location.href = `/${prefix}/${itemLowerCase}`)}
      gap={size !== 'small' ? 'large' : 'medium'}
    >
      {/* Adds placeholder icon for the meantime while we wait to get all the icons */}
      {iconsMap[itemLowerCase]
        ? iconsMap[itemLowerCase]('xlarge')
        : iconsMap.branding('xlarge')}
      <Box>
        <Text weight="bold" size={size !== 'small' ? 'large' : 'medium'}>
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
