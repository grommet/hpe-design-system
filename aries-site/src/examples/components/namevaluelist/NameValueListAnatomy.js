import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Diagram, Stack, ThemeContext } from 'grommet';
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
    toTarget: 'name',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'nameVisual',
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

function AnatomyGrid({ ...rest }) {
  return <Grid
    columns={['xxsmall', ['small', 'medium']]}
    gap={{ column: 'small', row: 'medium' }}
    justify="center"
    {...rest}
  />;
}

function AnatomyBox({ background, id }) {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      fill="horizontal"
      background={background}
      height={theme.global.edgeSize.medium}
      round="xxsmall"
    />
  );
}

export function NameValueListAnatomy() {
  return <Stack margin={{ bottom: 'medium' }}>
    <Box direction="row-responsive" gap="medium">
      <AnatomyGrid>
        {/* Empty Box occupies first cell of grid. Alternatively 
        could use gridAreas, but felt heavy for this need. */}
        <Box />
        <Annotation id={1} target="1" />
        <AnatomyBox id="nameVisual" background="orange" />
        <AnatomyBox id="name" background="orange" />
        <Annotation id={3} target="3" />
      </AnatomyGrid>
      <AnatomyGrid>
        {/* Empty Box occupies first cell of grid. Alternatively 
        could use gridAreas, but felt heavy for this need. */}
        <Box />
        <Annotation id={2} target="2" />
        <AnatomyBox id="valueVisual" background="purple!" />
        <AnatomyBox id="value" background="purple!" />
        <Annotation id={4} target="3" />
      </AnatomyGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>;
}

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
};
