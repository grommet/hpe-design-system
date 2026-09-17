// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Iteration } from '@hpe-design/icons-grommet';
import { SelectorGroup, Selector } from '@shared/aries-core';

export const SelectorMutli = () => {
  return (
    <SelectorGroup multiple>
      <Selector
        value="option 1"
        title="Aruba AP-635 Wifi 6E Access Point"
        description="36 devices"
        icon={<Iteration height="medium" />}
      />
    </SelectorGroup>
  );
};
