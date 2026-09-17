// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { TextInput } from 'grommet';
import { Search } from '@hpe-design/icons-grommet';

export const TextInputLabeledByExample = () => {
  const StyledTextInput = styled(TextInput).attrs(() => ({
    'aria-labelledby': 'search-icon',
  }))``;

  return (
    <StyledTextInput
      placeholder="Search"
      icon={<Search id="search-icon" />}
      reverse
    />
  );
};
