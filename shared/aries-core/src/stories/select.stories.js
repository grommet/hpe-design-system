import React, { useState, useEffect } from 'react';

import { Cpu, StatusGood, StatusWarning } from '@hpe-design/icons-grommet';
import { Box, Select, Spinner, Text } from 'grommet';

// Simulated async data with groups
const allOptions = [
  {
    label: 'Alpha Service',
    value: 'alpha',
    group: 'Production',
    icon: StatusGood,
    iconColor: 'status-ok',
  },
  {
    label: 'Beta Service',
    value: 'beta',
    group: 'Production',
    icon: StatusGood,
    iconColor: 'status-ok',
  },
  {
    label: 'Gamma Service',
    value: 'gamma',
    group: 'Production',
    icon: StatusWarning,
    iconColor: 'status-warning',
  },
  {
    label: 'Dev Service A',
    value: 'dev-a',
    group: 'Development',
    icon: Cpu,
    iconColor: 'icon',
  },
  {
    label: 'Dev Service B',
    value: 'dev-b',
    group: 'Development',
    icon: Cpu,
    iconColor: 'icon',
  },
];

const fetchOptions = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(allOptions), 1500);
  });

// Render a single option row with a leading icon
const OptionRow = ({ option }) => {
  const Icon = option.icon;
  return (
    <Box direction="row" align="center" gap="small">
      <Icon size="small" color="plain" />
      <Text>{option.label}</Text>
    </Box>
  );
};

const meta = {
  title: 'Patterns/Select',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const LoadingIconsGrouping = {
  name: 'Loading, icons & grouping',
  render: () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchOptions().then(data => {
        setOptions(data);
        setLoading(false);
      });
    }, []);

    const groupedOptions = options.reduce((acc, option, index) => {
      const isFirstInGroup =
        index === 0 || options[index - 1].group !== option.group;

      if (isFirstInGroup) {
        acc.push({
          label: option.group,
          value: `__group__${option.group}`,
          isGroupLabel: true,
          disabled: true,
        });
      }

      acc.push(option);
      return acc;
    }, []);

    // Build the displayed value label with a trailing status icon
    const renderValueLabel = option => {
      if (!option) return <Text color="text-weak">Select a service</Text>;
      const Icon = option.icon;
      return (
        <Box direction="row" align="center" gap="small" pad="xsmall">
          <Cpu size="small" />
          <Text>{option.label}</Text>
          <Icon size="small" color={option.iconColor} />
        </Box>
      );
    };

    const renderOption = option => {
      if (option.isGroupLabel) {
        return (
          <Box
            pad={{ horizontal: 'small', top: 'xxsmall', bottom: 'xxsmall' }}
            border={{ side: 'bottom', color: 'border-weak' }}
          >
            <Text size="xsmall" weight="bold" color="text-weak">
              {option.label}
            </Text>
          </Box>
        );
      }

      return <OptionRow option={option} />;
    };

    const selected = options.find(o => o.value === value) || null;

    return (
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select-loading-icons-grouping"
          name="select-loading-icons-grouping"
          options={loading ? [] : groupedOptions}
          value={value}
          labelKey="label"
          valueKey={{ key: 'value', reduce: true }}
          disabledKey="disabled"
          placeholder={
            loading ? (
              <Box direction="row" align="center" gap="small" pad="xsmall">
                <Spinner size="xsmall" />
                <Text color="text-weak">Loading…</Text>
              </Box>
            ) : (
              'Select a service'
            )
          }
          disabled={loading}
          emptySearchMessage="No services found"
          valueLabel={selected ? renderValueLabel(selected) : undefined}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        >
          {renderOption}
        </Select>
      </Box>
    );
  },
  parameters: {
    chromatic: { disable: true },
  },
};
