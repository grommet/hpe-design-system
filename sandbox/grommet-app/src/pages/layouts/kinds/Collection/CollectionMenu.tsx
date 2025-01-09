import React from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
import { Down, Next } from 'grommet-icons';

interface CollectionItem {
  name: string;
  count: number;
}

interface CollectionMenuProps {
  items: { [key: string]: CollectionItem[] };
  selected: string;
  onSelect: (name: string) => void;
  [key: string]: any;
}

export const CollectionMenu: React.FC<CollectionMenuProps> = ({ items, selected, onSelect, ...rest }) => {
  const [expanded, setExpanded] = React.useState<string[]>(Object.keys(items));

  return (
    <Box width={{ max: 'medium' }} {...rest} >
      {Object.entries(items).map(([item, value]) => {
        const open = expanded.includes(item) || value.some(item => item.name === (selected));
        value.some(item => item.name === (selected)) && !expanded.includes(item) && setExpanded([...expanded, item]);

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
              {value.map(({ name, count }) => (
                <Button
                  key={name}
                  label={<Box direction="row" justify="between"><Text>{name}</Text><Text>{count}</Text></Box>}
                  onClick={() => { onSelect(name) }}
                  active={selected === name}
                />
              ))}
            </Collapsible>
          </React.Fragment>
        )
      })}
    </Box >
  );
}