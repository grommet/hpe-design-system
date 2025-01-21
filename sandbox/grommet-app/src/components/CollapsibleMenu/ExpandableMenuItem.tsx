import React, { useContext } from 'react';
import { Box, Button, Collapsible, Text, ThemeContext } from 'grommet';
import { Down, LinkNext, Up } from 'grommet-icons';

export const ExpandableMenuItem = ({
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