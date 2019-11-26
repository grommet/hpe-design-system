import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ currentPath, direction, items, level }) => {
  const size = useContext(ResponsiveContext);
  let navSubDirectories;
  if (currentPath) {
    // create an array with each navSubdirectory as an item
    navSubDirectories = currentPath.split('/');
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
              // eslint-disable-next-line no-nested-ternary
              index === items.length - 1 && size !== 'small'
                ? {
                    vertical: 'small',
                    left: direction !== 'vertical' && 'small',
                  }
                : direction !== 'vertical'
                ? 'small'
                : {
                    vertical: 'small',
                  }
            }
            active={
              navSubDirectories &&
              ((!navSubDirectories[level] && index === 0) ||
                navSubDirectories[level] ===
                  // formats labels to be in slug format of 'this-is-my-url'
                  item.label
                    .split(' ')
                    .join('-')
                    .toLowerCase())
            }
            {...item}
          />
        ))}
    </>
  );
};

AnchorGroup.propTypes = {
  currentPath: PropTypes.string,
  direction: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  level: PropTypes.number,
};

AnchorGroup.defaultProps = {
  currentPath: undefined,
  direction: 'horizontal',
  level: 1,
};
