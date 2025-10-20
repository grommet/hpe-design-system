import React from 'react';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';

export const SearchExample = ({ ...props }) => {
  const [value, setValue] = React.useState();

  return (
    <TextInput
      aria-label="search"
      icon={<SearchIcon />}
      placeholder="Search"
      reverse
      value={value}
      onChange={event => setValue(event.target.value)}
      type="search"
      {...props}
    />
  );
};
