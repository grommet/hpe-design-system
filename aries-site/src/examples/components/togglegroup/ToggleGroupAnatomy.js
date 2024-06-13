import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Text, Diagram, Stack, ThemeContext } from 'grommet';
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
    columns={{
      count: 3,
      size: 'xsmall',
    }}
    gap={{ row: 'medium' }}
    justify="center"
    {...rest}
  />
);

const AnatomyBox = ({ label, id, icon, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      pad="small"
      fill="horizontal"
      height={theme.global.edgeSize.medium}
      border
      justify="center"
      align="center"
      gap="small"
      direction="row"
      {...rest}
    >
      {icon}
      <Text>{label}</Text>
    </Box>
  );
};

export const ToggleGroupAnatomy = () => (
  <Stack margin={{ bottom: 'medium' }}>
    <Box direction="row-responsive" gap="medium">
      <AnatomyGrid>
        <AnatomyBox
          round={{ corner: 'left', size: 'xxsmall' }}
          icon={<Map />}
          label="Map"
          id="map"
        />
        <AnatomyBox id="table" icon={<Table />} label="DataTable" />
        <AnatomyBox
          round={{ corner: 'right', size: 'xxsmall' }}
          label="List"
          icon={<List />}
          id="list"
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
