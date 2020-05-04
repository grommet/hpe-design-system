import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../components';
import { Layout, PageIntro } from '../layouts';
import { getCards, getPageDetails } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);
const cards = getCards();

const Index = () => (
  <Layout
    backgroundImage={{
      src: { dark: '/cards-dark.svg', light: '/cards.svg' },
      alt: 'HPE Design System',
      margin: { top: '50px', left: '-150px' },
      style: { transform: 'scale(1.4)', transformOrigin: 'top left' },
      small: {
        margin: { left: '-75px', top: '-75px' },
      },
      useTiles: true,
    }}
    title={title}
    isLanding
  >
    <Meta title={title} description={pageDetails.seoDescription} />
    <Box gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">
            Mix, match, and stack cards to change the game
          </Heading>
          <Paragraph size="large" fill>
            The Design System was created to empower designers,
            developer, and others to contribute in making
            great experiences for the customer.{' '}
            {/* Carte means “card game” in Italian. Pick your cards and 
            see what games you can play. */}
          </Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cards} />
    </Box>
  </Layout>
);

export default Index;
