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

const DashedBox = ({ ...rest }) => (
  <Box
    alignSelf="start"
    border={{ style: 'dashed' }}
    round="xxsmall"
    {...rest}
  />
);

const CardExample = ({ ...rest }) => (
  <Card width="medium" onClick={() => {}} {...rest}>
    <CardBody align="start" gap="medium">
      <Box gap="xsmall">
        <>
          <Box pad={{ bottom: 'small' }}>
            <DashedBox id="icon">
              <Notes color="blue" />
            </DashedBox>
          </Box>
          <DashedBox id="title">
            <Heading level={3} margin="none" size="small">
              Helpful Guides
            </Heading>
          </DashedBox>
        </>
        <DashedBox id="description">
          <Paragraph margin="none">
            Access step by step guides on getting the most out of your Greenlake
            console.
          </Paragraph>
        </DashedBox>
      </Box>
      <DashedBox id="action" flex={false}>
        <Button
          label="View Guides"
          secondary
          // tabIndex is -1 because entire card is clickable
          tabIndex={-1}
        />
      </DashedBox>
    </CardBody>
  </Card>
);

const color = 'border';
const anchor = 'horizontal';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'title',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'icon',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'description',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'action',
  },
];

export const NavigationalAnatomy = () => (
  <Stack>
    <Grid
      columns={['xsmall', 'medium']}
      rows={['58px', '36px', '48px', 'xsmall']}
      areas={[
        ['annotation-1b', 'card-example'],
        ['annotation-1a', 'card-example'],
        ['annotation-2', 'card-example'],
        ['annotation-3', 'card-example'],
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
        margin={{ top: 'medium' }}
      />
      <Annotation
        id={3}
        target="3"
        gridArea="annotation-3"
        margin={{ top: 'large' }}
      />
      <CardExample gridArea="card-example" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);
