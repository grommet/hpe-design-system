// eslint-disable-next-line import/no-unresolved
import * as tokens from 'hpe-design-tokens/docs';
import React from 'react';

import { Box, Heading, PageContent, Paragraph } from 'grommet';

export const WhatIs = ({ ...rest }) => (
  <PageContent background={{ fill: 'horizontal', color: 'background-front' }}>
    <Box
      fill
      pad={{ vertical: '192px' }}
      gap="3xlarge"
      {...rest}
    >
      <Box
        justify="center"
        align="center"
        width="xlarge"
        alignSelf="center"
      >
        <Heading
          level={2}
          size="large"
          textAlign="center"
          style={{
            fontSize: tokens.dimension['hpe.text.4xlarge.fontSize']?.$value,
            lineHeight: tokens.dimension['hpe.text.4xlarge.lineHeight']?.$value,
          }}
        >
          What is the HPE Design System?
        </Heading>
        <Paragraph size="xxlarge" fill textAlign="center" margin="none">
          The HPE Design System was created to empower designers, developers,
          and others in contributing to an evolving design language that
          supports HPE's pursuit in making great customer app experiences.
        </Paragraph>
      </Box>
    </Box>
  </PageContent>
);
