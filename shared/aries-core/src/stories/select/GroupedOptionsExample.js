import React, { useState } from 'react';
import { Box, Select } from 'grommet';
import {
  SelectGroupLabel,
  SelectOptionThemeScope,
  focusFirstSelectableOption,
} from '../../js/components/core/Select';
import { allOptions, buildGroupedOptions } from './shared';

const GroupedOptionsExample = () => {
  const [value, setValue] = useState('');
  const groupedOptions = buildGroupedOptions(allOptions);

  const renderOptionLabel = option => {
    // Known limitation: still announced as a disabled option, not a group
    // header, by screen readers (see SelectGroupLabel.js).
    if (option.isGroupLabel) return <SelectGroupLabel label={option.label} />;

    return option.label;
  };

  return (
    <Box fill align="center" justify="start" pad="large">
      <SelectOptionThemeScope>
        <Select
          id="select-grouped-options"
          name="select-grouped-options"
          options={groupedOptions}
          value={value}
          labelKey={renderOptionLabel}
          valueKey={{ key: 'value', reduce: true }}
          disabledKey="disabled"
          placeholder="Select a service"
          onOpen={focusFirstSelectableOption}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </SelectOptionThemeScope>
    </Box>
  );
};

export { GroupedOptionsExample };
