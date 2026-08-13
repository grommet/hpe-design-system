import React, { useContext, useState } from 'react';
import { Box, Select, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import {
  SelectGroupLabel,
  transparentDisabledOptionTheme,
  focusFirstSelectableOption,
} from '../../js/components/core/Select';
import { allOptions, buildGroupedOptions } from './shared';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const GroupedOptionsExample = () => {
  const [value, setValue] = useState('');
  const theme = useContext(ThemeContext);
  const optionPad = theme?.button?.size?.medium?.option?.pad || HPE_OPTION_PAD;
  const groupedOptions = buildGroupedOptions(allOptions);

  const renderOptionLabel = option => {
    if (option.isGroupLabel)
      return <SelectGroupLabel label={option.label} optionPad={optionPad} />;

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
          onOpen={focusFirstSelectableOption}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </ThemeContext.Extend>
    </Box>
  );
};

export { GroupedOptionsExample };
