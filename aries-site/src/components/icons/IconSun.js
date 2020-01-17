/* eslint-disable max-len */
import React from 'react';

import { Blank } from 'grommet-icons';

export const IconSun = props => (
  <Blank {...props}>
    <circle cx="12" cy="12" r="5" />
    <g stroke="#000000" strokeWidth="1" fill="none">
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="22"
        x2="12"
        y2="20"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="21"
        y1="13"
        x2="21"
        y2="11"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(21.000000, 12.000000) rotate(90.000000) translate(-21.000000, -12.000000) "
      />
      <line
        x1="3"
        y1="13"
        x2="3"
        y2="11"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(3.000000, 12.000000) rotate(90.000000) translate(-3.000000, -12.000000) "
      />
      <line
        x1="5.63603897"
        y1="6.63603897"
        x2="5.63603897"
        y2="4.63603897"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(5.636039, 5.636039) rotate(-45.000000) translate(-5.636039, -5.636039) "
      />
      <line
        x1="18.363961"
        y1="19.363961"
        x2="18.363961"
        y2="17.363961"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(18.363961, 18.363961) rotate(-45.000000) translate(-18.363961, -18.363961) "
      />
      <line
        x1="18.363961"
        y1="6.63603897"
        x2="18.363961"
        y2="4.63603897"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(18.363961, 5.636039) rotate(45.000000) translate(-18.363961, -5.636039) "
      />
      <line
        x1="5.63603897"
        y1="19.363961"
        x2="5.63603897"
        y2="17.363961"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(5.636039, 18.363961) rotate(45.000000) translate(-5.636039, -18.363961) "
      />
    </g>
  </Blank>
);
