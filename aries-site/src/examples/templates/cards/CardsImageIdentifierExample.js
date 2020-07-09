import React from 'react';
import { Box, Card, CardBody, Grid, Image, Text } from 'grommet';
import { data } from './data';

export const CardsImageIdentifierExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: ['auto', 'medium'] }} gap="medium">
        {data &&
          data.map(
            ({ displayName: title, location: subtitle, imageUrl }, index) => (
              <Card key={index} pad="small">
                {/* <Box direction="row"> */}
                <CardBody direction="row" pad="none">
                  <Box height="xsmall" width="xsmall" pad="small">
                    <Image src={imageUrl} fit="cover" />
                  </Box>
                  <Box flex pad="small">
                    <Text color="text-strong" size="xxlarge" weight="bold">
                      {title}
                    </Text>
                    <Text>{subtitle}</Text>
                  </Box>
                </CardBody>
                {/* </Box> */}
              </Card>
            ),
          )}
      </Grid>
    </Box>
  );
};
