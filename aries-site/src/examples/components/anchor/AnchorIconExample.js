import React from 'react';
import { Anchor } from 'grommet';
import { NewWindow } from '@hpe-design/icons-grommet';

export const AnchorIconExample = () => (
  <Anchor
    label="Submit a support request"
    icon={<NewWindow />}
    target="_blank"
    rel="noopener norefferer"
    href="#"
    reverse
  />
);
