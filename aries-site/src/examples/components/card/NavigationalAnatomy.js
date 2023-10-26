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
import { Notes } from 'grommet-icons';
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
  connection('1a', 'title'),
  connection('1b', 'icon'),
  connection('3', 'description'),
  connection('2', 'action'),
];

export const NavigationalAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      columns={['xsmall', 'medium']}
      rows={['58px', '36px', '48px', 'xsmall']}
      areas={[
        ['annotation-1b', 'card-example'],
        ['annotation-1a', 'card-example'],
        ['annotation-3', 'card-example'],
        ['annotation-2', 'card-example'],
      ]}
    >
      <Annotation
        id="1b"
        target="1b"
        gridArea="annotation-1b"
        margin={{ top: 'medium' }}
      />
      <Annotation
        id="1a"
        target="1a"
        gridArea="annotation-1a"
        margin={{ top: 'small' }}
      />
      <Annotation
        id={2}
        target="2"
        gridArea="annotation-2"
        margin={{ top: 'large' }}
      />
      <Annotation
        id={3}
        target="3"
        gridArea="annotation-3"
        margin={{ top: 'medium' }}
      />
      <CardExample gridArea="card-example" />
    </Grid>
    <Diagram connections={connections} />
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
    <CardBody align="start" gap="medium">
      <Box gap="xsmall">
        <>
          <DashedBox id="icon" margin={{ bottom: 'small' }}>
            <Notes color="blue" />
          </DashedBox>
          <DashedBox id="title">
            <Heading level={3} margin="none">
              Helpful guides
            </Heading>
          </DashedBox>
        </>
        <DashedBox id="description">
          <Paragraph margin="none">
            Access step by step guides on getting the most out of your HPE
            GreenLake console.
          </Paragraph>
        </DashedBox>
      </Box>
      <DashedBox id="action" flex={false}>
        <Button label="View guides" secondary />
      </DashedBox>
    </CardBody>
  </Card>
);
