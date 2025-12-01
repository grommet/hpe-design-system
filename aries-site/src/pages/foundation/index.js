import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { ContentSection, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Foundation';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Foundation = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/foundation"
    />
    <PageContent gap="xlarge">
      <Box pad={{ vertical: 'medium' }} justify="center" width="xlarge">
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </Box>
      <ContentSection>
        <Subsection level={2} name="Philosophy">
          <CardGrid
            cards={cards.filter(card => card.category === 'Philosophy')}
            headingLevel={3}
          />
        </Subsection>
        <Subsection level={2} name="Assets">
          <CardGrid
            cards={cards.filter(card => card.category === 'Assets')}
            headingLevel={3}
          />
        </Subsection>
        <Subsection level={2} name="Layout">
          <CardGrid
            cards={cards.filter(card => card.category === 'Layout')}
            headingLevel={3}
          />
        </Subsection>
      </ContentSection>
    </PageContent>
  </>
);

export default Foundation;
