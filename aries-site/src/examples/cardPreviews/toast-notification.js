import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { Close } from 'grommet-icons';

export const ToastPreview = ({ card, message, title }) => {
  return (
    <Box background="background-back">
      <Box
        direction="row"
        gap="medium"
        elevation="medium"
        round="xsmall"
        width={card ? null : 'medium'}
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        background={{ color: 'background-front' }}
      >
        <Box direction="row" gap="xsmall">
          <StatusGoodSmall color="status-ok" height="medium" />
          <Text>
            {title}. {message}
          </Text>
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
