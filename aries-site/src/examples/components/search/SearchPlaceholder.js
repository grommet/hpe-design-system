import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Box } from 'grommet';
import { Search as SearchIcon } from '@hpe-design/icons-grommet';

export const SearchPlaceholder = ({ bestPractice = true }) => {
  const [value, setValue] = React.useState();

  return (
    <Box width="medium">
      <TextInput
        aria-label="search"
        icon={<SearchIcon />}
        placeholder={
          bestPractice
            ? 'Search'
            : 'Search first name, last name, role, location, or status'
        }
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
