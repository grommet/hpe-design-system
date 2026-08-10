import React, { useState } from 'react';
import { Box, Select, Text, ThemeContext } from 'grommet';
import { allOptions, buildGroupedOptions } from './shared';
import GroupedOptionsStorySource from './GroupedOptionsStory.js?raw';

const transparentDisabledOptionTheme = {
  button: {
    disabled: {
      option: {
        background: 'transparent',
      },
    },
  },
};

const GroupedOptionsExample = () => {
  const [value, setValue] = useState('');
  const groupedOptions = buildGroupedOptions(allOptions);

  const renderOptionLabel = option => {
    if (option.isGroupLabel)
      return (
        <Text size="xsmall" weight="bold" color="text-strong">
          {option.label}
        </Text>
      );

    return option.label;
  };

  return (
    <Box fill align="center" justify="start" pad="large">
      <ThemeContext.Extend value={transparentDisabledOptionTheme}>
        <Select
          id="select-grouped-options"
          name="select-grouped-options"
          options={groupedOptions}
          value={value}
          labelKey={renderOptionLabel}
          valueKey={{ key: 'value', reduce: true }}
          disabledKey="disabled"
          placeholder="Select a service"
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </ThemeContext.Extend>
    </Box>
  );
};

const GroupedOptions = {
  name: 'Grouped options',
  render: () => <GroupedOptionsExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: GroupedOptionsStorySource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export { GroupedOptions };
