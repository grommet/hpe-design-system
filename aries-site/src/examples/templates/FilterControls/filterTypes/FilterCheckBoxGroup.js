import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxGroup, FormField } from 'grommet';

import { useFilters } from '..';

export const FilterCheckBoxGroup = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useFilters();
  const {
    property,
    label,
    inputProps,
    sort = true,
    convertToString,
    contentProps,
  } = attr;
  const [value, setValue] = useState(filters[property]);
  let options = getFilterOptions(data, property);

  if (sort)
    options.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  if (convertToString) options = options.map(option => option.toString());

  useEffect(() => {
    setValue(filters[property] || []);
  }, [filters, property, setValue]);

  return (
    <FormField
      htmlFor={property}
      name={property}
      label={label}
      flex={false}
      width={{ max: 'medium', min: 'small' }}
      {...contentProps}
    >
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
        {...inputProps}
      />
    </FormField>
    // </Box>
  );
};

FilterCheckBoxGroup.propTypes = {
  attr: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string,
    inputProps: PropTypes.object,
    sort: PropTypes.bool,
    convertToString: PropTypes.bool,
    // Any valid Grommet Box props
    // https://v2.grommet.io/formfield#contentProps
    contentProps: PropTypes.object,
  }),
};
