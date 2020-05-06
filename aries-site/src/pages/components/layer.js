import React from 'react';

import { Anchor } from 'grommet';

import { BulletedList, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { LayerExample } from '../../examples';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'Layer';
const page = getPageDetails(title);
const topic = 'Components';

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
  </Layout>
);

export default Layer;
