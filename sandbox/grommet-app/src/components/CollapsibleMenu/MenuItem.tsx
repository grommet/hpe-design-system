import React from 'react';
import { Box, Button, Text } from 'grommet';
import { MenuItemType } from './types';

interface MenuItemProps {
  item: MenuItemType;
  selected: MenuItemType;
  onSelect: (data: MenuItemType) => void;
  [key: string]: any;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  selected,
  onSelect,
  ...rest
}) => {
  return (
    <Button
      key={item.key}
      label={
        <Box direction="row" justify="between" width={{ min: "small" }}>
          <Text>{item.label}</Text>
          <Text>{item.count}</Text>
        </Box>
      }
      onClick={() => { onSelect(item) }}
      active={selected.key === item.key}
      {...rest}
    />
  );
}
