import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ activeHref, items }) => {
  const size = useContext(ResponsiveContext);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <AnchorUndecorated
            tabIndex={0}
            key={index}
            icon={item.icon}
            label={item.label}
            // On desktop, allow final nav item to be completely right justified
            margin={
              index === items.length - 1 && size !== 'small'
                ? {
                    vertical: 'small',
                    left: 'small',
                  }
                : 'small'
            }
            active={
              activeHref === item.href ||
              // Assume the intended path matches the nav item label by default
              activeHref === `/${item.label.toLowerCase()}`
            }
            href={item.href || `/${item.label.toLowerCase()}`}
            {...item}
          />
        ))}
    </>
  );
};

AnchorGroup.propTypes = {
  activeHref: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  href: PropTypes.string,
};

AnchorGroup.defaultProps = {
  activeHref: undefined,
  href: undefined,
};
