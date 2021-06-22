import React from 'react';
import { Box, Carousel, Image } from 'grommet';

export const CarouselExample = () => (
  <Carousel>
    <Box height="medium" width="large">
      <Image
        alt="Golden Gate Bridge"
        src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      />
    </Box>
    <Box height="medium" width="large">
      <Image
        alt="Ocean crashing on San Diego shore"
        src="https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      />
    </Box>
    <Box height="medium" width="large">
      <Image
        alt="Bird's eye view of New York City"
        src="https://images.unsplash.com/photo-1513107358949-b21c1c3906eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      />
    </Box>
  </Carousel>
);
