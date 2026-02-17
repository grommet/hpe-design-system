import React from 'react';
import { Box, Button, Card, CardBody, Paragraph } from 'grommet';
import { Skeleton } from 'grommet/components';

export const SkeletonAnatomy = ({ ...rest }) => (
  <Card id="container" flex={false} width="xlarge" {...rest}>
    <CardBody align="start" gap="medium">
      <Box align="center" gap="xsmall" direction="row">
        <Skeleton
          round="medium"
          width="5xsmall"
          height="5xsmall"
          flex={false}
        />
        <Skeleton
          round="xxlarge"
          width="5xsmall"
          height="5xsmall"
          flex={false}
        />
        <Box skeleton flex={false}>
          <Button label="View Guides" secondary />
        </Box>
        <Skeleton
          round="xsmall"
          width="xsmall"
          height="24px" // match pixel size with button or text
          flex={false}
        />
      </Box>
      <Box skeleton width="medium" id="text-body">
        <Paragraph />
      </Box>
    </CardBody>
  </Card>
);
