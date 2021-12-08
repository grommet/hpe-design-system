import React, { forwardRef } from 'react';
import { Card } from 'grommet';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => (
  <Card
    align="start"
    fill="horizontal"
    background="background-front"
    pad="large"
    round="small"
    ref={ref}
    {...rest}
  />
));
