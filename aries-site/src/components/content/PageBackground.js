import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { useDarkMode } from '../../utils';

export const PageBackground = ({ backgroundImage }) => {
  const size = useContext(ResponsiveContext);
  const themeMode = useDarkMode().value ? 'dark' : 'light';

  return (
    <Box
      margin={
        backgroundImage[size] && backgroundImage[size].margin
          ? backgroundImage[size].margin
          : backgroundImage.margin
      }
      pad={
        backgroundImage[size] && backgroundImage[size].pad
          ? backgroundImage[size].pad
          : backgroundImage.pad
      }
      responsive={false}
      width={size !== 'small' ? '65%' : 'fill'}
    >
      <Image
        src={backgroundImage.src[themeMode]}
        alt={backgroundImage.alt}
        fit={backgroundImage.fit}
        fill={backgroundImage.fill}
      />
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
    fill: PropTypes.bool,
    fit: PropTypes.oneOf(['contain', 'cover']),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    pad: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    size: PropTypes.shape({
      margin: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
      pad: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    }),
  }),
};
