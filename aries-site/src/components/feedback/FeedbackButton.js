import styled from 'styled-components';
import { Button } from 'grommet';

export const FeedbackButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);
  &:focus {
    box-shadow: 0 0 2px 2px #00e8cf;
    outline: none;
  }
`;
