import React from 'react';
<<<<<<< Updated upstream
import PropTypes from 'prop-types';

import { AnchorGroup, Nav } from 'aries-core';

export const Header = ({ showLinks }) => (
  <Nav title="Design System">
    {showLinks && (
      <AnchorGroup
        items={[
          { label: 'Guidelines', href: '/guidelines/about' },
          { label: 'Foundation', href: '/foundation/primer' },
          { label: 'Design', href: '/design/primer' },
          { label: 'Develop', href: '/develop/code' },
          { label: 'Resources', href: '/resources/examples' },
        ]}
      />
    )}
  </Nav>
);

Header.propTypes = {
  showLinks: PropTypes.bool,
};

Header.defaultProps = {
  showLinks: true,
=======
import { Nav } from 'aries-core';
import { Search } from '../navigation';

export const Header = () => {
  return (
    <Nav title="Design System" noCollapse>
      <Search />
    </Nav>
  );
>>>>>>> Stashed changes
};
