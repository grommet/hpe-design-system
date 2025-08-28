import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../components';
import { PageIntro } from '../layouts';
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
  <>
    <Meta title={title} description={pageDetails.seoDescription} />
    <PageContent gap='xlarge'>
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">Highlights</Heading>
          <Paragraph size="large" fill>
            The Design System was created to empower designers, developers, and
            others to contribute to making great experiences for the customer.
          </Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cardOrder} headingLevel={2} />
    </PageContent>
  </>
);

export default ShowMore;
