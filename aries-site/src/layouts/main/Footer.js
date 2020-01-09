import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
import { Hpe } from 'grommet-icons';
import { ThemeModeToggle } from '../../components';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      gap="medium"
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'xlarge' : 'large',
      }}
    >
      <Box>
        <ThemeModeToggle />
      </Box>
      <GrommetFooter
        direction="row-responsive"
        align={size !== 'small' ? 'center' : undefined}
      >
        <Box align="center" gap="medium" direction="row-responsive">
          <Hpe size="large" color="brand" />
          <Text size="small">&copy; 2020 Hewlett Packard Enterprise</Text>
        </Box>
        <Box direction="row" gap="medium">
          <FooterLink label="Terms" href="#" />
          <FooterLink label="Privacy" href="#" />
          <FooterLink label="Security" href="#" />
          <FooterLink
            label="Feedback"
            href="https://github.com/hpe-design/aries/issues"
            target="_blank"
            rel="noreferrer noopener"
          />
        </Box>
      </GrommetFooter>
    </Box>
  );
};
