import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
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
      <Box align="center" gap="medium" direction="row-responsive">
        <Hpe size="large" color="brand" />
        <Text size="small">&copy; 2020 Hewlett Packard Enterprise</Text>
      </Box>
      <Box direction="row" gap="medium">
        <FooterLink
          label="Terms"
          href="https://www.hpe.com/us/en/about/legal/terms-of-use.html"
          target="_blank"
          rel="noreferrer noopener"
        />
        <FooterLink
          label="Privacy"
          href="https://www.hpe.com/us/en/legal/privacy.html"
          target="_blank"
          rel="noreferrer noopener"
        />
        <FooterLink
          label="Security"
          href="https://www.hpe.com/us/en/legal/privacy.html#datacollection"
          target="_blank"
          rel="noreferrer noopener"
        />
        <FooterLink
          label="Feedback"
          href="https://github.com/hpe-design/aries/issues"
          target="_blank"
          rel="noreferrer noopener"
        />
      </Box>
    </GrommetFooter>
  );
};
