import { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBoxGroup,
  Collapsible,
  ResponsiveContext,
  Text,
} from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';

export const FilterPanel = ({ data, setFilters }) => {
  const breakpoint = useContext(ResponsiveContext);
  const [expandCategory, setExpandCategory] = useState(false);
  const [expandPublishers, setExpandPublishers] = useState(false);
  const [expandDelivery, setExpandDelivery] = useState(false);
  const [expandPricing, setExpandPricing] = useState(false);
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

  const filterOptions = (
    <Box
      align="start"
      background="background-front"
      gap="small"
      pad={{ right: 'small', vertical: 'small' }}
      round="xsmall"
    >
      <>
        <Button
          label="Categories"
          icon={expandCategory ? <FormDown /> : <FormNext />}
          onClick={() => setExpandCategory(!expandCategory)}
        />
        <Collapsible open={expandCategory}>
          <CheckBoxGroup
            options={formattedFacets.categories}
            onChange={({ value }) => {
              setFilters({ categories: value });
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
            onChange={({ value }) => {
              setFilters({ publisher: value });
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
            onChange={({ value }) => {
              setFilters({ delivery: value });
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
            onChange={({ value }) => {
              setFilters({ pricing: value });
            }}
          />
        </Collapsible>
      </>
    </Box>
  );

  return ['xsmall', 'small'].includes(breakpoint) ? null : filterOptions;
};

FilterPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  setFilters: PropTypes.func,
};
