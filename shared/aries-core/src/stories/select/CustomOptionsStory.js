import React, { useState } from 'react';
import { Cpu } from '@hpe-design/icons-grommet';
import { Box, Select, Text } from 'grommet';
import { SelectOptionRow } from '../../js/components/core/SelectOption';
import { allOptions } from './shared';
import CustomOptionsStorySource from './CustomOptionsStory.js?raw';

const CustomOptionsExample = () => {
  const [value, setValue] = useState('');
  const selected = allOptions.find(o => o.value === value) || null;

  const renderValueLabel = option => {
    if (!option) return <Text color="text-weak">Select a service</Text>;
    const Icon = option.icon;
    return (
      <Box direction="row" align="center" gap="3xsmall" pad="xsmall">
        <Cpu size="small" />
        <Text>{option.label}</Text>
        <Icon size="small" color={option.iconColor} />
      </Box>
    );
  };

  const renderOption = (option, _index, _opts, state) => (
    <SelectOptionRow
      label={option.label}
      selected={state?.selected}
      active={state?.active}
    />
  );

  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        id="select-custom-options"
        name="select-custom-options"
        options={allOptions}
        value={value}
        labelKey="label"
        valueKey={{ key: 'value', reduce: true }}
        placeholder="Select a service"
        valueLabel={selected ? renderValueLabel(selected) : undefined}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      >
        {renderOption}
      </Select>
    </Box>
  );
};

const CustomOptions = {
  name: 'Custom selected value',
  render: () => <CustomOptionsExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: CustomOptionsStorySource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export { CustomOptions };
