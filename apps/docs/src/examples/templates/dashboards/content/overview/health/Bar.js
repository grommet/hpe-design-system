// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Meter } from 'grommet';
import { STATUS } from './status';

// Thin horizontal meter for a share of a whole. Neutral while status is ok
// and takes the status fill otherwise, so color only appears when something
// needs attention. Pass values for a stacked bar. With alignToText the bar
// is centred in a slot one line of body text tall, so it sits level with a
// status row in a neighbouring tile and the content below starts at the
// same height.
export const Bar = ({
  alignToText = false,
  label,
  max,
  status = 'ok',
  value,
  values,
}) => {
  const theme = useContext(ThemeContext);
  const meter = (
    <Meter
      role="img"
      aria-label={label}
      type="bar"
      thickness="3xsmall"
      size="full"
      round
      max={max}
      values={
        values || [
          { value, color: status === 'ok' ? undefined : STATUS[status].fill },
        ]
      }
    />
  );
  return alignToText ? (
    <Box height={theme.text.medium.height} justify="center">
      {meter}
    </Box>
  ) : (
    meter
  );
};

Bar.propTypes = {
  alignToText: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS)),
  value: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.shape({})),
};
