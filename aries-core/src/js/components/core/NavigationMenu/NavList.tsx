import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnnounceContext, Collapsible, List } from 'grommet';
import { Down, Up } from '@hpe-design/icons-grommet';
import { NavItem, NavItemType } from './NavItem/NavItem';

type NavItemWithLevel = NavItemType & { level?: 1 | 2 };

interface NavListProps {
  items: NavItemWithLevel[];
  activeItem?: string;
  setActiveItem?: (item: string | undefined) => void;
  onSelect?: () => void;
  onEscapeToParent?: () => void;
  [key: string]: any; // For additional props like 'role', 'aria-labelledby', etc.
}

export const NavList = ({
  items,
  activeItem,
  setActiveItem,
  onSelect,
  onEscapeToParent,
  ...rest
}: NavListProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const announce = useContext(AnnounceContext);
  const parentRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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

  // Find parents of active item to ensure they're expanded
  const parentsToExpand = useMemo(() => {
    if (!activeItem) return [];

    const findParents = (
      itemsList: NavItemWithLevel[],
      target: string,
      parents: string[] = [],
    ): string[] | null => {
      for (const item of itemsList) {
        if (item.label === target) {
          return parents;
        }
        if (item.children) {
          const result = findParents(item.children, target, [
            ...parents,
            item.label,
          ]);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    return findParents(adjustedItems, activeItem) || [];
  }, [activeItem, adjustedItems]);

  // Update expanded state when parents change
  useEffect(() => {
    if (parentsToExpand.length > 0) {
      setExpanded(prev => Array.from(new Set([...prev, ...parentsToExpand])));
    }
  }, [parentsToExpand]);

  const updateExpanded = (item: NavItemWithLevel) => {
    setExpanded(prev => {
      if (prev.includes(item.label)) {
        return prev.filter(i => i !== item.label);
      }
      return [...prev, item.label];
    });
  };

  const onSelectItem = (item: NavItemWithLevel) => {
    setActiveItem?.(item.label);
    onSelect?.();
    announce(`Selected ${item.label}.`, 'assertive', 2000);
  };

  const onEscape = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    { expandedItem, item }: { expandedItem: boolean; item: NavItemWithLevel },
  ) => {
    if (expandedItem) {
      // If this parent item is expanded, collapse it
      event.preventDefault();
      event.stopPropagation();
      updateExpanded(item);
    } else if (onEscapeToParent) {
      // If not expanded but has parent, escape to parent
      event.preventDefault();
      event.stopPropagation();
      onEscapeToParent();
    }
  };

  return (
    <List
      data={adjustedItems}
      defaultItemProps={{
        pad: { vertical: '3xsmall' },
        role: 'none',
      }}
      role="menubar"
      {...rest}
    >
      {item => {
        let result = null;
        const expandedItem = expanded.includes(item.label);
        const navItemProps = {
          id: item.label,
          level: item.level,
          label: item.label,
          url: item.url,
          icon: item.icon,
          onEsc: (event: React.KeyboardEvent<HTMLButtonElement>) => {
            onEscape(event, { expandedItem, item });
          },
        };

        const active = activeItem === item.label;

        if (item.children) {
          result = (
            <NavItem
              ref={(el: HTMLButtonElement | null) => {
                if (el) {
                  parentRefs.current.set(item.label, el);
                } else {
                  parentRefs.current.delete(item.label);
                }
              }}
              {...navItemProps}
              actions={
                expandedItem ? (
                  <Up aria-hidden="true" />
                ) : (
                  <Down aria-hidden="true" />
                )
              }
              aria-haspopup={!!item.children}
              aria-expanded={expandedItem}
              active={active}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                if (item.url) { 
                  onSelectItem(item);
                }
                updateExpanded(item);
                // announce(
                //   `${item.label} menu ${
                //     expandedItem ? 'collapsed' : 'expanded'
                //   }.`,
                //   'polite',
                //   2000,
                // );
              }}
            >
              <Collapsible open={expandedItem}>
                <NavList
                  role="menu"
                  aria-labelledby={item.label}
                  items={item.children}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  onSelect={onSelect}
                  onEscapeToParent={() => {
                    // Collapse this parent menu and focus on it
                    updateExpanded(item);
                    const parentElement = parentRefs.current.get(item.label);
                    parentElement?.focus();
                  }}
                />
              </Collapsible>
            </NavItem>
          );
        } else {
          result = (
            <NavItem
              {...navItemProps}
              active={active}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                onSelectItem(item);
              }}
            />
          );
        }
        return result;
      }}
    </List>
  );
};
