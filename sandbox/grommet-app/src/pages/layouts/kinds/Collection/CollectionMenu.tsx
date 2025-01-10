import React from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
import { Down, Next } from 'grommet-icons';

interface CollectionItem {
  key: string;
  name: string;
  count: number;
  data: object;
}

interface CollectionMenuProps {
  items: { [key: string]: CollectionItem[] };
  selected: CollectionItem;
  onSelect: (data: object) => void;
  [key: string]: any;
}

export const CollectionMenu: React.FC<CollectionMenuProps> = ({ items, selected, onSelect, ...rest }) => {
  const [expanded, setExpanded] = React.useState<string[]>(Object.keys(items));

  return (
    <Box width={{ min: "small", max: 'medium' }} {...rest} >
      {Object.entries(items).map(([item, value]) => {
        const open = expanded.includes(item) || value.some(item => item === (selected));
        value.some(item => item === (selected)) && !expanded.includes(item) && setExpanded([...expanded, item]);

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
              {value.map((dataSet) => (
                <Button
                  key={dataSet.key}
                  label={<Box direction="row" justify="between"><Text>{dataSet.name}</Text><Text>{dataSet.count}</Text></Box>}
                  onClick={() => { onSelect(dataSet) }}
                  active={selected.key === dataSet.key}
                />
              ))}
            </Collapsible>
          </React.Fragment>
        )
      })}
    </Box >
  );
}
