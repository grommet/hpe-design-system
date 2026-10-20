// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { surfaceBackground } from './data';

// A grouped region of the form. Stands in for the experimental Figma
// "Container" component using a plain Box with a hard-coded surface color.
export const FormSection = ({ children, gap = 'medium', title, ...rest }) => (
  <Box
    as="section"
    background={surfaceBackground}
    pad="medium"
    round="medium"
    gap="medium"
    flex={false}
    {...rest}
  >
    <Heading level={2} margin="none">
      {title}
    </Heading>
    <Box gap={gap}>{children}</Box>
  </Box>
);

FormSection.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.string,
  title: PropTypes.string.isRequired,
};
