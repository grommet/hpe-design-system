import React from 'react';

import { Box, Grid, Heading, PageContent, Paragraph, Tag } from 'grommet';

const whatIsContent = [
  {
    heading: 'Foundation',
    text: `The core elements of HPE that encompass the voice, language, 
    and visuals that personify our brand`,
  },
  {
    heading: 'Components',
    // eslint-disable-next-line max-len
    text: 'A vetted set of reusable interface elements for use in apps and websites delivered in React and Figma.',
  },
  {
    heading: 'Tokens',
    text: 'Standardized design attributes for color, fonts, and spacing  ensuring consistency across digital products.',
    tag: (
      <Tag alignSelf="start" value="Coming soon" background="validation-ok" />
    ),
  },
  {
    heading: 'Icons',
    text: '500+ open source glyphs that have been curated for theming and customization with the HPE design system.',
  },
];

export const WhatIs = ({ ...rest }) => {
  return (
    <PageContent>
      <Box
        pad={{
          top: 'xlarge',
          bottom: 'medium',
        }}
        gap="large"
        {...rest}
      >
        <Box gap="medium" align="center">
          <Heading level={2} margin="none">
            What is the HPE Design System?
          </Heading>
          <Paragraph
            color="text-weak"
            size="large"
            textAlign="center"
            margin="none"
          >
            Our design system empowers designers and developers to deliver the
            next generation of IT systems on a dynamic open source UI framework
            that supports HPE, our partners, and the community in its pursuit of
            making functional, accessible, and inclusive experiences.
          </Paragraph>
        </Box>
        <Box
          fill="horizontal"
          border={{ side: 'bottom', color: 'border-weak' }}
        />
        <Grid columns={['flex', 'flex', 'flex', 'flex']} gap="medium" fill>
          {whatIsContent.map(({ heading, text, tag }, index) => (
            <Box key={`whatis-${index}`}>
              <Heading level={3} margin="none">
                {heading}
              </Heading>
              <Paragraph color="text-weak">{text}</Paragraph>
              {tag}
            </Box>
          ))}
        </Grid>
        <Box
          fill="horizontal"
          border={{ side: 'bottom', color: 'border-weak' }}
        />
      </Box>
    </PageContent>
  );
};
