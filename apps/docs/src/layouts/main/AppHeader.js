import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Header,
} from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';
import { Search } from '../navigation';

export const AppHeader = ({ ...rest }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Header
      height={{ min: '5xsmall' }}
      pad={{
        horizontal: 'medium',
        vertical: '3xsmall',
      }}
      {...rest}
    >
      <Link href="/" passHref legacyBehavior>
        <AppIdentity
          brand="hpe"
          logo={false}
          title="Design System"
        />
      </Link>
      <Box direction="row" align="center" gap="3xsmall">
        <Button
          a11yTitle="Search"
          id="search-button"
          icon={<SearchIcon />}
          onClick={() => setShowSearch(true)}
        />
        {showSearch && (
          <Search setOpen={setShowSearch} />
        )}
        <ThemeModeToggle />
      </Box>
    </Header>
  );
};
