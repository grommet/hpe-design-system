import React, { useContext, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Header,
  ResponsiveContext,
} from 'grommet';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity2 } from '../../components';

import { Search } from '../navigation';

export const AppHeader = ({ navOpen, setNavOpen, setActiveItem, ...rest }) => {
  const [showSearch, setShowSearch] = useState(false);
  const size = useContext(ResponsiveContext);
  const mobile = size === 'xsmall';

  return (
    <Header
      height={{ min: '5xsmall' }}
      pad={{ horizontal: 'medium', vertical: '3xsmall' }}
      {...rest}
    >
      <Link href="/">
        {/* Show new HPE logo in header when nav is collapsed or on mobile */}
        <AppIdentity2
          title="Design System"
          logo={!navOpen || mobile}
          setActiveItem={setActiveItem}
        />
      </Link>
      <Box direction="row" align="center" gap="3xsmall">
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



AppHeader.propTypes = {
  navOpen: PropTypes.bool,
  setNavOpen: PropTypes.func,
  setActiveItem: PropTypes.func,
};