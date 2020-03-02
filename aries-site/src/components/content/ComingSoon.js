import React from 'react';
import Link from 'next/link';
import { Anchor } from 'aries-core';
import { Box, Text } from 'grommet';
import { ContentSection } from '../../layouts';
import { SubmitFeedback } from '.';

export const ComingSoon = () => {
  const textSize = 'xxlarge';
  return (
    <>
      <ContentSection>
        <Text size="160px">
          <span role="img" aria-label="Woman Shrugging">
            &#x1F937;
          </span>
        </Text>
        <Text>
          This page appears to be empty, but content will be coming soon!
        </Text>
      </ContentSection>
      <ContentSection lastSection>
        <Box direction="row" gap="small">
          <Text size={textSize} weight="bold">
            HPE
          </Text>
          <Text size={textSize}>Design System</Text>
        </Box>
        <Text>
          The HPE Design System is the way Hewlett Packard Enterprise’s brand,
          technology, and its partners share a single language for application,
          web, and digitial experiences to answer your customers needs—Look
          behind the element!
        </Text>
        <Text>
          Something missing or looking for more information? Get in touch to
          help make the HPE Design System better.
        </Text>
        <Box direction="row-responsive" gap="medium" align="center">
          <SubmitFeedback />
          <Text>or</Text>
          <Box>
            <Link href="/" passHref>
              <Anchor label="Take me back to the Homepage" />
            </Link>
          </Box>
        </Box>
      </ContentSection>
    </>
  );
};
