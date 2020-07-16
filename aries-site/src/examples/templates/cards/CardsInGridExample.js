import React from 'react';
import { Box, Card, CardBody, Grid, Image, Text } from 'grommet';

import { cardSize } from './cardVariants';
import { data } from './data';

export const CardsInGridExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {data &&
          data.map(
            ({ displayName: title, location: subtitle, imageUrl }, index) => (
              <Card key={index}>
                <CardBody direction="row" gap="xsmall" pad="medium">
                  <Box
                    height="72px"
                    width="72px"
                    flex={false}
                    margin={{ top: 'small', right: 'small' }}
                  >
                    <Image src={imageUrl} fit="cover" />
                  </Box>
                  <Box>
                    <Text color="text-strong" size="xxlarge" weight="bold">
                      {title}
                    </Text>
                    <Text>{subtitle}</Text>
                  </Box>
                </CardBody>
              </Card>
            ),
          )}
      </Grid>
    </Box>
  );
};
