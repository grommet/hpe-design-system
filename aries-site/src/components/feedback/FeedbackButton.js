import styled from 'styled-components';
import { Box, Button } from 'grommet';

const PositionedBox = styled(Box)`
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 10;
  }
`;

export const FeedbackButton = ({ elevation, margin, ...buttonProps }) => (
  <PositionedBox elevation={elevation} margin={margin}>
    <Button {...buttonProps} />
  </PositionedBox>
);
