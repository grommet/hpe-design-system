import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { AnchorCallToAction, Button } from 'aries-core';
import {
  ButtonRow,
  ContentSection,
  PageLayout,
  Subsection,
  TypographyRow,
} from '../../layouts';
import { SubsectionText } from '../../components';
import { fontWeights, fontStyles } from '../../data';

const PresentationExample = () => {
  const textSize = 'small';

  return (
    <Box
      background="background-front"
      gap="medium"
      pad="large"
      margin={{ top: 'medium' }}
    >
      <Box>
        <Text size={textSize}>display-heading-x-large</Text>
        <Heading size="xlarge" margin="none">
          Heading XL
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-heading-large</Text>
        <Heading size="large" margin="none">
          Heading L
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-heading</Text>
        <Heading margin="none">Heading</Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-subheading</Text>
        <Text size="xxlarge">Subheading</Text>
      </Box>
      <Box>
        <Text size={textSize}>prez-body</Text>
        <Text>Body</Text>
      </Box>
      <Box>
        <Text size={textSize}>prez-caption</Text>
        <Text size="small">Caption</Text>
      </Box>
    </Box>
  );
};

const DisplayExample = () => {
  const textSize = 'small';

  return (
    <Box
      background="background-front"
      gap="medium"
      margin={{ top: 'medium' }}
      pad="large"
    >
      <Box>
        <Text size={textSize}>display-heading-x-large</Text>
        <Heading size="large" margin="none">
          Heading XL
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading-large</Text>
        <Heading margin="none">Heading L</Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading</Text>
        <Heading size="small" margin="none">
          Heading
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-subheading</Text>
        <Text>Subheading</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-body</Text>
        <Text size="small">Body</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-caption</Text>
        <Text size="xsmall" margin="none">
          Caption
        </Text>
      </Box>
    </Box>
  );
};

const HandExample = () => {
  const textSize = 'small';

  return (
    <Box
      background="background-front"
      gap="medium"
      margin={{ top: 'medium' }}
      pad="large"
    >
      <Box>
        <Text size={textSize}>display-heading-x-large</Text>
        <Heading margin="none">Heading XL</Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading-large</Text>
        <Heading size="small" margin="none">
          Heading L
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading</Text>
        <Heading size="xsmall" margin="none">
          Heading
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-subheading</Text>
        <Text>Subheading</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-body</Text>
        <Text size="small">Body</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-caption</Text>
        <Text size="xsmall" margin="none">
          Caption
        </Text>
      </Box>
    </Box>
  );
};

const topic = 'Foundation';
const title = 'Typography';

const Typography = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>
          Text is one of the main forms of communication we employ to reach our
          customers. To do that, HPE uses the font MetricHPE for all web based
          experiences, which is specifically tailored to our brand. MetricHPE is
          a humanist typeface that embodies the approachability and people first
          mentality we embrace.
        </SubsectionText>
        <SubsectionText size="medium">
          Based on the humanist typeface Metric from the renouned Kilm Type
          Foundry, HPE uses the typeface as it's primary form of communication.
          it has been revised to provide wieghts and ligatures that can be used
          for reading and display in digital contexts.
        </SubsectionText>
        <ButtonRow>
          <Button label="Use the Typography" href="#" primary />
          <Button label="Download the Styles" href="#" primary />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Typographic scales">
        <SubsectionText>
          We have three type scales defined for use in different experiences:
          Presentation, Display, and Hand. Each of these provides a set of text
          styles and sizes to accomodate a specific experience. We have three
          scales to keep the number of typographic styles minimized and easy to
          use.
        </SubsectionText>
        <SubsectionText>
          Defining of typographic scales, line height, font weight, and general
          spacing around elements is all embeded to the individual styles by
          using base sizes and then programmatically scaling the text elements
          using a modular scale model. Content is core to the
        </SubsectionText>
      </Subsection>
      <Subsection name="Presentation scale" level={3}>
        <SubsectionText>
          Presentation scale is designed for experiences that require a large
          type and high legibility from distances further away. As the name
          suggets, presentation is good for slides, simpler designs, and
          projection.
        </SubsectionText>
        <PresentationExample />
      </Subsection>
      <Subsection name="Display scale" level={3}>
        <SubsectionText>
          Display scale is designed for experiences on computer screens that are
          used to view websites, run applications, and engage in general desktop
          computing expercises.
        </SubsectionText>
        <DisplayExample />
      </Subsection>
      <Subsection name="Hand scale" level={3}>
        <SubsectionText>
          Hand scale is designed for experiences on mobile, tablet, and IOT
          devices. Experiences range from quick interactions with limited
          real-estate to notifications and brief synopsis of complex
          interactions.
        </SubsectionText>
        <HandExample />
      </Subsection>
      <Subsection name="Typeface">
        <SubsectionText>
          MetricHPE comes in a variety of weights. For digital experiences we
          use Light, Regular, Medium, and Bold weights at a variety of scales to
          compliment the content in a given design. In some cases, we use some
          text styling to accentuate importance and forward movement, like
          UPPERCASE and italic transformation.
        </SubsectionText>
        <SubsectionText>
          Based on the humanist typeface Metric from the renouned Kilm Type
          Foundry, HPE uses the typeface as it's primary form of communication.
          it has been revised to provide wieghts and ligatures that can be used
          for reading and display in digital contexts.
        </SubsectionText>
        <AnchorCallToAction label="Typographic Principles" />
      </Subsection>
      <Subsection name="Font weights" level={3}>
        <SubsectionText>
          MetricHPE weights align with CSS conventions. MetricHPE has seven font
          weights with complimenting italic variations. These weights can be
          used independently or as an override to heading and paragraph
          treatments. We primarily use Light, Regular, Medium, and Bold weight
          but other thicknesses are available to the designer and developer if
          needed.
        </SubsectionText>
        <Box margin={{ top: 'medium' }}>
          {fontWeights.map(item => {
            return <TypographyRow typographySpec={item} key={item.name} />;
          })}
        </Box>
        <SubsectionText>
          * available but not used in the primary heading styles
        </SubsectionText>
      </Subsection>
      <Subsection name="Font styles" level={3}>
        <SubsectionText>
          In some cases you might want to emphasize the style of the individual
          words or headings in your design. Similar to weights, styles follow
          CSS conventions. The fonts tyles we support are displayed below.
        </SubsectionText>
        <Box margin={{ top: 'medium' }}>
          {fontStyles.map((item, index) => {
            return (
              <TypographyRow
                index={index}
                key={item.name}
                typographySpec={item}
              />
            );
          })}
        </Box>
      </Subsection>
      <Subsection name="Line height" level={3}>
        <Box height="small" background="background-contrast" />
      </Subsection>
      <Subsection name="Font stacks" level={3}>
        <SubsectionText>
          In cases where using MetricHPE is not possible refer to the HPE font
          stack we use with fallbacks to system fonts to stay compliant.
        </SubsectionText>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Typography;
