import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CheckBoxGroup, FormField } from 'grommet';

import { FilterContext } from '.';

export const FilterCheckBoxGroup = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useContext(
    FilterContext,
  );
  const { property, header } = attr;
  const [value, setValue] = useState(filters[property]);
  const options = getFilterOptions(data, property);

  useEffect(() => {
    setValue(filters[property] || []);
  }, [filters, property, setValue]);

  return (
    <Box flex={false}>
      <FormField htmlFor={property} name={property} label={header}>
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
          options={options}
        />
      </FormField>
    </Box>
  );
};

FilterCheckBoxGroup.propTypes = {
  attr: PropTypes.shape({
    property: PropTypes.string,
    header: PropTypes.string,
  }),
};
