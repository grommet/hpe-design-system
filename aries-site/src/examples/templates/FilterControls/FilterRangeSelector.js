import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormField, RangeSelector, Stack, Text } from 'grommet';

import { FilterContext } from '.';

export const FilterRangeSelector = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useContext(
    FilterContext,
  );
  const { property, header, inputProps } = attr;
  const options = getFilterOptions(data, property);
  const [range, setRange] = useState(
    (filters[property] && filters[property].value) || [
      inputProps.min || 0,
      inputProps.max || Math.max(...options),
    ],
  );

  return (
    <Box flex={false}>
      <FormField htmlFor={property} name={property} label={header}>
        <Stack>
          <Box background="border" height="3px" direction="row" />
          <RangeSelector
            id={property}
            name={property}
            min={inputProps.min || 0}
            max={inputProps.max || Math.max(...options)}
            values={range}
            onChange={nextRange => {
              setRange(nextRange);
              const nextFilters = { ...filters };
              nextFilters[property] = {
                value: nextRange,
                func: value => value >= nextRange[0] && value <= nextRange[1],
              };
              setFilters(nextFilters);
            }}
          />
        </Stack>
      </FormField>
      <Text size="small">{inputProps.valueRange}</Text>
    </Box>
  );
};

FilterRangeSelector.propTypes = {
  attr: PropTypes.shape({
    property: PropTypes.string,
    header: PropTypes.string,
    inputProps: PropTypes.object,
  }),
};
