import React, { forwardRef } from 'react';
import { LinkCard } from './LinkCard';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => (
  <LinkCard
    align="start"
    fill="horizontal"
    background="background-front"
    pad="large"
    round="small"
    ref={ref}
    {...rest}
  />
));
