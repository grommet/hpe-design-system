import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Foundation';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Foundation = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/carte-foundation-dark.svg',
        light: '/carte-foundation-light.svg',
      },
      alt: 'HPE Carte Design System Foundation',
      margin: { left: '-150px', top: '-150px' },
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
    <Box gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">{title}</Heading>
          <Paragraph fill>{pageDetails.description}</Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cards} />
    </Box>
  </Layout>
);

export default Foundation;
