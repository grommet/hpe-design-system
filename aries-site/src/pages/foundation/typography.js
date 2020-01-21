import React from 'react';
import { Box } from 'grommet';
import { AnchorCallToAction, Button } from 'aries-core';

import {
  ButtonRow,
  ContentSection,
  Layout,
  Subsection,
  TypographyRow,
} from '../../layouts';
import { Meta, SubsectionText } from '../../components';
import { fontWeights, fontStyles } from '../../data';
import {
  DisplayExample,
  HandExample,
  PresentationExample,
} from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Typography';
const page = getPageDetails(title);
const topic = 'Foundation';

const Typography = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://aries.hpe.design/foundation/typography"
    />
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
          <Button
            label="See in Figma"
            href="https://www.figma.com/file/TJUX0lFOOL2eFuVpfMmixx/hpe-design-sytem-library-styles?node-id=0%3A1"
            primary
            target="_blank"
            rel="noreferrer noopener"
          />
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
          It has been revised to provide wieghts and ligatures that can be used
          for reading and display in digital contexts.
        </SubsectionText>
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
      {/* CONTENT MISSING: Disabling following section for MVP launch */}
      {/* <Subsection name="Line height" level={3}>
        <Box height="small" background="background-contrast" />
      </Subsection> */}
      <Subsection name="Font stacks" level={3}>
        <SubsectionText>
          In cases where using MetricHPE is not possible refer to the HPE font
          stack we use with fallbacks to system fonts to stay compliant.
        </SubsectionText>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Typography;
