import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Button, Header } from 'grommet';
import { Search as SearchIcon, Sidebar, Menu } from 'grommet-icons';
import { ThemeModeToggle, AppIdentity } from '../../components';

import { Search } from '../navigation';

const StyledHeader = ({
  sidebarLayout,
  onToggleNav,
  showNavControl,
  ...rest
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Header
      pad={{
        vertical: 'small',
        horizontal: 'medium',
      }}
      {...rest}
    >
      <Box direction="row" align="center" gap="medium">
        {showNavControl ? (
          <Button
            a11yTitle="Show navigation panel"
            icon={sidebarLayout ? <Sidebar /> : <Menu />}
            onClick={() => onToggleNav(true)}
          />
        ) : undefined}
        <Link href="/" passHref legacyBehavior>
          <AppIdentity
            brand="hpe"
            title="Design System"
            boxProps={{ pad: 'none' }}
          />
        </Link>
      </Box>
      <Box direction="row" align="center" gap="xsmall">
        <Button
          a11yTitle="Search"
          id="search-button"
          icon={<SearchIcon />}
          onClick={() => setShowSearch(true)}
        />
        {showSearch && <Search setOpen={setShowSearch} />}
        <ThemeModeToggle />
      </Box>
    </Header>
  );
};

StyledHeader.propTypes = {
  sidebarLayout: PropTypes.bool,
  onToggleNav: PropTypes.func,
  showNavControl: PropTypes.bool,
};
export { StyledHeader as Header };
