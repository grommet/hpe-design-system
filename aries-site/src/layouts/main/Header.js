import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Header, ResponsiveContext } from 'grommet';
import { AppIdentity, ThemeModeToggle } from '../../components';
import { Search } from '../navigation';

const StyledHeader = ({ ...rest }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <Header
      gap="none"
      pad={{
        vertical: 'medium',
        horizontal: size !== 'small' ? 'xlarge' : 'large',
      }}
      {...rest}
    >
      <Link href="/" passHref>
        <AppIdentity
          brand="hpe"
          logo={false}
          logoOnly={size === 'small' && searchFocused}
          title="Design System"
        />
      </Link>
      <Search
        focused={searchFocused}
        setFocused={value => setSearchFocused(value)}
      />
      <ThemeModeToggle />
    </Header>
  );
};

export { StyledHeader as Header };
