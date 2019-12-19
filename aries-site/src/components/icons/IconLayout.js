import React from 'react';

import { Blank } from 'grommet-icons';

export const IconLayout = props => (
  <Blank {...props}>
    <g stroke="#000000" strokeWidth="1" strokeLinecap="square" fill="none">
      <rect x="0.5" y="0.5" width="23" height="23" rx="2" />
      <line x1="5.5" y1="0.5" x2="5.5" y2="23.5" />
      <line x1="8.5" y1="14.5" x2="20.5" y2="14.5" />
      <line x1="8.5" y1="19.5" x2="20.5" y2="19.5" />
      <line x1="8.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="8.5" y1="4.5" x2="20.5" y2="4.5" />
    </g>
  </Blank>
);
