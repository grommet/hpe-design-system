import React from 'react';
import { Anchor } from 'grommet';

import {
  BulletedList,
  CardGrid,
  Meta,
  Status,
  SubsectionText,
} from '../../components';
import {
  ButtonExample,
  ButtonIconExample,
  ButtonSizingExample,
  ButtonStatesExample,
  ColorButtonExample,
  DefaultButtonExample,
  PrimaryButtonExample,
  SecondaryButtonExample,
} from '../../examples';
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
        <SubsectionText>{page.description}</SubsectionText>
        {page.status && <Status status={page.status} />}
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/ButtonExample.js"
          figma="https://www.figma.com/file/Oi5UEEQ33VCAyOKQcZ8Nr8/hpe-design-system-library-button?node-id=0%3A1"
          designer="https://designer.grommet.io/button?id=HPE-design-system-hpedesignsystem-hpe-com"
        >
          <ButtonExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
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
          Using the design system Button Component will ensure you’re button
          looks like a button. Applying the appropriate label is also important
          in making sure the user has a clear understanding of what the action
          will do.
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
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          There are a couple "flavors" of button depending on use case.
        </SubsectionText>
      </Subsection>
      <Subsection name="Primary Button" level={3}>
        <SubsectionText>
          Used for key actions on the page. Primary Buttons can also be referred
          to as “Brand” or “CTA (Call to Action)” and should only be used once
          per page. All other supporting actions should use{' '}
          <Anchor href="#">Default Button</Anchor>.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/PrimaryButtonExample.js"
          height={{ min: 'small' }}
        >
          <PrimaryButtonExample />
        </Example>
      </Subsection>
      <Subsection name="Secondary Button" level={3}>
        <SubsectionText>
          Secondary buttons are used to represent calls to action that are
          either in support of the primary call to action or stand-alone. There
          can be multiple secondary buttons per page. However, a{' '}
          <Anchor label="default button" href="#default-button" /> should be
          used for any navigation-type actions.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/SecondaryButtonExample.js"
          height={{ min: 'small' }}
        >
          <SecondaryButtonExample />
        </Example>
      </Subsection>
      <Subsection name="Default Button" level={3}>
        <SubsectionText>
          This is the default appreance and behavior of button. The majority of
          buttons on your page should use this form of button. If you are
          designating a primary call to action, use a{' '}
          <Anchor href="#primary-button" label="primary button" />. If you are
          designating a secondary call to action, use a{' '}
          <Anchor href="#secondary-button" label="secondary button" />.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/DefaultButtonExample.js"
          height={{ min: 'small' }}
        >
          <DefaultButtonExample />
        </Example>
      </Subsection>
      <Subsection name="Color Button" level={3}>
        <SubsectionText>
          When looking to accent an interaction or for special use cases that
          require more importance than a{' '}
          <Anchor href="#">Default Button</Anchor>, the Color Button can be used
          to support an HPE sub-brand when appropriate or a serious action (ie.
          using red for a destructive task).
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/ColorButtonExample.js"
          height={{ min: 'small' }}
        >
          <ColorButtonExample />
        </Example>
      </Subsection>
      <Subsection name="Button with Icon" level={3}>
        <SubsectionText>
          Icons may be incorporated into buttons, either inline with text or as
          an icon only. When using icon only buttons, the dimension of the
          clickable area should be kept in mind for its use on mobile devices.
          Areas too small lead to errant clicks, and as result, poor experience.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/ButtonIconExample.js"
          height={{ min: 'small' }}
        >
          <ButtonIconExample />
        </Example>
      </Subsection>
      <Subsection name="Button States" level={3}>
        <SubsectionText>
          A button's visual state may be specified as appropriate in the
          application's context. For example, using "active" for the current
          item or "disabled" until a set of criteria are met.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/ButtonStatesExample.js"
          height={{ min: 'small' }}
        >
          <ButtonStatesExample />
        </Example>
      </Subsection>
      <Subsection name="Button Sizes" level={3}>
        <SubsectionText>
          Button label text size may be specified. Padding and rounding scale
          proportionately to the label size. The default size is medium.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/button/ButtonSizingExample.js"
          height={{ min: 'small' }}
        >
          <ButtonSizingExample />
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

export default Button;
