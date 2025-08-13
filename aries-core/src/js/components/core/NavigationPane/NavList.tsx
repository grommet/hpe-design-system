import { Collapsible, List } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { NavItem, NavItemType } from './NavItem';
import { useState } from 'react';


interface NavListProps {
  items: NavItemType[];
  [key: string]: any; // For additional props like 'role', 'aria-labelledby', etc.
}

export const NavList = ({ items }: NavListProps) => {
    const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <List
      data={items}
      defaultItemProps={{
        pad: { vertical: 'xsmall' },
      }}
    >
      {item => {
        let result = null;
        if (item.children) {
          result = (
            <NavItem
              id={item.label}
              label={item.label}
              icon={item.icon}
              actions={
                expanded.includes(item.label) ? (
                  <Up aria-hidden="true" />
                ) : (
                  <Down aria-hidden="true" />
                )
              }
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
              <Collapsible open={expanded.includes(item.label)}>
                <NavList
                  role="menu"
                  aria-labelledby={item.label}
                  items={item.children}
                />
              </Collapsible>
            </NavItem>
          );
        } else {
          result = (
            <NavItem
              label={item.label}
              href={item.url}
              icon={item.icon}
              active={location.pathname.includes(item.url || '')}
            />
          );
        }
        return result;
      }}
    </List>
  );
};
