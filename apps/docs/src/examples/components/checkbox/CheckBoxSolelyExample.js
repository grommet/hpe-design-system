// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { CheckBox } from 'grommet';

export const CheckBoxSolelyExample = () => {
  const [checked, setChecked] = useState(true);
  return (
    <CheckBox
      name="solo-checkbox"
      label="Choice"
      id="solo-checkbox"
      checked={checked}
      pad="none"
      onChange={event => setChecked(event.target.checked)}
    />
  );
};
