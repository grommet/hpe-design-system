import React from 'react';
import styled from 'styled-components';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

// Inputs should always be accompanied by labels for accessibility. An icon
// may serve as a label if 1) the icon meaning is well understood, and 2)
// has an 'aria-labelledby' attribute. For additional detail:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const SearchExample = ({ ...props }) => {
  const [value, setValue] = React.useState();

  return (
    <StyledTextInput
      icon={<SearchIcon id="search-icon" />}
      placeholder="Search placeholder"
      reverse
      value={value}
      onChange={event => setValue(event.target.value)}
      {...props}
    />
  );
};
