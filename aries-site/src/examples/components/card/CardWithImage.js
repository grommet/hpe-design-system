import React from 'react';
import { Box, Card, CardBody, Image, Text } from 'grommet';

export function CardWithImage() {
  return <Card background="background-front">
    <Box height="small" width="medium">
      <Image
        alt={`View of the Golden Gate Bridge with San Francisco in the 
        background on a sunny day with partial clouds.`}
        src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80"
        fit="cover"
      />
    </Box>
    <CardBody gap="xsmall">
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          HPE HQ
        </Text>
        <Text color="text-strong">
          6280 America Center Dr, San Jose, CA 95002
        </Text>
      </Box>
    </CardBody>
  </Card>;
}
