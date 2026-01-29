import React from 'react';

import { Page, PageContent } from 'grommet';
import { Subsection } from '../layouts';
import { Meta, FeedbackOptions, SubsectionText } from '../components';
import { getPageDetails } from '../utils';

const title = 'Feedback';
const page = getPageDetails(title);

const Feedback = () => (
  <>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/feedback"
    />
    <Page>
      <PageContent gap="medium">
        <Subsection name="Have feedback to share?" level={1}>
          <SubsectionText>
            Get in touch to help make the HPE Design System better.
          </SubsectionText>
        </Subsection>
        <FeedbackOptions level={2} />
      </PageContent>
    </Page>
  </>
);

export default Feedback;
