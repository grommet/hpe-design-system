import React from 'react';

import { Iteration } from '@hpe-design/icons-grommet';
import { SelectorGroup, Selector } from 'aries-core';

export const SelectorSingle = () => {
  return (
    <SelectorGroup>
      <Selector
        value="option 1"
        title="Aruba AP-635 Wifi 6E Access Point"
        description="36 devices"
        icon={<Iteration height="medium" />}
      />
    </SelectorGroup>
  );
};
