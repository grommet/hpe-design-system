import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../components';
import { Layout, PageIntro } from '../layouts';
import { getCards, getPageDetails, useDarkMode } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);
const cards = getCards();

const Index = () => {
  const darkMode = useDarkMode();
  const cardImage = darkMode.value
    ? '/carte-cards-dark.svg'
    : '/carte-cards.svg';

  return (
    <Layout title={title} isLanding>
      <Meta title={title} description={pageDetails.seoDescription} />
      <Box gap="large">
        <PageIntro
          image={{
            src: cardImage,
            alt: 'Card deck of HPE Design System cards',
            fit: 'cover',
          }}
        >
          <Box justify="center" fill>
            <Heading margin="none">
              Mix, match, and stack cards to change the game
            </Heading>
            <Paragraph fill>
              The Carte Design System was created to empower designers,
              developer, and others to contribute in making great experiences
              for the customer. Carte means “card game” in Italian. Pick your
              cards and see what games you can play.
            </Paragraph>
          </Box>
        </PageIntro>
        <CardGrid cards={cards} />
      </Box>
    </Layout>
  );
};

export default Index;
