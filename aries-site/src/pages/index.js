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
      src: { dark: '/carte-cards-dark.svg', light: '/carte-cards.svg' },
      alt: 'HPE Carte Design System',
      margin: { top: '125px', left: '-150px' },
      style: { transform: 'scale(1.25)' },
      width: '65%',
      small: {
        margin: '15px',
        width: '100%',
      },
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
          <Paragraph fill>
            The Carte Design System was created to empower designers, developer,
            and others to contribute in making great experiences for the
            customer. Carte means “card game” in Italian. Pick your cards and
            see what games you can play.
          </Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cards} />
    </Box>
  </Layout>
);

export default Index;
