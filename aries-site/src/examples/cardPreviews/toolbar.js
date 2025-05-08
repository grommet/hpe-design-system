import React from 'react';
import { Toolbar, TextInput, DropButton } from 'grommet';
import { Search, Filter } from 'grommet-icons';

export const ToolBarPreview = () => (
  <Toolbar>
    <TextInput tabIndex={-1} icon={<Search />} />
    <DropButton tabIndex={-1} kind="toolbar" icon={<Filter />} />
  </Toolbar>
);
