import React from 'react';
import Link from 'next/link';
import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

import { CardGrid, ContentCard, IntroTile, Meta } from '../components';
import { structure } from '../data';
import { Layout } from '../layouts';
import {
  getPageDetails,
  getParentPage,
  nameToPath,
  useDarkMode,
} from '../utils';

const HomeTiles = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Tiles
      gap={size !== 'small' ? 'large' : 'medium'}
      columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
      rows={[['xsmall', 'medium']]}
      {...rest}
    />
  );
};

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
        <HomeTiles intro>
          <Tile>
            <Image src={cardImage} alt="HPE Hands Image" fit="cover" />
          </Tile>
          <IntroTile />
        </HomeTiles>
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
