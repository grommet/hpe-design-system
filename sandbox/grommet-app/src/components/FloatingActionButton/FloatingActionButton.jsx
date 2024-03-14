import styled from 'styled-components';
import { Box, Button } from 'grommet';

const PositionedBox = styled(Box)`
  position: fixed;
  bottom: 0px;
  border-radius: 2em;
  right: 0px;
  z-index: 10;
`;

export const FloatingActionButton = ({ ...rest }) => {
  return (
    <PositionedBox elevation="large" margin="medium">
      <Button {...rest} kind="fab" size="large" />
    </PositionedBox>
  );
};
