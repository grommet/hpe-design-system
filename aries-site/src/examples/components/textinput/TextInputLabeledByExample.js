import React from 'react';
import styled from 'styled-components';
import { Box, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export const TextInputLabeledByExample = () => {
  const StyledTextInput = styled(TextInput).attrs(() => ({
    'aria-labelledby': 'search-icon',
  }))``;

  return (
    <Box width="medium">
      <StyledTextInput
        placeholder="Search..."
        icon={<Search id="search-icon" />}
        reverse
      />
    </Box>
  );
};
