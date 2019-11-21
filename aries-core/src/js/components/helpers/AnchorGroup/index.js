import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';

export const AnchorGroup = ({ items }) => {
  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          textDecoration: 'none',
        },
      }}
    >
      {items &&
        items.map((item, index) => (
          <Anchor
            tabIndex={0}
            key={index}
            icon={item.icon}
            label={item.label}
            margin="small"
            {...item}
          />
        ))}
    </ThemeContext.Extend>
  );
};

AnchorGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
