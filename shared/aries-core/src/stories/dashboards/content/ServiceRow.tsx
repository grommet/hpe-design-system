// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { Service } from './myServices';

/**
 * Region sub-heading. Uses the theme's `heading-xsmall` type (h5) in
 * text-strong, and borrows `NavigationMenu`'s `GroupHeading` vertical rhythm.
 * The indent equals the row's horizontal padding so headings and items share
 * a left edge.
 */
export const RegionHeading = ({ name }: { name: string }) => (
  <Box
    direction="row"
    pad={{ left: 'small', top: 'xxsmall', bottom: '5xsmall' }}
  >
    <Heading level={5} margin="none" color="text-strong">
      {name}
    </Heading>
  </Box>
);

/** Vertical stack of rows; matches `NavList`'s 3xsmall item gap. */
export const ServiceRows = ({
  region,
  children,
}: {
  region: string;
  children: React.ReactNode;
}) => (
  <Box as="ul" gap="3xsmall" margin="none" pad="none" aria-label={region}>
    {children}
  </Box>
);

interface ServiceRowProps {
  service: Service;
  /** Optional leading icon, coloured to match the label state. */
  icon?: React.ReactElement<{ color?: string }>;
}

/**
 * A single clickable service. Replicates `NavigationMenu`'s `NavItem`
 * treatment (3xsmall vertical padding, small radius, hover fill, text →
 * text-strong on hover) minus the active marker, since these rows navigate
 * away rather than mark the current location. Horizontal padding is `small`,
 * matching the ~18px inset a nav item's label has from its hover edge.
 */
export const ServiceRow = ({ service, icon }: ServiceRowProps) => (
  <Box as="li" style={{ listStyle: 'none' }}>
    <Button
      plain
      fill="horizontal"
      href={service.href}
      onClick={event => event.preventDefault()}
    >
      {({ hover, focus }: { hover: boolean; focus: boolean }) => {
        const color = hover || focus ? 'text-strong' : 'text';
        return (
          <Box round="small">
            <Box
              direction="row"
              align="center"
              pad={{ vertical: '3xsmall', horizontal: 'small' }}
              round="small"
              background={hover ? 'background-hover' : undefined}
            >
              <Box direction="row" gap="xxsmall" flex>
                {icon && (
                  <Box pad={{ top: '4xsmall' }}>
                    {React.cloneElement(icon, { color })}
                  </Box>
                )}
                <Text color={color}>{service.name}</Text>
              </Box>
            </Box>
          </Box>
        );
      }}
    </Button>
  </Box>
);
