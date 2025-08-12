import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
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
  // Quote,
  WhatIs,
} from '../components/home';
import { getPageDetails } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);

// These make a box width limited to xxlarge but centered
const widthProps = {};

const StyledBox = styled(Box)`

  }
`;

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

const Index = () => (
  <>
    <Meta title={title} description={pageDetails.seoDescription} />
    <Box>
      <Stack guidingChild="last" interactiveChild="last">
        <Box
          background={{ image: 'datawave-white-3', opacity: 'weak' }}
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, black, 90%, transparent)',
            maskImage:
              // eslint-disable-next-line max-len
              'linear-gradient(to bottom, transparent, 5%, black, 90%, transparent)',
          }}
          height="large"
        >
          <Box height="large" />
        </Box>
        <StyledBox pad={{ vertical: 'xlarge' }} gap="xlarge">
          <Box>
            <PageContent>
              <Box align="start" gap="medium">
                <Heading margin="none">Built for the enterprise by HPE</Heading>
                <Paragraph color="text-weak" size="xlarge" margin="none">
                  Empower designers and developers to quickly collaborate and
                  create accessible enterprise experiences for HPE.
                </Paragraph>
                <Button label="Get started" primary />
              </Box>
            </PageContent>
          </Box>
          <PageContent>
            <Box
              fill="horizontal"
              border={{ side: 'bottom', color: 'border-weak' }}
            />
          </PageContent>
          <Featured {...widthProps} />
        </StyledBox>
      </Stack>
      <PageContent>
        <Box
          fill="horizontal"
          border={{ side: 'bottom', color: 'border-weak' }}
        />
      </PageContent>
      <WhatIs {...widthProps} />
      <Highlights {...widthProps} />
      <PageContent>
        <Box
          fill="horizontal"
          border={{ side: 'bottom', color: 'border-weak' }}
        />
      </PageContent>
      <Community {...widthProps} />
    </Box>
  </>
);

export default Index;
