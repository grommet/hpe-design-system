// Copyright 2021 - Hewlett Packard Enterprise Company

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

import { FilterContext } from '.';
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
    previousFilters,
  } = useContext(FilterContext);

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
      modal
      onClickOutside={() => closeLayer()}
      onEsc={() => closeLayer()}
    >
      <Box
        fill="vertical"
        gap="medium"
        pad={{ vertical: 'medium' }}
        width={{ min: size !== 'small' ? 'medium' : undefined }}
      >
        <Header pad={{ horizontal: 'medium' }}>
          <Heading margin="none">Filters</Heading>
          <Button icon={<FormClose />} onClick={() => closeLayer()} />
        </Header>
        <Box pad="medium" overflow="auto" flex>
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
          pad={{ horizontal: 'medium', top: 'small', bottom: 'medium' }}
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
