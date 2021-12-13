import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Diagram, Stack, Text, ThemeContext } from 'grommet';
import { FormClose } from 'grommet-icons';
import { Annotation } from '../namevaluelist/NameValueListAnatomy';

export const color = 'border';
export const anchor = 'vertical';
export const thickness = 'hair';
export const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'border-annotation',
    toTarget: 'border',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: 'name-annotation',
    toTarget: 'tagName-2',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'value-annotation',
    toTarget: 'value',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: 'close-annotation',
    toTarget: 'close',
  },
];

export const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xsmall', 'small', 'xsmall']}
    gap={{ column: 'small', row: 'medium' }}
    justify="center"
    {...rest}
  />
);

export const AnatomyBox = ({ id, nameId, valueId, closeId }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box direction="row" gap="xxsmall" id={id} {...theme.tag}>
      <Box id={nameId}>Location</Box>
      {valueId && closeId && (
        <>
          <Box>:</Box>
          <Box id={valueId}>
            <Text {...theme.tag.value}>NY_USA</Text>
          </Box>
          <Box id={closeId}>
            <FormClose />
          </Box>
        </>
      )}
    </Box>
  );
};

export const TagAnatomy = () => (
  <Stack>
    <AnatomyGrid>
      {/* Empty Box occupies first cell of grid. Alternatively 
        could use gridAreas, but felt heavy for this need. */}
      <Box />
      <Annotation id="border-annotation" target="1" />
      <Box />
      <Box alignSelf="center">
        <Annotation id="name-annotation" target="2" />
      </Box>
      <AnatomyBox
        id="border"
        nameId="tagName-2"
        valueId="value"
        closeId="close"
      />
      <Box alignSelf="center">
        <Annotation id="close-annotation" target="4" />
      </Box>
      <Box />
      <Box margin={{ left: 'large' }}>
        <Annotation id="value-annotation" target="3" />
      </Box>
      <Box />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  id: PropTypes.string,
  closeId: PropTypes.string,
  nameId: PropTypes.string,
  valueId: PropTypes.string,
};
