import React, { forwardRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

import { Layout } from '../layouts';
import { Meta } from '../components';
import { TileContent, IntroTile } from '../components/home';
import { getPageDetails } from '../utils';

const HomeTiles = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Tiles
      gap={size !== 'small' ? 'large' : 'medium'}
      columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
      rows="medium"
      {...rest}
    />
  );
};

// Reasoning for using forwardRef: https://nextjs.org/docs/api-reference/next/link#example-with-reactforwardref
const TopicTile = forwardRef(({ topic, ...rest }, ref) => {
  return (
    <Tile
      pad="medium"
      background={topic.color}
      key={topic.color}
      ref={ref}
      {...rest}
    >
      <TileContent
        key={topic.name}
        title={topic.name}
        subTitle={topic.description}
        icon={topic.icon('xlarge')}
      />
    </Tile>
  );
});

const title = 'Home';
const pageDetails = getPageDetails(title);
const topicList = pageDetails.pages.map(topic => getPageDetails(topic));

const Index = () => {
  return (
    <Layout title={title} isLanding>
      <Meta title={title} description={pageDetails.seoDescription} />
      <Box gap="large">
        <HomeTiles>
          <Tile background="white">
            <Image src="/image-hands.png" alt="HPE Hands Image" fit="cover" />
          </Tile>
          <IntroTile background="white" />
        </HomeTiles>
        <HomeTiles>
          {topicList.map(topic => (
            // Need to pass href because of: https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child
            <Link
              key={topic.name}
              href={`/${topic.name.toLowerCase()}`}
              passHref
            >
              <TopicTile topic={topic} />
            </Link>
          ))}
        </HomeTiles>
      </Box>
    </Layout>
  );
};

export default Index;

TopicTile.propTypes = {
  onClick: PropTypes.func,
  topic: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
  }),
};

TopicTile.defaultProps = {
  onClick: undefined,
};
