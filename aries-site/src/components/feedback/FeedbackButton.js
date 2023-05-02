import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

const PositionedBox = styled(Box)`
  position: fixed;
  bottom: 0px;
  border-radius: 2em;
  right: 0px;
  z-index: 10;
`;

// temp fix until this theme issue is resolved:
// https://github.com/grommet/grommet-theme-hpe/issues/283
const StyledButton = styled(Button)`
  color: ${props => props.theme.global.colors['text-strong'].dark};
`;

export const FeedbackButton = ({ elevation, margin, ...buttonProps }) => {
  const theme = useContext(ThemeContext);
  return (
    <PositionedBox elevation={elevation} margin={margin}>
      <StyledButton theme={theme} {...buttonProps} />
    </PositionedBox>
  );
};

FeedbackButton.propTypes = {
  elevation: PropTypes.string,
  margin: PropTypes.shape({}),
};
