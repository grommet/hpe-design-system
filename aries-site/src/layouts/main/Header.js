import React, { useContext, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { AppIdentity, Header } from 'aries-core';
import { ResponsiveContext } from 'grommet';
import { Search } from '../navigation';

const StyledHeader = ({ background, ...rest }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <Header background={background} {...rest}>
      <Link href="/" passHref>
        <AppIdentity
          brand="hpe"
          logoOnly={size === 'small' && searchFocused}
          title="Design System"
        />
      </Link>
      <Search
        focused={searchFocused}
        setFocused={value => setSearchFocused(value)}
      />
    </Header>
  );
};

export { StyledHeader as Header };

StyledHeader.propTypes = {
  background: PropTypes.string,
};

StyledHeader.defaultProp = {
  background: undefined,
};
