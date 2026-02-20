import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, CheckBoxGroup, FormField } from 'grommet';

import { useFilters } from '..';

export const FilterCheckBoxGroup = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useFilters();
  const {
    property,
    label,
    inputProps,
    contentProps,
    render,
    sort = true,
    convertToString,
    max = 10,
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
    options = options.map(option => {
      const nextOption = {
        label: render(option),
        value: option,
      };
      return nextOption;
    });
    // sort after we have the labels from render
    if (sort)
      options.sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
  }

  useEffect(() => {
    setValue(filters[property] || []);
  }, [filters, property, setValue]);

  return (
    <Box
      flex={false}
      margin={options.length > max ? { bottom: 'xsmall' } : undefined}
    >
      <FormField
        htmlFor={property}
        name={property}
        label={label}
        flex={false}
        width={{ max: 'medium', min: 'xsmall' }}
        {...contentProps}
      >
        <CheckBoxGroup
          id={property}
          name={property}
          value={value}
          labelKey={render ? 'label' : undefined}
          valueKey={render ? 'value' : undefined}
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
        <Button
          alignSelf="start"
          label={`Show ${showMore ? 'less' : 'more'}`}
          size="small"
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
    // Any valid Grommet Box props
    // https://v2.grommet.io/formfield#contentProps
    contentProps: PropTypes.object,
  }),
};
