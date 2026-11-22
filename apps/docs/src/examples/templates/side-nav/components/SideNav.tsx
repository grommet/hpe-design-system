// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Box, Button, Nav } from 'grommet';
import type { BoxProps } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { NavigationMenu } from '@shared/aries-core';
import type { NavItemType } from '@shared/aries-core';
import styled from 'styled-components';

export type SideNavItem = NavItemType;

type NavigationMenuProps = ComponentProps<typeof NavigationMenu>;

export interface SideNavProps extends Omit<BoxProps, 'background'> {
  items: SideNavItem[];
  /** Background applied to the navigation rail. */
  background?: BoxProps['background'];
  /** `url` (or `label` when there is no url) of the current page's item. */
  activeItem?: NavigationMenuProps['activeItem'];
  onSelect?: NavigationMenuProps['onSelect'];
  /** Initial expanded state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled expanded state. Pair with `onToggle`. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
}

const COLLAPSED_WIDTH = '5xsmall';
const EXPANDED_WIDTH = 'small';
// NavigationMenu hard-codes this id on its Nav.
const NAVIGATION_MENU_ID = 'navigation-menu';

// Animating the rail's own width lets a parent Grid with an `auto` column
// reflow the main content instead of the nav overlaying it.
const AnimatedRail = styled(Box)`
  overflow: hidden;
  transition: width 200ms ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Icons render their default a11yTitle as an SVG aria-label; hide them when
// the item already provides the accessible name via its label.
const decorative = (icon: ReactNode) =>
  isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ 'aria-hidden'?: boolean }>, {
        'aria-hidden': true,
      })
    : undefined;

const isActive = (item: SideNavItem, activeItem?: string) =>
  activeItem !== undefined &&
  ((item.url !== undefined && activeItem === item.url) ||
    activeItem === item.label);

export const SideNav = ({
  items,
  background,
  activeItem,
  onSelect,
  defaultOpen = false,
  open: openProp,
  onToggle,
  ...rest
}: SideNavProps) => {
  const railId = useId();
  // grommet Button types its ref as button & anchor since it may render either.
  const toggleRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const focusToggle = useRef(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const menuItems = useMemo(
    () => items.map(item => ({ ...item, icon: decorative(item.icon) })),
    [items],
  );

  const toggle = () => {
    const next = !open;
    focusToggle.current = true;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  // The rail and menu render different toggle buttons; keep focus on
  // whichever one replaces the button the user just activated.
  useEffect(() => {
    if (focusToggle.current) {
      focusToggle.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  return (
    <Box pad="xsmall" flex={false} {...rest}>
      <AnimatedRail
        background={background}
        fill="vertical"
        round="large"
        width={open ? EXPANDED_WIDTH : COLLAPSED_WIDTH}
      >
        {open ? (
          <NavigationMenu
            items={menuItems}
            activeItem={activeItem}
            onSelect={onSelect}
            title="Primary"
            open
            fill="vertical"
            header={
              // Mirrors NavHeader without its hard-coded background-front so
              // the surface background shows through.
              <Box
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'xsmall', bottom: 'xxsmall', horizontal: 'small' }}
                flex={false}
              >
                <Button
                  ref={toggleRef}
                  icon={<Sidebar aria-hidden />}
                  active
                  aria-expanded
                  aria-controls={NAVIGATION_MENU_ID}
                  tip="Close navigation"
                  onClick={toggle}
                />
              </Box>
            }
          />
        ) : (
          <Nav
            id={railId}
            a11yTitle="Primary"
            align="center"
            fill="vertical"
            gap="4xsmall"
            pad={{ vertical: '3xsmall' }}
          >
            <Button
              ref={toggleRef}
              icon={<Sidebar aria-hidden />}
              aria-expanded={false}
              aria-controls={railId}
              tip="Open navigation"
              onClick={toggle}
            />
            {items.map(item => {
              const active = isActive(item, activeItem);
              return (
                <Button
                  key={item.id ?? item.label}
                  icon={decorative(item.icon)}
                  a11yTitle={item.label}
                  tip={item.label}
                  href={item.url}
                  active={active}
                  aria-current={active ? 'page' : undefined}
                  onClick={event => onSelect?.({ item, event })}
                />
              );
            })}
          </Nav>
        )}
      </AnimatedRail>
    </Box>
  );
};
