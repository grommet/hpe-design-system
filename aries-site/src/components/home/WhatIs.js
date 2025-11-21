import React from 'react';

import { Box, Heading, PageContent, Paragraph } from 'grommet';

export const WhatIs = ({ ...rest }) => (
  <PageContent background={{ fill: 'horizontal', color: 'background-front' }}>
    <Box fill pad={{ vertical: '3xlarge' }} gap="3xlarge" {...rest}>
      <Box align="center" width="xlarge" alignSelf="center">
        <Heading level={2} size="small" margin="large" textAlign="center">
          What is the HPE Design System?
        </Heading>
        <Paragraph size="xxlarge" textAlign="center">
          The HPE Design System was created to empower designers, developers,
          and others in contributing to an evolving design language that
          supports HPE's pursuit in making great customer app experiences.
        </Paragraph>
      </Box>
    </Box>
  </PageContent>
);
