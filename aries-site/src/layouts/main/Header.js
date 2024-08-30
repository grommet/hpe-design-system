import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { Search as SearchIcon, Sidebar, Menu } from 'grommet-icons';
import { ThemeModeToggle, AppIdentity } from '../../components';

import { Search } from '../navigation';

const StyledHeader = ({ showSidebar, setShowSidebar, ...rest }) => {
  const size = useContext(ResponsiveContext);
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
        {!showSidebar ? (
          <Button
            a11yTitle="Show navigation panel"
            icon={['large', 'xlarge'].includes(size) ? <Sidebar /> : <Menu />}
            onClick={() => setShowSidebar(true)}
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
        {/* {!['xsmall', 'small'].includes(size) &&
          navItems.map(item => (
            <Link
              key={item.name}
              href={nameToPath(item.name)}
              passHref
              legacyBehavior
            >
              <Button
                key={item.name}
                label={item.name}
                active={router.pathname === nameToPath(item.name)}
              />
            </Link>
          ))} */}
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
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};
export { StyledHeader as Header };
