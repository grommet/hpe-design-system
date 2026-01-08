import React, { useContext } from 'react';
import { Button, Header, Menu, Nav, ResponsiveContext } from 'grommet';
// eslint-disable-next-line max-len
import { AppIdentity } from '@shared/aries-core/src/js/components/helpers/AppIdentity';

const items = [
  { label: 'Label 1' },
  { label: 'Label 2' },
  { label: 'Label 3' },
];

export const HeaderNavigationExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Header fill="horizontal">
      <AppIdentity href="#" brand="hpe" title="App Name" />
      {!['xsmall', 'small'].includes(size) ? (
        <Nav direction="row" gap="xsmall">
          {items.map(item => (
            <Button label={item.label} key={item.label} />
          ))}
        </Nav>
      ) : (
        <Menu label="Menu" items={items} />
      )}
    </Header>
  );
};
