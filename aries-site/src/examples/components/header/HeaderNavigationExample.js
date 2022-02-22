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
      <Button>
        <Box
          direction="row"
          align="start"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'small' }}
          responsive={false}
        >
          <Hpe color="brand" />
          <Box direction="row" gap="xsmall" wrap>
            <Text color="text-strong" weight="bold">
              HPE
            </Text>
            <Text color="text-strong">App Name</Text>
          </Box>
        </Box>
      </Button>
      {!['xsmall', 'small'].includes(size) ? (
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
