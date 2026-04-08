import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Header,
  Page,
  PageContent,
} from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';
import { Search } from '../navigation';

const StyledHeader = ({ ...rest }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Page {...rest}>
      <PageContent>
        <Header
          pad={{
            vertical: 'medium',
          }}
        >
          <Link href="/" passHref legacyBehavior>
            <AppIdentity brand="hpe" logo={false} title="Design System" />
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
      </PageContent>
    </Page>
  );
};

export { StyledHeader as AppHeader };
