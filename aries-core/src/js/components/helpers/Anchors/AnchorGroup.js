import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ currentPath, direction, items, level }) => {
  const size = useContext(ResponsiveContext);
  let navSubDirectories;
  let navPath;

  const createComparisonPath = pathDirectoriesArray => {
    // This function allows the nav to track which portion
    // of the app pathname to use when making a decision about
    // which nav item is active. If an app is at '/start/about',
    // when marking which item from the primary nav is active, we only
    // care about the '/start' portion of the whole pathname, but for
    // the secondary nav we care about '/start/about'
    const path = pathDirectoriesArray.slice(0, level + 1).join('/');
    return path;
  };

  if (currentPath) {
    // create an array with each navSubdirectory as an item
    navSubDirectories = currentPath.split('/');
    navPath = createComparisonPath(navSubDirectories);
  }

  return (
    <>
      {items &&
        items.map((item, index) => {
          const itemSubDirectories = item.href.split('/');
          const itemPath = createComparisonPath(itemSubDirectories);
          return (
            <AnchorUndecorated
              tabIndex={0}
              key={index}
              icon={item.icon}
              label={item.label}
              // On desktop, allow final nav item to be completely
              // right justified
              margin={{
                vertical: 'small',
                left:
                  direction !== 'vertical' && size !== 'small'
                    ? 'small'
                    : undefined,
                right:
                  direction !== 'vertical' &&
                  index !== items.length - 1 &&
                  size !== 'small'
                    ? 'small'
                    : undefined,
              }}
              active={
                navSubDirectories &&
                ((!navSubDirectories[level] && index === 0) ||
                  navPath === itemPath)
              }
              {...item}
            />
          );
        })}
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
