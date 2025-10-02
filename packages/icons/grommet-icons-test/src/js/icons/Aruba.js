import React, { forwardRef } from 'react';

import { StyledIcon } from '../StyledIcon';

const Aruba = forwardRef((props, ref) => (
  <StyledIcon ref={ref} viewBox="0 0 24 24" a11yTitle="Aruba" {...props}>
    <path fill="#FF8300" fillRule="evenodd" d="M12.11 17.302c-3.074 0-5.602-2.46-5.602-5.465 0-3.006 2.528-5.465 5.602-5.465 3.074 0 5.601 2.46 5.601 5.465s-2.527 5.465-5.601 5.465zM12.11 2C6.508 2 2 6.44 2 11.837c0 5.465 4.508 9.836 10.11 9.836 2.323 0 4.44-.751 6.148-2.049 1.025 1.708 3.962 2.05 3.962 2.05v-9.837C22.22 6.44 17.71 2 12.11 2z" />
  </StyledIcon>
));

Aruba.displayName = 'Aruba';

export { Aruba };
