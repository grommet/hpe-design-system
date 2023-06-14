import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { ThemeModeToggle, AppIdentity } from '../../components';
import { DocSearch } from '../navigation';

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
        <DocSearch />
        <ThemeModeToggle />
      </Box>
    </Header>
  );
};

export { StyledHeader as Header };
