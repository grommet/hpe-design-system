import React, { useContext } from 'react';

import {
  Anchor,
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
      src: '/whatis/base.svg',
      alt: 'Base elements',
    },
    text: 'Base elements and styles form the rudiments of composition.',
  },
  {
    image: {
      src: '/whatis/combining.svg',
      alt: 'Combining elements',
    },
    text: 'Combining base elements to make templates.',
  },
  {
    image: {
      src: '/whatis/tools.svg',
      alt: 'Tools',
    },
    text: 'Use tools to help expand and connect elements.',
  },
  {
    image: {
      src: '/whatis/tailor.svg',
      alt: 'Tailored solution',
    },
    text: 'Tailor the code, resources, and tools into one solution.',
  },
  {
    image: {
      src: '/whatis/app.svg',
      alt: 'Application',
    },
    text: 'Put it all together to make an application.',
  },
];

export const WhatIs = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Box fill background="background-front">
      <Box
        fill
        pad={{
          horizontal: size !== 'small' ? 'xlarge' : 'large',
          top: 'large',
          bottom: 'medium',
        }}
        gap="xlarge"
        {...rest}
      >
        <Box justify="center" align="center" width="large" alignSelf="center">
          <Heading level={2} size="large">
            What is the HPE Design System?
          </Heading>
          <Paragraph size="xlarge" fill textAlign="center" margin="none">
            The HPE Design System was created to empower designers, developers,
            and others in contributing to an evolving design language that
            supports HPE's pursuit in making great customer app experiences.
            For other contexts check&nbsp;
            <Anchor
              href="https://h10014.www1.hpe.com/brand-central/main#our-brand"
            >
              HPE Brand Central
            </Anchor>.
          </Paragraph>
        </Box>
        <Grid columns={{ count: 'fit', size: '160px' }} justify="center" fill>
          {whatIsContent.map(({ image, text }, index) => (
              <Box key={`whatis-${index}`} width="120px">
                <Box width="120px" height="120px">
                  <Image
                    src={
                      darkMode.value
                        ? image.src.dark || image.src
                        : image.src.light || image.src
                    }
                    fit="contain"
                    alt={image.alt}
                  />
                </Box>
                <Paragraph size="small">{text}</Paragraph>
              </Box>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
