import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails, useDarkMode } from '../../utils';

const title = 'Foundation';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Foundation = () => {
  const darkMode = useDarkMode();
  const cardImage = darkMode.value
    ? '/carte-foundation-dark.svg'
    : '/carte-foundation-light.svg';

  return (
    <Layout title={title} isLanding>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/foundation"
      />
      <Box gap="large">
        <PageIntro
          image={{
            src: cardImage,
            alt: 'Card deck of HPE Design System component cards',
            fit: 'cover',
          }}
        >
          <Box justify="center" fill>
            <Heading margin="none">{title}</Heading>
            <Paragraph fill>{pageDetails.description}</Paragraph>
          </Box>
        </PageIntro>
        <CardGrid cards={cards} />
      </Box>
    </Layout>
  );
};

export default Foundation;
