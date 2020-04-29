import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Header,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import {
  Chat,
  Hpe,
  Notification,
  Search as SearchIcon,
  User,
} from 'grommet-icons';

const Search = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);
  return (
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
        <TextInput placeholder="Search App Name" plain />
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
  );
};

export const HeaderSearchActionsExample = () => {
  return (
    <Header fill="horizontal">
      <Button>
        <Box direction="row" align="center" gap="medium">
          <Hpe color="brand" />
          <Box direction="row" gap="xsmall">
            <Text weight="bold">HPE</Text>
            <Text>App Name</Text>
          </Box>
        </Box>
      </Button>
      <Search />
      <Box direction="row">
        <Button icon={<Notification />} />
        <Button icon={<Chat />} />
        <Button icon={<User />} />
      </Box>
    </Header>
  );
};
