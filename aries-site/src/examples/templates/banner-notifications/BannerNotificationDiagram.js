import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Grid, Diagram, Stack, Text } from 'grommet';
import { FormClose, StatusCriticalSmall } from 'grommet-icons';
import { Annotation } from '../../../layouts';

const color = 'border';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'status-indicator',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'content',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'link',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'close-button',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xxsmall', 'xsmall', 'xxsmall', ['xsmall', 'medium'], 'xsmall']}
    justify="center"
    gap={{ row: 'small' }}
    fill
    {...rest}
  />
);

const AnatomyBox = ({ children, id, ...rest }) => (
  <Box
    id={id}
    justify="center"
    fill="horizontal"
    pad={{ vertical: 'xsmall' }}
    background="validation-critical"
    {...rest}
  >
    {children}
  </Box>
);

export const BannerNotificationDiagram = () => (
  <Stack margin={{ bottom: 'small' }}>
    <AnatomyGrid>
      <Annotation id={1} target="1" />
      <Annotation id={2} target="2" />
      <Annotation id={3} target="3" />
      <Box />
      <Annotation id={4} target="4" />
      <AnatomyBox align="center">
        <StatusCriticalSmall id="status-indicator" color="red" />
      </AnatomyBox>
      <AnatomyBox>
        <Text id="content" alignSelf="center">
          Content Text
        </Text>
      </AnatomyBox>
      <AnatomyBox align="center">
        <Anchor id="link" href="#" label="Link" />
      </AnatomyBox>
      <AnatomyBox />
      <AnatomyBox align="center">
        <FormClose id="close-button" />
      </AnatomyBox>
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
