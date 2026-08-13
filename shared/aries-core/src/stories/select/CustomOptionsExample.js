import React, { useContext, useState } from 'react';
import { Cpu } from '@hpe-design/icons-grommet';
import { Box, Select, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import {
  SelectOptionLabel,
  SelectValueLabel,
} from '../../js/components/core/Select';
import { allOptions } from './shared';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const CustomOptionsExample = () => {
  const [value, setValue] = useState('');
  const selected = allOptions.find(o => o.value === value) || null;
  const theme = useContext(ThemeContext);
  const optionPad = theme?.button?.size?.medium?.option?.pad || HPE_OPTION_PAD;

  const renderOptionLabel = option => (
    <SelectOptionLabel icon={Cpu} label={option.label} />
  );

  const renderValueLabel = option => (
    <SelectValueLabel option={option} optionPad={optionPad} />
  );

  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        id="select-custom-options"
        name="select-custom-options"
        options={allOptions}
        value={value}
        labelKey={renderOptionLabel}
        valueKey={{ key: 'value', reduce: true }}
        valueLabel={renderValueLabel(selected)}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      />
    </Box>
  );
};

export { CustomOptionsExample };
