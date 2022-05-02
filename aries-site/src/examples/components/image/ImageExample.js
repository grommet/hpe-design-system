import React from 'react';
import { Box, Image } from 'grommet';

export function ImageExample() {
  return <Box height="medium">
    <Image
      fit="contain"
      src="/cards.svg"
      alt={`Playing cards representing the HPE Design System are spread across 
      a surface and depict the four pillars of the Design System: Foundation, 
      Components, Templates, and Extend.`}
    />
  </Box>;
}
