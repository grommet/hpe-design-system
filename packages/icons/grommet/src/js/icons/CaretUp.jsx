import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const CaretUp = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="CaretUp" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5304 6.65528C11.316 6.01468 12.475 6.0608 13.2072 6.79298L20.7931 14.3789C22.0526 15.6388 21.1605 17.7926 19.3791 17.793H4.20718C2.42545 17.7929 1.53334 15.6388 2.79311 14.3789L10.3791 6.79298L10.5304 6.65528ZM4.20718 15.793H19.3791L11.7931 8.20704L4.20718 15.793Z" fill="#000" />
  </StyledIcon>
));

CaretUp.displayName = 'CaretUp';

export { CaretUp };
