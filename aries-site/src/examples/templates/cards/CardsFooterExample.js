import React from 'react';
import { Box, Card, CardBody, CardFooter, Grid, Text } from 'grommet';

import { cardSize } from './cardVariants';
import { data } from './data';

export const CardsFooterExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {data &&
          data.map(
            ({ deviceName: title, ipAddress: subtitle, status }, index) => (
              <Card key={index}>
                <CardBody gap="xsmall">
                  <Box>
                    <Text color="text-strong" size="xxlarge" weight="bold">
                      {title}
                    </Text>
                    <Text>{subtitle}</Text>
                  </Box>
                </CardBody>
                <CardFooter
                  background="none"
                  border={{ color: 'border-weak', side: 'top' }}
                  height={{ min: 'xxsmall' }}
                >
                  {status && (
                    <Box direction="row" align="center" gap="xsmall">
                      <Box
                        background={status.value}
                        height="12px"
                        width="12px"
                        round="100%"
                      />
                      <Text weight="bold">{status.message}</Text>
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
