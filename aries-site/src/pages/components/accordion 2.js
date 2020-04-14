import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { AccordionExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Accordion';
const page = getPageDetails(title);
const topic = 'Components';

const Accordion = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/accordion"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The accordion affords content to be delivered progressively. The
          chevron is used to identify the expand or collapse action while the
          entire header can be clicked to expand or collapse content.
        </SubsectionText>
        <Example
          details={[
            `When seeking to provide maximum content in limited, vertical 
            space, an accordion is a good alternative.`,
          ]}
          docs="https://v2.grommet.io/accordion#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/AccordionExample.js"
        >
          <AccordionExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Accordion;
