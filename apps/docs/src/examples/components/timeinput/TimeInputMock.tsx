// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Box, Button, Text, ThemeContext } from 'grommet';
import type { BoxExtendedProps, TextProps } from 'grommet';
import { Clock } from '@hpe-design/icons-grommet';
import type { ThemeType } from 'grommet/themes';


type TimeInputMockOptionProps = BoxExtendedProps & {
  label: string;
  selected?: boolean;
};

const columns: {
  name: string;
  options: TimeInputMockOptionProps[];
}[] = [
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

const TimeInputMockOption = ({
  label,
  selected,
  ...rest
}: TimeInputMockOptionProps) => {
  const theme = useContext(ThemeContext) as ThemeType;
  const { container = {}, text = {} } = theme.timeInput?.drop?.option || {};
  return (
    <Box
      align="center"
      background={selected ? container.selected?.background : undefined}
      hoverIndicator={!selected && container.hover?.background}
      onClick={() => {}}
      tabIndex={-1}
      flex={false}
      pad={container.pad}
      responsive={false}
      round={container.round}
      {...rest}
    >
      <Text
        size={text.size}
        weight={selected ? text.selected?.weight : undefined}
        color={selected ? text.selected?.color : 'text'}
      >
        {label}
      </Text>
    </Box>
  );
};

export const TimeInputMock = () => {
  const theme = useContext(ThemeContext) as ThemeType;
  const timeTheme = theme.timeInput || {};
  const dropTheme = theme.global?.drop || {};
  const inputTheme = theme.global?.input || {};
  const textProps: TextProps = {
    weight: inputTheme.font?.weight as TextProps['weight'],
    color: 'text',
  };

  const segment = (label: string) => (
    <Box pad={timeTheme.segment?.pad}>
      <Text {...textProps}>{label}</Text>
    </Box>
  );

  return (
    <>
      <Box gridArea="label" fill="horizontal" align="start">
        <Text {...theme.formField?.label} id="timeinput-anatomy-label">
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
          color: theme.global?.control?.border?.color,
          size: theme.global?.control?.border?.width,
        }}
        round={timeTheme.container?.round}
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
          a11yTitle="Choose time"
          icon={<Clock id="timeinput-anatomy-button" />}
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
          round={dropTheme.border?.radius}
          height={timeTheme.drop?.height}
          pad={timeTheme.drop?.pad}
          responsive={false}
        >
          {columns.map(({ name, options }) => (
            <Box
              key={name}
              gap={timeTheme.drop?.column?.gap}
              pad={timeTheme.drop?.column?.pad}
              responsive={false}
              height={timeTheme.drop?.column?.height}
              overflow="auto"
              flex={false}
              tabIndex={-1}
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

