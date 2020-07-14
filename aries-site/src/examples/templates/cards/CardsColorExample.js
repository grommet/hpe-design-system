import React from 'react';
import { Box, Card, CardBody, CardFooter, Grid, Text } from 'grommet';

import { cardSize } from './cardVariants';
import { data } from './data';

export const CardsColorExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {data &&
          data.map(
            (
              {
                cardColor: background,
                deviceName: title,
                ipAddress: subtitle,
                icon,
                status,
              },
              index,
            ) => (
              <Card key={index} background={background}>
                <CardBody gap="xsmall">
                  <Box>{icon('text-strong', 'large')}</Box>
                  <Box>
                    <Text color="text-strong" size="xxlarge" weight="bold">
                      {title}
                    </Text>
                    <Text color="text-strong">{subtitle}</Text>
                  </Box>
                </CardBody>
                <CardFooter height={{ min: 'xxsmall' }}>
                  {status && (
                    <Box direction="row" align="center" gap="small">
                      {status.icon && status.icon('text-strong', undefined)}
                      <Text weight="bold" color="text-strong">
                        {status.message}
                      </Text>
                    </Box>
                  )}
                </CardFooter>
              </Card>
            ),
          )}
      </Grid>
    </Box>
  );
};
