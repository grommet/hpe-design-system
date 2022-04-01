import React from 'react';
import {
  Box,
  Card,
  Grid,
  Heading,
  Paragraph,
  Page,
  PageContent,
} from 'grommet';

export const PageBackGroundExample = () => (
  <Page kind="wide" border flex="grow">
    <PageContent
      background={{
        fill: 'horizontal',
        image: 'url(/images/abstract-color-clouds.jpg)',
        size: 'contain',
        position: 'left',
        color: '#FAFBFD', // custom to match image background
      }}
    >
      <Hero />
    </PageContent>
    <PageContent
      background={{
        fill: 'horizontal',
        image: `linear-gradient(
          177deg, 
          #FDFDFD 0%,
          #FAFBFD 15%,
          #FAFBFD 40%,
          #D6E6F0 55%, 
          #A3CAE1 65%, 
          #53A8D0 90%,
          #53A8D0 100%
        )`,
      }}
    >
      <Technology />
    </PageContent>
    <PageContent background={{ fill: 'horizontal', color: '#53A8D0' }}>
      <Humanity />
    </PageContent>
  </Page>
);

const Hero = () => (
  <Box height={{ min: 'medium' }} border flex="grow">
    <Grid
      columns={['flex', 'large']}
      rows={['auto', 'auto']}
      areas={[
        ['empty', 'heading'],
        ['empty', 'introduction'],
      ]}
    >
      <Heading gridArea="heading" level={1} size="large">
        Building better. Together.
      </Heading>
      <Paragraph gridArea="introduction" size="xlarge">
        When minds come together from diverse backgrounds, cultures, and
        perspectives ...
      </Paragraph>
    </Grid>
  </Box>
);

const Technology = () => (
  <Box height={{ min: 'medium' }}>
    <Heading level={2} size="large">
      Investigation and curiosity
    </Heading>
    <Paragraph size="large">
      Understanding laws of nature and the physical universe
    </Paragraph>
  </Box>
);

const Humanity = () => (
  <Box>
    <Heading level={2} size="large">
      Investigation and curiosity
    </Heading>
    <Paragraph size="large">
      Understanding laws of nature and the physical universe
    </Paragraph>
  </Box>
);

const Stuff = () => (
  <>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
      gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum
      quis. Aenean porttitor at mi id semper.
    </Paragraph>
    <Box pad={{ vertical: 'medium' }}>
      <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="small">
        <Card background="background-front" pad="large">
          Card 20
        </Card>
        <Card background="background-front" pad="large">
          Card 23
        </Card>
        <Card background="background-front" pad="large">
          Card 23
        </Card>
      </Grid>
    </Box>
  </>
);
