import React, { useContext, useState } from 'react';
import { AppIdentity, Header } from 'aries-core';
import { Box, ResponsiveContext, TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

export const HeaderExample = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);

  return (
      <Header pad="none" background='background-front'>
        <AppIdentity
          brand="hpe"
          logoOnly={size === 'small'}
          title="Design System"
        />
        <Box
          align="center"
          background={
            size !== 'small' || focused ? 'background-contrast' : undefined
          }
          direction="row"
          justify="between"
          onClick={() => setFocused(true)}
          onFocus={() => setFocused(true)}
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