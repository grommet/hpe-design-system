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

//
const searchSuggestions = [
  'hpe pointnext',
  'hpc storage',
  'hpe simplivity',
  'home',
  'bluedata software',
  'block storage definition',
  'business support system',
  'converged',
  'cloud technology partners',
  'client virtualization software',
  'cloud consulting',
  'deep learning',
  'deep learning solutions',
  'exsi images',
  'enterprise cloud server',
  'enterprise switch',
  'gpu computing',
  'gdpr definition',
  'hosted desktop servers',
  'how many guest',
  'how many servers',
  'how many windows',
  'how many unique IDs',
  'MSA2312sa how many servers',
  'how many open files',
  'how many unassigned LUNs',
  'how many amps used',
  'how many management groups',
  'EVA4400 SSSU sessions - how many',
  'how many VMs per datastore',
  'kubernetes',
  'kubernetes cluster',
  'kvm',
  'machine learning',
  'memory driven computing',
  'what is procurement',
  'what is predictive analytics',
  'what is hybrid cloud',
  'what is secure monitoring',
  'what is artificial intelligence',
];

export const SearchSuggestionsExample = () => {
  const [value, setValue] = React.useState();
  const [suggestions, setSuggestions] = React.useState(
    searchSuggestions.slice(0, 5),
  );

  const filterResults = query => {
    let resultSet;

    if (query) {
      const regexp = new RegExp(query, 'i');
      resultSet = searchSuggestions
        .filter(option => regexp.test(option))
    } else {
      resultSet = searchSuggestions;
    }
    return resultSet.slice(0, 5);
  };

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    const nextSuggestions = filterResults(nextValue);

    setValue(nextValue);
    setSuggestions(nextSuggestions);
  };

  return (
    <StyledTextInput
      icon={<SearchIcon id="search-icon" />}
      placeholder="Search"
      reverse
      suggestions={suggestions}
      value={value}
      onChange={onChange}
    />
  );
};
