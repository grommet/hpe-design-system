// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { Clock } from '@hpe-design/icons-grommet';

const columns = [
  {
    name: 'Hours',
    options: [
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
    ].map(label => ({ label, selected: label === '08' })),
  },
  {
    name: 'Minutes',
    options: [
      { label: '00' },
      { label: '15', selected: true },
      {
        label: '30',
        id: 'timeinput-anatomy-option',
        border: { style: 'dashed' },
      },
      { label: '45' },
    ],
  },
  {
    name: 'Period',
    options: [{ label: 'AM', selected: true }, { label: 'PM' }],
  },
];

const TimeInputMockOption = ({ label, selected, ...rest }) => {
  const theme = useContext(ThemeContext);
  const optionTheme = theme.timeInput.drop.option;
  const background = selected
    ? optionTheme.selected.background
    : optionTheme.background;
  const color = selected ? optionTheme.selected.color || 'text' : 'text';

  return (
    <Box
      align="center"
      background={background && normalizeColor(background, theme)}
      flex={false}
      pad={optionTheme.pad}
      responsive={false}
      round={optionTheme.round || theme.global.control.border.radius}
      {...rest}
    >
      <Text
        size={optionTheme.size || theme.global.input.font.size || 'small'}
        weight={selected ? optionTheme.selected.text?.weight : undefined}
        color={normalizeColor(color, theme)}
      >
        {label}
      </Text>
    </Box>
  );
};

TimeInputMockOption.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

export const TimeInputMock = () => {
  const theme = useContext(ThemeContext);
  const dropTheme = theme.global.drop;
  const timeTheme = theme.timeInput || {};
  const inputTheme = theme.global.input;

  return (
    <>
      <Box gridArea="label" fill="horizontal" align="start">
        <Text {...theme.formField.label} id="timeinput-anatomy-label">
          Start time
        </Text>
      </Box>
      <Box
        id="timeinput-anatomy-field"
        gridArea="field"
        direction="row"
        align="center"
        justify="between"
        width="small"
        border={{
          color: theme.global.control.border.color,
          size: theme.global.control.border.width,
        }}
        round={timeTheme.container?.round || 'small'}
        pad={inputTheme.padding}
        responsive={false}
      >
        <Box
          direction="row"
          align="center"
          gap={timeTheme.active?.pad || '3xsmall'}
        >
          <Text
            id="timeinput-anatomy-sections"
            size={inputTheme.font.size}
            weight={inputTheme.weight || inputTheme.font.weight}
            color="text"
          >
            08:15
          </Text>
          <Text
            id="timeinput-anatomy-period"
            size={inputTheme.font.size}
            weight={inputTheme.weight || inputTheme.font.weight}
            color="text"
          >
            AM
          </Text>
        </Box>
        <Button
          id="timeinput-anatomy-button"
          a11yTitle="Choose time"
          icon={<Clock />}
          plain
          tabIndex={-1}
        />
      </Box>
      <Box gridArea="drop" fill="horizontal" align="start">
        <Box
          id="timeinput-anatomy-drop"
          direction="row"
          background={timeTheme.drop?.background || dropTheme.background}
          elevation={dropTheme.shadowSize}
          round={dropTheme.border.radius}
          pad={timeTheme.drop.pad || 'small'}
          gap={timeTheme.drop.gap || 'xsmall'}
        >
          {columns.map(({ name, options }) => (
            <Box
              key={name}
              gap={timeTheme.drop.option.gap || 'xxsmall'}
              height={{
                max:
                  timeTheme.drop.column?.maxHeight || theme.global.size.small,
              }}
              overflow="auto"
              flex={false}
            >
              {options.map(option => (
                <TimeInputMockOption key={option.label} {...option} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
