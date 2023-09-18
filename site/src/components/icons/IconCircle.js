import React from 'react';

import { Blank } from 'grommet-icons';

export const IconCircle = props => (
  <Blank {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#000000" fillRule="nonzero">
        <circle cx="12" cy="12" r="12" />
      </g>
    </g>
  </Blank>
);
