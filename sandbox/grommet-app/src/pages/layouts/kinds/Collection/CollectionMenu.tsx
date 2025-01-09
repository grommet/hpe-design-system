import React from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
import { Down, Next } from 'grommet-icons';

const menuItems = {
  "HPE Private Cloud Las Vegas": ["Vegas cluster"],
  "vCenter 1": ["EXSi Cluster 321"]
};

export const CollectionMenu = ({ selected, onSelect, ...rest }) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  return (
    <Box width={{ max: 'medium' }} {...rest} >
      {Object.entries(menuItems).map(([item, value]) => {
        const open = expanded.includes(item) || value.includes(selected);
        value.includes(selected) && !expanded.includes(item) && setExpanded([...expanded, item]);

        return (
          <React.Fragment key={item}>
            <Button
              label={item}
              icon={open ? <Down /> : <Next />}
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
              {value.map((subItem) => (
                <Button
                  key={subItem}
                  label={<Box direction="row" justify="between"><Text>{subItem}</Text><Text>8</Text></Box>}
                  onClick={() => { onSelect(subItem) }}
                  active={selected === subItem}
                />
              ))}
            </Collapsible>
          </React.Fragment>
        )
      })}
    </Box >
  );
}