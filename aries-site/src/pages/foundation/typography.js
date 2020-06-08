import React from 'react';
import { Anchor, Button } from 'grommet';

import { Meta, SubsectionText } from '../../components';
import {
  HeadingExample,
  HeadingSizingExample,
  ParagraphExample,
  TextSizeExample,
} from '../../examples';
import {
  ButtonRow,
  ContentSection,
  Example,
  Layout,
  Subsection,
} from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Typography';
const page = getPageDetails(title);
const topic = 'Foundation';

const Typography = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/foundation/typography"
    />
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>
          Our typography is about more than words. It’s an integral part of our
          personality and design. When we’re making a statement, we want our
          visual language to be clear, recognized and understood.
        </SubsectionText>
        <SubsectionText size="medium">
          Based on the Metric font from the renouned{' '}
          <Anchor
            label="Kilm Type Foundry"
            href="https://klim.co.nz/"
            target="_blank"
            rel="noreferrer noopener"
          />
          , MetricHPE speaks to our courageous, open and inspired personality.
        </SubsectionText>
        <ButtonRow>
          <Button
            label="See in Figma"
            href="https://www.figma.com/file/oJhw3JqMemtbwWjlLPWW5O/HPE-Typography-Styles?node-id=149%3A2"
            primary
            target="_blank"
            rel="noreferrer noopener"
          />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="MetricHPE Styles">
        <SubsectionText>
          The weights and styles shown are part of the HPE Design System theme.
          MetricHPE comes in a varity of weights. For digital experiences we use
          Light, Regular, Medium, and Bold weights at a variety of scales to
          compliment the content in a given design.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Heading">
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/typography/HeadingExample.js"
          docs="https://v2.grommet.io/heading?theme=hpe#props"
          figma="https://www.figma.com/file/oJhw3JqMemtbwWjlLPWW5O/HPE-Typography-Styles?node-id=149%3A2"
        >
          <HeadingExample />
        </Example>
        <SubsectionText>
          For accessibility reasons, always ensure{' '}
          <Anchor
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#Usage_notes"
            target="_blank"
            rel="noopener noreferrer"
          >
            semantically correct heading levels
          </Anchor>{' '}
          are applied. Begin with the correct heading level, then apply size
          adjustments to fit your styling needs. This allows for flexibility in
          design while maintaining well structured HTML documents needed by
          assistive technologies.
        </SubsectionText>
      </Subsection>
      <Subsection name="Heading Sizes" level={3}>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/typography/HeadingSizingExample.js"
          docs="https://v2.grommet.io/heading?theme=hpe#level"
          figma="https://www.figma.com/file/oJhw3JqMemtbwWjlLPWW5O/HPE-Typography-Styles?node-id=149%3A2"
        >
          <HeadingSizingExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Paragraph">
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/typography/ParagraphExample.js"
          docs="https://v2.grommet.io/paragraph?theme=hpe#props"
          figma="https://www.figma.com/file/oJhw3JqMemtbwWjlLPWW5O/HPE-Typography-Styles?node-id=149%3A2"
        >
          <ParagraphExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Text">
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/typography/TextExample.js"
          docs="https://v2.grommet.io/text?theme=hpe#props"
          figma="https://www.figma.com/file/oJhw3JqMemtbwWjlLPWW5O/HPE-Typography-Styles?node-id=149%3A2"
        >
          <TextSizeExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Typography;
