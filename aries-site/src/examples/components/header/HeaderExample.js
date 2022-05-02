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

export function HeaderExample() {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  return (
    <Header
      fill="horizontal"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      background="background-front"
    >
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
          {(!['xsmall', 'small'].includes(size) ||
            (['xsmall', 'small'].includes(size) && !focused)) && (
            <Box direction="row" gap="xsmall" wrap>
              <Text color="text-strong" weight="bold">
                HPE
              </Text>
              <Text color="text-strong">App Name</Text>
            </Box>
          )}
        </Box>
      </Button>
      <>
        {!focused && ['xsmall', 'small'].includes(size) && (
          <Button
            icon={<SearchIcon />}
            hoverIndicator
            onClick={() => setFocused(true)}
          />
        )}
        {(focused || !['xsmall', 'small'].includes(size)) && (
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
}
