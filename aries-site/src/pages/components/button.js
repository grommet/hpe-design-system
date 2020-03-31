import React from 'react';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ButtonExample } from '../../examples';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Button';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Button = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/button"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Buttons are used to indicate actions that can be performed.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
          figma="https://www.figma.com/file/Oi5UEEQ33VCAyOKQcZ8Nr8/hpe-design-system-library-button?node-id=0%3A1"
          designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
        >
          <ButtonExample />
        </Example>
      </Subsection>
      <Subsection name="Guidance">
        <SubsectionText>The when, how, and why to use buttons.</SubsectionText>
      </Subsection>
      <Subsection name="About Buttons" level={3} gap="small">
        <SubsectionText>
          Buttons should be used in situations where users might need to:
        </SubsectionText>
        <BulletedList
          items={[
            'Submit a form',
            'Begin a new task',
            'Trigger a new UI element to appear on the page',
            'Specify a new or next step in a process',
          ]}
        />
      </Subsection>
      <Subsection name="Button Labeling" level={3} gap="small">
        <SubsectionText>
          Using the Carte Button Component will ensure you’re button looks like
          a button. Applying the appropriate label is also important in making
          sure the user has a clear understanding of what the action will do.
        </SubsectionText>
        <BulletedList
          items={[
            'Use clear and concise wording.',
            `Avoid contractions or colloquialisms. Keep the language 
            approachable but not personal.`,
            'Ensure your button label matches the route destination.',
          ]}
        />
      </Subsection>
      <Subsection name="Buttons vs. Anchors" level={3} gap="small">
        <SubsectionText>
          The HTML elements for buttons and links (a.k.a. anchors) describe a
          very specific type of action that is going to be taken when they are
          used. It is important you know when to use which, as the distinction
          matters:
        </SubsectionText>
        <BulletedList
          items={[
            `Use a link when you’re navigating to another place, such as: a 
            "view all" page, "Jane Chen" profile, a page "skip link" etc.`,
            `Use buttons when you are performing an action, such as: 
            "submit," "merge," "create new," "upload," etc.`,
            'An action is almost always occurs on the same page',
          ]}
        />
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          If pressing a Button results in a new URL, or the resultant UI makes
          sense as "a new browser tab", that is a link &lt;a&gt;. Everything
          else is a &lt;button&gt;.
        </SubsectionText>
        <SubsectionText>
          The distinction is important to screen reader users to know what's
          going to happen next. Will I navigate somewhere or will something
          happen on the page? So it's important to choose the right HTML element
          for the job.
        </SubsectionText>
      </Subsection>
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

export default Button;
