import { useEffect, useState } from 'react';
import { type BoxProps, Nav } from 'grommet';
import { NavItemType } from './NavItem';
import { NavContainer } from './NavContainer';
import { NavList } from './NavList';

interface NavigationMenuProps extends BoxProps {
  activeItem?: string;
  setActiveItem?: (item: string | undefined) => void;
  header?: React.ReactNode;
  items: NavItemType[];
  open?: boolean;
  title?: string;
	onSelect?: () => void;
}

export const NavigationMenu = ({
  activeItem,
  setActiveItem,
  header,
  items,
  open: openProp = true,
  onSelect,
  title,
  ...rest
}: NavigationMenuProps) => {
  const [open, setOpen] = useState(openProp);
  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  return (
    <NavContainer
      header={header}
      open={open}
      setOpen={setOpen}
      title={title}
      overflow="auto"
      {...rest}
    >
      {open && (
        <Nav
          a11yTitle={title ? `${title} main menu` : 'Main menu'}
          gap="xsmall"
        >
          <NavList
            items={items}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onSelect={onSelect}
          />
        </Nav>
      )}
    </NavContainer>
  );
};
