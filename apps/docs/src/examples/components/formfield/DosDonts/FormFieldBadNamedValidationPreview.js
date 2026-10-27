// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldBadNamedValidationPreview = () => (
  <Box gap="medium" width="medium">
    <Form>
      {/* eslint-disable-next-line grommet/formfield-name --
        Intentionally unnamed to demonstrate validation without a field key. */}
      <FormField
        label="Project code"
        htmlFor="formfield-bad-validation"
        help="Use three uppercase letters followed by three digits."
        validate={{
          regexp: /^[A-Z]{3}[0-9]{3}$/,
          message: 'Enter three uppercase letters followed by three digits.',
        }}
        validateOn="submit"
      >
        <TextInput id="formfield-bad-validation" name="projectCode" />
      </FormField>
      <Button type="submit" label="Check code" primary />
    </Form>
    <Text size="small">
      FormField name: missing. The rule cannot read projectCode, so even
      entering OPS123 and checking does not clear the error.
    </Text>
  </Box>
);
