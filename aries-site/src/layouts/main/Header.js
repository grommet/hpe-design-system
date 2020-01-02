import React, { useContext, useState } from 'react';
import { Nav } from 'aries-core';
import { ResponsiveContext } from 'grommet';
import { Search } from '../navigation';

export const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);
  return (
    <Nav
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
