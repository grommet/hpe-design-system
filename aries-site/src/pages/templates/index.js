import React from 'react';
import { Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../../components';
import { Layout, PageIntro } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Templates';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Templates = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/templates-dark.svg',
        light: '/templates-light.svg',
      },
      alt: 'HPE Design System Templates',
      margin: { left: '-200px', top: '-125px' },
      small: {
        margin: { left: '-25px', top: '-175px' },
      },
    }}
    title={title}
    isLanding
  >
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates"
    />
    <PageContent gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">{title}</Heading>
          <Paragraph size="large" fill>
            {pageDetails.description}
          </Paragraph>
        </Box>
      </PageIntro>
      <CardGrid cards={cards} pad={{ bottom: 'large' }} />
    </PageContent>
  </Layout>
);

export default Templates;
