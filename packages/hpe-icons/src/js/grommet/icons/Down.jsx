import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Down = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Down" {...props}>
    <path d="M17.293 8.29302C17.6835 7.90249 18.3166 7.90249 18.7071 8.29302C19.0976 8.68354 19.0976 9.31655 18.7071 9.70708L12.7071 15.7071C12.3166 16.0976 11.6835 16.0976 11.293 15.7071L5.29302 9.70708C4.90249 9.31655 4.90249 8.68354 5.29302 8.29302C5.68354 7.90249 6.31655 7.90249 6.70708 8.29302L12 13.586L17.293 8.29302Z" fill="#000" />
  </StyledIcon>
));

Down.displayName = 'Down';

export { Down };
