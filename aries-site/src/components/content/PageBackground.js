import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { useDarkMode } from '../../utils';

export const PageBackground = ({ backgroundImage }) => {
  const size = useContext(ResponsiveContext);
  const themeMode = useDarkMode().value ? 'dark' : 'light';
  const { src, alt, style, width } = backgroundImage;
  return (
    // Mimic the width of the main content layout so that
    // the margin shifts are relative to the width of
    // the content as opposed to the entire windwo
    <Box
      width={{ max: 'xxlarge' }}
      pad={{ horizontal: 'xlarge' }}
      margin="auto"
    >
      <Box
        margin={
          backgroundImage[size] && backgroundImage[size].margin
            ? backgroundImage[size].margin
            : backgroundImage.margin
        }
        width={
          (backgroundImage[size] && backgroundImage[size].width) ||
          width || { max: 'large' }
        }
        style={style}
      >
        <Image src={src[themeMode]} alt={alt} fit="contain" />
      </Box>
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
      width: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    }),
    width: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  }),
};
