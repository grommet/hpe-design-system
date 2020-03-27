import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { CheckboxExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'CheckBox';
const page = getPageDetails(title);
const topic = 'Components';

const CheckBox = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/checkbox"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          When the user needs to select one or more options, use a checkbox. The
          click target should include the checkbox label.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/CheckboxExample.js"
        >
          <CheckboxExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default CheckBox;
