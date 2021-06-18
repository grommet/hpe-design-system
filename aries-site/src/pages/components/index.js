import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, PageIntro, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Components';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Components = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/components-dark.svg',
        light: '/components-light.svg',
      },
      alt: 'HPE Design System',
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
          <Paragraph size="large" fill>
            {pageDetails.description}
          </Paragraph>
        </Box>
      </PageIntro>
      <ContentSection>
        <Subsection name="Layouts">
          <CardGrid cards={cards.filter(card => card.category === 'Layouts')} />
        </Subsection>
        <Subsection name="Controls">
          <CardGrid
            cards={cards.filter(card => card.category === 'Controls')}
          />
        </Subsection>
        <Subsection name="Inputs">
          <CardGrid cards={cards.filter(card => card.category === 'Inputs')} />
        </Subsection>
        <Subsection name="Visualizations">
          <CardGrid
            cards={cards.filter(card => card.category === 'Visualizations')}
          />
        </Subsection>
        <Subsection name="All Components">
          <SubsectionText>
            If you haven't found what you're looking for yet, check out other
            components that are available.
          </SubsectionText>
          <CardGrid cards={cards.filter(card => card.category === 'All')} />
        </Subsection>
      </ContentSection>
    </Box>
  </Layout>
);

export default Components;
