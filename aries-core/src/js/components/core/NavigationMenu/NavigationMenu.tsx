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
  setOpen?: (open: boolean) => void;
  title?: string;
  onSelect?: (item: NavItemType) => void;
}

export const NavigationMenu = ({
  activeItem,
  header,
  items,
  open: openProp = true,
  setOpen: setOpenProp,
  onSelect,
  title,
  ...rest
}: NavigationMenuProps) => {
  const [open, setOpen] = useState<boolean>(openProp);
  const navigationId = 'navigation-menu';

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
      setOpen={setOpenProp || setOpen}
      title={title}
      overflow="auto"
      {...rest}
    >
      {open && (
        <Nav
          id={navigationId}
          hidden={!open}
          a11yTitle={title ? `${title}` : 'Navigation menu'}
          gap="3xsmall"
        >
          <NavList
            items={items}
            activeItem={activeItem}
            onSelect={onSelect}
          />
        </Nav>
      )}
    </NavContainer>
  );
};
