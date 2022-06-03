import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput, Box } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

// Inputs should always be accompanied by labels for accessibility. An icon
// may serve as a label if 1) the icon meaning is well understood, and 2)
// has an 'aria-labelledby' attribute. For additional detail:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon-placeholder',
}))``;

export const SearchPlaceholder = ({ bestPractice = true }) => {
  const [value, setValue] = React.useState();

  return (
    <Box width="medium">
      <StyledTextInput
        icon={<SearchIcon id="search-icon-placeholder" color="placeholder" />}
        placeholder={bestPractice ? 'Search' : 'Search users...'}
        reverse
        value={value}
        onChange={event => setValue(event.target.value)}
        type="search"
      />
    </Box>
  );
};

SearchPlaceholder.propTypes = {
  bestPractice: PropTypes.bool,
};
