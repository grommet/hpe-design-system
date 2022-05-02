import React from 'react';
import Link from 'next/link';
import { Box, Text, Anchor } from 'grommet';
import { ContentSection } from '../../layouts';
import { SubsectionText } from '.';

export function ComingSoon() {
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
      <ContentSection>
        <Box direction="row" gap="small">
          <Text size={textSize} weight="bold">
            HPE
          </Text>
          <Text size={textSize}>Design System</Text>
        </Box>
        <SubsectionText>
          The HPE Design System is the way Hewlett Packard Enterprise’s brand,
          technology, and its partners share a single language for application,
          web, and digital experiences to answer your customers needs—Look
          behind the element!
        </SubsectionText>
        <Link href="/" passHref>
          <Anchor label="Take me back to the Homepage" alignSelf="start" />
        </Link>
      </ContentSection>
    </>
  );
}
