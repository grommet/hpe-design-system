import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph, ResponsiveContext } from 'grommet';
import { iconsMap } from '../../components/icons/iconsMap';
import { structure } from '../../data';

const NavItem = ({ item, topic }) => {
  const size = useContext(ResponsiveContext);
  const [itemData] = structure.filter(page => page.name === item);
  const formattedItem = itemData.name
    .split(' ')
    .join('-')
    .toLowerCase();

  return (
    <Box
      fill
      direction="row"
      margin={{ vertical: 'large' }}
      onClick={() => (window.location.href = `/${topic}/${formattedItem}`)}
      gap={size !== 'small' ? 'large' : 'medium'}
    >
      {/* Adds placeholder icon for the meantime
       * while we wait to get all the icons */}
      {itemData.icon ? itemData.icon('xlarge') : iconsMap.branding('xlarge')}
      <Box>
        <Text weight="bold" size={size !== 'small' ? 'large' : 'medium'}>
          {itemData.name}
        </Text>
        <Paragraph size="small">{itemData.description}</Paragraph>
      </Box>
    </Box>
  );
};

export const NavPage = ({ items, topic, ...rest }) => {
  return (
    <Box {...rest}>
      {items.map(item => (
        <span key={item}>
          <NavItem item={item} topic={topic} />
          <Box border="bottom" />
        </span>
      ))}
    </Box>
  );
};

NavPage.propTypes = {
  items: PropTypes.array,
  topic: PropTypes.string,
};

NavPage.defaultProps = {
  items: [],
};

NavItem.propTypes = {
  item: PropTypes.string,
  topic: PropTypes.string,
};

NavItem.defaultProps = {
  item: '',
  topic: 'guidelines',
};
