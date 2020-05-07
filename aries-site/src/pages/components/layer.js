import React from 'react';

import { Anchor } from 'grommet';

import {
  BulletedList,
  CardGrid,
  Meta,
  Status,
  SubsectionText,
} from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  LayerExample,
  LayerCenterExample,
  LayerNotificationExample,
  LayerSideDrawerExample,
} from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Layer';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);
const Layer = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/layer"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The Layer component is flexible and can be used in multiple use cases.
          Modal dialogs, notifications, and help text are just a few
          possibilities.
        </SubsectionText>
        {page.status && <Status status={page.status} />}
        <Example
          docs="https://v2.grommet.io/layer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/LayerExample.js"
          figma="https://www.figma.com/file/Ts53TAipMolmsv9DxWG3p0/HPE-Layer-Component?node-id=2%3A22"
        >
          <LayerExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Layer is used to define the properties and behaviors of an overlay for
          things like a modal dialog or notification. The content of the Layer
          is defined by the Box component.
        </SubsectionText>
      </Subsection>
      <Subsection name="Create" level={3} gap="small">
        <BulletedList
          items={[
            `Define the container, content, location, and any animation, 
            depending on the intent of the use case 
            (like a notification or modal with a form).`,
            <>
              Use the <Anchor label="Box" href={nameToPath('Box')} /> component
              to define the content of your layer.
            </>,
            `Ensure that any next steps for the user are provided to 
            progress or close out of the layer.`,
          ]}
        />
      </Subsection>
      <Subsection name="Best Practices" level={3} gap="small">
        <BulletedList
          items={[
            `Modal is best applied when you need to center attention on specific
             content, a task, or behavior and not allow interactivity with the 
             underlying content.`,
            'Position forms to the right (side-drawer).',
            'Position notifications top or bottom.',
            `Use a close control to guide users to move out of the layer. 
            Provide an alternative to move out of the layer by allowing use of 
            the 'esc' key or clicking off the container of the layer.`,
            `Layer is not great for navigation as it 'hides' content. 
            Maintain context for the user with layer.`,
          ]}
        />
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          Consider the use of ARIA role='dialog' to implement a modal for screen
          readers.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          Depending on the use case of a Layer, the placement and layout of
          content may differ. Here are some common use cases and guidelines for
          various types of Layers.
        </SubsectionText>
      </Subsection>
      <Subsection name="Side Drawer Modal" level={3}>
        <SubsectionText>
          A Side Drawer layer is anchored to one side of the screen and acts as
          a modal. This means that while the layer is open, the rest of the page
          cannot be interacted with. When a layer contains a{' '}
          <Anchor href={nameToPath('Forms')} label="Form" />, it should be
          anchored to the right side of the screen.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/layer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layer/LayerSideDrawerExample.js"
          height={{ min: 'small' }}
        >
          <LayerSideDrawerExample />
        </Example>
      </Subsection>
      <Subsection name="Center Modal" level={3}>
        <SubsectionText>
          A center modal is anchored at the center of the window and acts as a
          modal. This means that while the layer is open, the rest of the page
          cannot be interacted with. Center modals may be used to display
          information without leaving the current context.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/layer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layer/LayerCenterExample.js"
          height={{ min: 'small' }}
        >
          <LayerCenterExample />
        </Example>
      </Subsection>
      <Subsection name="Notifications" level={3}>
        <SubsectionText>
          A notification should always be posititioned at either the top or
          bottom of the window. Assign the modal prop to false to allow the user
          to continue to interact with the UI even when the notification is
          open.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/layer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layer/LayerNotificationExample.js"
          height={{ min: 'small' }}
        >
          <LayerNotificationExample />
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

export default Layer;
