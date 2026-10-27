// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';
import { surfaceBackground } from './data';

// A grouped region of the form. Stands in for the experimental Figma
// "Container" component using a plain Box with a hard-coded surface color.
export const FormSection = ({
  children,
  description,
  gap = 'medium',
  title,
  ...rest
}) => (
  <Box
    as="section"
    background={surfaceBackground}
    pad="medium"
    round="medium"
    gap="small"
    flex={false}
    {...rest}
  >
    <Box gap="xxsmall">
      <Heading level={2} margin="none">
        {title}
      </Heading>
      {description && <Text>{description}</Text>}
    </Box>
    <Box gap={gap}>{children}</Box>
  </Box>
);

FormSection.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  gap: PropTypes.string,
  title: PropTypes.string.isRequired,
};
