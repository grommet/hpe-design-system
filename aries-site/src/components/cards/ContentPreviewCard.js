import React, { useState } from 'react';
import { StyledTile } from './ContentCard';

export const ContentPreviewCard = ({ ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <StyledTile
      align="start"
      background="background-front"
      elevation={isFocused ? 'medium' : 'small'}
      fill
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      pad="large"
      round="small"
      {...rest}
    />
  );
};
