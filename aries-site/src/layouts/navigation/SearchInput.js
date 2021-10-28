import { forwardRef } from 'react';
import styled from 'styled-components';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

// Using Search icon as the arialabelledby for the text input. Documentation
// on why this is a valid replacement for using label here:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const SearchInput = forwardRef(({ ...rest }, ref) => (
  <StyledTextInput
    ref={ref}
    icon={<SearchIcon id="search-icon" />}
    plain
    reverse
    {...rest}
  />
));
