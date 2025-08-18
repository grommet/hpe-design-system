import { Collapsible, List } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { NavItem, NavItemType } from './NavItem';
import { useMemo, useState } from 'react';

type NavItemWithLevel = NavItemType & { level?: 1 | 2 };

interface NavListProps {
  items: NavItemWithLevel[];
  [key: string]: any; // For additional props like 'role', 'aria-labelledby', etc.
}

export const NavList = ({ items, activeItem, setActiveItem, ...rest }: NavListProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const adjustedItems = useMemo(
    () =>
      items.map(item => {
        const adjustedItem = { ...item };
        if (item.children) {
          adjustedItem.children = item.children.map(child => ({
            ...child,
            level: (item.level || 0) + 1, // Increment level for children
          }));
        }
        return adjustedItem;
      }),
    [items],
  );

  return (
    <List
      data={adjustedItems}
      defaultItemProps={{
        pad: { vertical: 'xsmall' },
        role: 'none',
      }}
      role="menubar"
      {...rest}
    >
      {item => {
        let result = null;
        const expandedItem = expanded.includes(item.label);
        if (item.children) {
          result = (
            <NavItem
              id={item.label}
              level={item.level}
              label={item.label}
              icon={item.icon}
              actions={
                expandedItem ? (
                  <Up aria-hidden="true" />
                ) : (
                  <Down aria-hidden="true" />
                )
              }
              aria-haspopup={!!item.children}
              aria-expanded={expandedItem}
              onClick={() => {
                setExpanded(prev => {
                  let result: string[];
                  if (prev.includes(item.label)) {
                    result = prev.filter(i => i !== item.label);
                  } else {
                    result = [...prev, item.label];
                  }
                  return result;
                });
              }}
            >
              <Collapsible open={expandedItem}>
                <NavList
                  role="menu"
                  aria-labelledby={item.label}
                  items={item.children}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </Collapsible>
            </NavItem>
          );
        } else {
          result = (
            <NavItem
              id={item.label}
              level={item.level}
              label={item.label}
              url={item.url}
              icon={item.icon}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          );
        }
        return result;
      }}
    </List>
  );
};
