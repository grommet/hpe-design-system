import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const StatusUnknown = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="StatusUnknown" {...props}>
    <path d="M1 3C1 1.89543 1.89543 1 3 1L21 1C22.1046 1 23 1.89543 23 3V21C23 22.1046 22.1046 23 21 23L3 23C1.89543 23 1 22.1046 1 21L1 3Z" fill="#757575" />
  </StyledIcon>
));

StatusUnknown.displayName = 'StatusUnknown';

export { StatusUnknown };
