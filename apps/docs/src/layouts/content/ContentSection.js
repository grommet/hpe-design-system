// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const ContentSection = ({ pad, ...rest }) => (
  <Box
    as="section"
    pad={{
      bottom: 'medium',
      horizontal: '5xsmall',
      top: 'xlarge',
      ...pad,
    }}
    {...rest}
  />
);

ContentSection.propTypes = {
  pad: PropTypes.object,
};
