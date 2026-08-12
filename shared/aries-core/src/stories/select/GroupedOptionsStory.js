import React, { useContext, useState } from 'react';
import { Box, Select, Text, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import { focusFirstSelectableOption } from '../../js/components/core/SelectOption/focusFirstSelectableOption';
import { allOptions, buildGroupedOptions } from './shared';
import GroupedOptionsStorySource from './GroupedOptionsStory.js?raw';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const transparentDisabledOptionTheme = {
  button: {
    disabled: {
      option: {
        background: 'transparent',
        pad: 'none',
      },
    },
  },
};

const GroupedOptionsExample = () => {
  const [value, setValue] = useState('');
  const theme = useContext(ThemeContext);
  const optionPad = theme?.button?.size?.medium?.option?.pad || HPE_OPTION_PAD;
  const groupedOptions = buildGroupedOptions(allOptions);

  const renderOptionLabel = option => {
    if (option.isGroupLabel)
      return (
        <Box
          role="presentation"
          pad={{
            top: 'xxsmall',
            bottom: '5xsmall',
            left: optionPad?.left || optionPad?.horizontal,
          }}
        >
          <Text
            size="xsmall"
            weight="bold"
            color="text-strong"
            role="heading"
            aria-level={3}
          >
            {option.label}
          </Text>
        </Box>
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
          onOpen={focusFirstSelectableOption}
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
