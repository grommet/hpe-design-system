import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';
import NavContext from '../NavContext';

export const NavLink = ({ children, href, index, label, size, ...rest }) => {
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

  const activeTextColor = active ? 'text' : null;
  const defaultTextColor = 'text-weak';
  const fontWeight = 400;
  const [textColor, setTextColor] = useState(defaultTextColor);

  return (
    <Anchor
      color={activeTextColor || textColor}
      href={href}
      label={<Text weight={fontWeight}>{label || children}</Text>}
      onBlur={() => setTextColor(defaultTextColor)}
      onFocus={() => setTextColor(activeTextColor)}
      onMouseOut={() => setTextColor(defaultTextColor)}
      onMouseOver={() => setTextColor(activeTextColor)}
      size={size}
      {...rest}
    />
  );
};

NavLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  href: PropTypes.string,
  index: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.string,
};

NavLink.defaultProps = {
  size: 'medium',
  href: undefined,
  index: undefined,
};
