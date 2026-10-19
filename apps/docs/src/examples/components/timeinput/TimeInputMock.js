// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text, ThemeContext } from 'grommet';

const columns = [
  {
    name: 'Hours',
    options: [
      '06',
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
  const { container, text } = theme.timeInput.drop.option;

  return (
    <Box
      align="center"
      background={selected ? container.selected.background : undefined}
      hoverIndicator={!selected && container.hover.background}
      onClick={() => {}}
      tabIndex={-1}
      flex={false}
      pad={container.pad}
      responsive={false}
      round={container.round}
      {...rest}
    >
      <Text
        size="small"
        weight={selected ? text.selected.weight : undefined}
        color={selected ? text.selected.color : 'text'}
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
  const timeTheme = theme.timeInput;
  const dropTheme = theme.global.drop;
  const inputTheme = theme.global.input;
  const textProps = {
    weight: inputTheme.font.weight,
    color: 'text',
  };
  const segment = label => (
    <Box pad={timeTheme.segment.pad}>
      <Text {...textProps}>{label}</Text>
    </Box>
  );

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
        round={timeTheme.container.round}
        responsive={false}
      >
        <Box
          direction="row"
          align="center"
          pad={inputTheme.padding}
          responsive={false}
        >
          <Box id="timeinput-anatomy-sections" direction="row">
            {segment('08')}
            <Text {...textProps}>:</Text>
            {segment('15')}
          </Box>
          <Box id="timeinput-anatomy-period">{segment('AM')}</Box>
        </Box>
        <Button
          id="timeinput-anatomy-button"
          a11yTitle="Choose time"
          icon={timeTheme.icon.clock.render()}
          kind="toolbar"
          tabIndex={-1}
        />
      </Box>
      <Box gridArea="drop" fill="horizontal" align="start">
        <Box
          id="timeinput-anatomy-drop"
          direction="row"
          background={dropTheme.background}
          elevation={dropTheme.shadowSize}
          round={dropTheme.border.radius}
          height={timeTheme.drop.height}
          pad={timeTheme.drop.pad}
          responsive={false}
        >
          {columns.map(({ name, options }) => (
            <Box
              key={name}
              gap={timeTheme.drop.column.gap}
              pad={timeTheme.drop.column.pad}
              responsive={false}
              height={timeTheme.drop.column.height}
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
