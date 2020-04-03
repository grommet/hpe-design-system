import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Components';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Components = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/carte-components-dark.svg',
        light: '/carte-components-light.svg',
      },
      alt: 'HPE Carte Design System',
      fit: 'contain',
      margin: { top: '-200px', left: '-75px' },
      small: {
        margin: { top: '-250px' },
      },
    }}
    title={title}
    isLanding
  >
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components"
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

export default Components;
