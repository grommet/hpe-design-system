import React from 'react';
import { Box, Button, Heading, Page, PageContent, Text } from 'grommet';
import { LinkNext } from 'grommet-icons';

// when I apply background image the text color is black we need white
const textColor = '#FFFFFF';

export const HPEAI = () => {
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent
        // in marketing page they have 80px padding on the sides
        // cloest we have is 96. As for the top and bottom they have 40px
        // we have 48px
        pad={{ vertical: 'large', horizontal: 'xlarge' }}
        background={{
          fill: 'horizontal',
          image: 'url(/public/marketing-background.png)',
        }}
      >
        <Box gap="medium" width="large">
          <Box pad={{ top: 'large' }}>
            {/* // this is off a little for the padding on top compared to page. */}
            <Text weight="bold" color={textColor} size="small">
              Artifical Intelligence (AL) solutions
            </Text>
          </Box>
          {/* // this heading is not large enough can we use size or we steering away? */}
          <Heading color={textColor} margin="none" level="1">
            Learn how HPE and NVIDIA unlock AL
          </Heading>
          <Box gap="large">
            <Text size="xlarge" color={textColor}>
              AI is everywhere, disrupting every industry and creating limitless
              opportunities. HPE and NVIDIA are collaborating to deliver
              co-developed solutions to help you accelerate the adoption of
              generative AI.
            </Text>
            {/* // alignement between text and icon is off */}
            <Button
              label="HPE ships first NVIDIA Grace Blackwell system"
              kind="cta-primary"
              alignSelf="start"
              icon={<LinkNext size="small" />}
            />
          </Box>
        </Box>
      </PageContent>
    </Page>
  );
};
