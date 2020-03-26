import React from 'react';
import Link from 'next/link';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, ContentCard, Meta } from '../components';
import { structure } from '../data';
import { Layout, PageIntro } from '../layouts';
import {
  getPageDetails,
  getParentPage,
  nameToPath,
  useDarkMode,
} from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);

const cards = structure
  .map(obj => {
    const page = obj;
    const parent = getParentPage(page.name);
    page.parent = parent;
    return page;
  })
  .filter(page => page.parent !== undefined)
  .filter(page => page.parent.name !== 'Home');

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
        <CardGrid>
          {cards.map(topic => (
            // Need to pass href because of: https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child
            <Link key={topic.name} href={nameToPath(topic.name)} passHref>
              <ContentCard
                as="a"
                style={{ textDecoration: 'none' }}
                topic={topic}
              />
            </Link>
          ))}
        </CardGrid>
      </Box>
    </Layout>
  );
};

export default Index;
