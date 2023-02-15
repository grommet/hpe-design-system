import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Learn';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Templates = () => (
  <Layout title={title} isLanding>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/learn"
    />
    <PageContent gap="large">
      <Box pad={{ vertical: 'medium' }} justify="center" width="large">
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </Box>
      <CardGrid cards={cards} pad={{ bottom: 'large' }} />
    </PageContent>
  </Layout>
);

export default Templates;
