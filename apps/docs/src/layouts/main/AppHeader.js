import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Header,
  Page,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';
import { structureIndexes } from '../../data';

import { nameToPath } from '../../utils';
import { Search } from '../navigation';

const StyledHeader = ({ ...rest }) => {
  const homePage = structureIndexes.byName.Home || {};
  const navItems = (homePage.pages || [])
    .map(topic => structureIndexes.byName[topic])
    .filter(Boolean);
  const [showSearch, setShowSearch] = useState(false);
  const size = useContext(ResponsiveContext);
  const router = useRouter();

  return (
    <Page>
      <PageContent>
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
              navItems.map(item => {
                const itemPath = nameToPath(item.name);

                return (
                  <Link key={item.name} href={itemPath} passHref legacyBehavior>
                    <Button
                      key={item.name}
                      label={item.name}
                      active={router.pathname === itemPath}
                    />
                  </Link>
                );
              })}
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
      </PageContent>
    </Page>
  );
};

export { StyledHeader as AppHeader };
