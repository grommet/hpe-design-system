import React from 'react';
import PropTypes from 'prop-types';
import { Figma } from 'grommet-icons';
import { Anchor, Box, Button, ResponsiveContext, Text } from 'grommet';

import {
  ButtonRow,
  ColorRow,
  ContentSection,
  Layout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { ColorCompliance, Meta, SubsectionText } from '../../components';
import { ElevationExample, TextExample } from '../../examples';
import {
  colorExamples,
  greenDark,
  greenDarkLarge,
  greenLight,
} from '../../data';
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
const { focusColor, layerColor } = colorExamples;

const { statusColorsDark, statusColorsLight, textColors } = colorExamples.text;

const generateColorExamples = (colors, textColor) => (
  <Box fill>
    {colors.map(color => (
      <ColorRow colorSpec={color} key={color.name} textColor={textColor} />
    ))}
  </Box>
);

const title = 'Color';
const page = getPageDetails(title);
const topic = 'Foundation';

const Color = () => (
  // Temp isLanding for proper layout until converted to MDX
  <Layout title={title} isLanding>
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
                different from Brand Central. Prioritize the below HPE Design
                System color palette over Brand Central when identifying colors
                for your app or web based experience.
              </SubsectionText>
              <SubsectionText>
                The HPE Design System team is working with HPE Brand to ensure
                that the Brand Central color palettes (like ‘secondary colors’)
                are updated to meet ADA accessibility and color contrast levels
                in a large variety of user contexts.
              </SubsectionText>
              <ButtonRow>
                <Button
                  href="https://www.figma.com/file/eZYR3dtWdb9U90QvJ7p3T9/hpe-design-system-library-color"
                  icon={<Figma color="plain" />}
                  label="Open in Figma"
                  target="_blank"
                  secondary
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
                and dark are just some of the ways we illustrate inclusive
                design for our app and web based experiences.
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
            <Subsection name="Green Color Accessibility">
              <SubsectionText>
                The HPE Design System green ensures compliance with WCAG 2.1
                standards for distinguishable text and color (
                <Anchor
                  label="see success criterion 1.4.1 and 1.4.3"
                  href="https://www.w3.org/TR/WCAG21/#distinguishable"
                  target="_blank"
                  rel="noopener"
                />
                ). With accessibility as one of its core principles, the HPE
                Design System focused on keeping accessibilty research and
                guidelines at the center of its color selection process.
              </SubsectionText>

              <SubsectionText>
                See details below on how to remain compliant in both light and
                dark theme modes.
              </SubsectionText>
            </Subsection>
            <Subsection level={3} name="Light Mode">
              <SubsectionText>
                AAA compliance is met for text on a light mode green background
                when using `text-strong` color. This is ensured for text of size
                18px and above.
              </SubsectionText>
              <SubsectionText>
                If a font size is below 18px, AAA compliance will fail with
                default font weight on an HPE green background. In this case,
                apply weight="bold" to meet AAA compliance.
              </SubsectionText>
              <Box direction="row-responsive" gap="medium">
                <ColorCompliance
                  color={{ color: 'green', dark: false }}
                  data={greenLight}
                >
                  <Text color="text-strong">
                    This text is default size, default weight, and color
                    text-strong.
                  </Text>
                </ColorCompliance>
                <ColorCompliance
                  color={{ color: 'green', dark: false }}
                  data={greenLight}
                >
                  <Text color="text-strong" size="small" weight="bold">
                    This text is size small, bold weight, and color text-strong.
                  </Text>
                </ColorCompliance>
              </Box>
            </Subsection>
            <Subsection level={3} name="Dark Mode">
              <SubsectionText>
                AA compliance is met for text on a dark mode green background
                when using `text-strong` color. To meet AAA compliance, use text
                size="large" and weight="bold".
              </SubsectionText>

              <Box direction="row-responsive" gap="medium">
                <ColorCompliance
                  color={{ color: 'green', dark: true }}
                  data={greenDark}
                >
                  <Text color="text-strong" size="small" weight="bold">
                    This text is default size, default weight, and color
                    text-strong.
                  </Text>
                </ColorCompliance>
                <ColorCompliance
                  color={{ color: 'green', dark: true }}
                  data={greenDarkLarge}
                >
                  <Text color="text-strong" size="large" weight="bold">
                    This text is size large, bold weight, and color text-strong.
                  </Text>
                </ColorCompliance>
              </Box>
            </Subsection>
            <Subsection name="Background Colors">
              <SubsectionText>
                Our color palette is only impactful when used in the correct
                context. Accommodating both light and dark modes of a user
                experience with the appropriate color palette creates a
                successful customer experience.
              </SubsectionText>

              <SubsectionText>
                For more direction on how to use background colors within your
                layout, see{' '}
                <Anchor
                  label="Background Colors Guidance"
                  href="/foundation/background-colors-guidance"
                />
                .
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
                  textColors.map(color => (
                    <TextExample
                      key={color.name}
                      color={color.name}
                      hex={color.hex.light}
                    />
                  ))}
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
                  textColors.map(color => (
                    <TextExample
                      key={color.name}
                      color={color.name}
                      hex={color.hex.dark}
                    />
                  ))}
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
                  elevationColorsLight.map(color => (
                    <ElevationExample
                      key={color.name}
                      color={color.name}
                      hex={color.hex}
                    />
                  ))}
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
                  elevationColorsDark.map(color => (
                    <ElevationExample
                      key={color.name}
                      color={color.name}
                      hex={color.hex}
                    />
                  ))}
              </UsageExample>
            </Subsection>
            <Subsection name="Overlay Color">
              <SubsectionText>
                When a <Anchor label="Layer" href={nameToPath('Layer')} /> is
                open, this overlay extends over the rest of the application
                content. It creates a visual distinction between the active
                foreground Layer and the inactive background content. This is
                controlled by `layer.overlay.background` in the theme.
              </SubsectionText>
              {layerColor && generateColorExamples(layerColor)}
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
