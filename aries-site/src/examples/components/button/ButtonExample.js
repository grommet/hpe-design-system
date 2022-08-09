import React from 'react';
import { Box, Button } from 'grommet';

export const ButtonExample = () => (
  <Box gap="medium">
    <Button
      alignSelf="start"
      label="CTA Primary"
      onClick={() => {}}
      kind="cta-primary"
    />
    <Button
      alignSelf="start"
      label="CTA Primary Disabled"
      onClick={() => {}}
      kind="cta-primary"
      disabled
    />
    <Button
      alignSelf="start"
      label="CTA Alternate"
      onClick={() => {}}
      kind="cta-alternate"
    />
    <Button
      alignSelf="start"
      label="CTA Alternate Disabled"
      onClick={() => {}}
      kind="cta-alternate"
      disabled
    />
  </Box>
);
