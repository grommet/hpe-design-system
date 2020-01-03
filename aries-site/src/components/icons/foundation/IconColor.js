import React from 'react';

import { Blank } from 'grommet-icons';

export const IconColor = props => (
  <Blank {...props}>
    <g stroke="none" strokeWidth="1" fill="none">
      <rect stroke="#000000" x="0.5" y="0.5" width="23" height="23" rx="3" />
      <circle
        fill="#000000"
        fillRule="nonzero"
        opacity="0.5"
        cx="9.33333333"
        cy="12"
        r="4"
      />
      <circle
        fill="#000000"
        fillRule="nonzero"
        opacity="0.2"
        cx="14.6666667"
        cy="12"
        r="4"
      />
    </g>
  </Blank>
);
