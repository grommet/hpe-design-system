import React from 'react';

import { Box, Grid, ResponsiveContext } from 'grommet';
import { Layout, ContentSection, Subsection } from '../layouts';
import {
  Meta,
  Subscribe,
  JoinConversation,
  Contribute,
  SubsectionText,
} from '../components';
import { getPageDetails } from '../utils';

const title = 'Feedback';
const page = getPageDetails(title);

const Feedback = () => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Layout title={title} isLanding>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/feedback"
      />
      <ContentSection lastSection>
        <Subsection name="Have feedback to share?" level={2}>
          <SubsectionText>
            Get in touch to help make the HPE Design System better.
          </SubsectionText>
        </Subsection>
        <Box flex={false}>
          <Grid
            fill="horizontal"
            columns={
              size !== 'small' ? { count: 'fit', size: 'small' } : 'auto'
            }
            gap="large"
          >
            <Subscribe />
            <JoinConversation />
            <Contribute />
          </Grid>
        </Box>
      </ContentSection>
    </Layout>
  );
};

export default Feedback;
