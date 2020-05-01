import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, ResponsiveContext } from 'grommet';

import {
  ButtonRow,
  ColorRow,
  ContentSection,
  Layout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { Meta, SubsectionText } from '../../components';
import { ElevationExample, TextExample } from '../../examples';
import { colorExamples } from '../../data';
import { getPageDetails, nameToPath } from '../../utils';

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

const { borderDark, borderLight } = colorExamples.borders;
const { inputDark, inputLight } = colorExamples.input;
const { elevationColorsDark, elevationColorsLight } = colorExamples.elevation;
const { focusColor } = colorExamples;

const { statusColorsDark, statusColorsLight, textColors } = colorExamples.text;

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

const title = 'Color';
const page = getPageDetails(title);
const topic = 'Foundation';

const Color = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/foundation/color"
    />
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <ContentSection>
            <Subsection level={1} name={title} topic={topic}>
              <SubsectionText>
                You will notice that the HPE Design System Color guidance is
                different from Brand Central. Prioritize this HPE Design System
                color palette over Brand Central when identifying colors for
                your digital experience.
              </SubsectionText>
              <SubsectionText size="medium">
                The HPE Design System team is working with HPE Brand to ensure
                that the Brand Central color palettes (like 'secondary colors')
                are updated to meet ADA complicance levels in a large variety of
                user contexts.
              </SubsectionText>
              <ButtonRow>
                <Button
                  href="https://theme-designer.grommet.io/Dashboard?id=HPE2a-eric-soderberg-hpe-com"
                  label="Use the Colors"
                  primary
                  target="_blank"
                  rel="noreferrer noopener"
                />
                <Button
                  href="https://www.figma.com/file/eZYR3dtWdb9U90QvJ7p3T9/hpe-design-system-library-color"
                  label="See in Figma"
                  primary
                  target="_blank"
                  rel="noreferrer noopener"
                />
              </ButtonRow>
            </Subsection>
          </ContentSection>
          <ContentSection>
            <Subsection name="Color Palettes">
              <SubsectionText>
                Color is a key way we express our brand. Using color on
                interface elements, how typography is presented, displaying data
                visualizations, and adjusting context of the experience to light
                and dark are just some of the ways we illustrate our brand.
              </SubsectionText>
            </Subsection>
            <Subsection name="Brand Color" level={3}>
              <SubsectionText>
                HPE green symbolizes growth and vitality, commands attention and
                inspires action. Our green is an essential part of our brand
                identity and should be evident in every communication wherever
                possible. Always use the custom color specifications seen here
                to maintain consistency across channels and media.
              </SubsectionText>
              {primaryColors && (
                <UsageExample pad="none">
                  {generateColorExamples(primaryColors)}
                </UsageExample>
              )}
            </Subsection>
            <Subsection name="Core Palette" level={3}>
              <SubsectionText>
                HPE Core colors provide a set of swatches that compliment HPE
                Green and help establish the vibrant experience HPE embraces. We
                use "emphasis" as a way to show the importance and use the most
                vibrant hue on light or dark contexts. To maintain accessibility
                requirements, it's important to be mindful of how the aspects of
                the color library are used in conjunction with the Core colors.
              </SubsectionText>
              {coreColors && (
                <UsageExample pad="none">
                  {generateColorExamples(coreColors)}
                </UsageExample>
              )}
            </Subsection>
            <Subsection name="Light Palette" level={3}>
              <SubsectionText>
                The light color palette provides a set of swatches which
                compliment HPE Core colors for use in combination with dark text
                to maintain color accessibility in your experience. Use these
                colors only when implementing a light theme.
              </SubsectionText>
              {lightColors && (
                <UsageExample pad="none">
                  {generateColorExamples(lightColors)}
                </UsageExample>
              )}
            </Subsection>
            <Subsection name="Dark Palette" level={3}>
              <SubsectionText>
                The dark color palette provides a set of swatches which
                compliment HPE Core colors for use in combination with light
                text to maintain color accessibility in your experience. Use
                these colors only when implementing a dark theme.
              </SubsectionText>
              {darkColors && (
                <UsageExample pad="none">
                  {generateColorExamples(darkColors)}
                </UsageExample>
              )}
            </Subsection>
            <Subsection name="Background Colors">
              <SubsectionText>
                Our color palette is only impactful when used in the correct
                context. Accommodating both light and dark modes of a user
                experience with the appropriate color palette creates a
                successful customer experience.
              </SubsectionText>
            </Subsection>
            <Subsection name="Background Palette" level={3}>
              <SubsectionText>
                In light and dark modes, building depth with interface elements,
                and the background is key in making readability or text and key
                interactions key to driving users' success. The swatches below
                illustrate how to use color for your experiences.
              </SubsectionText>
              <UsageExample
                themeMode="light"
                label="Light Background"
                pad="none"
              >
                {lightBackgrounds && generateColorExamples(lightBackgrounds)}
              </UsageExample>
              <UsageExample themeMode="dark" label="Dark Background" pad="none">
                {darkBackgrounds && generateColorExamples(darkBackgrounds)}
              </UsageExample>
            </Subsection>
            <Subsection name="Contrast" level={3}>
              <SubsectionText>
                For times when you have more than two layers of content (e.g. a
                background and a styled UI element on top of it), you can use
                contrast to help add more layers of depth to your design,
                illustrate a visual separation, or show how stacked interface
                elements will look. By default, contrast will bump your
                background to a lighter or darker tint based on the theme and
                background.
              </SubsectionText>
              <UsageExample
                themeMode="light"
                label="Light Background"
                pad="none"
              >
                {contrastLight && generateColorExamples(contrastLight)}
              </UsageExample>
              <UsageExample themeMode="dark" label="Dark Background" pad="none">
                {contrastDark && generateColorExamples(contrastDark)}
              </UsageExample>
            </Subsection>
            <Subsection name="Border Colors">
              <SubsectionText>
                Using border colors properly ensures that the user is able to
                identify the state of various components. Borders help
                differentiate elements and input fields from surrounding
                content.
              </SubsectionText>
            </Subsection>
            <Subsection name="Border Palette" level={3}>
              <SubsectionText>
                In light and dark modes, border is key in making separating
                input fields or layout elements from surrounding content.
                Depending on the context, a varying amount of strength is needed
                for the border to be effective, and in many cases there may be
                no border necessary.
              </SubsectionText>
              <UsageExample themeMode="light" label="Light Border" pad="none">
                {borderLight && generateColorExamples(borderLight)}
              </UsageExample>
              <UsageExample themeMode="dark" label="Dark Border" pad="none">
                {borderDark && generateColorExamples(borderDark)}
              </UsageExample>
            </Subsection>
            <Subsection name="Input Colors">
              <SubsectionText>
                Inputs that exist within FormFields have varying colors to
                suggest their state: enabled vs disabled, required, etc. The
                proper use of these colors ensures that the user can easily
                understand the state of the input.
              </SubsectionText>
            </Subsection>
            <Subsection name="Input Palette" level={3}>
              <SubsectionText>
                In light and dark modes, input colors are key in providing the
                user with guidance on how they can interact with an input.
              </SubsectionText>
              <UsageExample themeMode="light" label="Light Input" pad="none">
                {inputLight && generateColorExamples(inputLight)}
              </UsageExample>
              <UsageExample themeMode="dark" label="Dark Input" pad="none">
                {inputDark && generateColorExamples(inputDark)}
              </UsageExample>
            </Subsection>
            <Subsection name="Text Colors">
              <SubsectionText>
                Text needs to be legible in all contexts. Ensuring high contrast
                is met for accessibility and readability is important to
                delivering users a consistent reading experience throughout HPE.
              </SubsectionText>
            </Subsection>
            <Subsection name="Text Color Palette" level={3}>
              <SubsectionText>
                Text colors have two states when working on different background
                contexts; depending on background the text can invert to
                accomodate a dark mode. To ensure text maintains readability, we
                avoid color use with the exception of call to actions such as
                hyperlinks and anchors.
              </SubsectionText>
              <UsageExample
                themeMode="light"
                label="Light Background"
                justify="between"
                pad={{
                  horizontal: 'large',
                  bottom: 'large',
                  top: 'medium',
                  small: {
                    horizontal: 'medium',
                    bottom: 'large',
                    top: 'small',
                  },
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
                  small: {
                    horizontal: 'medium',
                    bottom: 'large',
                    top: 'small',
                  },
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
            <Subsection name="Status Colors" level={3}>
              <UsageExample
                themeMode="light"
                label="Light Background"
                pad="none"
              >
                {statusColorsLight && generateColorExamples(statusColorsLight)}
              </UsageExample>
              <UsageExample themeMode="dark" label="Dark Background" pad="none">
                {statusColorsDark && generateColorExamples(statusColorsDark)}
              </UsageExample>
            </Subsection>
            <Subsection name="Focus Color">
              <SubsectionText>
                Focus is critical to accessibility. When a user is navigating
                with keyboard, focus indicates which element on the page is
                active. Do not remove focus outline in your application, as this
                will compromise the accessibility of the application.
              </SubsectionText>
              {focusColor && generateColorExamples(focusColor)}
            </Subsection>
            <Subsection name="Elevation">
              <SubsectionText>
                Elevation creates depth between a foreground and background
                element. Depending on the desired contrast, varying strengths of
                elevation can be used. Elevation is implemented by default on
                certain elements such as{' '}
                <Anchor label="Menu" href={nameToPath('Menu')} /> and{' '}
                <Anchor label="Select" href={nameToPath('Select')} />.
              </SubsectionText>
              <UsageExample
                themeMode="light"
                label="Light Background"
                justify="between"
                direction="row-responsive"
                gap={size === 'small' ? 'medium' : undefined}
                pad={{
                  horizontal: 'large',
                  vertical: 'large',
                  small: { horizontal: 'medium', vertical: 'large' },
                }}
              >
                {elevationColorsLight &&
                  elevationColorsLight.map(color => {
                    return (
                      <ElevationExample
                        key={color.name}
                        color={color.name}
                        hex={color.hex}
                      />
                    );
                  })}
              </UsageExample>
              <UsageExample
                themeMode="dark"
                label="Dark Background"
                justify="between"
                direction="row-responsive"
                gap={size === 'small' ? 'medium' : undefined}
                pad={{
                  horizontal: 'large',
                  vertical: 'large',
                  small: { horizontal: 'medium', vertical: 'large' },
                }}
              >
                {elevationColorsDark &&
                  elevationColorsDark.map(color => {
                    return (
                      <ElevationExample
                        key={color.name}
                        color={color.name}
                        hex={color.hex}
                      />
                    );
                  })}
              </UsageExample>
            </Subsection>
          </ContentSection>
        </>
      )}
    </ResponsiveContext.Consumer>
    {/* CONTENT MISSING: Disabling following section for MVP launch */}
    {/* <Subsection name="Status Colors">
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
      </Subsection> */}
    {/* CONTENT MISSING: Disabling following section for MVP launch */}
    {/* <Subsection name="Control Colors">
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
      </Subsection> */}
    {/* </ContentSection> */}
  </Layout>
);

TextExample.propTypes = {
  color: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
};

export default Color;
