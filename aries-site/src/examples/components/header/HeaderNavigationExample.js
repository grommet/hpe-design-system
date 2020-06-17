import React, { useContext } from 'react';
import {
  Box,
  Button,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Hpe } from 'grommet-icons';

const items = [
  { label: 'Label 1' },
  { label: 'Label 2' },
  { label: 'Label 3' },
];

export const HeaderNavigationExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Header fill="horizontal">
      <Button plain>
        <Box direction="row" align="center" gap="medium">
          <Hpe color="brand" />
          <Box direction="row" gap="xsmall">
            <Text weight="bold">HPE</Text>
            <Text>App Name</Text>
          </Box>
        </Box>
      </Button>
      {size !== 'small' ? (
        <Nav direction="row">
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
