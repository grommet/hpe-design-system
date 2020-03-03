import React, { useContext } from 'react';
import Link from 'next/link';
import { FooterLink } from 'aries-core';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
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
      direction={size !== 'small' ? 'row' : 'column-reverse'}
      align={size !== 'small' ? 'center' : undefined}
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'xlarge' : 'large',
      }}
    >
      <Box align="center" gap="medium" direction="row-responsive">
        <Text size="small">
          &copy; {year} Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box alignSelf="center" direction="row" gap="medium">
        {externalFooterLinks.map((link, index) => (
          <FooterLink
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
          <FooterLink label="Feedback" />
        </Link>
      </Box>
    </GrommetFooter>
  );
};
