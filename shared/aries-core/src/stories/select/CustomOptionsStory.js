import React, { useContext, useState } from 'react';
import { Cpu } from '@hpe-design/icons-grommet';
import { Box, Select, Text, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import { allOptions } from './shared';
import CustomOptionsStorySource from './CustomOptionsStory.js?raw';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const CustomOptionsExample = () => {
  const [value, setValue] = useState('');
  const selected = allOptions.find(o => o.value === value) || null;
  const theme = useContext(ThemeContext);
  const optionPad = theme?.button?.size?.medium?.option?.pad || HPE_OPTION_PAD;

  const renderOptionLabel = option => {
    return (
      <Box responsive={false} direction="row" align="center" gap="small">
        <Cpu size="small" />
        <Text>{option.label}</Text>
      </Box>
    );
  };

  const renderValueLabel = option => {
    if (!option)
      return (
        <Box
          responsive={false}
          direction="row"
          align="center"
          gap="small"
          pad={optionPad}
        >
          <Cpu size="small" color="text-weak" />
          <Text color="text-weak">Select a service</Text>
        </Box>
      );

    const Icon = option.icon;

    return (
      <Box
        responsive={false}
        direction="row"
        align="center"
        gap="small"
        pad={optionPad}
      >
        <Box direction="row" align="center" gap="xsmall">
          <Cpu size="small" />
          <Text>{option.label}</Text>
          <Icon size="small" color={option.iconColor} />
        </Box>
      </Box>
    );
  };

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
