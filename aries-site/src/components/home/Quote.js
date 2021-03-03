import React from 'react';
import { Avatar, Box, Image, Paragraph, Stack, Text } from 'grommet';
import { useDarkMode } from '../../utils';

export const Quote = () => {
  const darkMode = useDarkMode();

  const quoteLines = `/static/images/quote-lines${
    darkMode.value ? '-dark' : ''
  }.svg`;

  return (
    <Box
      direction="row-responsive"
      gap="large"
      justify="center"
      pad="large"
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
        pad={{ left: 'xlarge' }}
        flex={false}
      >
        <Avatar src="/static/images/t_harms_bio_image.png" size="149px" />
        <Box align="center">
          <Text size="xlarge" weight="bold" color="text-strong">
            Tim Harms
          </Text>
          <Text size="xlarge">Creative Director, HPE Global Brand</Text>
        </Box>
      </Box>
      <Stack>
        <Box
          border={{ size: '3px', color: 'text-weak' }}
          pad="medium"
          margin="small"
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
        <Box fill justify="between" pad={{ top: 'large', bottom: 'large' }}>
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
    </Box>
  );
};
