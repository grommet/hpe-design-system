import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Diagram, Stack } from 'grommet';

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
  <Box direction="row" gap="medium">
    <Box
      id={visualId}
      height="xxsmall"
      width="xxsmall"
      background={background}
      round="xxsmall"
    />
    <Box
      id={id}
      height="xxsmall"
      width="small"
      background={background}
      round="xxsmall"
    />
  </Box>
);

const CircleBox = ({ id, target }) => (
  <Box
    id={id}
    align="center"
    pad={{ horizontal: 'small', vertical: 'xxsmall' }}
    round
    background="background-front"
  >
    <Text weight="bold">{target}</Text>
  </Box>
);

export const NameValueListAnatomy = () => (
  <Stack>
    <Box gap="medium" pad={{ bottom: 'medium' }}>
      <Box
        margin={{ left: 'xlarge' }}
        justify="between"
        gap="large"
        direction="row"
        width="medium"
      >
        <CircleBox id={1} target="1" />
        <CircleBox id={2} target="2" />
      </Box>
      <Box gap="medium" direction="row">
        <AnatomyBox
          id="name"
          background="status-warning"
          visualId="nameVisual"
        />
        <AnatomyBox id="value" background="purple!" visualId="valueVisual" />
      </Box>
      <Box
        justify="between"
        width="medium"
        direction="row"
      >
        <CircleBox id={3} target="3" />
        <CircleBox id={4} target="3" />
      </Box>
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
