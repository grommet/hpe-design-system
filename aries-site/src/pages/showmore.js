import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../components';
import { Layout, PageIntro } from '../layouts';
import { getCards, getPageDetails } from '../utils';

const title = 'Show More';
const pageDetails = getPageDetails(title);
const cards = getCards();
const featured = [
  'Designer Guidance',
  'Forms',
  'Header',
  'Human Centered',
  'Developer Guidance',
  'Button',
  'Navigation',
  'Icons',
  'Search',
  'Typography',
];

const featuredCards = [];
const cardOrder = [];

cards.forEach(card => {
  if (featured.includes(card.name)) featuredCards.push(card);
  else cardOrder.push(card);
});

featuredCards.sort(
  (a, b) => featured.indexOf(a.name) - featured.indexOf(b.name),
);

cardOrder.splice(0, 0, ...featuredCards);

const ShowMore = () => (
  <Layout
    backgroundImage={{
      src: { dark: '/cards-dark.svg', light: '/cards.svg' },
      alt: 'HPE Design System',
      margin: { top: '50px', left: '-150px' },
      style: { transform: 'scale(1.4)', transformOrigin: 'top left' },
      small: {
        margin: { left: '-75px', top: '-75px' },
      },
      useGrid: true,
    }}
    title={title}
    isLanding
  >
    <Meta title={title} description={pageDetails.seoDescription} />
    <Box gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">HPE Design System</Heading>
          <Paragraph size="large" fill>
            The Design System was created to empower designers, developers, and
            others to contribute to making great experiences for the customer.
          </Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cardOrder} />
    </Box>
  </Layout>
);

export default ShowMore;
