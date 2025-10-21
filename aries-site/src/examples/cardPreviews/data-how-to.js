import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Filter, Search } from '@hpe-design/icons-grommet';

export const DataHowTo = () => (
  <Box direction="row" align="center" gap="xsmall">
    <TextInput icon={<Search />} placeholder="Search" tabIndex={-1} />
    <Button a11yTitle="Filter" icon={<Filter />} kind="toolbar" tabIndex={-1} />
  </Box>
);
