import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Header, ResponsiveContext, Text } from 'grommet';
import { Hpe, Search as SearchIcon } from 'grommet-icons';
import { getPageDetails, nameToPath } from '../../utils';
import { Search } from '../navigation';

const StyledHeader = ({ ...rest }) => {
  const pageDetails = getPageDetails('Home');
  const navItems = pageDetails.pages.map(topic => getPageDetails(topic));
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);
  const router = useRouter();

  return (
    <Header
      pad={{
        vertical: 'medium',
        horizontal: size !== 'small' ? 'xlarge' : 'large',
      }}
      {...rest}
    >
      <Link href="/" passHref>
        <Button plain>
          <Box
            direction="row"
            align="center"
            gap="medium"
            // pad maintains accessible hit target
            // non-responsive maintains same dimensions for mobile
            pad={{ vertical: 'small' }}
            responsive={false}
          >
            <Hpe color="brand" />
            {(size !== 'small' || (size === 'small' && !searchFocused)) && (
              <Box direction="row" gap="xsmall">
                <Text color="text-strong" weight="bold">
                  HPE
                </Text>
                <Text color="text-strong">App Name</Text>
              </Box>
            )}
          </Box>
        </Button>
      </Link>
      {!searchFocused ? (
        <Box direction="row" align="center" gap="xsmall">
          {size !== 'small' &&
            navItems.map(item => (
              <Link key={item.name} href={nameToPath(item.name)} passHref>
                <Button
                  key={item.name}
                  label={item.name}
                  active={router.pathname === nameToPath(item.name)}
                />
              </Link>
            ))}
          <Button
            id="search-button"
            icon={<SearchIcon />}
            onClick={() => setSearchFocused(true)}
          />
        </Box>
      ) : (
        <Search
          focused={searchFocused}
          setFocused={value => setSearchFocused(value)}
        />
      )}
    </Header>
  );
};

export { StyledHeader as Header };
