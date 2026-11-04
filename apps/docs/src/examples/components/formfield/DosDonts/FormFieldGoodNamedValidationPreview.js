// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldGoodNamedValidationPreview = () => (
  <Box gap="medium" width="medium">
    <Form>
      <FormField
        label="Project code"
        name="projectCode"
        htmlFor="formfield-good-validation"
        help="Use three uppercase letters followed by three digits."
        validate={{
          regexp: /^[A-Z]{3}[0-9]{3}$/,
          message: 'Enter three uppercase letters followed by three digits.',
        }}
        validateOn="submit"
      >
        <TextInput id="formfield-good-validation" name="projectCode" />
      </FormField>
      <Button type="submit" label="Check code" primary />
    </Form>
    <Text size="small">
      FormField name: projectCode. Enter OPS12 and check, then enter OPS123 and
      check again to clear the error.
    </Text>
  </Box>
);
