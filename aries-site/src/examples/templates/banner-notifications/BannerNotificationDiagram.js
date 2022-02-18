import React from 'react';
import { Box, Diagram, Grid, Stack, Text } from 'grommet';
import { FormClose, StatusCriticalSmall } from 'grommet-icons';
import { Annotation } from '../../../layouts';

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
    toTarget: 'close-button',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid columns={['large']} gap={{ row: 'small' }} {...rest} />
);

export const BannerNotificationDiagram = () => (
  <Stack>
    <Box gap="medium" pad={{ bottom: 'medium' }}>
      <AnatomyGrid>
        <Box
          justify="between"
          pad={{ vertical: 'small', horizontal: 'small' }}
          direction="row"
        >
          <Annotation margin={{ left: '2px' }} id={1} target="1" />
          <Annotation id={2} target="2" />
          <Annotation id={3} target="3" />
        </Box>
        <Box
          direction="row"
          round="xsmall"
          gap="small"
          background={{ color: 'validation-critical' }}
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
        >
          <Box align="center" width="xxsmall" id="status-indicator">
            <StatusCriticalSmall color="red" />
          </Box>
          <Box id="content" align="start" direction="row" fill>
            <Text>This is an example of content text</Text>
          </Box>
          <Box width="medium" />
          <FormClose id="close-button" />
        </Box>
      </AnatomyGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);
