import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Checkmark = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Checkmark" {...props}>
    <path d="M19.2618 4.83813C19.6341 4.43028 20.266 4.40145 20.6739 4.77368C21.0817 5.14598 21.1106 5.77789 20.7383 6.18579L9.75591 18.218C9.57161 18.4199 9.3124 18.5382 9.03911 18.5442C8.76568 18.5501 8.50159 18.4431 8.30864 18.2493L3.29106 13.2092C2.90146 12.8178 2.90354 12.1848 3.29497 11.7952C3.68641 11.4056 4.31942 11.4067 4.70903 11.7981L8.9854 16.095L19.2618 4.83813Z" fill="#000" />
  </StyledIcon>
));

Checkmark.displayName = 'Checkmark';

export { Checkmark };
