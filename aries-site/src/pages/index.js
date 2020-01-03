import React, { useEffect } from 'react';
import { initialize, pageview } from 'react-ga';

import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

import { Config } from '../../config';
import { PageLayout } from '../layouts';
import { data as homeData, TileContent, IntroTile } from '../components/home';

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

const Index = () => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  const data = Object.values(homeData);

  return (
    <PageLayout title="Home" isLanding>
      {/* <Grid columns={['flex', 'xxlarge', 'flex']}> */}
      {/* <Box /> */}
      <Box gap="large">
        <HomeTiles>
          <Tile background="white">
            <Image src="/image-hands.png" alt="HPE Hands Image" fit="cover" />
          </Tile>
          <IntroTile background="white" />
        </HomeTiles>
        <HomeTiles>
          {data.map(item => (
            <Tile
              pad="medium"
              background={item.color}
              key={item.color}
              onClick={() =>
                (window.location.href = `/${item.title.toLowerCase()}`)
              }
            >
              <TileContent
                key={item.title}
                title={item.title}
                subTitle={item.subTitle}
                icon={item.icon('xlarge')}
              />
            </Tile>
          ))}
        </HomeTiles>
      </Box>
      {/* <Box /> */}
      {/* </Grid> */}
    </PageLayout>
  );
};

export default Index;
