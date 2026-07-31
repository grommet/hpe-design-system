import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

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

// Resolve marker color from theme, matching HPE theme's border-selected token
const resolveMarkerColor = (theme, token, fallback) => {
  const raw = theme?.global?.colors?.[token];
  if (!raw) return fallback;
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object')
    return (theme?.dark ? raw.dark : raw.light) || raw.dark || raw.light || fallback;
  return fallback;
};

// Extract marker design tokens from HPE theme for ::before pseudo-element
const getMarkerTokens = theme => {
  const marker = theme?.select?.default?.medium?.option?.marker;
  return {
    width: marker?.width,
    borderTopLeftRadius: marker?.borderTopLeftRadius,
    borderBottomLeftRadius: marker?.borderBottomLeftRadius,
    top: marker?.top,
    bottom: marker?.bottom,
    left: marker?.left,
  };
};

const StyledMarkerBox = styled(Box)`
  position: relative;

  &::before {
    display: ${({ $selected }) => ($selected ? 'block' : 'none')};
    position: absolute;
    content: '';
    width: ${({ $markerWidth }) => $markerWidth};
    border-top-left-radius: ${({ $markerBorderTopLeftRadius }) => $markerBorderTopLeftRadius};
    border-bottom-left-radius: ${({ $markerBorderBottomLeftRadius }) => $markerBorderBottomLeftRadius};
    top: ${({ $markerTop }) => $markerTop};
    bottom: ${({ $markerBottom }) => $markerBottom};
    left: ${({ $markerLeft }) => $markerLeft};
    background: ${({ $markerColor }) => $markerColor};
    pointer-events: none;
  }
`;

const OptionRow = ({ option, pad, selected, active, markerColor, markerTokens }) => {
  const background =
    selected && active
      ? 'background-selected-primary-hover'
      : selected
      ? 'background-selected-primary'
      : active
      ? 'background-selected-primary-weak'
      : undefined;

  return (
    <StyledMarkerBox
      direction="row"
      align="center"
      pad={pad}
      background={background}
      $selected={selected}
      $markerColor={markerColor}
      $markerWidth={markerTokens?.width}
      $markerBorderTopLeftRadius={markerTokens?.borderTopLeftRadius}
      $markerBorderBottomLeftRadius={markerTokens?.borderBottomLeftRadius}
      $markerTop={markerTokens?.top}
      $markerBottom={markerTokens?.bottom}
      $markerLeft={markerTokens?.left}
    >
      {/* Status icons intentionally omitted from options per design guidance */}
      <Text weight="medium">{option.label}</Text>
    </StyledMarkerBox>
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
    const theme = useContext(ThemeContext);
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const optionPad = theme?.button?.size?.medium?.option?.pad;
    const markerColor = resolveMarkerColor(theme, 'border-selected', '#006750');
    const markerTokens = getMarkerTokens(theme);

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
        <Box direction="row" align="center" gap="3xsmall" pad="xsmall">
          <Cpu size="small" />
          <Text>{option.label}</Text>
          <Icon size="small" color={option.iconColor} />
        </Box>
      );
    };

    const renderOption = (option, index, _opts, state) => {
      if (option.isGroupLabel) {
        const isFirstGroup = index === 0;
        return (
          <Box>
            {/* Divider above non-first groups, extended edge-to-edge */}
            {!isFirstGroup && (
              <Box
                border={{ side: 'top', color: 'border-weak' }}
                margin={{ top: 'xsmall', bottom: 'xxsmall' }}
              />
            )}
            <Box
              pad={{
                horizontal: 'small',
                top: 'xxsmall',
                bottom: '5xsmall',
              }}
            >
              <Text size="xsmall" weight="bold" color="text-strong">
                {option.label}
              </Text>
            </Box>
          </Box>
        );
      }

      return (
        <OptionRow
          option={option}
          pad={optionPad}
          selected={state?.selected}
          active={state?.active}
          markerColor={markerColor}
          markerTokens={markerTokens}
        />
      );
    };

    const selected = options.find(o => o.value === value) || null;

    // Grommet only auto-focuses an option on keyboard-open; mouse-open can land
    // focus on the listbox container, so we force focus to the first selectable option.
    const focusFirstSelectableOption = (attempt = 0) => {
      const listbox = document.querySelector('[role="listbox"]');
      const firstSelectableOption = listbox?.querySelector(
        '[role="option"]:not([aria-disabled="true"])',
      );

      if (firstSelectableOption) {
        firstSelectableOption.focus();
        return;
      }

      if (attempt < 10) {
        requestAnimationFrame(() => focusFirstSelectableOption(attempt + 1));
      }
    };

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
              <Box direction="row" align="center" gap="xsmall" pad="xsmall">
                <Spinner size="xsmall" />
                <Text color="text-weak">Loading...</Text>
              </Box>
            ) : (
              'Select a service'
            )
          }
          disabled={loading}
          emptySearchMessage="No services found"
          valueLabel={selected ? renderValueLabel(selected) : undefined}
          onChange={({ value: nextValue }) => setValue(nextValue)}
          onOpen={focusFirstSelectableOption}
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
