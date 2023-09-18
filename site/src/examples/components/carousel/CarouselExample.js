import React from 'react';
import { Box, Carousel, Image } from 'grommet';

export const CarouselExample = () => (
  <Carousel>
    <Box height="medium" width="large">
      <Image
        alt={`Photo of a woman sitting on a couch and using her laptop 
        during the day`}
        src="/woman-glc.jpeg"
      />
    </Box>
    <Box height="medium" width="large">
      <Image
        alt="Man working from home at a desk by a window with a baby on his lap"
        src="/man-wfh.jpeg"
      />
    </Box>
    <Box height="medium" width="large">
      <Image
        alt="Woman and man standing in a room of HPE servers"
        src="/woman-man-server-room.jpeg"
      />
    </Box>
  </Carousel>
);
