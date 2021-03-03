import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Layer,
  List,
  Header,
  Heading,
  Menu,
  ResponsiveContext,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { Filter, FormClose, More, Search } from 'grommet-icons';

const allData = [
  { name: 'Apex-Server', status: 'Ready' },
  { name: 'AuroraEdge-7.7.-edgedeploy4', status: 'Paused' },
  { name: 'ECAAS3', status: 'Ready' },
  { name: 'ECP-Master-01', status: 'Ready' },
  { name: 'ECaas-EdgeSite1', status: 'Paused' },
  { name: 'IronMan-2', status: 'Ready' },
  { name: 'california_1', status: 'Paused' },
];

const defaultSelectValue = 'All';
const defaultFilters = {};

const StyledButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const FilteringWithSelect = ({ containerRef }) => {
  // containerRef above is for demo purposes only, remove in production
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState();
  const inputRef = useRef();
  const size = useContext(ResponsiveContext);

  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  const filterData = (array, criteria, searchValue = search) => {
    if (Object.keys(criteria).length) setFiltering(true);
    else setFiltering(false);
    setFilters(criteria);

    let filterResults;
    const filterKeys = Object.keys(criteria);
    filterResults = array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      });
    });

    if (searchValue) {
      filterResults = filterResults.filter(o =>
        Object.keys(o).some(
          k =>
            typeof o[k] === 'string' &&
            o[k].toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
    return filterResults;
  };

  useEffect(() => {
    if (filters !== defaultFilters) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
  }, [filters, setFiltering]);

  return (
    <Box
      background="background"
      gap="medium"
      width={{ max: 'xxlarge' }}
      pad={{ horizontal: 'medium' }}
      margin="auto"
      fill
    >
      <Header pad={{ top: 'medium' }}>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Hosts
          </Heading>
          <Box align="center" direction="row" gap="small">
            {size !== 'small' || searchFocused ? (
              <Box width="medium">
                <StyledTextInput
                  ref={inputRef}
                  type="search"
                  icon={<Search id="search-icon" />}
                  placeholder="Search placeholder"
                  onBlur={() => setSearchFocused(false)}
                  value={search}
                  onChange={event => {
                    setSearch(event.target.value);
                    const nextData = filterData(
                      allData,
                      filters,
                      event.target.value,
                    );
                    setData(nextData);
                  }}
                />
              </Box>
            ) : (
              <StyledButton
                id="search-button"
                icon={<Search />}
                onClick={() => setSearchFocused(true)}
              />
            )}
            {(size !== 'small' || !searchFocused) && (
              <Filters
                data={data}
                filtering={filtering}
                setFiltering={setFiltering}
                setData={setData}
                filters={filters}
                setFilters={setFilters}
                filterData={filterData}
                // target is for demo purposes only, remove in production
                target={containerRef && containerRef.current}
              />
            )}
          </Box>

          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Results data={data} />
    </Box>
  );
};

FilteringWithSelect.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Filters = ({
  filtering,
  filters,
  setData,
  filterData,
  setFilters,
  setFiltering,
  target, // target is for demo purposes only, remove in production
}) => {
  const [selectValue, setSelectValue] = useState(defaultSelectValue);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);
  const resetFilters = () => {
    setData(allData);
    setSelectValue(defaultSelectValue);
    setFilters(defaultFilters);
    setFiltering(false);
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      selectValue,
    });
  };

  const restoreValues = values => {
    setSelectValue(values.selectValue);
  };

  const content = (
    <Select
      options={[defaultSelectValue, 'Ready', 'Paused']}
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
  );
  return (
    <>
      <Box align="center" direction="row" gap="small">
        {size !== 'small' ? (
          content
        ) : (
          <StyledButton
            icon={<Filter />}
            onClick={() => {
              setShowLayer(true);
              storePreviousFilterInfo();
            }}
          />
        )}
        {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
      </Box>
      {showLayer && (
        <Layer
          position={size !== 'small' ? 'right' : undefined}
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
          onEsc={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
          // target is for demo purposes only, remove in production
          target={target}
        >
          <Box
            width={{ min: 'medium' }}
            pad={{ horizontal: 'medium', vertical: 'medium' }}
            gap="medium"
            fill="vertical"
          >
            <Header>
              <Heading as="p" color="text-strong" margin="none">
                Filters
              </Heading>
              <Button
                icon={<FormClose />}
                onClick={() => {
                  filterData(allData, previousFilters);
                  restoreValues(previousValues);
                  setShowLayer(!showLayer);
                }}
              />
            </Header>
            <Box pad="xsmall" overflow="auto" flex>
              {content}
            </Box>
            <Box align="center" direction="row" gap="small">
              <Button
                label="Apply Filters"
                onClick={() => {
                  const nextData = filterData(allData, filters);
                  setData(nextData);
                  setShowLayer(!showLayer);
                }}
                primary
              />
              <Button
                label="Reset Filters"
                onClick={() => {
                  resetFilters();
                  setShowLayer(!showLayer);
                }}
                secondary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
  // target is for demo purposes only, remove in production
  target: PropTypes.object,
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text size="small" weight="bold">
      {data.length}
    </Text>
    <Text size="small">
      {filtering ? `result${data.length > 1 ? 's' : ''} of ` : 'items'}
    </Text>
    {filtering && (
      <Box direction="row" gap="xxsmall">
        <Text size="small" weight="bold">
          {allData.length}
        </Text>
        <Text size="small">{`item${allData.length > 1 ? 's' : ''}`}</Text>
      </Box>
    )}
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

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box pad={{ bottom: 'medium' }} overflow="auto" fill>
      <List
        border="horizontal"
        data={data}
        action={(item, index) => (
          <Box
            direction="row"
            align="center"
            gap="medium"
            key={index}
            flex={false}
          >
            <Box direction="row" gap="small" align="center">
              {size !== 'small' && <Text>{item.status}</Text>}
              <Box
                pad="xsmall"
                background={
                  item.status === 'Ready' ? 'status-ok' : 'status-warning'
                }
                round
              />
            </Box>
            <Menu
              icon={<More />}
              hoverIndicator
              items={[{ label: 'Manage Host' }]}
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
    </Box>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
    }),
  ),
};
