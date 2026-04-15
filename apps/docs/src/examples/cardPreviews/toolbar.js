import React from 'react';
import { Toolbar, TextInput, DropButton } from 'grommet';
import { Search, Filter } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';

export const ToolBarPreview = () => {
  const ref = useInert();

  return (
    <Toolbar ref={ref}>
      <TextInput icon={<Search />} />
      <DropButton kind="toolbar" icon={<Filter />} />
    </Toolbar>
  );
};
