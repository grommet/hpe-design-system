import React from 'react';
import { Box, Card, CardBody, Image, Text } from 'grommet';

export const CardWithImage = () => (
  <Card>
    <Box height="small" width="medium">
      <Image
        src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80"
        fit="cover"
      />
    </Box>
    <CardBody gap="xsmall" pad="medium">
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          Title
        </Text>
        <Text color="text-strong">Subtitle</Text>
      </Box>
    </CardBody>
  </Card>
);
