import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Text, Diagram, Stack, ThemeContext } from 'grommet';

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

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xxsmall', ['small', 'medium']]}
    gap={{ column: 'small', row: 'medium' }}
    justify="center"
    {...rest}
  />
);

const AnatomyBox = ({ background, id }) => {
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
};

const Annotation = ({ id, target }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      align="center"
      background="background-front"
      border={{ color: 'border-weak' }}
      height={theme.global.edgeSize.medium}
      justify="center"
      round
      width={theme.global.edgeSize.medium}
    >
      <Text size="small" weight="bold">
        {target}
      </Text>
    </Box>
  );
};

export const NameValueListAnatomy = () => (
  <Stack margin={{ bottom: 'large' }}>
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
  </Stack>
);

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
};

Annotation.propTypes = {
  id: PropTypes.number,
  target: PropTypes.string,
};
