import React from 'react';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { AnchorGroup } from 'aries-core';

export default {
  title: 'AnchorGroup',
};

export const simple = () => (
  <Grommet theme={hpe} full>
    <Box background="white" fill>
      <Box direction="row-responsive">
        <AnchorGroup
          items={[
            { label: 'Dashboard' },
            { label: 'Feature' },
            { label: 'Automation' },
            { label: 'Activity' },
          ]}
        />
      </Box>
    </Box>
  </Grommet>
);
