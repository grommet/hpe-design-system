import React, { forwardRef, useState } from 'react';
import { StyledCard } from './ContentCard';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <StyledCard
      align="start"
      fill="horizontal"
      background="background-front"
      elevation={isFocused ? 'large' : 'medium'}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      pad="large"
      round="small"
      ref={ref}
      {...rest}
    />
  );
});
