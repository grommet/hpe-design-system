import React, { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
} from 'grommet';

export const HPEAI = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent
        pad="xlarge"
        background={{ fill: 'horizontal', color: 'brand' }}
      >
        <Box gap="medium" width="large">
          <Text size="small"> Artifical Intelligence (AL) solutions</Text>
          <Heading margin="none" level="1">
            Learn how HPE and NVIDIA unlock AL
          </Heading>
          <Box gap="large">
            <Text size="xlarge">
              AI is everywhere, disrupting every industry and creating limitless
              opportunities. HPE and NVIDIA are collaborating to deliver
              co-developed solutions to help you accelerate the adoption of
              generative AI.
            </Text>
            <Button
              label="HPE ships first NVIDIA Grace Blackwell system"
              kind="cta-primary"
              alignSelf="start"
            />
          </Box>
        </Box>
      </PageContent>
    </Page>
  );
};
