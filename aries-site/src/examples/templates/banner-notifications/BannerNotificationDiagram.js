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
          {/* pointers were off by 1px so needed this to have straight line */}
          <Annotation margin={{ left: '-1px' }} id={1} target="1" />
          <Annotation margin={{ left: '-1px' }} id={2} target="2" />
          <Annotation id={3} target="3" />
        </Box>
        <Box
          direction="row"
          round="xsmall"
          gap="small"
          background={{ color: 'validation-critical' }}
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
        >
          <Box id="status-indicator">
            <StatusCriticalSmall color="red" />
          </Box>
          <Box id="content" align="start" direction="row" fill>
            <Text truncate>
              System maintenance scheduled to begin February 12 at 12:00 UTC.
            </Text>
          </Box>
          <FormClose id="close-button" />
        </Box>
      </AnatomyGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);
