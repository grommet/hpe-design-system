import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Footer, Layer, ResponsiveContext } from 'grommet';
import { LayerHeader } from '../Layer';

export const ModalDialog = ({
  children,
  title,
  subtitle,
  onClose,
  ...layerProps
}) => (
  <Layer position="center" {...layerProps}>
    <ModalContainer
      flex="grow"
    >
      <LayerHeader title={title} subtitle={subtitle} onClose={onClose} />
      {children}
    </ModalContainer>
  </Layer>
);

ModalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClose: PropTypes.func,
};

export const ModalContainer = ({
  children,
  ...boxProps
}) => {
  const breakpoint = useContext(ResponsiveContext);
  const widthSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';
  return (
    <Box
      background="background-floating"
      gap="medium"
      pad="medium"
      round="medium"
      width={{ min: widthSize }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

ModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};

export const ModalBody = ({ children, ...boxProps }) => (
  <Box {...boxProps}>{children}</Box>
);

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};

export const ModalFooter = ({ children, ...boxProps }) => (
  <Footer justify="end" gap="xsmall" {...boxProps}>{children}</Footer>
);

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};