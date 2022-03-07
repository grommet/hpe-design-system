import React, { useContext } from 'react';
import {
  Box,
  Card,
  Grid,
  Heading,
  PageContent,
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
  const val = !['xsmall', 'small'].includes(size) ? 'xlarge' : 'large';
  return val;
};

// These make a box width limited to xxlarge but centered
const widthProps = { margin: 'auto' };

const Intro = ({ children }) => {
  const size = useContext(ResponsiveContext);
  return ['xsmall', 'small'].includes(size) ? (
    <PageContent>
      <Hero height={{ max: '292px' }} margin={{ bottom: '-24px' }} />
      <Card background="none" elevation="none">
        {children}
      </Card>
    </PageContent>
  ) : (
    <Stack guidingChild="last">
      <PageContent
        align="start"
        justify="between"
        direction="row"
        fill
        {...widthProps}
      >
        <Box width="small" />
        <Hero />
      </PageContent>
      <PageContent height={{ min: 'medium' }} justify="center" {...widthProps}>
        <Grid
          gap="large"
          columns={
            ['xsmall', 'small'].includes(size) ? ['auto'] : ['3/4', 'auto']
          }
        >
          <Card background="none" elevation="none">
            {children}
          </Card>
          {!['xsmall', 'small'].includes(size) && (
            <Card background="none" elevation="none" height="small" />
          )}
        </Grid>
      </PageContent>
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
          <Box width={{ max: '700px' }}>
            {size === 'xxxsmall' && (
              <Card background="none" elevation="none" height="small" />
            )}
            <Heading margin="none" size="large">
              Design, develop and deliver
            </Heading>
            <Paragraph size="xlarge">
              Empower designers and developers to quickly create accessible
              enterprise app experiences.
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
