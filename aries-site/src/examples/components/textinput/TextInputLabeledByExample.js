import React from 'react';
import styled from 'styled-components';
import { TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export function TextInputLabeledByExample() {
  const StyledTextInput = styled(TextInput).attrs(() => ({
    'aria-labelledby': 'search-icon',
  }))``;

  return (
    <StyledTextInput
      placeholder="Search..."
      icon={<Search id="search-icon" />}
      reverse
    />
  );
}
