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
import { Search as SearchIcon, Hpe } from 'grommet-icons';

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon-example',
}))``;

export const HeaderExample = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  return (
    <Header fill="horizontal" pad="none" background="background-front">
      <Button plain>
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
      <>
        {!focused && size === 'small' && (
          <Button
            icon={<SearchIcon />}
            hoverIndicator
            onClick={() => setFocused(true)}
          />
        )}
        {(focused || size !== 'small') && (
          <Box background="background-contrast" round="xsmall" width="medium">
            <Keyboard onEsc={() => setFocused(false)}>
              <StyledTextInput
                ref={inputRef}
                icon={<SearchIcon id="search-icon-example" />}
                dropHeight="small"
                placeholder="Search HPE Design System"
                onBlur={() => setFocused(false)}
                plain
                reverse
              />
            </Keyboard>
          </Box>
        )}
      </>
    </Header>
  );
};
