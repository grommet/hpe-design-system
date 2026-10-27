// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useId } from 'react';
import {
  Box,
  Diagram,
  FormField,
  Grid,
  Stack,
  Text,
  ThemeContext,
} from 'grommet';
import { Alert } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

export const FormFieldAnatomy = () => {
  const theme = useContext(ThemeContext);
  const id = useId();
  const target = region => `${id}-${region}`;
  const annotations = [
    { number: '1', region: 'label', area: 'label' },
    { number: '2', region: 'required', area: 'required' },
    { number: '3', region: 'input', area: 'input' },
    { number: '4', region: 'help', area: 'help' },
    { number: '5', region: 'error', area: 'error' },
    { number: '6', region: 'info', area: 'info' },
  ];
  const anatomyTheme = {
    formField: {
      label: {
        requiredIndicator: (
          <Text
            id={target('required')}
            size="xsmall"
            aria-label="required"
          >
            *
          </Text>
        ),
      },
      border: { error: { color: 'border' } },
      error: {
        color: 'text-critical',
        background: 'transparent',
        icon: (
          <Alert id={target('error')} size="small" color="icon-critical" />
        ),
      },
    },
  };

  return (
    <Box width="large" pad={{ vertical: 'medium' }}>
      <Stack>
        <Grid
          columns={['auto', 'flex', 'auto']}
          rows={['auto', 'auto', 'auto', 'auto', 'auto']}
          areas={[
            ['label', 'field', 'required'],
            ['help', 'field', 'empty-1'],
            ['input', 'field', 'empty-2'],
            ['error', 'field', 'empty-3'],
            ['info', 'field', 'empty-4'],
          ]}
          gap={{ column: 'medium' }}
          align="center"
        >
          {annotations.map(({ number, region, area }) => (
            <Annotation
              key={number}
              id={target(`annotation-${number}`)}
              target={number}
              gridArea={area}
              a11yTitle={`${number}: ${region}`}
            />
          ))}
          <Box
            gridArea="field"
            pad="small"
          >
            <ThemeContext.Extend value={anatomyTheme}>
              {/* A diagram placeholder replaces the actual input control. */}
              {/* eslint-disable-next-line grommet/formfield-name */}
              <FormField
                label={<span id={target('label')}>Work email</span>}
                htmlFor={target('input')}
                name="workEmail"
                contentProps={{ border: false }}
                required
                help={
                  <Text id={target('help')} size="xsmall">
                    Use your work email address.
                  </Text>
                }
                error={
                  <Text size="xsmall" color="text-critical">
                    Include an @ character.
                  </Text>
                }
                info={
                  <Text id={target('info')} size="xsmall">
                    Used for account notifications.
                  </Text>
                }
              >
                <Box
                  id={target('input')}
                  border={{ style: 'dotted', color: 'border' }}
                  pad={theme.global.input.padding}
                  round={theme.formField.round}
                  align="center"
                  justify="center"
                >
                  <Text size="medium">input</Text>
                </Box>
              </FormField>
            </ThemeContext.Extend>
          </Box>
        </Grid>
        <Diagram
          connections={annotations.map(({ number, region }) =>
            connection(target(`annotation-${number}`), target(region)),
          )}
        />
      </Stack>
    </Box>
  );
};
