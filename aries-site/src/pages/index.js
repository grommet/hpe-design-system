import React, { useContext } from 'react';
import {
  Box,
  Card,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
  Stack,
} from 'grommet';

import PropTypes from 'prop-types';

import { Meta } from '../components';
import {
  Community,
  Featured,
  Hero,
  Highlights,
  Quote,
  Video,
  WhatIs,
} from '../components/home';
import { Layout } from '../layouts';
import { getPageDetails } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

// These make a box width limited to xxlarge but centered
const widthProps = { width: { max: 'xxlarge' }, margin: 'auto' };

const Intro = ({ children }) => {
  const size = useContext(ResponsiveContext);
  return size === 'small' ? (
    <Box>
      <Hero height={{ max: '292px' }} margin={{ bottom: '-24px' }} />
      <Card background="none" elevation="none">
        {children}
      </Card>
    </Box>
  ) : (
    <Stack guidingChild="last">
      <Box
        align="start"
        justify="between"
        pad={{ horizontal: calcPad(size) }}
        direction="row"
        fill
        {...widthProps}
      >
        <Box width="small" />
        <Hero />
      </Box>
      <Box height={{ min: 'medium' }} justify="center" {...widthProps}>
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

  return (
    <Layout title={title} isLanding pad={{}} width={{}}>
      <Meta title={title} description={pageDetails.seoDescription} />
      <Box>
        <Intro>
          <Box pad={{ horizontal: calcPad(size) }} width={{ max: '900px' }}>
            {size === 'xxxsmall' && (
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
          <Featured {...widthProps} />
        </Stack>
        <WhatIs {...widthProps} />
        <Video {...widthProps} />
        <Highlights {...widthProps} />
        <Quote />
        <Community {...widthProps} />
      </Box>
    </Layout>
  );
};

export default Index;
