import React from 'react';
import { Box, Carousel } from 'grommet';
import { Attraction, TreeOption, Car } from 'grommet-icons';

export const CarouselExample = () => (
  <Carousel>
    <Box pad="xlarge">
      <Attraction size="xlarge" />
    </Box>
    <Box pad="xlarge">
      <TreeOption size="xlarge" />
    </Box>
    <Box pad="xlarge">
      <Car size="xlarge" />
    </Box>
  </Carousel>
);
