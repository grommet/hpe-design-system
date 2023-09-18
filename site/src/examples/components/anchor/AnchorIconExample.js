import React from 'react';
import { Anchor } from 'grommet';
import { ShareRounded } from 'grommet-icons';

export const AnchorIconExample = () => (
  <Anchor
    label="Submit a support request"
    icon={<ShareRounded />}
    target="_blank"
    rel="noopener norefferer"
    href="#"
    reverse
  />
);
