import React, { useContext } from 'react';

import {
  Box,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { useDarkMode } from '../../utils';

const whatIsContent = [
  {
    image: {
      src: {
        light: '/whatis/base.svg',
        dark: '/whatis/base-dark.svg',
      },
      alt: 'Base elements',
    },
    text: 'Base elements and styles form the rudiments of composition.',
  },
  {
    image: {
      src: {
        light: '/whatis/combining.svg',
        dark: '/whatis/combining-dark.svg',
      },
      alt: 'Combining elements',
    },
    text: 'Combining base elements to make templates.',
  },
  {
    image: {
      src: {
        light: '/whatis/tools.svg',
        dark: '/whatis/tools-dark.svg',
      },
      alt: 'Tools',
    },
    text: 'Use tools to help expand and connect elements.',
  },
  {
    image: {
      src: {
        light: '/whatis/tailor.svg',
        dark: '/whatis/tailor-dark.svg',
      },
      alt: 'Tailored solution',
    },
    text: 'Tailor the code, resources, and tools into one solution.',
  },
  {
    image: {
      src: {
        light: '/whatis/app.svg',
        dark: '/whatis/app-dark.svg',
      },
      alt: 'Application',
    },
    text: 'Put it all together to make an application.',
  },
];

export const WhatIs = () => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Box
      fill
      pad={{
        horizontal: size !== 'small' ? 'xlarge' : 'large',
        top: 'large',
        bottom: 'medium',
      }}
      background="background-front"
      gap="xlarge"
    >
      <Box justify="center" align="center" width="large" alignSelf="center">
        <Heading level={2} size="large">
          What is the HPE Design System?
        </Heading>
        <Paragraph size="xlarge" fill textAlign="center" margin="none">
          The HPE Design System was created to empower designers, developers,
          and others in contributing to an evolving design language that
          supports HPE's pursuit in making great customer experiences.
        </Paragraph>
      </Box>
      <Grid columns={{ count: 'fit', size: '160px' }} justify="center" fill>
        {whatIsContent.map(({ image, text }) => {
          return (
            <Box key={image} width="120px">
              <Box width="120px" height="120px">
                <Image
                  src={
                    darkMode.value
                      ? image.src.dark || image.src
                      : image.src.light || image.src
                  }
                  fit="contain"
                />
              </Box>
              <Paragraph size="small">{text}</Paragraph>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
