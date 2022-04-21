import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBoxGroup,
  Collapsible,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Close, Filter, FormDown, FormNext } from 'grommet-icons';

const defaultSelected = {
  categories: [],
  publisher: [],
  delivery: [],
  pricing: [],
};

export const FilterPanel = ({ containerRef, data, setFilters }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const breakpoint = useContext(ResponsiveContext);
  const [expandCategory, setExpandCategory] = useState(false);
  const [expandPublishers, setExpandPublishers] = useState(false);
  const [expandDelivery, setExpandDelivery] = useState(false);
  const [expandPricing, setExpandPricing] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const [showLayer, setShowLayer] = useState(false);
  const facets = useMemo(() => {
    const results = {
      categories: [],
      publisher: [],
      delivery: [],
      pricing: [],
    };

    data.forEach(datum => {
      Object.keys(results).forEach(key => {
        if (!results[key].includes(datum[key])) {
          results[key].push(datum[key]);
        }
      });
    });

    Object.keys(results).forEach(key => {
      results[key] = results[key].flat().reduce((acc, cur) => {
        if (!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc.sort();
      }, []);
    });

    return results;
  }, [data]);
  const formattedFacets = useMemo(
    () =>
      Object.keys(facets)
        .map(key => ({
          [key]: facets[key].map(value => ({
            label: <Text>{value}</Text>,
            value,
          })),
        }))
        .reduce((acc, cum) => {
          let nextAcc = { ...acc };
          Object.keys(cum).forEach(key => {
            if (acc[key]) {
              nextAcc[key] = cum[key];
            } else {
              nextAcc = { ...acc, [key]: cum[key] };
            }
          });
          return nextAcc;
        }, {}),
    [facets],
  );

  useEffect(() => {
    setFilters(selected);
  }, [selected, setFilters]);

  const onChange = (key, value) => {
    setSelected({ ...selected, [key]: value });
  };

  const filterOptions = (
    <Box align="start" gap="small">
      <>
        <Button
          label="Categories"
          icon={expandCategory ? <FormDown /> : <FormNext />}
          onClick={() => setExpandCategory(!expandCategory)}
        />
        <Collapsible open={expandCategory}>
          <CheckBoxGroup
            options={formattedFacets.categories}
            value={selected.categories}
            onChange={({ value }) => {
              onChange('categories', value);
            }}
          />
        </Collapsible>
      </>
      <>
        <Button
          label="Publishers"
          icon={expandPublishers ? <FormDown /> : <FormNext />}
          onClick={() => setExpandPublishers(!expandPublishers)}
        />
        <Collapsible open={expandPublishers}>
          <CheckBoxGroup
            options={formattedFacets.publisher}
            value={selected.publisher}
            onChange={({ value }) => {
              onChange('publisher', value);
            }}
          />
        </Collapsible>
      </>
      <>
        <Button
          label="Delivery Methods"
          icon={expandDelivery ? <FormDown /> : <FormNext />}
          onClick={() => setExpandDelivery(!expandDelivery)}
        />
        <Collapsible open={expandDelivery}>
          <CheckBoxGroup
            options={formattedFacets.delivery}
            value={selected.delivery}
            onChange={({ value }) => {
              onChange('delivery', value);
            }}
          />
        </Collapsible>
      </>
      <>
        <Button
          label="Pricing Models"
          icon={expandPricing ? <FormDown /> : <FormNext />}
          onClick={() => setExpandPricing(!expandPricing)}
        />
        <Collapsible open={expandPricing}>
          <CheckBoxGroup
            options={formattedFacets.pricing}
            value={selected.pricing}
            onChange={({ value }) => {
              onChange('pricing', value);
            }}
          />
        </Collapsible>
      </>
    </Box>
  );

  const responsiveLayout = showLayer ? (
    <Layer
      target={containerRef && containerRef.current}
      full
      onEsc={() => setShowLayer(false)}
    >
      <Box gap="large" pad="large">
        <Header fill="horizontal" pad={{ left: 'medium' }}>
          <Heading size="small" margin="none">
            App Filters
          </Heading>
          <Button
            icon={<Close />}
            tip="Close filters"
            onClick={() => setShowLayer(false)}
          />
        </Header>
        {filterOptions}
      </Box>
    </Layer>
  ) : (
    <Box align="start">
      <Button
        kind="toolbar"
        icon={<Filter />}
        onClick={() => setShowLayer(true)}
      />
    </Box>
  );

  return ['xsmall', 'small'].includes(breakpoint) ? (
    responsiveLayout
  ) : (
    <Box
      background="background-front"
      pad={{ right: 'small', vertical: 'small' }}
      round="xsmall"
      style={{ position: 'sticky', top: '48px' }}
    >
      {filterOptions}
    </Box>
  );
};

FilterPanel.propTypes = {
  containerRef: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  setFilters: PropTypes.func,
};
