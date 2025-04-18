import React from 'react';
import { Box } from 'grommet';
import { ExpandableMenuItem } from './ExpandableMenuItem';
import { MenuItem } from './MenuItem';
import { MenuItemType } from './types';

interface CollapsibleMenuProps {
  items: {
    [key: string]: MenuItemType | MenuItemType[]
  };
  selected: MenuItemType;
  onSelect: (data: MenuItemType) => void;
  [key: string]: any;
}

export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  items,
  selected,
  onSelect,
  ...rest
}) => {
  const [expanded, setExpanded] = React.useState<string[]>(Object.keys(items));

  const menuItems = Object.entries(items).map(([item, value]) => {
    let menuItem: JSX.Element;
    if (Array.isArray(value)) {
      const open = expanded.includes(item) || value.some(item => item === (selected));

      menuItem = (
        <ExpandableMenuItem
          key={item}
          item={item}
          value={value}
          open={open}
          expanded={expanded}
          setExpanded={setExpanded}
          selected={selected}
          onSelect={onSelect}
        />
      );
    } else {
      menuItem = (
        <MenuItem
          key={value.key}
          item={value}
          selected={selected}
          onSelect={onSelect}
        />
      );
    }

    return (menuItem);
  })


  return (
    <Box width={{ min: "small", max: 'medium' }} {...rest} >
      {menuItems}
    </Box >
  );
}
