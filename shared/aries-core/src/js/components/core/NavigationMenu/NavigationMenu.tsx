import { useEffect, useState } from 'react';
import { type BoxProps, Nav } from 'grommet';
import { NavItemType } from './NavItem/NavItem';
import { NavContainer } from './NavContainer';
import { NavList } from './NavList';

const assignUniqueIds = (
  items: NavItemType[],
  parentPath = '',
  seenIds = new Set<string>(),
): NavItemType[] => {
  return items.map(item => {
    if (item.id) {
      // Use existing ID if provided
      seenIds.add(item.id);
      return {
        ...item,
        children: item.children
          ? assignUniqueIds(item.children, `${parentPath}${item.id}-`, seenIds)
          : undefined,
      };
    }

    // Create stable ID based on hierarchical path
    const baseId = `${parentPath}${item.label
      .replace(/\s+/g, '-')
      .toLowerCase()}`;
    let uniqueId = baseId;
    let counter = 1;

    // Handle collisions by appending counter
    while (seenIds.has(uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    seenIds.add(uniqueId);

    return {
      ...item,
      id: uniqueId,
      children: item.children
        ? assignUniqueIds(item.children, `${uniqueId}-`, seenIds)
        : undefined,
    };
  });
};

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
  items: itemsProp,
  open: openProp = true,
  onSelect,
  title,
  ...rest
}: NavigationMenuProps) => {
  const [open, setOpen] = useState<boolean>(openProp);
  const navigationId = 'navigation-menu';
  const menuTitle = title ? `${title}` : 'Navigation Menu';

  // Add unique Id to each item for aria and key purposes
  const items = assignUniqueIds(itemsProp);

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
