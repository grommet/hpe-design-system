import React from 'react';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

export const SearchIconPositionExample = () => {
  const [value, setValue] = React.useState();

  return (
    <TextInput
      aria-label="search"
      icon={<SearchIcon />}
      placeholder="Search"
      value={value}
      onChange={event => setValue(event.target.value)}
      type="search"
    />
  );
};
