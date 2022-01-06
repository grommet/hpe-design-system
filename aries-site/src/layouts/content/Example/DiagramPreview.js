import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, ThemeContext } from 'grommet';

export const DiagramPreview = ({ alt, src }) => {
  const theme = useContext(ThemeContext);
  console.log(src);
  return <Image src={theme.dark ? src.light : src.dark} alt={alt} />;
};

DiagramPreview.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
