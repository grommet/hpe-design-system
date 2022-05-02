import React from 'react';

import { Blank } from 'grommet-icons';

export function IconExtend(props) {
  return <Blank {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1.5H9" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 7.5H5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Blank>;
}
