import React from 'react';
import { Button, Header, Heading } from 'grommet';
import { Add } from 'grommet-icons';

export const HeaderPageExample = () => (
    <Header fill="horizontal">
      <Heading size="small">Accounts</Heading>
      <Button label="Add account" icon={<Add />} reverse />
    </Header>
  );
