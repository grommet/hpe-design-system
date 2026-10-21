// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import { Box, Button, Form, FormField, List, Text, TextInput } from 'grommet';
import { Checkmark } from '@hpe-design/icons-grommet';
import {
  passwordRequirements,
  passwordRulesStrong,
} from '../../templates/forms/utils/FormValidation';

export const FormFieldExample = () => {
  const id = useId();
  const [value, setValue] = useState({ password: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box gap="medium" width="medium">
      <Form
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          setSubmitted(false);
        }}
        onSubmit={() => setSubmitted(true)}
        messages={{ required: 'Enter a password.' }}
      >
        <FormField
          label="Password"
          name="password"
          htmlFor={id}
          help={
            <Text id={`${id}-help`} size="xsmall">
              Choose a password that meets all the requirements below.
            </Text>
          }
          info={
            <List
              id={`${id}-info`}
              data={passwordRulesStrong}
              border={false}
              pad="none"
            >
              {rule => (
                <Box direction="row" gap="3xsmall">
                  {value.password && rule.regexp.test(value.password) && (
                    <Box alignSelf="center">
                      <Checkmark size="small" a11yTitle="Requirement met" />
                    </Box>
                  )}
                  <Text size="xsmall">{rule.message}</Text>
                </Box>
              )}
            </List>
          }
          required
          validate={passwordRequirements}
          validateOn="submit"
        >
          <TextInput
            id={id}
            name="password"
            type="password"
            autoComplete="new-password"
            aria-describedby={`${id}-help ${id}-info`}
          />
        </FormField>
        <Box margin={{ top: 'medium' }} responsive={false} align="start">
          <Button type="submit" label="Check password" primary />
        </Box>
      </Form>
      {submitted && (
        <Text role="status">Password meets the requirements.</Text>
      )}
    </Box>
  );
};
