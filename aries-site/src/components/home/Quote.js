import React from 'react';
import { Avatar, Box, Paragraph, Stack, Text } from 'grommet';

export const Quote = () => (
  <Box direction="row" gap="large" justify="center" pad="large">
    <Box align="center" justify="center" gap="medium">
      <Avatar src="/static/images/t_harms_bio_image.png" size="149px" />
      <Box align="center">
        <Text size="xlarge" weight="bold">
          Tim Harms
        </Text>
        <Text size="xlarge">HPE Head of Brand</Text>
      </Box>
    </Box>
    <Stack>
      <Box
        border={{ size: '3px', color: 'text-weak' }}
        pad="medium"
        margin={{ horizontal: 'small' }}
        width={{ max: '678px' }}
      >
        <Paragraph size="xxlarge" textAlign="center">
          The HPE Design System empowers developers, designers and others to
          create consistent, accessible and flexible interfaces
        </Paragraph>
      </Box>
      <Box fill>
        <Text
          size="124px"
          weight="bold"
          color="brand"
          style={{ marginLeft: '-15px' }}
        >
          &ldquo;
        </Text>
        <Text
          size="124px"
          color="brand"
          weight="bold"
          alignSelf="end"
          textAlign="end"
          style={{ marginRight: '-15px' }}
        >
          &rdquo;
        </Text>
      </Box>
    </Stack>
  </Box>
);
