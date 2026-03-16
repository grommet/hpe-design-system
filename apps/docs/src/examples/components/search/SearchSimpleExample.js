import React from 'react';
import { TextInput, Box } from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';

export const SearchSimpleExample = () => {
  const [value, setValue] = React.useState();

  return (
    <Box background="background-contrast" round="xsmall" width="medium">
      <TextInput
        aria-label="search"
        icon={<SearchIcon />}
        placeholder="Search"
        plain
        reverse
        value={value}
        onChange={event => setValue(event.target.value)}
        type="search"
      />
    </Box>
  );
};
