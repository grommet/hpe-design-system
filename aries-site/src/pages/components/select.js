import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { SelectExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Select';
const topic = 'Components';
const page = getPageDetails(title);

const Select = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/select"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/SelectExample.js"
            docs="https://v2.grommet.io/select?theme=hpe#props"
          >
            <SelectExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default Select;
