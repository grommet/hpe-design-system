import React from 'react';
import { Meta, Status, SubsectionText } from '../../components';
import { RangeInputExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'RangeInput';
const topic = 'Components';
const page = getPageDetails(title);

const RangeInput = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/rangeinput"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          {page.status && <Status status={page.status} />}

          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/RangeInputExample.js"
            docs="https://v2.grommet.io/rangeinput?theme=hpe#props"
            details={[
              `The RangeInput component is a slider control that 
              provides a handle the user can move to make changes 
              to values. It is important that the slider provides 
              a value displayed to communicate with the user. This
              help ensure conficence in the use of the control.`,
            ]}
            figma="https://www.figma.com/file/BqCjvjc0rECQ4Ln2QhyjNi/HPE-Range-Input-Component?node-id=1%3A11"
          >
            <RangeInputExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default RangeInput;
