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
      {/* legacyBehavior restores pre-Next.js 13 behavior where Link
          does not render its own <a>, instead passing href/onClick to
          the child via cloneElement and attaches a ref via React's ref 
          forwarding. Required here because AppIdentity already renders 
          an anchor via its <Button href>. This prop has been dropped 
          in Next.js 13.15.11+, so this will need to be  refactored when 
          upgrading. More details:
          https://nextjs.org/docs/13/pages/api-reference/components/link#legacybehavior  */}
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
