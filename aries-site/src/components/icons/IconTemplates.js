import React from 'react';

import { Blank } from 'grommet-icons';

export const IconTemplates = props => (
  <Blank {...props}>
    <g stroke="#000000" strokeWidth="1" fill="none">
      <rect x="4" y="4" width="4" height="4" rx="2" />
      <rect x="11" y="4" width="12" height="5" rx="1" />
      <path
        // eslint-disable-next-line max-len
        d="M4,13 L15,13 M4,21 L12,21 M4,17 L7,17 M10,17 L19,17 M18,13 L23,13 M0.5,23.5 L0.5,4.33333333 C0.5,2.21624179 2.26527727,0.5 4.44285714,0.5 L23.5,0.5 L23.5,0.5"
        strokeLinecap="round"
      />
    </g>
  </Blank>
);
