import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { DocSearch } from '@docsearch/react';
import { ThemeModeToggle, AppIdentity } from '../../components';

import { getPageDetails, nameToPath } from '../../utils';

const StyledHeader = ({ ...rest }) => {
  const pageDetails = getPageDetails('Home');
  const navItems = pageDetails.pages.map(topic => getPageDetails(topic));
  const size = useContext(ResponsiveContext);
  const router = useRouter();

  return (
    <Header
      pad={{
        vertical: 'medium',
      }}
      {...rest}
    >
      <Link href="/" passHref>
        <AppIdentity brand="hpe" logo={false} title="Design System" />
      </Link>
      <Box direction="row" align="center" gap="xsmall">
        {!['xsmall', 'small'].includes(size) &&
          navItems.map(item => (
            <Link key={item.name} href={nameToPath(item.name)} passHref>
              <Button
                key={item.name}
                label={item.name}
                active={router.pathname === nameToPath(item.name)}
              />
            </Link>
          ))}
        <DocSearch
          appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
          apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}
        />
        <ThemeModeToggle />
      </Box>
    </Header>
  );
};

export { StyledHeader as Header };
