import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
//   Diagram,
  Grid,
  Heading,
  Notification,
  Paragraph,
  Stack,
  Text,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { Annotation } from '../../../layouts';

// const connection = (fromTarget, toTarget) => ({
//   color: 'border',
//   anchor: 'horizontal',
//   thickness: 'hair',
//   type: 'direct',
//   fromTarget,
//   toTarget,
// });

// const connections = [
//   connection('1a', 'title'),
//   connection('1b', 'subtitle'),
//   connection('3', 'body'),
//   connection('4', 'notification'),
// ];

export const StatusbasedNavigationAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      columns={['xsmall', 'medium', 'xsmall']}
      rows={['48px','32px', 'small', 'xxsmall']}
      areas={[
        ['annotation-1a', 'card-example'],
        ['annotation-1b', 'card-example'],
        ['annotation-3', 'card-example'],
        ['annotation-4', 'card-example'],
      ]}
    >
      <Annotation
        id="1a"
        target="1a"
        gridArea="annotation-1a"
        margin={{ top: 'medium' }}
      />
      {/* <Annotation
        id={2}
        target="2"
        gridArea="annotation-2"
        margin={{ top: 'large' }}
      /> */}
      <Annotation id="1b" target="1b" gridArea="annotation-1b" />
      <Annotation
        id={3}
        target="3"
        gridArea="annotation-3"
        margin={{ top: 'large' }}
      />
      <Annotation id={4} target="4" gridArea="annotation-4" />
      <CardExample gridArea="card-example" />
    </Grid>
    {/* <Diagram connections={connections} /> */}
  </Stack>
);

const DashedBox = ({ ...rest }) => (
  <Box
    alignSelf="start"
    border={{ style: 'dashed' }}
    round="xxsmall"
    {...rest}
  />
);

const CardExample = ({ ...rest }) => (
  <Card width="medium" {...rest}>
    <CardHeader>
      <Box>
        <Box id="title">
          <Heading level={3} margin="none">
            Title
          </Heading>
        </Box>
        <Box id="subtitle">
          <Text>subtitle</Text>
        </Box>
      </Box>
      <Button
        a11yTitle=""
        alignSelf="start"
        icon={<LinkNext color="brand" />}
      />
    </CardHeader>
    <CardBody pad={{ horizontal: 'medium', bottom: 'medium' }}>
      <DashedBox fill id="body">
        <Box fill justify="center">
          <Paragraph textAlign="center" margin="none">
            body
          </Paragraph>
        </Box>
      </DashedBox>
    </CardBody>
    <CardFooter
      id="notification"
      gap="none"
      pad={{ horizontal: 'medium', bottom: 'medium' }}
    >
      {' '}
      <Notification
        status="critical"
        message="Optional inline notification."
        fill
      />
    </CardFooter>
  </Card>
);
