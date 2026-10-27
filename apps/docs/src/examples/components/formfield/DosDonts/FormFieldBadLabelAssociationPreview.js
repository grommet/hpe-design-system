// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldBadLabelAssociationPreview = () => (
  <Box gap="medium" width="medium">
    <Form>
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id --
        Intentionally mismatched to demonstrate the documented anti-pattern. */}
      <FormField
        label="Project name"
        name="projectName"
        htmlFor="formfield-unrelated-input"
      >
        <TextInput
          id="formfield-bad-label"
          name="projectName"
          a11yTitle="Project name with an unassociated visible label"
        />
      </FormField>
    </Form>
    <Text size="small">
      Label target: formfield-unrelated-input. Input id: formfield-bad-label.
      Clicking the label does not focus the input.
    </Text>
  </Box>
);
