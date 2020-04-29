import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Header,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import { Search as SearchIcon, Hpe } from 'grommet-icons';

export const HeaderExample = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);

  return (
    <Header fill="horizontal" pad="none" background="background-front">
      <Button>
        <Box direction="row" align="center" gap="medium">
          <Hpe color="brand" />
          {(size !== 'small' || (size === 'small' && !focused)) && (
            <Box direction="row" gap="xsmall">
              <Text weight="bold">HPE</Text>
              <Text>App Name</Text>
            </Box>
          )}
        </Box>
      </Button>
      <Box
        align="center"
        background={
          size !== 'small' || focused ? 'background-contrast' : undefined
        }
        direction="row"
        justify="between"
        onClick={() => setFocused(true)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        pad={{ right: 'small' }}
        round="small"
        width={size !== 'small' || focused ? 'medium' : undefined}
      >
        {size !== 'small' || focused ? (
          <TextInput placeholder="Search HPE Design System" plain />
        ) : (
          undefined
        )}
        <Box
          pad={
            size === 'small' && !focused
              ? { vertical: 'medium', left: 'medium' }
              : undefined
          }
        >
          <SearchIcon color="text" />
        </Box>
      </Box>
    </Header>
  );
};
