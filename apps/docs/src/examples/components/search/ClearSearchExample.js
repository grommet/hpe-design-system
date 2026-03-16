import React from 'react';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';

export const ClearSearchExample = () => {
  return (
    <TextInput
      aria-label="Search"
      icon={<SearchIcon />}
      placeholder="Search"
      reverse
      defaultValue="sample search term"
      type="search"
    />
  );
};
