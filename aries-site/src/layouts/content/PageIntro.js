import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

export const PageIntro = ({ children, ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  const marginPadStyle = { top: size === 'small' ? 'xlarge' : undefined };
  return (
    <Tiles
      gap={size !== 'small' ? 'large' : 'medium'}
      columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
      rows={size !== 'small' ? 'medium' : 'flex'}
      margin={marginPadStyle}
      pad={marginPadStyle}
      {...rest}
    >
      {size !== 'small' && <Tile />}
      <Tile pad={marginPadStyle} margin={marginPadStyle}>
        {children}
      </Tile>
    </Tiles>
  );
};

PageIntro.propTypes = {
  children: PropTypes.node.isRequired,
};
