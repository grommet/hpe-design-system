import React from 'react';
import Link from 'next/link';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, ContentCard, Meta } from '../../components';
import { structure } from '../../data';
import { Layout, PageIntro } from '../../layouts';
import { getPageDetails, getParentPage, nameToPath } from '../../utils';

const title = 'Foundation';
const pageDetails = getPageDetails(title);

const cards = structure
  .map(obj => {
    const page = obj;
    const parent = getParentPage(page.name);
    page.parent = parent;
    return page;
  })
  .filter(page => page.parent !== undefined)
  .filter(page => page.parent.name === title);

const Foundation = () => {
  return (
    <Layout title={title} isLanding>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates"
      />
      <Box gap="large">
        <PageIntro
          image={{
            src: '/card-foundation.png',
            alt: 'Card deck of HPE Design System component cards',
            fit: 'cover',
          }}
        >
          <Box justify="center" fill>
            <Heading margin="none">{title}</Heading>
            <Paragraph fill>{pageDetails.description}</Paragraph>
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

export default Foundation;
