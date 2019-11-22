import React from 'react';
import PropTypes from 'prop-types';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ items }) => {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <AnchorUndecorated
            tabIndex={0}
            key={index}
            icon={item.icon}
            label={item.label}
            margin="small"
            {...item}
          />
        ))}
    </>
  );
};

AnchorGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
