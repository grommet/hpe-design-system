import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, ThemeContext } from 'grommet';

export function DiagramPreview({ alt, src }) {
  const theme = useContext(ThemeContext);
  return <Image src={theme.dark ? src.dark : src.light} alt={alt} />;
}

DiagramPreview.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
