// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const maskPhone = [
  { fixed: '(' },
  { length: 3, regexp: /^[0-9]{1,3}$/, placeholder: 'xxx' },
  { fixed: ')' },
  { fixed: ' ' },
  { length: 3, regexp: /^[0-9]{1,3}$/, placeholder: 'xxx' },
  { fixed: '-' },
  { length: 4, regexp: /^[0-9]{1,4}$/, placeholder: 'xxxx' },
];

export const TextInputGoodMaskedInputPreview = () => (
  <Form>
    <FormField
      label="Phone number"
      htmlFor="good-masked-phone"
      name="phone"
    >
      <MaskedInput
        id="good-masked-phone"
        name="phone"
        mask={maskPhone}
      />
    </FormField>
  </Form>
);
