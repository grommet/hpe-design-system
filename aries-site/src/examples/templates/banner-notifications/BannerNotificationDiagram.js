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
    columns={['xxsmall', 'xsmall', 'xsmall', ['xsmall', 'small'], 'small']}
    justify="center"
    fill
    {...rest}
  />
);

const DiagramGrid = ({ ...rest }) => (
  <Grid
    columns={['xxsmall', 'medium', ['xsmall', 'small'], 'xxsmall']}
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
    <Box gap="small">
      <AnatomyGrid>
        <Annotation id={1} target="1" />
        <Annotation id={2} target="2" />
        <Annotation style={{ justifySelf: 'center' }} id={3} target="3" />
        <Box />
        <Annotation id={4} target="4" />
      </AnatomyGrid>
      <DiagramGrid>
        <AnatomyBox id="status-indicator" align="center">
          <StatusCriticalSmall color="red" />
        </AnatomyBox>
        <Box
          fill="horizontal"
          background="validation-critical"
          direction="row"
          gap="xsmall"
          align="center"
        >
          <Text id="content" alignSelf="center">
            Any Content text
          </Text>
          <Anchor id="link" href="#" label="Link" />
        </Box>
        <AnatomyBox id="close-button" align="center">
          <FormClose />
        </AnatomyBox>
      </DiagramGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
