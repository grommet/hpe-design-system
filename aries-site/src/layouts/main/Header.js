import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { AppIdentity, Header } from 'aries-core';
import { Box, Button, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { NavButton } from '../../components';
import { getPageDetails, nameToPath } from '../../utils';
import { Search } from '../navigation';

const StyledHeader = ({ background, ...rest }) => {
  const pageDetails = getPageDetails('Home');
  const navItems = pageDetails.pages.map(topic => getPageDetails(topic));
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);
  const router = useRouter();

  return (
    <Header background={background} {...rest}>
      <Link href="/" passHref>
        <AppIdentity
          brand="hpe"
          logoOnly={size === 'small' && searchFocused}
          title="Carte Design System"
        />
      </Link>
      {!searchFocused ? (
        <Box direction="row" align="center" gap="xsmall">
          {size !== 'small' &&
            navItems.map(item => (
              <Link key={item.name} href={nameToPath(item.name)} passHref>
                <NavButton
                  key={item.name}
                  item={item.name}
                  active={router.pathname === nameToPath(item.name)}
                />
              </Link>
            ))}
          <Button
            id="search-button"
            icon={<SearchIcon />}
            onClick={() => setSearchFocused(true)}
            hoverIndicator
          />
        </Box>
      ) : (
        <Search
          focused={searchFocused}
          setFocused={value => setSearchFocused(value)}
        />
      )}
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
