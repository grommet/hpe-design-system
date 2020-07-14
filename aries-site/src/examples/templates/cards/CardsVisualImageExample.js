import React from 'react';
import { Box, Card, CardBody, Grid, Image, Text } from 'grommet';

import { cardSize } from './cardVariants';
import { data } from './data';

export const CardsVisualImageExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {data &&
          data.map(
            ({ displayName: title, imageUrl, location: subtitle }, index) => (
              <Card key={index}>
                <Box height="small">
                  <Image src={imageUrl} fit="cover" />
                </Box>
                <CardBody gap="xsmall">
                  <Box>
                    <Text color="text-strong" size="xxlarge" weight="bold">
                      {title}
                    </Text>
                    <Text color="text-strong">{subtitle}</Text>
                  </Box>
                </CardBody>
              </Card>
            ),
          )}
      </Grid>
    </Box>
  );
};
