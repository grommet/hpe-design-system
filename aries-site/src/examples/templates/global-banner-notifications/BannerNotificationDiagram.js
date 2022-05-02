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

function AnatomyGrid({ ...rest }) {
  return <Grid
    columns={[
      '12px',
      'xxsmall',
      'small',
      'xxsmall',
      ['xsmall', 'large'],
      'xsmall',
    ]}
    justify="center"
    gap={{ row: 'small' }}
    fill
    {...rest}
  />;
}

function AnatomyBox({ children, id, ...rest }) {
  return <Box
    id={id}
    justify="center"
    fill="horizontal"
    pad={{ vertical: 'xsmall' }}
    background="validation-critical"
    {...rest}
  >
    {children}
  </Box>;
}

export function BannerNotificationDiagram() {
  return <Stack margin={{ bottom: 'small' }}>
    <AnatomyGrid>
      <Box />
      <Annotation id={1} target="1" />
      <Annotation id={2} target="2" />
      <Annotation id={3} target="3" />
      <Box />
      <Annotation id={4} target="4" />
      <AnatomyBox />
      <AnatomyBox align="center">
        <StatusCriticalSmall id="status-indicator" color="red" />
      </AnatomyBox>
      <AnatomyBox>
        <Text id="content" alignSelf="center">
          Banner message goes here.
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
  </Stack>;
}

AnatomyBox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
