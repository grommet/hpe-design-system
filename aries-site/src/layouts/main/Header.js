import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'aries-core';
import { ResponsiveContext } from 'grommet';
import { Search } from '../navigation';

export const Header = ({ background }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);
  return (
    <Nav
      background={background}
      title="Design System"
      collapse={false}
      brandOnly={size === 'small' && searchFocused}
    >
      <Search
        focused={searchFocused}
        setFocused={value => setSearchFocused(value)}
      />
    </Nav>
  );
};

Header.propTypes = {
  background: PropTypes.string,
};

Header.defaultProp = {
  background: undefined,
};
