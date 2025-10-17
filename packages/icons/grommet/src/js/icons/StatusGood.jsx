import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const StatusGood = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="StatusGood" {...props}>
    <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0Z" fill="#009A71" />
  </StyledIcon>
));

StatusGood.displayName = 'StatusGood';

export { StatusGood };
