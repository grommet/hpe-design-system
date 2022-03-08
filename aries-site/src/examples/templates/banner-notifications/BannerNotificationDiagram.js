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
    columns={['xxsmall', ['small', 'medium'], 'xxsmall', 'xxsmall']}
    rows="xxsmall"
    justify="center"
    fill
    {...rest}
  />
);

const AnatomyBox = ({ children, id, ...rest }) => (
  <Box
    id={id}
    justify="center"
    fill="horizontal"
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
      <Annotation id={4} target="4" />
      <AnatomyBox id="status-indicator" align="center">
        <StatusCriticalSmall color="red" />
      </AnatomyBox>
      <AnatomyBox id="content">
        <Text alignSelf="start">
          This service is currently down for maintenance.
        </Text>
      </AnatomyBox>
      <AnatomyBox align="start" id="link">
        <Anchor href="#" label="Link" />
      </AnatomyBox>
      <AnatomyBox id="close-button" align="center">
        <FormClose />
      </AnatomyBox>
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
