// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { Clock } from 'grommet-icons';

const getColumns = ({ background, color }) => [
  {
    name: 'Hours',
    options: [
      { label: '07' },
      { label: '08', background, color },
      { label: '09' },
      { label: '10' },
    ],
  },
  {
    name: 'Minutes',
    options: [
      { label: '00' },
      { label: '15', background, color },
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
    options: [{ label: 'AM', background, color }, { label: 'PM' }],
  },
];

const TimeInputMockOption = ({ label, color = 'text', ...rest }) => (
  <Box
    align="center"
    pad={{ vertical: 'xxsmall', horizontal: 'xsmall' }}
    responsive={false}
    round="xsmall"
    {...rest}
  >
    <Text size="small" color={color}>
      {label}
    </Text>
  </Box>
);

TimeInputMockOption.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const TimeInputMock = () => {
  const theme = useContext(ThemeContext);
  const dropTheme = theme.global.drop;
  const timeTheme = theme.timeInput || {};
  const selectedTheme = timeTheme.drop.option.selected;
  const columns = getColumns({
    background: normalizeColor(selectedTheme.background, theme),
    color: normalizeColor(selectedTheme.color || 'text', theme),
  });

  return (
    <>
      <Box gridArea="label" fill="horizontal" align="start">
        <Text id="timeinput-anatomy-label">Start time</Text>
      </Box>
      <Box
        id="timeinput-anatomy-field"
        gridArea="field"
        direction="row"
        align="center"
        justify="between"
        width="small"
        border
        round={timeTheme.container?.round || 'small'}
        pad={{ horizontal: 'xsmall', vertical: '5px' }}
        responsive={false}
      >
        <Box direction="row" align="center" gap="xsmall">
          <Text id="timeinput-anatomy-sections">08:15</Text>
          <Text id="timeinput-anatomy-period">AM</Text>
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
          pad="xxsmall"
          gap="xxsmall"
        >
          {columns.map(({ name, options }) => (
            <Box key={name} gap="xxsmall" flex={false}>
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
