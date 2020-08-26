import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  DropButton,
  FormField,
  Form,
  List,
  Header,
  Heading,
  RangeSelector,
  Stack,
  Select,
  Text,
} from 'grommet';
import { Filter } from 'grommet-icons';

const allData = [
  {
    availability: 90.2,
    name: 'Asup-array01-lvs (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 70.3,
    name: 'Des-K8-Sym-R5-3 (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 95.8,
    name: 'Dev36-erray01 ( default)',
    location: 'Houston, TX',
  },
  {
    availability: 85.1,
    name: 'asup-array1 (default)',
    location: 'Fort Collins, CO',
  },
  {
    availability: 53.4,
    name: 'asup-array21 (default)',
    location: 'New York, NY',
  },
  { availability: 77.3, name: 'Dpe-R3-19 (default)', location: 'Houston, TX' },
  {
    availability: 30.4,
    name: 'Asup-array10-lvs (default)',
    location: 'Fort Collins, CO',
  },
];

const defaultSelectValue = 'All Locations';
const defaultAvailability = [0, 100];
const defaultFilters = {};

export const FilteringWithRangeInput = () => {
  const [data, setData] = useState(allData);
  const [selectValue, setSelectValue] = useState(defaultSelectValue);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState(defaultAvailability);
  const [filters, setFilters] = useState(defaultFilters);
  const [filtering, setFiltering] = useState(false);

  const resetFilters = () => {
    setAvailability(defaultAvailability);
    setData(allData);
    setSelectValue(defaultSelectValue);
    setFilters(defaultFilters);
    setFiltering(false);
  };
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

  return (
    <Box
      gap="medium"
      width={{ max: 'xxlarge' }}
      margin="auto"
      overflow="auto"
      pad="small"
      fill
    >
      <Header>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Storage
          </Heading>
          <Box align="center" direction="row" justify="between" gap="xsmall">
            <Box direction="row" gap="xsmall">
              <Select
                options={[
                  'All Locations',
                  'Fort Collins, CO',
                  'Houston, TX',
                  'New York, NY',
                  'San Jose, CA',
                ]}
                value={selectValue}
                onChange={({ option }) => {
                  const nextFilters = {
                    ...filters,
                    location: nextLocation => nextLocation === option,
                  };
                  const nextData = filterData(allData, nextFilters);
                  setSelectValue(option);
                  setData(nextData);
                  setFiltering(true);
                }}
              />

              <DropButton
                alignSelf="start"
                icon={<Filter />}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                dropContent={
                  <Box pad="medium" width="medium">
                    <Form>
                      <FormField
                        name="range-selector"
                        htmlFor="range-selector"
                        label="Availability"
                      >
                        <Stack>
                          <Box
                            background="border"
                            height="3px"
                            direction="row"
                          />
                          <RangeSelector
                            name="range-selector"
                            id="range-selector"
                            min={0}
                            max={100}
                            values={availability}
                            onChange={nextRange => setAvailability(nextRange)}
                          />
                        </Stack>
                      </FormField>
                      <Text size="small">
                        {`${availability[0]}% - ${availability[1]}%`}
                      </Text>
                      <Box direction="row" justify="end" gap="small">
                        <Button
                          label="Reset Filter"
                          secondary
                          onClick={() => {
                            const nextFilters = {
                              ...filters,
                              availability: undefined,
                            };
                            const nextData = filterData(allData, nextFilters);
                            setData(nextData);
                            setAvailability(defaultAvailability);
                          }}
                        />
                        <Button
                          label="Apply Filter"
                          primary
                          onClick={() => {
                            const nextFilters = {
                              ...filters,
                              availability: nextAvailability =>
                                nextAvailability >= availability[0] &&
                                nextAvailability <= availability[1],
                            };
                            const nextData = filterData(allData, nextFilters);
                            setData(nextData);
                            setFiltering(true);
                            setOpen(!open);
                          }}
                        />
                      </Box>
                    </Form>
                  </Box>
                }
                dropAlign={{ top: 'bottom', left: 'left' }}
              />
            </Box>

            {filtering && (
              <Anchor label="Clear filters" onClick={resetFilters} />
            )}
          </Box>
          <Box direction="row" gap="xxsmall">
            <Text color="text-weak" size="small" weight="bold">
              {data.length}
            </Text>
            <Text color="text-weak" size="small">
              {filtering ? 'results' : 'items'}
            </Text>
          </Box>
        </Box>
      </Header>
      <Box overflow="auto" fill>
        <List
          background="background-front"
          border="horizontal"
          data={data}
          action={item => (
            <Box direction="row" align="center" gap="medium">
              <Box direction="row" gap="small" align="center">
                <Text>Availability: {item.availability}%</Text>
                <Box
                  pad="xsmall"
                  background={
                    item.availability <= 70 ? 'status-critical' : 'status-ok'
                  }
                  round
                />
              </Box>
            </Box>
          )}
          onClickItem={() => {
            // eslint-disable-next-line no-alert
            alert(`
          Typically a click would route to a view with 
          greater detail behind this summary information.
          `);
          }}
        >
          {(datum, index) => (
            <>
              <Text weight="bold" key={index}>
                {datum.name}
              </Text>
              <Text size="small">{datum.location}</Text>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
};
