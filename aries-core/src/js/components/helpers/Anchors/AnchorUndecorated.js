import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';
import NavContext from '../NavContext';

export const AnchorUndecorated = ({ href, index, ...rest }) => {
  const navContext = useContext(NavContext);
  const { activePath, defaultActiveItem, level } = navContext;

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

  let navSubDirectories;
  let navPath;
  if (activePath) {
    // create an array with each navSubdirectory as an item
    navSubDirectories = activePath.split('/');
    navPath = createComparisonPath(navSubDirectories);
  }

  let itemSubDirectories;
  let itemPath;
  if (href) {
    itemSubDirectories = href.split('/');
    itemPath = createComparisonPath(itemSubDirectories);
  }

  const active =
    navSubDirectories &&
    ((!navSubDirectories[level] &&
      (defaultActiveItem === itemPath || defaultActiveItem === index)) ||
      navPath === itemPath);

  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          textDecoration: active ? 'underline' : 'none',
        },
      }}
    >
      <Anchor href={href} {...rest} />
    </ThemeContext.Extend>
  );
};

AnchorUndecorated.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  index: PropTypes.number,
};

AnchorUndecorated.defaultProps = {
  active: false,
  href: undefined,
  index: undefined,
};
