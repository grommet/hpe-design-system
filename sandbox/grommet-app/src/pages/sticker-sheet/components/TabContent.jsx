// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const TabContent = ({ children }) => {
  return (
    <Box gap="medium" pad={{ vertical: 'small' }} align="start">
      {children}
    </Box>
  );
};

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
};
