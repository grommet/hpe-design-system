import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Header,
  Page,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import Link from 'next/link';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';
import { Search } from '../navigation';
import { useNavState } from '../navigation/NavContext';

const StyledHeader = ({ ...rest }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { navOpen } = useNavState();
  const breakpoint = useContext(ResponsiveContext);
  const mobile = breakpoint === 'xsmall';
  // On mobile, always show the logo since the side nav isn't visible
  const showLogo = mobile || !navOpen;

  return (
    <Page {...rest}>
      <PageContent>
        <Header
          pad={{
            vertical: 'medium',
          }}
        >
          {/* Show HPE logo + title in header when nav is collapsed */}
          {/* legacyBehavior restores pre-Next.js 13 behavior where Link
              does not render its own <a>, instead passing href/onClick to
              the child via cloneElement and attaches a ref via React's ref 
              forwarding. Required here because AppIdentity already renders 
              an anchor via its <Button href>. This prop has been dropped 
              in Next.js 13.15.11+, so this will need to be  refactored when 
              upgrading. More details:
              https://nextjs.org/docs/13/pages/api-reference/components/link#legacybehavior */}
          <Link href="/" passHref legacyBehavior>
            <AppIdentity
              key={showLogo ? 'logo' : 'text'}
              title="Design System"
              logo={showLogo}
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
      </PageContent>
    </Page>
  );
};


export { StyledHeader as AppHeader };
