// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useContext } from 'react';
import type { ComponentProps } from 'react';
import { Button, Box, Image, ResponsiveContext, Text } from 'grommet';
import type { ThemeType } from 'grommet';
import { ThemeContext } from 'styled-components';
import { UserContext } from './UserContext';
import { MenuLayer } from './MenuLayer';

type GlobalHeaderIdentityProps = Omit<
  ComponentProps<typeof Button>,
  'ref' | 'children'
> & {
  logoOnly?: boolean;
  title?: string;
};

// Keep the docs logo behavior local without changing standalone AppIdentity.
const HpeLogo = () => {
  // Grommet adds the active mode at runtime, outside ThemeType's declarations.
  const theme = useContext(ThemeContext) as
    | (ThemeType & { dark?: boolean })
    | undefined;
  return (
    <Box width="4xsmall" animation={{ type: 'fadeIn', duration: 500 }}>
      <Image
        alt="HPE logo"
        fit="contain"
        src={
          theme?.dark
            ? '/HPE_logo_full-clr_rev_rgb.svg'
            : '/HPE_logo_full-clr_pos_rgb.svg'
        }
      />
    </Box>
  );
};

export const GlobalHeaderIdentity = forwardRef<
  HTMLAnchorElement,
  GlobalHeaderIdentityProps
>(({ href, logoOnly, title, ...rest }, ref) => {
  const { user } = useContext(UserContext);
  const size = useContext(ResponsiveContext);
  // Grommet's polymorphic Button intersects anchor/button refs.
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
          {/* If user is logged in, pair HPE logo with the service name */}
          <HpeLogo />
          {!logoOnly &&
            (user ? (
              <Text color="text-strong">{title}</Text>
            ) : (
              // user is not signed in
              <Text color="text-strong" weight="bold">
                Hewlett Packard Enterprise
              </Text>
            ))}
        </Box>
      </Button>
    </Box>
  );
});
