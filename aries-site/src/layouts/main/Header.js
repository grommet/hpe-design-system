import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { AppIdentity, Header } from 'aries-core';
import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { getPageDetails, nameToPath } from '../../utils';
import { Search } from '../navigation';

const NavButton = ({ active, item, ...rest }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={nameToPath(item.name)} passHref>
      <Button
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        {...rest}
      >
        <Box
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round="small"
          background={active || hover ? 'active-background' : undefined}
        >
          <Text weight="bold" margin="none">
            {item.name}
          </Text>
        </Box>
      </Button>
    </Link>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

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
          title="Design System"
        />
      </Link>
      {!searchFocused ? (
        <Box direction="row" align="center" gap="xsmall">
          {size !== 'small' &&
            navItems.map(item => (
              <NavButton
                key={item.name}
                item={item}
                active={router.pathname === nameToPath(item.name)}
              />
            ))}
          <Button
            id="search-button"
            icon={<SearchIcon />}
            onClick={() => setSearchFocused(true)}
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
