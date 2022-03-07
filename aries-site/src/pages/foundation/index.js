import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { ContentSection, Layout, PageIntro, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Foundation';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Foundation = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/foundation-dark.svg',
        light: '/foundation-light.svg',
      },
      alt: 'HPE Design System Foundation',
      margin: { left: '-200px', top: '-175px' },
      small: {
        margin: { left: '0', top: '-300px' },
      },
    }}
    title={title}
    isLanding
  >
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/foundation"
    />
    <PageContent gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">{title}</Heading>
          <Paragraph size="large" fill>
            {pageDetails.description}
          </Paragraph>
        </Box>
      </PageIntro>
      <ContentSection>
        <Subsection level={2} name="Philosophy">
          <CardGrid
            cards={cards.filter(card => card.category === 'Philosophy')}
          />
        </Subsection>
        <Subsection level={2} name="Assets">
          <CardGrid cards={cards.filter(card => card.category === 'Assets')} />
        </Subsection>
      </ContentSection>
    </PageContent>
  </Layout>
);

export default Foundation;
