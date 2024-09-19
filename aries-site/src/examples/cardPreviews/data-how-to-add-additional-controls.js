import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Filter, Search, Descend, Columns } from 'grommet-icons';

export const DataHowToAddAdditionalControls = () => (
  <Box direction="row" align="center" gap="small">
    <TextInput icon={<Search />} placeholder="Search" tabIndex={-1} />
    <Button a11yTitle="Sort" icon={<Descend />} kind="toolbar" tabIndex={-1} />
    <Button a11yTitle="Filter" icon={<Filter />} kind="toolbar" tabIndex={-1} />
    <Button
      a11yTitle="Manage columns"
      icon={<Columns />}
      kind="toolbar"
      tabIndex={-1}
    />
  </Box>
);
