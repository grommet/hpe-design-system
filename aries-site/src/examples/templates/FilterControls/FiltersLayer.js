import { useContext } from 'react';
import {
  Box,
  Button,
  Footer,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { Close } from 'grommet-icons';
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
      position={!['xsmall', 'small'].includes(size) ? 'right' : undefined}
      full={['xsmall', 'small'].includes(size) ? true : 'vertical'}
      onEsc={() => closeLayer()}
      {...layerProps}
    >
      <Box
        fill="vertical"
        gap="medium"
        pad={{ vertical: 'medium' }}
        width={{
          min: !['xsmall', 'small'].includes(size) ? 'medium' : undefined,
        }}
        {...containerProps}
      >
        <Box flex overflow="auto">
          <Header
            align="start"
            pad={{ horizontal: 'medium', bottom: 'medium' }}
          >
            <Heading margin="none" level={2} size="small">
              Filters
            </Heading>
            <Button
              a11yTitle="Close filter layer"
              icon={<Close />}
              onClick={() => closeLayer()}
            />
          </Header>
          <Box
            pad={{ horizontal: 'medium', bottom: 'medium' }}
            {...contentProps}
          >
            {filterAttributes &&
              filterAttributes.map(attr => {
                if (attr.filterType === 'CheckBoxGroup') {
                  return (
                    <FilterCheckBoxGroup key={attr.property} attr={attr} />
                  );
                }
                if (attr.filterType === 'RangeSelector') {
                  return (
                    <FilterRangeSelector key={attr.property} attr={attr} />
                  );
                }
                return null;
              })}
          </Box>
        </Box>
        <Footer
          justify="start"
          gap="xsmall"
          pad={{ horizontal: 'medium', bottom: 'xsmall' }}
        >
          <Button
            label="Apply filters"
            onClick={() => {
              applyFilters(data, filters);
              setFiltersLayer(false);
            }}
            primary
          />
          <Button
            label="Reset"
            onClick={() => {
              const nextFilters = {};
              /* Remove all filters, but do not apply until "Apply filters" 
                 is clicked. */
              setFilters(nextFilters);
            }}
            secondary
          />
          <Button label="Cancel" onClick={() => closeLayer()} />
        </Footer>
      </Box>
    </Layer>
  );
};
