import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Button, AnchorCallToAction } from 'aries-core';

import {
  ColorRow,
  ContentSection,
  PageLayout,
  Subsection,
  UsageExample,
} from '../../layouts';
import {
  MainDescription,
  LastUpdated,
  MainHeading,
  SubsectionText,
} from '../../components';
import {
  greyscaleColors,
  primaryColors,
  supportingColors,
  textColors,
} from '../../data';

const title = 'Color';

const TextExample = ({ color, hex }) => {
  const textSize = 'small';

  return (
    <Box align="center" margin={{ horizontal: 'small' }}>
      <Box direction="row" align="center">
        <Text color={color} weight={700} size="84px">
          A
        </Text>
        <Text color={color} weight={400} size="84px">
          a
        </Text>
      </Box>
      <Text color={color} weight={600} size={textSize}>
        {color}
      </Text>
      <Text color={color} size={textSize}>
        {hex}
      </Text>
    </Box>
  );
};

const Color = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
      <MainDescription>
        Our color palette brings out the depth and dimension of our identity.
        From sophisticated, neutral hues reflective of technology to vibrant,
        saturated colors that evoke energy and inspiration.
      </MainDescription>
      <Box gap="medium" pad={{ vertical: 'medium' }}>
        <Button
          label="Download Color Swatches Pack"
          primary
          onClick={() => {
            // Download color swatch pack (once content is available)
          }}
        />
        <LastUpdated date={new Date('2019-07-17T03:24:00')} />
      </Box>
    </ContentSection>
    <ContentSection>
      <Subsection name="Color Palettes">
        <SubsectionText>
          Color is a key way we express our brand. Using color on interface
          elements, how typography is presented, displaying data visualizations,
          and adjusting context of the experience to light and dark are just
          some of the ways we illustrate our brand.
        </SubsectionText>
        <AnchorCallToAction label="Color Principles" />
      </Subsection>
      <Subsection name="Brand Color" level={3}>
        <SubsectionText>
          HPE green symbolizes growth and vitality, commands attention and
          inspires action. Our green is an essential part of our brand identity
          and should be evident in every communication wherever possible. Always
          use the custom color specifications seen here to maintain consistency
          across channels and media.
        </SubsectionText>
        {primaryColors && (
          <Box margin={{ top: 'medium' }}>
            {primaryColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Core Palette" level={3}>
        <SubsectionText>
          HPE Core colors provide a set of swatches that compliment HPE Green
          and help establish the vibrant experience HPE embraces. We use
          "emphasis" as a way to show the importance and use the most vibrant
          hue on light or dark contexts. To maintain accessibility requirements,
          it's important to be mindful of how the aspects of the color library
          are used in conjunction with the Core colors.
        </SubsectionText>
        {supportingColors && (
          <Box margin={{ top: 'medium' }}>
            {supportingColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Greyscale" level={3}>
        <SubsectionText>
          The greyscale palette offers a set of steps that can be using in
          tertiary elements to to create more subtle separation to ensure
          content has a balanced composition.
        </SubsectionText>
        {greyscaleColors && (
          <Box margin={{ top: 'medium' }}>
            {greyscaleColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Text Colors">
        <Text>
          Text needs to be legible in all contexts. Ensuring high contrast is
          met for accessibility and readability is important to delivering users
          a consistent reading experience throughout HPE.
        </Text>
        <AnchorCallToAction label="Typography Elements" href="#" />
      </Subsection>
      <Subsection name="Text Color Palette" level={3}>
        <Text>
          Text colors have two states when working on different background
          contexts; depending on background the text can invert to accomodate a
          dark mode. To ensure text maintains readability, we avoid color use
          with the exception of call to actions such as hyperlinks and anchors.
        </Text>
        <UsageExample
          themeMode="light"
          label="Light Background"
          align="center"
          height="small"
          justify="between"
          pad={{ horizontal: 'large', bottom: 'medium' }}
        >
          {textColors &&
            textColors.map(color => {
              return (
                <TextExample
                  key={color.name}
                  color={color.name}
                  hex={color.hex.light}
                />
              );
            })}
        </UsageExample>
        <UsageExample
          themeMode="dark"
          label="Dark Background"
          align="center"
          height="small"
          justify="between"
          pad={{ horizontal: 'large', bottom: 'medium' }}
        >
          {textColors &&
            textColors.map(color => {
              return (
                <TextExample
                  key={color.name}
                  color={color.name}
                  hex={color.hex.dark}
                />
              );
            })}
        </UsageExample>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

TextExample.propTypes = {
  color: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
};

export default Color;
