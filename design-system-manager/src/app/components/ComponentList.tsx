'use client';

import { Box, List } from "grommet";

export const ComponentList = () => {
  return (
    <List>
      {({ name }) => (
        <Box background="background-front">
          {name}
        </Box>
      )}
    </List>
)};