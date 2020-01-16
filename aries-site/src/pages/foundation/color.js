import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, ResponsiveContext } from 'grommet';
import { Button, AnchorCallToAction } from 'aries-core';

import {
  ButtonRow,
  ColorRow,
  ContentSection,
  Layout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { Meta, SubsectionText } from '../../components';
import { colorExamples } from '../../data';
import { getPageDetails, getParentPage } from '../../utils';

const {
  coreColors,
  darkColors,
  lightColors,
  primaryColors,
} = colorExamples.palettes;

const {
  contrastDark,
  contrastLight,
  darkBackgrounds,
  lightBackgrounds,
} = colorExamples.backgrounds;

const { ctaColors, textColors } = colorExamples.text;

const generateColorExamples = (colors, textColor) => {
  return (
    <Box fill>
      {colors.map(color => {
        return (
          <ColorRow colorSpec={color} key={color.name} textColor={textColor} />
        );
      })}
    </Box>
  );
};

const TextExample = ({ color, hex }) => {
  const size = React.useContext(ResponsiveContext);
  const textSize = 'small';
  const exampleTextSize = size === 'small' ? '60px' : '84px';

  return (
    <Box align="center" margin={{ horizontal: 'small' }}>
      <Box direction="row" align="center">
        <Text color={color} weight={700} size={exampleTextSize}>
          A
        </Text>
        <Text color={color} weight={400} size={exampleTextSize}>
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

const title = 'Color';
const page = getPageDetails(title);
const topic = getParentPage(page);

const Color = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://aries.hpe.design/foundation/color"
    />
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>
          Our color palette brings out the depth and dimension of our identity.
          From sophisticated, neutral hues reflective of technology to vibrant,
          saturated colors that evoke energy and inspiration.
        </SubsectionText>
        <SubsectionText size="medium">
          The library of colors is approved for use by both HPE and Aruba
          products and services. All colors have been tested for accessibility,
          readability, and usability with guidance on how to apply them to your
          experience.
        </SubsectionText>
        <ButtonRow>
          <Button href="#" label="Use the Colors" primary />
          <Button
            label="Download Swatches"
            primary
            onClick={() => {
              // Download color swatch pack (once content is available)
            }}
          />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Box background="background-front" height="small" fill="horizontal">
        Placeholder Image
      </Box>
      <Subsection name="Color Palettes">
        <SubsectionText>
          Color is a key way we express our brand. Using color on interface
          elements, how typography is presented, displaying data visualizations,
          and adjusting context of the experience to light and dark are just
          some of the ways we illustrate our brand.
        </SubsectionText>
        <AnchorCallToAction label="Color Principles" href="#" />
      </Subsection>
      <Subsection name="Brand Color" level={3}>
        <SubsectionText>
          HPE green symbolizes growth and vitality, commands attention and
          inspires action. Our green is an essential part of our brand identity
          and should be evident in every communication wherever possible. Always
          use the custom color specifications seen here to maintain consistency
          across channels and media.
        </SubsectionText>
        {primaryColors && generateColorExamples(primaryColors)}
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
        {coreColors && generateColorExamples(coreColors)}
      </Subsection>
      <Subsection name="Light Palette" level={3}>
        <SubsectionText>
          The light color palette provides a set of swatches which compliment
          HPE Core colors for use in combination with dark text to maintain
          color accessibility in your experience. Use these colors only when
          implementing a light theme.
        </SubsectionText>
        {lightColors && generateColorExamples(lightColors)}
      </Subsection>
      <Subsection name="Dark Palette" level={3}>
        <SubsectionText>
          The dark color palette provides a set of swatches which compliment HPE
          Core colors for use in combination with light text to maintain color
          accessibility in your experience. Use these colors only when
          implementing a dark theme.
        </SubsectionText>
        {darkColors && generateColorExamples(darkColors)}
      </Subsection>
      <Subsection name="Background Colors">
        <SubsectionText>
          Our color palette is only impactful when used in the correct context.
          Accommodating both light and dark modes of a user experience with the
          appropriate color palette creates a successful customer experience.
        </SubsectionText>
        <AnchorCallToAction label="Color Principles" href="#" />
      </Subsection>
      <Subsection name="Background Palette" level={3}>
        <SubsectionText>
          In light and dark modes, building depth with interface elements, and
          the background is key in making readability or text and key
          interactions key to driving users' success. The swatches below
          illustrate how to use color for your experiences.
        </SubsectionText>
        <UsageExample themeMode="light" label="Light Background" pad="none">
          {lightBackgrounds && generateColorExamples(lightBackgrounds)}
        </UsageExample>
        <UsageExample themeMode="dark" label="Dark Background" pad="none">
          {darkBackgrounds && generateColorExamples(darkBackgrounds)}
        </UsageExample>
      </Subsection>
      <Subsection name="Contrast" level={3}>
        <SubsectionText>
          For times when you have more than two layers of content (e.g. a
          background and a styled UI element on top of it), you can use contrast
          to help add more layers of depth to your design, illustrate a visual
          separation, or show how stacked interface elements will look. By
          default, contrast will bump your background to a lighter or darker
          tint based on the theme and background.
        </SubsectionText>
        <UsageExample themeMode="light" label="Light Background" pad="none">
          {contrastLight && generateColorExamples(contrastLight)}
        </UsageExample>
        <UsageExample themeMode="dark" label="Dark Background" pad="none">
          {contrastDark && generateColorExamples(contrastDark)}
        </UsageExample>
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
          justify="between"
          pad={{
            horizontal: 'large',
            bottom: 'large',
            top: 'medium',
            small: { horizontal: 'medium', bottom: 'large', top: 'small' },
          }}
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
          justify="between"
          pad={{
            horizontal: 'large',
            bottom: 'large',
            top: 'medium',
            small: { horizontal: 'medium', bottom: 'large', top: 'small' },
          }}
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
      <Subsection name="Call to Action Text" level={3}>
        <SubsectionText>
          The only exception to text having a color is when it is used as an
          interactive element. Based on the Brand Color, the call to action
          (CTA) should stand out from the rest of the text on the page and
          trigger a response interaction.
        </SubsectionText>
        {ctaColors && generateColorExamples(ctaColors, 'brand')}
      </Subsection>
      <Subsection name="Status Colors">
        <SubsectionText>
          Text needs to be readable in all contexts. Ensuring high contrast is
          met for accessibility and readability is important to providing users
          a consistent reading experience across HPE.
        </SubsectionText>
        <Box background="background-front" height="small" fill="horizontal">
          Placeholder status color example.
        </Box>
        <SubsectionText size="small">
          Text colors have two states when working on different background
          contexts; the standard "black" and an inverted mode to accomodate a
          dark mode. To ensure text maintains readability we avoid color use
          with the exception of call to actions such as hyperlinks and anchors.
        </SubsectionText>
        <AnchorCallToAction label="See Status Colors" href="#" />
      </Subsection>
      <Subsection name="Control Colors">
        <SubsectionText>
          Text needs to be readable in all contexts. Ensuring high contrast is
          met for accessibility and readability is important to providing users
          a consistent reading experience across HPE.
        </SubsectionText>
        <Box background="background-front" height="small" fill="horizontal">
          Placeholder control colors example.
        </Box>
        <SubsectionText size="small">
          Text colors have two states when working on different background
          contexts; the standard "black" and an inverted mode to accomodate a
          dark mode. To ensure text maintains readability we avoid color use
          with the exception of call to actions such as hyperlinks and anchors.
        </SubsectionText>
        <AnchorCallToAction label="Use the Controls" href="#" />
      </Subsection>
    </ContentSection>
  </Layout>
);

TextExample.propTypes = {
  color: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
};

export default Color;
