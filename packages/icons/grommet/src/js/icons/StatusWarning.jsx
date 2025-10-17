import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const StatusWarning = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="StatusWarning" {...props}>
    <path d="M10.4683 1.44665C11.0994 0.18445 12.9006 0.184449 13.5317 1.44665L23.3192 21.0216C23.8885 22.1603 23.0606 23.5 21.7875 23.5H2.21252C0.939473 23.5 0.111482 22.1603 0.680806 21.0216L10.4683 1.44665Z" fill="#D36D00" />
  </StyledIcon>
));

StatusWarning.displayName = 'StatusWarning';

export { StatusWarning };
