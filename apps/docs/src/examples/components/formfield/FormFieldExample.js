// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Text,
  TextInput,
} from 'grommet';

export const FormFieldExample = () => {
  const id = useId();
  const [value, setValue] = useState({ projectName: '' });
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [submitted, setSubmitted] = useState();

  return (
    <Box gap="medium" width="medium">
      <Box gap="small">
        <CheckBox
          label="Disable field"
          checked={disabled}
          onChange={event => {
            setDisabled(event.target.checked);
            setSubmitted(undefined);
          }}
        />
        <CheckBox
          label="Require a value"
          checked={required}
          onChange={event => {
            setRequired(event.target.checked);
            setSubmitted(undefined);
          }}
        />
        <CheckBox
          label="Show help text"
          checked={showHelp}
          onChange={event => setShowHelp(event.target.checked)}
        />
      </Box>
      <Form
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          setSubmitted(undefined);
        }}
        onSubmit={({ value: nextValue }) => setSubmitted(nextValue)}
      >
        <FormField
          label="Project name"
          name="projectName"
          htmlFor={id}
          help={showHelp ? 'Enter a name for the project.' : undefined}
          disabled={disabled}
          required={required}
          validateOn="submit"
        >
          <TextInput id={id} name="projectName" disabled={disabled} />
        </FormField>
        <Button
          type="submit"
          label="Try submission"
          disabled={disabled}
          primary
        />
      </Form>
      {submitted && (
        <Text role="status">
          Submitted locally: {submitted.projectName || '(empty value)'}
        </Text>
      )}
    </Box>
  );
};
