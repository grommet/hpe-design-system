import React from 'react';
import PropTypes from 'prop-types';

import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Box, Text } from 'grommet';

export const ToastPreview = ({ card, message, title }) => (
  <Box background="background-back">
    <Box
      elevation="medium"
      round="xsmall"
      width={card ? null : 'medium'}
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      background={{ color: 'background-front' }}
    >
      <Box direction="row">
        <Box id="status-indicator" pad={{ right: 'small' }}>
          <StatusGoodSmall color="status-ok" />
        </Box>
        <Box
          id="content"
          gap="medium"
          align="start"
          direction="row"
          justify="between"
          fill
        >
          <Box>
            <Text weight="bold">{title}</Text>
            <Text>{message}</Text>
          </Box>
          <FormClose id="close-button" />
        </Box>
      </Box>
    </Box>
  </Box>
);

ToastPreview.propTypes = {
  card: PropTypes.boolean,
  message: PropTypes.string,
  title: PropTypes.string,
};
