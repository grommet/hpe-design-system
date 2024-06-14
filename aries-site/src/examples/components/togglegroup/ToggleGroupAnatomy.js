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

const AnatomyBox = ({ label, id, icon, ...rest }) => {
  return (
    <Box
      id={id}
      fill="horizontal"
      pad="xsmall"
      justify="center"
      align="center"
      gap="xsmall"
      direction="row"
      {...rest}
    >
      {icon}
      <Text color="text-strong" weight={600}>
        {label}
      </Text>
    </Box>
  );
};

export const ToggleGroupAnatomy = () => (
  <Stack margin={{ bottom: 'medium' }}>
    <Box direction="row-responsive" gap="medium">
      <AnatomyGrid>
        <AnatomyBox
          round={{ corner: 'left', size: 'xsmall' }}
          border
          icon={<Map />}
          label="Map"
          id="map"
        />
        <AnatomyBox
          border="horizontal"
          id="table"
          icon={<Table />}
          label="DataTable"
        />
        <AnatomyBox
          round={{ corner: 'right', size: 'xsmall' }}
          label="List"
          icon={<List />}
          id="list"
          border
        />
        <Annotation id={1} target="1" />
        <Annotation id={2} target="2" />
        <Annotation id={3} target="3" />
      </AnatomyGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
};
