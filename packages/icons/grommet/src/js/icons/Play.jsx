import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Play = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Play" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2 3.70009C2.00033 2.17539 3.63875 1.21153 4.97168 1.95204L19.9121 10.2528C21.2833 11.015 21.2834 12.9869 19.9121 13.7489L4.97168 22.0497C3.63898 22.7897 2.00073 21.8259 2 20.3017V3.70009ZM4 20.3017L18.9404 12.0009L4 3.70009V20.3017Z" fill="#000" />
  </StyledIcon>
));

Play.displayName = 'Play';

export { Play };
