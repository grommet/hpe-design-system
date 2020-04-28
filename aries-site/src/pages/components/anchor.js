import React from 'react';
import { Anchor as GrommetAnchor, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  AnchorExample,
  AnchorDisabledExample,
  AnchorExternalExample,
  AnchorInlineExample,
} from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Anchor';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const Anchor = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/anchor"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          designer="https://designer.grommet.io/anchor?id=HPE-design-system-hpedesignsystem-hpe-com"
          docs="https://v2.grommet.io/anchor?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/anchor/AnchorExample.js"
          figma="https://www.figma.com/file/I7PsiUmvr7OEJ6311rBUfg/HPE-Anchor-Component?node-id=127%3A0"
        >
          <AnchorExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Anchors should be used when an element with a link is intended to
          appear visually like a traditional browser link, text with a simple
          underline.
        </SubsectionText>
      </Subsection>
      <Subsection name="Usage of Anchor vs. Button" level={3} gap="small">
        <SubsectionText>
          When deciding whether to use Anchor or Button, consider the visual
          appearance of the element. If the element will look like a traditional
          browser link, use Anchor. If there will be background or border
          styling, use{' '}
          <GrommetAnchor label="Button" href={nameToPath('Button')} />.
        </SubsectionText>
        <SubsectionText>
          Semantically, if you apply an href to either an Anchor or a Button,
          both will appear as an anchor tag in the DOM. This is why it is
          important to consider the visual appearance of the element when
          deciding whether to use Anchor or Button.
        </SubsectionText>
        <SubsectionText>
          Here are some contexts in which Anchor should be used:
        </SubsectionText>
        <BulletedList
          items={[
            'as inline text links',
            'to add links to resources within contexts such as a form',
          ]}
        />
        <SubsectionText>
          If a clickable element is intended to appear with a background color,
          border, of hover style, implement this using{' '}
          <GrommetAnchor label="Button" href={nameToPath('Button')} />.
        </SubsectionText>
      </Subsection>
      <Subsection name="Anchor Labeling" level={3} gap="small">
        <SubsectionText>
          It is important that your anchor clearly states to what content the
          anchor leads. For example, labels such as "Account Information" or
          "How to change account credentials" are both effective labels that
          allow the user to have confidence in where the anchor will lead them.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <Text weight="bold">
          Use 'target' and 'rel' props when linking externally:
        </Text>
        <SubsectionText>
          If clicking an Anchor leads to an external URL, apply the these props
          to the anchor:
        </SubsectionText>
        <BulletedList items={['target="_blank"', 'rel="noopener"']} />
        <SubsectionText>
          The distinction is important to screen reader users to know what's
          going to happen next. Will I navigate somewhere or will something
          happen on the page?
        </SubsectionText>
        <SubsectionText>
          Adding the "noopener" property prevents the newly opened page from
          gaining access to the original page which helps maintain the security
          of your application.
        </SubsectionText>
        <Text weight="bold">Use clear Anchor labels:</Text>
        <SubsectionText>
          It is important to make sure the label of the anchor will allow screen
          reader users to know where the anchor will lead.
        </SubsectionText>
        <Text weight="bold">Unhelpful Anchor label:</Text>
        <SubsectionText>
          - Read more <GrommetAnchor label="here" />
        </SubsectionText>
        <SubsectionText>
          A screen reader user may not know the context of "here".
        </SubsectionText>
        <Text weight="bold">Helpful Anchor label:</Text>
        <SubsectionText>
          - Read more <GrommetAnchor label="Anchor documentation" /> here
        </SubsectionText>
        <SubsectionText>
          This makes it very clear what kind of content the Anchor relates to.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          Anchors are used primarily in text heavy contexts. Here are some ways
          to use them.
        </SubsectionText>
      </Subsection>
      <Subsection name="Inline Anchor" level={3}>
        <SubsectionText>
          Anchors are most commonly used as inline elements to bring users to
          other pages within an application or to external links.
        </SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/anchor/AnchorInlineExample.js"
          docs="https://v2.grommet.io/anchor?theme=hpe#props"
        >
          <AnchorInlineExample />
        </Example>
      </Subsection>
      <Subsection name="Anchor to external location" level={3}>
        <SubsectionText>
          Using the target and rel props allow you to create smooth user
          experiences while maintaining security of your application.
        </SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/anchor/AnchorExternalExample.js"
          docs="https://v2.grommet.io/anchor?theme=hpe#props"
        >
          <AnchorExternalExample />
        </Example>
      </Subsection>
      <Subsection name="Disabled Anchor" level={3}>
        <SubsectionText>
          Used to indicate that an anchor cannot be interacted with.
        </SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/anchor/AnchorDisabledExample.js"
          docs="https://v2.grommet.io/anchor?theme=hpe#props"
        >
          <AnchorDisabledExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      {relatedContent.length > 0 ? (
        <Subsection name="Related">
          <SubsectionText>
            Related content you may find useful when using {title}.
          </SubsectionText>
          <CardGrid cards={relatedContent} />
        </Subsection>
      ) : null}
    </ContentSection>
  </Layout>
);

export default Anchor;
