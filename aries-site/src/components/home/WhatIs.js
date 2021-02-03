import React, { useContext } from 'react';

import {
  Box,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from 'grommet';

const whatIsContent = [
  {
    image: '/whatis/base.svg',
    text: 'Base elements and styles form the rudiments of composition.',
  },
  {
    image: '/whatis/combining.svg',
    text: 'Combining base elements to make templates.',
  },
  {
    image: '/whatis/tools.svg',
    text: 'Use tools to help expand and connect elements.',
  },
  {
    image: '/whatis/tailor.svg',
    text: 'Tailor the code, resources, and tools into one solution.',
  },
  {
    image: '/whatis/app.svg',
    text: 'Put it all together to make an application.',
  },
];

export const WhatIs = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill
      pad={{
        horizontal: size !== 'small' ? 'xlarge' : 'large',
        top: 'large',
        bottom: 'medium',
      }}
      background="background-front"
      gap="large"
    >
      <Box justify="center" align="center" width="large" alignSelf="center">
        <Heading>What is the HPE Design System?</Heading>
        <Paragraph size="xlarge" fill textAlign="center">
          The HPE Design System was created to empower designers, developers,
          and others in contributing to an evolving design language that
          supports HPE's pursuit in making great customer experiences.
        </Paragraph>
      </Box>
      <Grid columns={{ count: 5, size: 'auto' }} justify="center" fill>
        {whatIsContent.map(({ image, text }) => (
          <Box key={image} width="120px">
            <Box width="120px" height="120px">
              <Image src={image} fit="contain" />
            </Box>
            <Paragraph size="small">{text}</Paragraph>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
