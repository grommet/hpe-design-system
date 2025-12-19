import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Close, StatusGood } from '@hpe-design/icons-grommet';

export const ToastPreview = ({ card, message, title }) => {
  return (
    <Box background="background-back">
      <Box
        direction="row"
        gap="medium"
        elevation="medium"
        round="xsmall"
        width={card ? null : 'medium'}
        pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
        background={{ color: 'background-front' }}
      >
        <Box direction="row" gap="3xsmall" flex>
          <StatusGood color="status-ok" height="medium" id="status-indicator" />
          <Text weight={500} id="title">
            {title}
          </Text>
          <Text id="message">{message}</Text>
        </Box>
        <Close
          id="close-button"
          allyTitle="Dismiss notification"
          height="medium"
        />
      </Box>
    </Box>
  );
};

ToastPreview.propTypes = {
  card: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
};
