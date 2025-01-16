import React, { useContext } from 'react';
import { Box, Button, Collapsible, Text, ThemeContext } from 'grommet';
import { Down, LinkNext, Up } from 'grommet-icons';

type MenuItem = {
  key: string;
  label: string;
  count: number;
}

interface CollapsibleMenuProps {
  items: {
    [key: string]: MenuItem | MenuItem[]
  };
  selected: MenuItem;
  onSelect: (data: MenuItem) => void;
  [key: string]: any;
}

const MenuItem = ({ item, selected, onSelect }) => {
  return (
    <Button
      key={item.key}
      label={
        <Box direction="row" justify="between">
          <Text>{item.label}</Text>
          <Text>{item.count}</Text>
        </Box>
      }
      onClick={() => { onSelect(item) }}
      active={selected.key === item.key}
    />
  );
}

const ExpandableMenuItem = ({
  item,
  value,
  open,
  expanded,
  setExpanded,
  selected,
  onSelect
}) => {
  const { global } = useContext(ThemeContext) as { global: { edgeSize: { medium: string } } };
  return (
    <React.Fragment key={item}>
      <Button
        label={
          <Box direction="row" align="center" justify="between">
            <Text>{item}</Text>
            {open ? <Up /> : <Down />}
          </Box>
        }
        justify="start"
        onClick={() => {
          if (open) {
            setExpanded(expanded.filter(i => i !== item));
          } else {
            setExpanded([...expanded, item]);
          }
        }}
      />
      <Collapsible open={open} >
        {value.map((subItem) => {
          const active = selected.key === subItem.key;
          return (
            <Button
              key={subItem.key}
              label={
                <Box direction="row" align="center" justify="between">
                  <Box direction="row" align="center" gap="xsmall">
                    <Box width={global.edgeSize.medium}>
                      {active && <LinkNext />}
                    </Box>
                    <Text>{subItem.label}</Text>
                  </Box>
                  {subItem.count && <Text>{subItem.count}</Text>}
                </Box>
              }
              onClick={() => { onSelect(subItem) }}
              active={active}
            />
          );
        })}
      </Collapsible>
    </React.Fragment>
  );
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