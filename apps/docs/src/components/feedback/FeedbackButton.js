// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

const PositionedBox = styled(Box)`
  position: fixed;
  bottom: 0px;
  border-radius: 2em;
  right: 0px;
  z-index: 10;
`;

export const FeedbackButton = ({ elevation, margin, ...buttonProps }) => {
  return (
    <PositionedBox elevation={elevation} margin={margin}>
      <Button {...buttonProps} />
    </PositionedBox>
  );
};

FeedbackButton.propTypes = {
  elevation: PropTypes.string,
  margin: PropTypes.shape({}),
};
