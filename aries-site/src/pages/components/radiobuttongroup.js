import React from 'react';
import { Meta, Status, SubsectionText } from '../../components';
import { RadioButtonGroupExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'RadioButtonGroup';
const topic = 'Components';
const page = getPageDetails(title);

const RadioButtonGroup = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/radiobuttongroup"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          {page.status && <Status status={page.status} />}
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/RadioButtonGroupExample.js"
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
          >
            <RadioButtonGroupExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default RadioButtonGroup;
