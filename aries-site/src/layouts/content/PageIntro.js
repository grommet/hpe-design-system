import React from 'react';
import PropTypes from 'prop-types';
import { Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

export const PageIntro = ({ children, image, ...rest }) => {
  const { src, alt, fit } = image;
  const size = React.useContext(ResponsiveContext);

  return (
    <Tiles
      gap={size !== 'small' ? 'large' : 'medium'}
      columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
      rows={[['xsmall', 'medium']]}
      {...rest}
    >
      <Tile>
        <Image src={src} alt={alt} fit={fit} />
      </Tile>
      <Tile>{children}</Tile>
    </Tiles>
  );
};

PageIntro.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    fit: PropTypes.string,
  }).isRequired,
};
