import { useContext } from 'react';
import {
  Box,
  Button,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';

import { useFilters } from '.';
import { FilterCheckBoxGroup, FilterRangeSelector } from './filterTypes';

export const FiltersLayer = () => {
  const size = useContext(ResponsiveContext);
  const {
    applyFilters,
    data,
    filters,
    setFilters,
    setFiltersLayer,
    filterAttributes,
    layerProps,
    previousFilters,
  } = useFilters();

  const { containerProps, contentProps } = { ...layerProps };

  const closeLayer = () => {
    /* User has not applied new filter settings, restore to previous state. */
    setFilters(previousFilters);
    setFiltersLayer(false);
  };

  return (
    <Layer
      as="section"
      position={size !== 'small' ? 'right' : undefined}
      full={size === 'small' ? true : 'vertical'}
      onClickOutside={() => closeLayer()}
      onEsc={() => closeLayer()}
      {...layerProps}
    >
      <Box
        fill="vertical"
        gap="medium"
        pad={{ vertical: 'medium' }}
        width={{ min: size !== 'small' ? 'medium' : undefined }}
        {...containerProps}
      >
        <Header pad={{ horizontal: 'medium' }}>
          <Heading margin="none">Filters</Heading>
          <Button icon={<FormClose />} onClick={() => closeLayer()} />
        </Header>
        <Box pad="medium" overflow="auto" flex {...contentProps}>
          {filterAttributes &&
            filterAttributes.map(attr => {
              if (attr.filterType === 'CheckBoxGroup') {
                return <FilterCheckBoxGroup key={attr.property} attr={attr} />;
              }
              if (attr.filterType === 'RangeSelector') {
                return <FilterRangeSelector key={attr.property} attr={attr} />;
              }
              return null;
            })}
        </Box>
        <Box
          align="center"
          direction="row"
          gap="small"
          pad={{ horizontal: 'medium', bottom: 'small' }}
        >
          <Button
            label="Apply Filters"
            onClick={() => {
              applyFilters(data, filters);
              setFiltersLayer(false);
            }}
            primary
          />
          <Button
            label="Reset Filters"
            onClick={() => {
              const nextFilters = {};
              /* Remove all filters, but do not apply until "Apply Filters" 
                 is clicked. */
              setFilters(nextFilters);
            }}
            secondary
          />
        </Box>
      </Box>
    </Layer>
  );
};
