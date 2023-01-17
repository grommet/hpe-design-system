import React from 'react';
import { Box, Button, Card, CardBody, Paragraph } from 'grommet';

export const SkeletonAnatomy = ({ ...rest }) => (
  <Card id="container" flex={false} width="large" {...rest}>
    <CardBody align="start" gap="medium">
      <Box align="center" gap="small" direction="row">
        <Box
          round="small"
          width="xxsmall"
          height="xxsmall"
          background="background-back"
          flex={false}
        />
        <Box
          round="large"
          width="xxsmall"
          height="xxsmall"
          background="background-back"
          flex={false}
        />
        <Box skeleton flex={false}>
          <Button label="View Guides" secondary />
        </Box>
        <Box
          round="xsmall"
          width="small"
          height="24px" // match pixel size with button or text
          background="background-back"
          flex={false}
        />
      </Box>
      <Box skeleton width="medium" id="text-body">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
      </Box>
    </CardBody>
  </Card>
);
