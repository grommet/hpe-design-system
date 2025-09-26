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
import { useDarkMode } from '../../utils';

export const Quote = () => {
  const darkMode = useDarkMode();
  const size = useContext(ResponsiveContext);

  const quoteLines = `/static/images/quote-lines${
    darkMode.value ? '-dark' : ''
  }.svg`;

  return (
    <PageContent
      direction={
        !['xsmall', 'small', 'medium'].includes(size) ? 'row' : 'column'
      }
      gap="xlarge"
      justify="center"
      pad="xlarge"
      overflow="hidden"
    >
      <Box
        align="center"
        justify="center"
        gap="medium"
        background={{
          image: `url(${quoteLines})`,
          size: 'auto',
          position: 'top left',
        }}
        pad={{ left: '3xlarge' }}
        flex={false}
      >
        <Avatar src="/static/images/t_harms_bio_image.png" size="149px" />
        <Box align="center">
          <TextEmphasis size="xlarge">Tim Harms</TextEmphasis>
          <Text size="xlarge">Creative Director, HPE Global Brand</Text>
        </Box>
      </Box>
      <Stack alignSelf="center">
        <Box
          border={{ size: '3px', color: 'text-weak' }}
          pad="medium"
          margin="xsmall"
          width={{ max: '678px' }}
        >
          <Paragraph size="xxlarge" textAlign="center">
            The HPE Design System empowers developers, designers and others to
            create consistent, accessible and flexible interfaces.
          </Paragraph>
        </Box>
        <Box fill align="end" justify="end">
          <Image
            src={quoteLines}
            margin={{ right: '-138px' }}
            alt="quote lines"
          />
        </Box>
        <Box fill justify="between" pad={{ top: 'xlarge', bottom: 'xlarge' }}>
          <Box
            background="background-back"
            width={{ max: 'fit-content' }}
            style={{ marginLeft: '-8px' }}
          >
            <Image
              src="/static/images/quote.svg"
              width="40px"
              height="40px"
              alt="start of quote"
            />
          </Box>
          <Box
            background="background-back"
            width={{ max: 'fit-content' }}
            alignSelf="end"
            style={{ marginRight: '-8px' }}
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
