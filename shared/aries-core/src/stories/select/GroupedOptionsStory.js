import React, { useState } from 'react';
import {
  SelectOptionGroupHeading,
  SelectOptionRow,
  focusFirstSelectableOption,
} from '../../js/components/core/SelectOption';
import { Box, Select } from 'grommet';
import { allOptions, buildGroupedOptions } from './shared';

const GroupedOptionsExample = () => {
  const [value, setValue] = useState('');
  const groupedOptions = buildGroupedOptions(allOptions);

  const renderOption = (option, index, _opts, state) => {
    if (option.isGroupLabel)
      return (
        <SelectOptionGroupHeading
          label={option.label}
          isFirstGroup={index === 0}
        />
      );

    return (
      <SelectOptionRow
        label={option.label}
        selected={state?.selected}
        active={state?.active}
      />
    );
  };

  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        id="select-grouped-options"
        name="select-grouped-options"
        options={groupedOptions}
        value={value}
        labelKey="label"
        valueKey={{ key: 'value', reduce: true }}
        disabledKey="disabled"
        placeholder="Select a service"
        onChange={({ value: nextValue }) => setValue(nextValue)}
        onOpen={() => focusFirstSelectableOption()}
      >
        {renderOption}
      </Select>
    </Box>
  );
};

const GroupedOptions = {
  name: 'Grouped options',
  render: () => <GroupedOptionsExample />,
  parameters: {
    chromatic: { disable: true },
  },
};

export { GroupedOptions };
