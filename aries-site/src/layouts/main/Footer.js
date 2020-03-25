import React, { useContext } from 'react';
import Link from 'next/link';
import { FooterLink } from 'aries-core';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
import { ThemeModeToggle } from '../../components';
import { nameToPath } from '../../utils';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();

  const externalFooterLinks = [
    {
      label: 'Terms',
      href: 'https://www.hpe.com/us/en/about/legal/terms-of-use.html',
    },
    { label: 'Privacy', href: 'https://www.hpe.com/us/en/legal/privacy.html' },
    {
      label: 'Security',
      href: 'https://www.hpe.com/us/en/legal/privacy.html#datacollection',
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
      <Box role="complementary" direction="row-responsive">
        <ThemeModeToggle />
      </Box>
      <Box direction="row-responsive" gap="medium" align="center">
        <Box>
          <Text size="xsmall">
            &copy; {year} Hewlett Packard Enterprise
          </Text>
        </Box>
        {externalFooterLinks.map((link, index) => (
          <FooterLink
            size="small"
            key={index}
            href={link.href}
            label={link.label}
            target="_blank"
            rel="noreferrer noopener"
          />
        ))}
        {/* Need to pass href because of:
        https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child */}
        <Link href={nameToPath('Feedback')} passHref>
          <FooterLink size="small" label="Feedback" />
        </Link>
      </Box>
    </GrommetFooter>
  );
};
