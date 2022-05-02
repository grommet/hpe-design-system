import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, ResponsiveContext } from 'grommet';

export function TextExample({ color, hex }) {
  const size = React.useContext(ResponsiveContext);
  const textSize = 'small';
  const exampleTextSize = ['xsmall', 'small'].includes(size) ? '60px' : '84px';

  return (
    <Box align="center" margin={{ horizontal: 'small' }}>
      <Box direction="row" align="center">
        <Text color={color} weight={700} size={exampleTextSize}>
          A
        </Text>
        <Text color={color} weight={400} size={exampleTextSize}>
          a
        </Text>
      </Box>
      <Text color={color} weight={600} size={textSize}>
        {color}
      </Text>
      <Text color={color} size={textSize}>
        {hex}
      </Text>
    </Box>
  );
}

TextExample.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  hex: PropTypes.string,
};
