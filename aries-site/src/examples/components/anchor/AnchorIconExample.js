import React from 'react';
import { Anchor } from 'grommet';
import { Share } from '@hpe-design/icons-grommet';

export const AnchorIconExample = () => (
  <Anchor
    label="Submit a support request"
    icon={<Share />}
    target="_blank"
    rel="noopener norefferer"
    href="#"
    reverse
  />
);
