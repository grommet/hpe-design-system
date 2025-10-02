import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const BlockQuote = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="BlockQuote" {...props}>
    <path d="M.78 8.89c0-3.07 1.53-4.3 4.3-4.34L5.38 6C3.78 6.17 3 7 3.1 8.31h1.44V12H.78zm5.9 0c0-3.07 1.53-4.3 4.3-4.34l.3 1.45C9.68 6.17 8.89 7 9 8.31h1.44V12H6.68zm10.26 6.22c0 3.07-1.53 4.3-4.3 4.34L12.35 18c1.6-.16 2.39-1 2.28-2.3h-1.45V12h3.76zm5.9 0c0 3.07-1.53 4.3-4.3 4.34l-.3-1.45c1.6-.16 2.39-1 2.28-2.3h-1.44V12h3.76z" />
  </StyledIcon>
));

BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
