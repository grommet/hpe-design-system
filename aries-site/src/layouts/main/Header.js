import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { ThemeModeToggle, AppIdentity } from '../../components';

import { getPageDetails, nameToPath } from '../../utils';
import { Search } from '../navigation';

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
      data-analytics="header"
      {...rest}
    >
      <Link href="/" passHref>
        <AppIdentity brand="hpe" logo={false} title="Design System" />
      </Link>
      <Box direction="row" align="center" gap="xsmall" data-analytics="nav">
        {!['xsmall', 'small'].includes(size) &&
          navItems.map(item => (
            <Link key={item.name} href={nameToPath(item.name)} passHref>
              <Button
                key={item.name}
                label={item.name}
                active={router.pathname === nameToPath(item.name)}
                data-analytics={item.name}
              />
            </Link>
          ))}
        <Button
          id="search-button"
          icon={<SearchIcon />}
          onClick={() => setShowSearch(true)}
          data-analytics="search-button"
        />
        {showSearch && <Search setOpen={setShowSearch} />}
        <ThemeModeToggle />
      </Box>
    </Header>
  );
};

export { StyledHeader as Header };
