import React from 'react';
import { Box, Card, CardBody, Grid, Text } from 'grommet';

import { cardSize } from './cardVariants';
import { data } from './data';

export const CardsIconIdentifierExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {data &&
          data.map(
            ({ deviceName: title, ipAddress: subtitle, icon }, index) => (
              <Card key={index}>
                <CardBody direction="row" gap="small">
                  <Box pad={{ vertical: 'xsmall' }}>
                    {icon('text', 'large')}
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
