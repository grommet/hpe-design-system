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
  <Page kind="wide">
    <PageContent
      background={{
        fill: 'horizontal',
        image: 'url(/componentImages/PageBackground.svg)',
      }}
    >
      <Heading level={1} size="small" color="white">
        HPE Service Site
      </Heading>
    </PageContent>
    <PageContent>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper.
      </Paragraph>
      <Box pad={{ vertical: 'medium' }}>
        <Grid
          rows="small"
          columns={{ count: 'fit', size: 'small' }}
          gap="small"
        >
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
    </PageContent>
  </Page>
);
