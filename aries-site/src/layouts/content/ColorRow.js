import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';

const columns = {
  small: ['auto', 'auto'],
  medium: ['auto', 'auto', 'auto', 'auto'],
};

const rows = {
  small: ['xxsmall'],
  medium: ['xxsmall'],
};

const gridAreas = {
  small: [
    { name: 'colorSwatch', start: [0, 0], end: [0, 0] },
    { name: 'hex', start: [1, 0], end: [1, 0] },
  ],
  medium: [
    { name: 'colorSwatch', start: [0, 0], end: [0, 0] },
    { name: 'hex', start: [1, 0], end: [1, 0] },
    { name: 'rgb', start: [2, 0], end: [2, 0] },
    { name: 'hsl', start: [3, 0], end: [3, 0] },
  ],
};

export const ColorRow = ({ colorSpec }) => {
  const { value, name, hex, rgb, hsl } = colorSpec;
  const size = useContext(ResponsiveContext);
  const gridSizing = size === 'small' ? size : 'medium';

  return (
    <Grid
      rows={rows[gridSizing]}
      columns={columns[gridSizing]}
      areas={gridAreas[gridSizing]}
      align="center"
      margin={{ vertical: 'small' }}
    >
      <Box
        gridArea="colorSwatch"
        direction="row"
        align="center"
        gap="medium"
        width="small"
      >
        <Box
          background={value}
          round="large"
          height="xxsmall"
          width="xxsmall"
        />
        <Text color="text-strong" weight={500}>
          {name}
        </Text>
      </Box>
      <Text gridArea="hex" color="text-weak" weight={400}>
        {hex}
      </Text>
      {size === 'small' ? null : (
        <>
          <Text gridArea="rgb" color="text-weak" weight={400}>
            {rgb}
          </Text>
          <Text gridArea="hsl" color="text-weak" weight={400}>
            {hsl}
          </Text>
        </>
      )}
    </Grid>
  );
};

ColorRow.propTypes = {
  colorSpec: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    rgb: PropTypes.string.isRequired,
    hsl: PropTypes.string.isRequired,
  }).isRequired,
};
