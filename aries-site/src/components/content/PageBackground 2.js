import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';
import { useDarkMode } from '../../utils';

export const PageBackground = ({ backgroundImage }) => {
  const size = useContext(ResponsiveContext);
  const themeMode = useDarkMode().value ? 'dark' : 'light';
  const { src, alt, style, useTiles } = backgroundImage;
  const margin =
    backgroundImage[size] && backgroundImage[size].margin
      ? backgroundImage[size].margin
      : backgroundImage.margin;

  return (
    // Mimic the width of the main content layout so that
    // the margin shifts are relative to the width of
    // the content as opposed to the entire window
    <Box
      width={{ max: 'xxlarge' }}
      pad={{ horizontal: 'xlarge' }}
      margin="auto"
    >
      {/* Landing page uses Tiles because otherwise it will span
      too far behind the text */}
      {!useTiles ? (
        <Box margin={margin} width={{ max: 'large' }} style={style}>
          <Image src={src[themeMode]} alt={alt} fit="contain" />
        </Box>
      ) : (
        <Box height={{ min: 'medium' }} justify="center">
          <Tiles
            gap={size !== 'small' ? 'large' : 'medium'}
            columns={{
              count: 'fit',
              size: size !== 'small' ? 'medium' : 'fill',
            }}
          >
            <Box style={style} margin={margin}>
              <Image src={src[themeMode]} alt={alt} fit="contain" />
            </Box>
            {/* Empty tile restricts width so it switches to one column
            layout at same time as main content */}
            <Tile />
          </Tiles>
        </Box>
      )}
    </Box>
  );
};

PageBackground.propTypes = {
  backgroundImage: PropTypes.shape({
    src: PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
    alt: PropTypes.string.isRequired,
    style: PropTypes.shape({}),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    size: PropTypes.shape({
      margin: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    }),
    useTiles: PropTypes.bool,
  }),
};
