// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, useContext } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Button, Box, ResponsiveContext, Text } from 'grommet';

type GlobalHeaderIdentityProps = Omit<
  ComponentProps<typeof Button>,
  'ref' | 'children' | 'title'
> & {
  logo: ReactNode;
  title?: ReactNode;
  menu?: ReactNode;
};

export const GlobalHeaderIdentity = forwardRef<
  HTMLAnchorElement,
  GlobalHeaderIdentityProps
>(({ href, logo, title, menu, ...rest }, ref) => {
  const size = useContext(ResponsiveContext);
  // Grommet's polymorphic Button intersects anchor/button refs.
  const buttonRef = ref as ComponentProps<typeof Button>['ref'];

  return (
    <Box
      align="center"
      direction="row"
      gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall'}
    >
      {menu}
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
          {logo}
          {typeof title === 'string' ? (
            <Text color="text-strong">{title}</Text>
          ) : (
            title
          )}
        </Box>
      </Button>
    </Box>
  );
});
