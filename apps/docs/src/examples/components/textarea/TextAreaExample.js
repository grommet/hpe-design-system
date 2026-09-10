// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextArea } from 'grommet';

export const TextAreaExample = () => (
  <Form>
    <FormField
      name="textArea-example"
      label="Additional feedback"
      htmlFor="text-area-example"
    >
      <TextArea
        name="textArea-example"
        id="text-area-example"
        placeholder="i.e. ideas, inspirations, or concerns"
      />
    </FormField>
  </Form>
);
