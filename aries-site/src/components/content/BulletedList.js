import React from 'react';
import PropTypes from 'prop-types';
import { List, Text } from 'grommet';

import { TEXT_SIZE } from '../../layouts';

export const BulletedList = ({ items, level, size }) => {
  return (
    <List
      data={items}
      border={{ style: 'hidden' }}
      pad={{ vertical: 'xxsmall' }}
    >
      {item => (
        <Text key={item} size={size || TEXT_SIZE[level]}>
          - {item}
        </Text>
      )}
    </List>
  );
};

BulletedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.number,
  size: PropTypes.string,
};

BulletedList.defaultProps = {
  level: 2,
  size: undefined,
};
