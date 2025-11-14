import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';

import { getPageDetails, nameToPath } from '../../utils';
import { Search } from '../navigation';

// Accept a background prop to allow transparent header on homepage
const StyledHeader = ({ ...rest }) => {
  const pageDetails = getPageDetails('Home');
  const navItems = pageDetails.pages.map(topic => getPageDetails(topic));
  const [showSearch, setShowSearch] = useState(false);
  const size = useContext(ResponsiveContext);
  const router = useRouter();

  return (
    <Header
      pad={{
        vertical: 'medium',
      }}
      {...rest}
    >
      <Link href="/" passHref legacyBehavior>
        <AppIdentity brand="hpe" logo={false} title="Design System" />
      </Link>
      <Box direction="row" align="center" gap="3xsmall">
        {!['xsmall', 'small'].includes(size) &&
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
          ))}
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
  background: PropTypes.string,
};
export { StyledHeader as Header };
