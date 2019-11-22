import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

export const BulletedList = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <Text margin={{ bottom: 'xsmall' }} key={item}>
          — {item}
        </Text>
      ))}
    </>
  );
};

BulletedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};
