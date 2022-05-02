import React from 'react';

import { Blank } from 'grommet-icons';

export function IconSquare(props) {
  return <Blank {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#000000" fillRule="nonzero">
        <rect x="0" y="0" width="24" height="24" rx="1" />
      </g>
    </g>
  </Blank>;
}
