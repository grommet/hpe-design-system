import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { NavLink } from './NavLink';

export const AnchorGroup = ({ items }) => {
  const size = useContext(ResponsiveContext);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <NavLink
            tabIndex={0}
            key={index}
            icon={item.icon}
            // label={item.label}
            // On desktop, allow final nav item to be completely right justified
            margin={
              index === items.length - 1 && size !== 'small'
                ? {
                    vertical: 'small',
                    left: 'small',
                  }
                : 'small'
            }
            {...item}
          />
        ))}
    </>
  );
};

AnchorGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
