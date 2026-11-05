// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useContext } from 'react';
import type { ComponentProps } from 'react';
import { Button, Box, ResponsiveContext, Text } from 'grommet';
// TODO replace with DS icon package when available
import { Aruba, Hpe } from 'grommet-icons';
import { UserContext } from './UserContext';
import { MenuLayer } from './MenuLayer';

type GlobalHeaderIdentityProps = Omit<
  ComponentProps<typeof Button>,
  'ref' | 'children'
> & {
  brand: 'hpe' | 'aruba';
  logoOnly?: boolean;
  title?: string;
};

const brands = {
  // todo replace with logo
  hpe: {
    name: 'HPE',
    logo: <Hpe color="brand" />,
  },
  aruba: {
    name: 'Aruba',
    logo: <Aruba color="plain" />,
  },
};

export const GlobalHeaderIdentity = forwardRef<
  HTMLAnchorElement,
  GlobalHeaderIdentityProps
>(({ brand, href, logoOnly, title, ...rest }, ref) => {
  const { user } = useContext(UserContext);
  const size = useContext(ResponsiveContext);
  // Grommet's polymorphic Button declares an intersection of anchor/button refs.
  const buttonRef = ref as ComponentProps<typeof Button>['ref'];

  return (
    <Box
      align="center"
      direction="row"
      gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall'}
    >
      {/* menu is only available when user is logged in */}
      {user && <MenuLayer />}
      <Button href={href} ref={buttonRef} {...rest} plain>
        <Box
          direction="row"
          align="center"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {/* If user is logged in, show the application specific logo.
          This will be either HPE or Aruba. If user is logged out,
          show HPE logo */}
          {brand && user ? brands[brand].logo : brands.hpe.logo}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall" wrap>
              {user ? (
                // user is signed in, display service name
                <Box direction="row" gap="3xsmall">
                  <Text weight="bold" color="text-strong">
                    {brands[brand].name}
                  </Text>
                  <Text color="text-strong">{title}</Text>
                </Box>
              ) : (
                // user is not signed in
                <Text color="text-strong" weight="bold">
                  Hewlett Packard Enterprise
                </Text>
              )}
            </Box>
          )}
        </Box>
      </Button>
    </Box>
  );
});
