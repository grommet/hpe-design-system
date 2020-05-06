import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'grommet';
import { SubsectionText } from '..';
import { TEXT_SIZE } from '../../layouts';

export const BulletedList = ({ items, level, size }) => {
  return (
    <List
      data={items}
      border={{ style: 'hidden' }}
      pad={{ vertical: 'xxsmall' }}
    >
      {item => (
        <SubsectionText key={item} size={size || TEXT_SIZE[level]}>
          - {item}
        </SubsectionText>
      )}
    </List>
  );
};

BulletedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  level: PropTypes.number,
  size: PropTypes.string,
};

BulletedList.defaultProps = {
  level: 2,
  size: undefined,
};
