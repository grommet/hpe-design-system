import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { MaskedInputExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'MaskedInput';
const topic = 'Components';
const page = getPageDetails(title);

const MaskedInput = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/maskedinput"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/MaskedInputExample/MaskedInputExample.js"
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
          >
            <MaskedInputExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default MaskedInput;
