import React from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
import { Down, LinkNext, Up } from '@hpe-design/icons-grommet';
import { dimension } from 'hpe-design-tokens/grommet';

export const ExpandableMenuItem = ({
  item,
  value,
  open,
  expanded,
  setExpanded,
  selected,
  onSelect,
}) => {
  return (
    <Box key={item} gap="xsmall">
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
      <Collapsible open={open}>
        {value.map(subItem => {
          const active = selected.key === subItem.key;
          return (
            <Button
              key={subItem.key}
              label={
                <Box direction="row" align="center" justify="between">
                  <Box direction="row" align="center" gap="small">
                    <Box width={dimension.hpe.icon.medium.size}>
                      {active && <LinkNext />}
                    </Box>
                    <Text>{subItem.label}</Text>
                  </Box>
                  {subItem.count && <Text>{subItem.count}</Text>}
                </Box>
              }
              onClick={() => {
                onSelect(subItem);
              }}
              active={active}
            />
          );
        })}
      </Collapsible>
    </Box>
  );
};
