import React, { useContext, useRef, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
  Stack,
  Video,
} from 'grommet';

import PropTypes from 'prop-types';

import { Meta } from '../components';
import {
  Community,
  Featured,
  Highlights,
  Quote,
  WhatIs,
} from '../components/home';
import { Layout } from '../layouts';
import { getPageDetails, useDarkMode } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

// <Box background={backgroundImage} fill pad={{ right: calcPad(size) }} />
const Intro = ({ children }) => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();
  const image = `/home${darkMode.value ? '-dark' : ''}.svg`;

  return (
    <Stack guidingChild="last">
      <Box
        align="start"
        justify="between"
        pad={{ horizontal: calcPad(size) }}
        direction="row"
      >
        {size !== 'small' && <Box width="small" />}
        <Box>
          <Image src={image} fit="contain" />
        </Box>
      </Box>
      <Box height={{ min: 'medium' }} justify="center">
        <Grid
          gap="large"
          columns={size === 'small' ? ['auto'] : ['3/4', 'auto']}
        >
          <Card background="none" elevation="none">
            {children}
          </Card>
          {size !== 'small' && (
            <Card background="none" elevation="none" height="small" />
          )}
        </Grid>
      </Box>
    </Stack>
  );
};

Intro.propTypes = {
  children: PropTypes.node,
};

const Index = () => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();
  const videoRef = useRef(null);

  const [videoEnabled, setVideoEnabled] = useState(false);

  return (
    <Layout title={title} isLanding pad={{}} width={{}}>
      <Meta title={title} description={pageDetails.seoDescription} />
      <Box>
        <Intro>
          <Box pad={calcPad(size)} width={{ max: '900px' }}>
            {size === 'small' && (
              <Card background="none" elevation="none" height="small" />
            )}
            <Heading margin="none" size="large">
              Design, develop and deliver
            </Heading>
            <Paragraph size="xlarge">
              Created to empower designers, developers, and others to quickly
              create accessible user experiences
            </Paragraph>
          </Box>
        </Intro>
        <Stack guidingChild="last">
          <Box background="background-front" margin={{ top: 'xlarge' }} fill />
          <Featured />
        </Stack>
        <WhatIs />
        <Box
          fill
          onClick={() => {
            if (!videoEnabled) {
              setVideoEnabled(true);
              videoRef.current.play();
            }
          }}
        >
          <Video
            ref={videoRef}
            controls={videoEnabled ? 'over' : false}
            poster={`/static/images/video-placeholder${
              darkMode.value ? '-dark' : ''
            }.png`}
          >
            <source
              src="https://d3hq6blov2iije.cloudfront.net/media/HPE+Design+System-v3.mp4"
              type="video/mp4"
            />
          </Video>
        </Box>
        <Highlights />
        <Quote />
        <Community />
      </Box>
    </Layout>
  );
};

export default Index;
