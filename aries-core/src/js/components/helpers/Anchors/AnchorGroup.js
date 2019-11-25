import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ activeHref, items, level }) => {
  const size = useContext(ResponsiveContext);
  let navSubDirectories;
  if (activeHref) {
    // create an array with each navSubdirectory as an item
    navSubDirectories = activeHref.split('/');
  }

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
              navSubDirectories &&
              navSubDirectories[level] ===
                // formats labels to be in slug format of 'this-is-my-url'
                item.label
                  .split(' ')
                  .join('-')
                  .toLowerCase()
            }
            {...item}
          />
        ))}
    </>
  );
};

AnchorGroup.propTypes = {
  activeHref: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  level: PropTypes.number,
};

AnchorGroup.defaultProps = {
  activeHref: undefined,
  level: 1,
};
