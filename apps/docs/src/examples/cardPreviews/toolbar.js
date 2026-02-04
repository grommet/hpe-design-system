import React from 'react';
import { Toolbar, TextInput, DropButton } from 'grommet';
import { Search, Filter } from '@hpe-design/icons-grommet';

export const ToolBarPreview = () => (
  <Toolbar>
    <TextInput tabIndex={-1} icon={<Search />} />
    <DropButton tabIndex={-1} kind="toolbar" icon={<Filter />} />
  </Toolbar>
);
