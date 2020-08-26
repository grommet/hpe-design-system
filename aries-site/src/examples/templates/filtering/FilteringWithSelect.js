import React, { useState } from 'react';
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

export const FilteringWithSelect = () => {
  const [data, setData] = useState(allData);
  const [selectValue, setSelectValue] = useState(defaultSelectValue);

  const filterData = value => {
    const nextData =
      value !== defaultSelectValue
        ? allData.filter(datum => datum.status === value)
        : allData;
    setData(nextData);
  };

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
              setSelectValue(option);
              filterData(option);
            }}
          />
          <Box direction="row" gap="xxsmall">
            <Text color="text-weak" size="small" weight="bold">
              {data.length}
            </Text>
            <Text color="text-weak" size="small">
              {selectValue !== defaultSelectValue ? 'results' : 'items'}
            </Text>
          </Box>
        </Box>
      </Header>
      <List
        background="background-front"
        border="horizontal"
        data={data}
        action={item => (
          <Box direction="row" align="center" gap="medium">
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
    </Box>
  );
};
