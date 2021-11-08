import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Text, Diagram, Stack } from 'grommet';

const color = 'text-strong';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'rectilinear';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'name',
    toTarget: '1',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'nameVisual',
    toTarget: '3',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'value',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'valueVisual',
  },
];

const AnatomyBox = ({ background, id, visualId }) => (
  <Box direction="row" gap="small">
    <Box
      id={visualId}
      height="xxsmall"
      width="xsmall"
      background={background}
      round="xxsmall"
    />
    <Box
      id={id}
      height="xxsmall"
      width="medium"
      background={background}
      round="xxsmall"
    />
  </Box>
);

const CircleBox = ({ id, target }) => (
  <Box
    id={id}
    alignSelf="center"
    align="center"
    justify="center"
    round
    height="xxsmall"
    width="xxsmall"
    background="background-front"
  >
    <Text weight="bold">{target}</Text>
  </Box>
);

export const NameValueListAnatomy = () => (
  <Stack alignSelf="start" margin="small">
    <Box alignSelf="start" gap="medium">
      <Grid gap="medium" justify="center" columns={{ count: 2, size: 'auto' }}>
        <CircleBox id={1} target="1" />
        <CircleBox id={2} target="2" />
        <AnatomyBox
          id="name"
          background="status-warning"
          visualId="nameVisual"
        />
        <AnatomyBox id="value" background="purple!" visualId="valueVisual" />
        <CircleBox id={3} target="3" />
        <CircleBox id={4} target="3" />
      </Grid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
  visualId: PropTypes.string,
};

CircleBox.propTypes = {
  id: PropTypes.number,
  target: PropTypes.string,
};

/* <Stack alignSelf="start" margin="small">
<Box alignSelf="start" gap="medium">
  <Grid gap="medium" justify="center" columns={{ count: 2, size: 'auto' }}>
    <CircleBox id={1} target="1" />
    <CircleBox id={2} target="2" />
  </Grid>
  <Grid gap="medium" justify="center" columns={{ count: 2, size: 'auto' }}>
    <AnatomyBox
      id="name"
      background="status-warning"
      visualId="nameVisual"
    />
    <AnatomyBox id="value" background="purple!" visualId="valueVisual" />
  </Grid>
  <Grid justify="start" columns={{ count: 2, size: 'auto' }}>
    <CircleBox id={3} target="3" />
    <CircleBox id={4} target="3" />
  </Grid>
</Box>
<Diagram connections={connections} />
</Stack> */
