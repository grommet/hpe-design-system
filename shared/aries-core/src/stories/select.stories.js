import React, { useState, useEffect } from 'react';

import { Cpu, StatusGood, StatusWarning } from '@hpe-design/icons-grommet';
import { Box, Select, Spinner, Text } from 'grommet';
import {
  SelectOptionGroupHeading,
  SelectOptionRow,
  focusFirstSelectableOption,
} from '../js/components/core/SelectOption';

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

const meta = {
  title: 'Patterns/Select',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const Loading = {
  name: 'Loading',
  render: () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchOptions().then(data => {
        setOptions(data.map(({ label }) => label));
        setLoading(false);
      });
    }, []);

    return (
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select-loading"
          name="select-loading"
          options={loading ? [] : options}
          value={value}
          placeholder={
            loading ? (
              <Box direction="row" align="center" gap="xsmall" pad="xsmall">
                <Spinner size="xsmall" />
                <Text color="text-weak">Loading...</Text>
              </Box>
            ) : (
              'Select name'
            )
          }
          disabled={loading}
          emptySearchMessage="No services found"
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    );
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const CustomOptions = {
  name: 'Custom options',
  render: () => {
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
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export const GroupedOptions = {
  name: 'Grouped options',
  render: () => {
    const [value, setValue] = useState('');

    const groupedOptions = allOptions.reduce((acc, option, index) => {
      const isFirstInGroup =
        index === 0 || allOptions[index - 1].group !== option.group;

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
  },
  parameters: {
    chromatic: { disable: true },
  },
};
