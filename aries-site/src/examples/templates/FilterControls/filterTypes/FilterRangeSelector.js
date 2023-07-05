import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormField, RangeSelector, Stack, Text } from 'grommet';

import { useFilters } from '..';

export const FilterRangeSelector = ({ attr }) => {
  const { data, filters, setFilters, getFilterOptions } = useFilters();
  const { property, label, contentProps, inputProps } = attr;
  const options = getFilterOptions(data, property);
  const [range, setRange] = useState(
    (filters[property] && filters[property].value) || [
      inputProps.min || 0,
      inputProps.max || Math.max(...options),
    ],
  );

  return (
    <>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/47 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id, 
    grommet/formfield-htmlfor-id, grommet/formfield-name */}
      <FormField
        htmlFor={property}
        name={property}
        label={label}
        flex={false}
        {...contentProps}
      >
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
            {...inputProps}
          />
        </Stack>
      </FormField>
      <Text size="small">{inputProps.valueRange}</Text>
    </>
  );
};

FilterRangeSelector.propTypes = {
  attr: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string,
    inputProps: PropTypes.object,
    // Any valid Grommet Box props
    // https://v2.grommet.io/formfield#contentProps
    contentProps: PropTypes.object,
  }),
};
