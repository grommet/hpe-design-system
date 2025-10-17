import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const CircleFill = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="CircleFill" {...props}>
    <path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="#000" />
  </StyledIcon>
));

CircleFill.displayName = 'CircleFill';

export { CircleFill };
