import React from 'react';
import { Box, Button, Text } from 'grommet';
import { AnchorCallToAction } from 'aries-core';
import {
  ColorRow,
  ContentSection,
  PageLayout,
  Subsection,
} from '../../layouts';
import { LastUpdated, BodyText } from '../../components';
import { greyscaleColors, primaryColors, supportingColors } from '../../data';

const title = 'Color';

const Color = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title}>
        <BodyText>
          Our color palette brings out the depth and dimension of our identity.
          From sophisticated, neutral hues reflective of technology to vibrant,
          saturated colors that evoke energy and inspiration.
        </BodyText>
        <Box gap="medium" pad={{ vertical: 'medium' }} align="start">
          <Button
            label={
              <Text
                color={{ dark: 'text-strong', light: 'text-strong' }}
                weight={500}
              >
                Download Color Swatches Pack
              </Text>
            }
            primary
            onClick={() => {
              // Download color swatch pack (once content is available)
            }}
          />
          <LastUpdated date={new Date('2019-07-17T03:24:00')} />
        </Box>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Color Palettes" level={2}>
        <BodyText>
          Color is a key way we express our brand. Using color on interface
          elements, how typography is presented, displaying data visualizations,
          and adjusting context of the experience to light and dark are just
          some of the ways we illustrate our brand.
        </BodyText>
        <AnchorCallToAction label="Color Principles" />
      </Subsection>
      <Subsection name="Brand Color" level={3}>
        <BodyText>
          HPE green symbolizes growth and vitality, commands attention and
          inspires action. Our green is an essential part of our brand identity
          and should be evident in every communication wherever possible. Always
          use the custom color specifications seen here to maintain consistency
          across channels and media.
        </BodyText>
        {primaryColors && (
          <Box margin={{ top: 'medium' }}>
            {primaryColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Core Palette" level={3}>
        <BodyText>
          HPE Core colors provide a set of swatches that compliment HPE Green
          and help establish the vibrant experience HPE embraces. We use
          "emphasis" as a way to show the importance and use the most vibrant
          hue on light or dark contexts. To maintain accessibility requirements,
          it's important to be mindful of how the aspects of the color library
          are used in conjunction with the Core colors.
        </BodyText>
        {supportingColors && (
          <Box margin={{ top: 'medium' }}>
            {supportingColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Greyscale" level={3}>
        <BodyText>
          The greyscale palette offers a set of steps that can be using in
          tertiary elements to to create more subtle separation to ensure
          content has a balanced composition.
        </BodyText>
        {greyscaleColors && (
          <Box margin={{ top: 'medium' }}>
            {greyscaleColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Color;
