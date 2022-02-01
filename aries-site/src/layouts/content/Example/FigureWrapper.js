import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

const StyledFigure = styled.figure`
  margin: 0;
`;

const StyledCaption = ({ ...rest }) => (
  <Text as="figcaption" margin={{ top: 'xsmall' }} size="small" {...rest} />
);

export const FigureWrapper = ({ caption, children }) => (
  <StyledFigure>
    {children}
    <StyledCaption>{caption}</StyledCaption>
  </StyledFigure>
);

FigureWrapper.propTypes = {
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.element,
};
