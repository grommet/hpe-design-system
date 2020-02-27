import React, { useContext } from 'react';
import { NavLink } from 'aries-core';
import {
  Box,
  Footer as GrommetFooter,
  ResponsiveContext,
  Text,
  Grid,
} from 'grommet';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      label: 'Terms',
      href: 'https://www.hpe.com/us/en/about/legal/terms-of-use.html',
    },
    { label: 'Privacy', href: 'https://www.hpe.com/us/en/legal/privacy.html' },
    {
      label: 'Security',
      href: 'https://www.hpe.com/us/en/legal/privacy.html#datacollection',
    },
    { label: 'Feedback', href: 'https://github.com/hpe-design/aries/issues' },
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
      <Box width="medium">
        <Grid
          columns={{
            count: 4,
            size: 'auto',
          }}
          gap="xxsmall"
        >
          {footerLinks.map((link, index) => (
            <NavLink
              key={index}
              label={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            />
          ))}
        </Grid>
      </Box>
    </GrommetFooter>
  );
};
