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
    <PageContent>
      <Box pad={{ vertical: 'medium' }} justify="center" width="xlarge">
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </Box>
      <ContentSection gap="xlarge">
        <Subsection level={2} name="Getting started">
          <CardGrid
            cards={cards.filter(card => card.category === 'Getting started')}
            headingLevel={3}
          />
        </Subsection>
        <Subsection level={2} name="Philosophy">
          <CardGrid
            cards={cards.filter(card => card.category === 'Philosophy')}
            headingLevel={3}
          />
        </Subsection>
        <Subsection level={2} name="HPE Brand">
          <CardGrid
            cards={cards.filter(card => card.category === 'HPE Brand')}
            headingLevel={3}
          />
        </Subsection>
        <Subsection level={2} name="Color">
          <CardGrid
            cards={cards.filter(card => card.category === 'Color')}
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
