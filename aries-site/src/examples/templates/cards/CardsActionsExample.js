import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from 'grommet';

export const CardsActionsExample = () => (
  <Box background="background-back" overflow="auto" pad="medium" fill>
    <Box direction="row">
      <Card>
        <Box height="small">
          <Image
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80"
            fit="cover"
          />
        </Box>
        <CardBody gap="xsmall">
          <Box>
            <Text color="text-strong" size="xxlarge" weight="bold">
              Title
            </Text>
            <Text color="text-strong">Subtitle</Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  </Box>
);
