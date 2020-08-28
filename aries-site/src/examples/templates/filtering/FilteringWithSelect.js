import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, List, Header, Heading, Menu, Select, Text } from 'grommet';
import { More } from 'grommet-icons';

const allData = [
  { name: 'My PVT Cloud Order', status: 'Complete' },
  { name: 'VMaaS for R&D', status: 'Critical' },
  { name: 'GEM_1', status: 'Complete' },
  { name: 'Mercury', status: 'Complete' },
  { name: 'MCC', status: 'Critical' },
  { name: 'GEM_2', status: 'Complete' },
  { name: 'Mercury_2', status: 'Critical' },
];

const defaultSelectValue = 'All';
const defaultFilters = {};

export const FilteringWithSelect = () => {
  const [data, setData] = useState(allData);
  const [selectValue, setSelectValue] = useState(defaultSelectValue);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (filters !== defaultFilters) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
  }, [filters, setFiltering]);

  const filterData = (array, criteria) => {
    setFilters(criteria);
    const filterKeys = Object.keys(criteria);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      });
    });
  };

  // const filterData = value => {
  //   const nextData =
  //     value !== defaultSelectValue
  //       ? allData.filter(datum => datum.status === value)
  //       : allData;
  //   setData(nextData);
  // };

  return (
    <Box
      gap="medium"
      width={{ max: 'xxlarge' }}
      margin="auto"
      overflow="auto"
      fill
    >
      <Header>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Orders
          </Heading>
          <Select
            options={[defaultSelectValue, 'Complete', 'Critical']}
            value={selectValue}
            onChange={({ option }) => {
              const nextFilters = {
                status:
                  option !== defaultSelectValue &&
                  (nextValue => nextValue === option),
              };
              const nextData = filterData(allData, nextFilters);
              setData(nextData);
              setSelectValue(option);
            }}
          />
          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Results data={data} />
    </Box>
  );
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text color="text-weak" size="small" weight="bold">
      {data.length}
    </Text>
    <Text color="text-weak" size="small">
      {filtering ? 'results' : 'items'}
    </Text>
  </Box>
);

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      availability: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool,
};

const Results = ({ data }) => (
  <List
    background="background-front"
    border="horizontal"
    data={data}
    action={(item, index) => (
      <Box direction="row" align="center" gap="medium" key={index}>
        <Box direction="row" gap="small" align="center">
          <Text>{item.status}</Text>
          <Box
            pad="xsmall"
            background={
              item.status === 'Complete' ? 'status-ok' : 'status-critical'
            }
            round
          />
        </Box>
        <Menu
          icon={<More />}
          hoverIndicator
          items={[{ label: 'Manage Order' }, { label: 'Cancel Order' }]}
        />
      </Box>
    )}
  >
    {(datum, index) => (
      <Text weight="bold" key={index}>
        {datum.name}
      </Text>
    )}
  </List>
);

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
    }),
  ),
};
