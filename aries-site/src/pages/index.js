import React, { forwardRef, useEffect } from 'react';
import { initialize, pageview } from 'react-ga';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

import { Config } from '../../config';
import { PageLayout } from '../layouts';
import { TileContent, IntroTile } from '../components/home';
import { structure } from '../data';

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
const TopicTile = forwardRef(({ onClick, topic }, ref) => {
  return (
    <Tile
      pad="medium"
      background={topic.color}
      key={topic.color}
      onClick={onClick}
      ref={ref}
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

// Get details for each child page of the home page
const topicList = structure
  .find(page => page.name === title)
  .pages.map(topic => structure.find(page => page.name === topic));

const Index = () => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  return (
    <PageLayout title={title} isLanding>
      <Box gap="large">
        <HomeTiles>
          <Tile background="white">
            <Image src="/image-hands.png" alt="HPE Hands Image" fit="cover" />
          </Tile>
          <IntroTile background="white" />
        </HomeTiles>
        <HomeTiles>
          {topicList.map(topic => (
            <Link key={topic.name} href={`/${topic.name.toLowerCase()}`}>
              <TopicTile topic={topic} />
            </Link>
          ))}
        </HomeTiles>
      </Box>
    </PageLayout>
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
