import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  Image,
  PageContent,
  Paragraph,
  Stack,
  Text,
  ResponsiveContext,
} from 'grommet';
import { TextEmphasis } from 'aries-core';

export const Quote = () => {
  const size = useContext(ResponsiveContext);

  return (
    <PageContent
      fill
      direction={
        !['xsmall', 'small', 'medium'].includes(size) ? 'row' : 'column'
      }
      gap="xlarge"
      justify="center"
      pad="3xlarge"
      overflow="hidden"
      background={{ fill: 'horizontal', color: 'background-front' }}
    >
      <Box
        align="center"
        justify="center"
        gap="medium"
        pad={{ left: '3xlarge' }}
        flex={false}
      >
        <Avatar src="/static/images/t_harms_bio_image.png" size="149px" />
        <Box align="center">
          <TextEmphasis size="xxlarge">Tim Harms</TextEmphasis>
          <Text size="xxlarge">Creative Director, HPE Global Brand</Text>
        </Box>
      </Box>
      <Stack alignSelf="center">
        <Box pad="medium" margin="xsmall" width={{ max: 'large' }}>
          <Paragraph size="xxlarge" textAlign="center">
            The HPE Design System empowers developers, designers and others to
            create consistent, accessible and flexible interfaces.
          </Paragraph>
        </Box>
        <Box fill align="end" justify="end" />
        <Box fill justify="between" pad={{ top: 'xlarge', bottom: 'xlarge' }}>
          <Box width={{ max: 'fit-content' }}>
            <Image
              src="/static/images/quote.svg"
              width="40px"
              height="40px"
              alt="start of quote"
            />
          </Box>
          <Box
            width={{ max: 'fit-content' }}
            alignSelf="end"
          >
            <Image
              src="/static/images/quote.svg"
              width="40px"
              height="40px"
              style={{ transform: 'rotate(180deg)' }}
              alt="end of quote"
            />
          </Box>
        </Box>
      </Stack>
    </PageContent>
  );
};
