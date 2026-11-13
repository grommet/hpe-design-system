// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { cloneElement, isValidElement, useId, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Box, Button, Nav } from 'grommet';
import type { BoxProps } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import styled from 'styled-components';

export interface SideNavItem {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface SideNavProps extends Omit<BoxProps, 'background'> {
  items: SideNavItem[];
  /** Background applied to the navigation rail. */
  background?: BoxProps['background'];
  /** Initial expanded state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled expanded state. Pair with `onToggle`. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
}

const COLLAPSED_WIDTH = '5xsmall';
const EXPANDED_WIDTH = 'small';

// Animating the rail's own width lets a parent Grid with an `auto` column
// reflow the main content instead of the nav overlaying it.
const AnimatedNav = styled(Nav)`
  overflow: hidden;
  transition: width 200ms ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Icons render their default a11yTitle as an SVG aria-label; hide them when
// the parent Button already provides the accessible name.
const decorative = (icon: ReactNode) =>
  isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ 'aria-hidden'?: boolean | 'true' }>, {
        'aria-hidden': true,
      })
    : undefined;

export const SideNav = ({
  items,
  background,
  defaultOpen = false,
  open: openProp,
  onToggle,
  ...rest
}: SideNavProps) => {
  const navId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  const toggleLabel = open ? 'Collapse navigation' : 'Expand navigation';

  return (
    <Box pad="xsmall" flex={false} {...rest}>
      <AnimatedNav
        id={navId}
        a11yTitle="Primary"
        align={open ? 'start' : 'center'}
        background={background}
        fill="vertical"
        gap="4xsmall"
        pad={{ vertical: '3xsmall' }}
        round="large"
        width={open ? EXPANDED_WIDTH : COLLAPSED_WIDTH}
      >
        <Button
          icon={<Sidebar aria-hidden="true" />}
          a11yTitle={toggleLabel}
          tip={toggleLabel}
          aria-expanded={open}
          aria-controls={navId}
          onClick={toggle}
        />
        {items.map(({ icon, label, href, onClick }) =>
          open ? (
            <Button
              key={label}
              icon={decorative(icon)}
              label={label}
              justify="start"
              fill="horizontal"
              href={href}
              onClick={onClick}
            />
          ) : (
            <Button
              key={label}
              icon={decorative(icon)}
              a11yTitle={label}
              tip={label}
              href={href}
              onClick={onClick}
            />
          ),
        )}
      </AnimatedNav>
    </Box>
  );
};
