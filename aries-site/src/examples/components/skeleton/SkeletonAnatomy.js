import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Grid,
  Heading,
  Paragraph,
  Stack,
} from 'grommet';
import { Annotation } from '../../../layouts';

const connection = (fromTarget, toTarget) => ({
  color: 'border',
  anchor: 'horizontal',
  thickness: 'hair',
  type: 'direct',
  fromTarget,
  toTarget,
});

const connections = [
  connection('1', 'icon'),
  connection('2a', 'title'),
  connection('2b', 'text-body'),
  connection('3', 'button'),
  connection('4', 'container'),
];

export const SkeletonAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      columns={['xsmall', 'medium']}
      rows={['86px', '48px', '48px', '60px']}
      areas={[
        ['annotation-1', 'card-example'],
        ['annotation-2a', 'card-example'],
        ['annotation-2b', 'card-example'],
        ['annotation-3', 'card-example'],
      ]}
    >
      <Annotation
        id="1"
        target="1"
        gridArea="annotation-1"
        margin={{ top: 'medium' }}
      />
      <Annotation
        id="2a"
        target="2a"
        gridArea="annotation-2a"
        margin={{ top: 'small' }}
      />
      <Annotation
        id="2b"
        target="2b"
        gridArea="annotation-2b"
        margin={{ top: 'small' }}
      />
      <Annotation
        id={3}
        target="3"
        gridArea="annotation-3"
        margin={{ top: 'medium' }}
      />
      <CardExample gridArea="card-example" />
      {/* <Annotation
        id={4}
        target="4"
        gridArea="annotation-4"
        margin={{ top: 'medium' }}
      /> */}
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const CardExample = ({ ...rest }) => (
  <Card flex={false} width="medium" {...rest}>
    <CardBody align="start" gap="medium">
      <Box id="icon" margin={{ bottom: 'medium' }}>
        <Box round='small' width="xxsmall" height="xxsmall" background="background-back" flex={false} />
      </Box>
      <Box flex={false} skeleton id="title">
        <Heading size="small" margin="none" level={3} />
      </Box>
      <Box skeleton width="medium" id="text-body">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
      </Box>
      <Box skeleton id="button" flex={false}>
        <Button label="View Guides" secondary />
      </Box>
    </CardBody>
  </Card>
);
