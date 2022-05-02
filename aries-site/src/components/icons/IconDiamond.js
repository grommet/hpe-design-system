import React from 'react';

import { Blank } from 'grommet-icons';

export function IconDiamond(props) {
  return <Blank {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#000000" fillRule="nonzero">
        <path
          // eslint-disable-next-line max-len
          d="M10.58578,1.414214 C11.36684,0.633166 12.63316,0.633166 13.41422,1.414214 L22.5858,10.58578 C23.3668,11.36684 23.3668,12.63316 22.5858,13.41422 L13.41422,22.5858 C12.63316,23.3668 11.36684,23.3668 10.58578,22.5858 L1.414214,13.41422 C0.633166,12.63316 0.633166,11.36684 1.414214,10.58578 L10.58578,1.414214 Z"
        />
      </g>
    </g>
  </Blank>;
}
