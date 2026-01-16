import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnnounceContext, Box, Collapsible, List, Text } from 'grommet';
import { Down, Up } from '@hpe-design/icons-grommet';
import { NavItem, NavItemType } from './NavItem/NavItem';

type NavItemWithLevel = NavItemType & { level?: 1 | 2 };

interface NavListProps {
  items: NavItemWithLevel[];
  activeItem?: string;
  onEscapeToParent?: () => void;
  onSelect?: ({
    item,
    event,
  }: {
    item: NavItemType;
    event: React.MouseEvent | React.KeyboardEvent;
  }) => void;
  [key: string]: any; // For additional props like 'role', 'aria-labelledby', etc.
}

export const NavList = ({
  items,
  activeItem,
  onSelect,
  onEscapeToParent,
  ...rest
}: NavListProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const announce = useContext(AnnounceContext);
  const parentRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const adjustedItems = useMemo(() => {
    const adjusted: NavItemWithLevel[] = [];

    items.forEach(item => {
      if (item.children) {
        if (item.type === 'group') {
          // Preserve the group as a parent, do not flatten.
          // Children inherit the same level as the group (no indentation shift).
          adjusted.push({
            ...item,
            children: item.children.map(child => ({
              ...child,
              level: item.level,
            })),
          });
        } else {
          // Standard expandable parent
          adjusted.push({
            ...item,
            level: item.level || 1,
            children: item.children.map(child => ({
              ...child,
              level: (item.level || 0) + 1,
            })),
          });
        }
      } else {
        adjusted.push(item);
      }
    });

    return adjusted;
  }, [items]);

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
          // If type is group, we traverse down but do NOT add this item
          // to 'parents' list because groups are not collapsible/expandable.
          const currentParents =
            item.type === 'group' ? parents : [...parents, item.label];

          const result = findParents(item.children, target, currentParents);
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

  const onSelectItem = (
    item: NavItemWithLevel,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    onSelect?.({ item, event });
    if (announce) {
      announce(`Selected ${item.label}.`, 'assertive', 2000);
    }
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

  const renderItem = (item: NavItemWithLevel) => {
    const expandedItem = expanded.includes(item.label);
    const navItemProps = {
      id: item.label,
      level: item.level,
      label: item.label,
      url: item.url,
      icon: item.icon,
      onEsc: (event: React.KeyboardEvent<Element>) => {
        onEscape(event as React.KeyboardEvent<HTMLButtonElement>, {
          expandedItem,
          item,
        });
      },
    };

    const active = activeItem === item.label;

    if (item.type === 'group') {
      const indentation = {
        0: 'medium',
        1: 'large',
        2: 'xlarge',
      }

      const headerId = `${item.label
        .replace(/\s+/g, '-')
        .toLowerCase()}-heading`;
      return (
        <Box role="none">
          <Box
            direction="row"
            pad={{ left: indentation[item.level || 0], top: 'small', bottom: 'xsmall' }}
            border={{ side: 'top', color: 'border-weak' }}
            role="presentation"
          >
            <Text
              id={headerId}
              size="xsmall"
              weight="bold"
              role="heading"
              aria-level={3}
            >
              {item.label}
            </Text>
          </Box>
          <Box role="group" aria-labelledby={headerId}>
            {item.children?.map(child => (
              <Box key={child.label} pad={{ vertical: '3xsmall' }}>
                {renderItem(child)}
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    if (item.children) {
      return (
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
          onSelect={(event: React.MouseEvent | React.KeyboardEvent) => {
            // Parent items with URLs are navigable and expandable
            if (item.url) {
              onSelectItem(item, event);
            }
            updateExpanded(item);
          }}
        >
          <Collapsible open={expandedItem}>
            <NavList
              role="menu"
              aria-labelledby={item.label}
              items={item.children}
              activeItem={activeItem}
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
    }

    return (
      <NavItem
        {...navItemProps}
        active={active}
        aria-current={active ? 'page' : undefined}
        onSelect={(event: React.MouseEvent | React.KeyboardEvent) => {
          onSelectItem(item, event);
        }}
      />
    );
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
      {renderItem}
    </List>
  );
};
