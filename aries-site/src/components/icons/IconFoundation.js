import React from 'react';

import { Blank } from 'grommet-icons';

export const IconFoundation = props => (
  <Blank {...props}>
    <g stroke="#000000" strokeWidth="1" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="2" />
      <line x1="6.5" y1="0.5" x2="6.5" y2="23.5" />
      <line x1="0.5" y1="6.5" x2="23.5" y2="6.5" />
    </g>
  </Blank>
);
