import React from 'react';
import { Box, Card, CardBody, Image, Text } from 'grommet';

export const CardWithImage = () => (
  <Card background="background-front">
    <Box height="small" width="medium">
      <Image
        alt="Wide angle photo of Golden Gate Bridge on a sunny day"
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
  </Card>
);
