import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Extend';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Extend = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/carte-extend-dark.svg',
        light: '/carte-extend-light.svg',
      },
      alt: 'HPE Carte Design System Extend',
      margin: { left: '-125px', top: '-75px' },
      small: {
        margin: { left: '-25px', top: '-150px' },
      },
    }}
    title={title}
    isLanding
  >
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/extend"
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

export default Extend;
