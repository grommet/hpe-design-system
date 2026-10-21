// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldGoodLabelAssociationPreview = () => (
  <Box gap="medium" width="medium">
    <Form>
      <FormField
        label="Project name"
        name="projectName"
        htmlFor="formfield-good-label"
      >
        <TextInput id="formfield-good-label" name="projectName" />
      </FormField>
    </Form>
    <Text size="small">
      Label target and input id: formfield-good-label. Click the label to focus
      the input.
    </Text>
  </Box>
);
