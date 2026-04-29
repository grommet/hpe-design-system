import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Filter, Search } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';

export const DataHowTo = () => {
  const ref = useInert();

  return (
    <Box ref={ref} direction="row" align="center" gap="xsmall">
      <TextInput icon={<Search />} placeholder="Search" />
      <Button a11yTitle="Filter" icon={<Filter />} kind="toolbar" />
    </Box>
  );
};
