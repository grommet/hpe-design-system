import { useState } from 'react';
import {
  Box,
  Button,
  Header,
  Page,
  PageContent,
} from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, BrandIdentity } from '../../components';
import { Search } from '../navigation';
import { useNavState } from '../navigation/NavContext';

const StyledHeader = ({ ...rest }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { navOpen } = useNavState();

  return (
    <Page {...rest}>
      <PageContent>
        <Header
          pad={{
            vertical: 'medium',
          }}
        >
          {/* Show new HPE logo in header when nav is collapsed */}
          <BrandIdentity
            title="Design System"
            logo={!navOpen}
          />
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
