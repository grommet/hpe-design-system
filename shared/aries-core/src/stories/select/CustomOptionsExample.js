import React, { useState } from 'react';
import { Cpu } from '@hpe-design/icons-grommet';
import { Box, Select } from 'grommet';
import {
  SelectOptionLabel,
  SelectValueLabel,
} from '../../js/components/core/Select';
import { allOptions } from './shared';

const CustomOptionsExample = () => {
  const [value, setValue] = useState('');
  const selected = allOptions.find(o => o.value === value) || null;

  const renderOptionLabel = option => (
    <SelectOptionLabel icon={Cpu} label={option.label} />
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
        valueLabel={
          <SelectValueLabel option={selected} placeholder="Select a service" />
        }
        onChange={({ value: nextValue }) => setValue(nextValue)}
      />
    </Box>
  );
};

export { CustomOptionsExample };
