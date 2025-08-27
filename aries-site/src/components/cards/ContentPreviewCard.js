import React, { forwardRef } from 'react';
import { ThemeContext } from 'grommet';
import { LinkCard } from './LinkCard';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => (
  <ThemeContext.Extend
    value={{
      card: {
        container: {
          elevation: 'none',
        },
        hover: {
          container: {
            background: 'background-contrast',
            elevation: 'none',
          },
        },
      },
    }}
  >
    <LinkCard
      align="start"
      fill="horizontal"
      background="background-front"
      pad="large"
      round="small"
      ref={ref}
      {...rest}
    />
  </ThemeContext.Extend>
));
