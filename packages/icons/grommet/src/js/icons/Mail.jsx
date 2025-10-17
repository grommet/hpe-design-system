import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Mail = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Mail" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 3C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6C1 4.34315 2.34315 3 4 3H20ZM13.5439 14.2402C12.5939 14.8103 11.4061 14.8103 10.4561 14.2402L3 9.76562V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V9.76562L13.5439 14.2402ZM4 5C3.44772 5 3 5.44772 3 6V7.43359L11.4854 12.5254C11.802 12.7154 12.198 12.7154 12.5146 12.5254L21 7.43359V6C21 5.44772 20.5523 5 20 5H4Z" fill="#000" />
  </StyledIcon>
));

Mail.displayName = 'Mail';

export { Mail };
