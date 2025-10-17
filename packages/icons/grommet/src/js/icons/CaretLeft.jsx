import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const CaretLeft = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="CaretLeft" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.5863 3.00017C15.8462 1.74047 18.0003 2.63253 18.0003 4.41424V19.5861C18.0001 21.3676 15.8461 22.2596 14.5863 21.0002L7.00031 13.4142C6.21928 12.6332 6.21931 11.3672 7.00031 10.5861L14.5863 3.00017ZM8.41438 12.0002L16.0003 19.5861V4.41424L8.41438 12.0002Z" fill="#000" />
  </StyledIcon>
));

CaretLeft.displayName = 'CaretLeft';

export { CaretLeft };
