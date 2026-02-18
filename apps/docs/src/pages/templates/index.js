import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { ContentSection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Templates';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Templates = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates"
    />
    <PageContent>
      <Box pad={{ vertical: 'medium' }} justify="center" width="xlarge">
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </Box>
      <ContentSection>
        <CardGrid
          cards={cards}
          pad={{ bottom: 'xlarge' }}
          headingSize="small"
          headingLevel={2}
        />
      </ContentSection>
    </PageContent>
  </>
);

export default Templates;
