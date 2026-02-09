import { useEffect, useState } from 'react';
import { type BoxProps, Nav } from 'grommet';
import { NavItemType } from './NavItem/NavItem';
import { NavContainer } from './NavContainer';
import { NavList } from './NavList';

interface NavigationMenuProps extends BoxProps {
  activeItem?: string;
  header?: React.ReactNode;
  items: NavItemType[];
  open?: boolean;
  title?: string;
  onSelect?: ({
    item,
    event,
  }: {
    item: NavItemType;
    event: React.MouseEvent | React.KeyboardEvent;
  }) => void;
}

export const NavigationMenu = ({
  activeItem,
  header,
  items,
  open: openProp = true,
  onSelect,
  title,
  ...rest
}: NavigationMenuProps) => {
  const [open, setOpen] = useState<boolean>(openProp);
  const navigationId = 'navigation-menu';
  const menuTitle = title ? `${title}` : 'Navigation Menu';

  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  return (
    <NavContainer
      header={header}
      navigationId={navigationId}
      open={open}
      setOpen={setOpen}
      title={title}
      overflow="auto"
      {...rest}
    >
      {open && (
        <Nav
          id={navigationId}
          hidden={!open}
          a11yTitle={menuTitle}
          gap="3xsmall"
        >
          <NavList
            a11yTitle={menuTitle}
            items={items}
            activeItem={activeItem}
            onSelect={onSelect}
          />
        </Nav>
      )}
    </NavContainer>
  );
};
