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

const AnatomyBox = ({ background, id, visualBackground, visualId }) => (
  <Box direction="row" gap="medium">
    <Box
      id={visualId}
      height="xxsmall"
      width="xxsmall"
      background={visualBackground}
    />
    <Box id={id} height="xxsmall" width="small" background={background} />
  </Box>
);

const CircleBox = ({ id, target }) => (
  <Box
    id={id}
    align="center"
    pad="xsmall"
    round="large"
    width="xxsmall"
    background="background-front"
  >
    <Text weight="bold">{target}</Text>
  </Box>
);

export const NameValueListAnatomy = () => (
  <Stack>
    <Box gap="medium" pad={{ bottom: 'medium' }}>
      <Box gap="large">
        <Box gap="large" direction="row">
          <CircleBox id={3} target="3" />
          <CircleBox id={1} target="1" />
        </Box>
        <Box gap="medium" direction="row">
          <AnatomyBox
            id="name"
            background="status-warning"
            visualBackground="status-warning"
            visualId="nameVisual"
          />
          <AnatomyBox
            id="value"
            background="purple!"
            visualBackground="purple!"
            visualId="valueVisual"
          />
        </Box>
      </Box>
      <Box justify="end" width="medium" gap="large" direction="row">
        <CircleBox id={4} target="3" />
        <CircleBox id={2} target="2" />
      </Box>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
  visualBackground: PropTypes.string,
  visualId: PropTypes.string,
};

CircleBox.propTypes = {
  id: PropTypes.number,
  target: PropTypes.string,
};
