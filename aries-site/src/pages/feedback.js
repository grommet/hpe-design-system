import React from 'react';

import { Box } from 'grommet';
import { Layout, Subsection } from '../layouts';
import { Meta, FeedbackOptions, SubsectionText } from '../components';
import { getPageDetails } from '../utils';

const title = 'Feedback';
const page = getPageDetails(title);

function Feedback() {
  return <Layout title={title} isLanding>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/feedback"
      />
      <Box gap="medium">
        <Subsection name="Have feedback to share?" level={2}>
          <SubsectionText>
            Get in touch to help make the HPE Design System better.
          </SubsectionText>
        </Subsection>
        <FeedbackOptions />
      </Box>
    </Layout>;
}

export default Feedback;
