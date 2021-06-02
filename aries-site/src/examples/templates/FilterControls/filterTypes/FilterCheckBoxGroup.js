import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button, CheckBoxGroup, FormField } from 'grommet';

import { useFilters } from '..';

// Button that appears like an anchor
// necessary for accessibility behavior because onClick is used instead of href
// without href, anchor will not be accessible by keyboard
const StyledButton = styled(Button)`
  text-decoration: underline;
  font-weight: 500;
  padding: 0;

  &:hover {
    background-color: transparent;
  }
`;

export const FilterCheckBoxGroup = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useFilters();
  const {
    property,
    label,
    inputProps,
    max = 10,
    sort = true,
    convertToString,
    render,
  } = attr;
  const [value, setValue] = useState(filters[property]);
  const [showMore, setShowMore] = useState(false);
  let options = getFilterOptions(data, property);

  if (sort)
    options.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  if (convertToString) options = options.map(option => option.toString());
  if (render) {
    console.log(
      options,
      options.map(option => render(option)),
    );
    options = options.map(option => render(option));
  }
  useEffect(() => {
    setValue(filters[property] || []);
  }, [filters, property, setValue]);

  return (
    <Box
      flex={false}
      margin={options.length > max ? { bottom: 'small' } : undefined}
    >
      <FormField htmlFor={property} name={property} label={label}>
        <CheckBoxGroup
          id={property}
          name={property}
          value={value}
          onChange={({ value: nextValue }) => {
            setValue(nextValue);
            const nextFilters = { ...filters };
            nextFilters[property] = nextValue;
            setFilters(nextFilters);
          }}
          options={showMore ? options : options.slice(0, max)}
          {...inputProps}
        />
      </FormField>
      {options.length > max && (
        <StyledButton
          alignSelf="start"
          label={`Show ${showMore ? 'less' : 'more'}`}
          size="xsmall"
          onClick={() => setShowMore(!showMore)}
        />
      )}
    </Box>
  );
};

FilterCheckBoxGroup.propTypes = {
  attr: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string,
    max: PropTypes.number,
    inputProps: PropTypes.object,
    render: PropTypes.func,
    sort: PropTypes.bool,
    convertToString: PropTypes.bool,
  }),
};
