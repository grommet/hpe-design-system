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
  console.log({ size });
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
        <Box
          direction="row"
          align="center"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'small' }}
          responsive={false}
        >
          <Hpe color="brand" />
          {(size !== 'small' || (size === 'small' && !focused)) && (
            <Box direction="row" gap="xsmall">
              <Text color="text-strong" weight="bold">
                HPE
              </Text>
              <Text color="text-strong">App Name</Text>
            </Box>
          )}
        </Box>
      </Button>
      <>
        {!focused && size === 'small' && (
          <Button
            icon={<SearchIcon color="text-strong" />}
            hoverIndicator
            onClick={() => setFocused(true)}
          />
        )}
        {(focused || size !== 'small') && (
          <Box background="background-contrast" round="xsmall" width="medium">
            <Keyboard onEsc={() => setFocused(false)}>
              <StyledTextInput
                ref={inputRef}
                icon={
                  <SearchIcon color="text-strong" id="search-icon-example" />
                }
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
