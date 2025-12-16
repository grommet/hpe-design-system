import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Left = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Left" {...props}>
    <path d="M15.7071 17.293C16.0976 17.6835 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6836 19.0976 14.293 18.7071L8.29304 12.7071C7.90252 12.3166 7.90252 11.6835 8.29304 11.293L14.293 5.29302C14.6836 4.90249 15.3166 4.90249 15.7071 5.29302C16.0976 5.68354 16.0976 6.31655 15.7071 6.70708L10.4141 12L15.7071 17.293Z" fill="#000" />
  </StyledIcon>
));

Left.displayName = 'Left';

export { Left };
