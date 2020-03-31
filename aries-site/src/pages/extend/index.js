import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails, useDarkMode } from '../../utils';

const title = 'Extend';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Extend = () => {
  const darkMode = useDarkMode();
  const cardImage = darkMode.value
    ? '/carte-extend-dark.svg'
    : '/carte-extend-light.svg';

  return (
    <Layout title={title} isLanding>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/extend"
      />
      <Box gap="large">
        <PageIntro
          image={{
            src: cardImage,
            alt: 'Card deck of HPE Design System extend cards',
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

export default Extend;
