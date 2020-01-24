import React from 'react';
import Link from 'next/link';
import { Anchor } from 'aries-core';
import { Box, Text } from 'grommet';
import { ButtonRow, ContentSection } from '../../layouts';

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
        <Text>This page appears to be empty.</Text>
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
          Something missing or looking for more information? Edit or open an
          issue on Github to help us make the HPE Design System better.
        </Text>
        <ButtonRow gap="large">
          <Anchor
            href="https://github.com/hpe-design/aries/issues"
            target="_blank"
            label="Open page in Github"
            rel="noreferrer noopener"
          />
          {/* Need to pass href because of:
           * https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child */}
          <Link href="/" passHref>
            <Anchor label="Take me back to the Homepage" />
          </Link>
        </ButtonRow>
      </ContentSection>
    </>
  );
};
