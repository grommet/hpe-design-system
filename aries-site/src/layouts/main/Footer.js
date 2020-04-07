import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
import { ThemeModeToggle, NavButton } from '../../components';
import { nameToPath } from '../../utils';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();
  const router = useRouter();

  const externalFooterLinks = [
    {
      name: 'Terms',
      href: '//www.hpe.com/us/en/about/legal/terms-of-use.html',
    },
    { name: 'Privacy', href: '//www.hpe.com/us/en/legal/privacy.html' },
    {
      name: 'Security',
      href: '//www.hpe.com/us/en/legal/privacy.html#datacollection',
    },
  ];
  return (
    <GrommetFooter
      direction="row-responsive"
      align={size !== 'small' ? 'center' : undefined}
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'xlarge' : 'large',
      }}
    >
      <Box direction="row-responsive" gap="xsmall" align="center">
        <Box>
          <Text>&copy; {year} Hewlett Packard Enterprise</Text>
        </Box>
        <Box direction="row" gap="xsmall">
          {externalFooterLinks.map(item => (
            <Box align="start">
              <Link key={item.name} href={item.href} passHref>
                <NavButton
                  item={item.name}
                  active={router.pathname === item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                />
              </Link>
            </Box>
          ))}
          {/* Need to pass href because of:
        https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child */}
          <Box align="start">
            <Link prefetch={false} href={nameToPath('Feedback')} passHref>
              <NavButton item="Feedback" />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box direction="row-responsive">
        <ThemeModeToggle />
      </Box>
    </GrommetFooter>
  );
};
