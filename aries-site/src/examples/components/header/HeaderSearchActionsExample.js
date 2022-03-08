import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Header,
  Keyboard,
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

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-complex-example',
}))``;

const Search = () => {
  const inputRef = useRef();
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  return !focused && ['xsmall', 'small'].includes(size) ? (
    <Button
      icon={<SearchIcon />}
      hoverIndicator
      onClick={() => setFocused(true)}
    />
  ) : (
    <Box background="background-contrast" round="xsmall" width="medium">
      <Keyboard onEsc={() => setFocused(false)}>
        <StyledTextInput
          ref={inputRef}
          icon={<SearchIcon id="search-complex-example" />}
          dropHeight="small"
          placeholder="Search App Name"
          onBlur={() => setFocused(false)}
          plain
          reverse
        />
      </Keyboard>
    </Box>
  );
};

export const HeaderSearchActionsExample = () => (
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
    <Search />
    <Box direction="row">
      <Button icon={<Notification />} />
      <Button icon={<Chat />} />
      <Button icon={<User />} />
    </Box>
  </Header>
);
