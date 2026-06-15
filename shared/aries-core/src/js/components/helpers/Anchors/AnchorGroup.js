import React from 'react';
import PropTypes from 'prop-types';
import { useIsTabletAndUp } from '@shared/hooks';
import { NavLink } from './NavLink';

export const AnchorGroup = ({ items }) => {
  const isTabletAndUp = useIsTabletAndUp();

  return items
    ? items.map((item, index) => (
        <NavLink
          tabIndex={0}
          key={index}
          icon={item.icon}
          // label={item.label}
          // On desktop, allow final nav item to be completely right justified
          margin={
            index === items.length - 1 && isTabletAndUp
              ? {
                  vertical: 'xsmall',
                  left: 'xsmall',
                }
              : 'xsmall'
          }
          {...item}
        />
      ))
    : null;
};

AnchorGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
