import React, { useContext } from 'react';
import { Box, Button, Collapsible, FormField, Select, Text, ThemeContext } from 'grommet';
import { Down, Next } from 'grommet-icons';

interface CollectionItem {
  key: string;
  name: string;
  count: number;
  data: object;
}

interface CollectionMenuProps {
  [key: string]: any;
  items: {
    [key: string]: CollectionItem[]
  };
  selected: CollectionItem;
  onSelect: (data: object) => void;
  drop: boolean;
}

export const CollectionMenu: React.FC<CollectionMenuProps> =
  ({ items, selected, onSelect, drop = false, ...rest }) => {
    const [expanded, setExpanded] = React.useState<string[]>(Object.keys(items));
    const { button } = useContext(ThemeContext) as { button?: any };

    const options = Object.entries(items)
      .reduce((acc: CollectionItem[], [item, value]) => {
        acc.push(...value.map(dataSet => ({ ...dataSet, group: item })));
        return acc;
      }, []);

    return drop ?
      <FormField htmlFor="cluster__input" name="cluster" label='Environment' alignSelf='start'>
        <Select
          id="cluster"
          name="cluster"
          options={options}
          labelKey="name"
          value={selected}
          onChange={({ option }) => onSelect(option)}
        >
          {option => (
            <Box {...button.option}>
              <Text size='xsmall' color="text-weak">{option.group}</Text>
              <Text {...button.option.color} {...button.option.font}>{option.name}</Text>
            </Box>
          )}
        </Select>
      </FormField> :
      <Box width={{ min: 'xsmall', max: 'medium' }} {...rest} >
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
      </Box >;
  }
