import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Text, Diagram, Stack } from 'grommet';
import { Map, List, Table } from 'grommet-icons';
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
    toTarget: 'map',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'list',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'table',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    // These arent the best, t-shirt sizes didnt really work
    columns={['80px', '120px', '80px']}
    gap={{ row: 'medium' }}
    justify="center"
    {...rest}
  />
);

const AnatomyBox = ({ id, children, ...rest }) => {
  return (
    <Box
      id={id}
      fill="horizontal"
      pad="3xsmall"
      justify="center"
      align="center"
      gap="3xsmall"
      direction="row"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const ToggleGroupAnatomy = () => {
  return (
    <Stack margin={{ bottom: 'medium' }}>
      <Box direction="row-responsive" gap="medium">
        <AnatomyGrid>
          <AnatomyBox
            round={{ corner: 'left', size: 'xsmall' }}
            border
            icon={<Map />}
            label="Map"
            id="map"
          >
            <Map />
            <Text color="text-strong" weight={600}>
              Map
            </Text>
          </AnatomyBox>
          <AnatomyBox border="horizontal">
            <Table />
            <Text id="table" color="text-strong" weight={600}>
              DataTable
            </Text>
          </AnatomyBox>
          <AnatomyBox round={{ corner: 'right', size: 'xsmall' }} border>
            <List id="list" />
            <Text color="text-strong" weight={600}>
              List
            </Text>
          </AnatomyBox>
          <Annotation id={1} target="1" />
          <Annotation id={2} target="2" margin={{ left: 'medium' }} />
          <Annotation id={3} target="3" margin={{ right: '32px' }} />
        </AnatomyGrid>
      </Box>
      <Diagram connections={connections} />
    </Stack>
  );
};

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.element,
};
