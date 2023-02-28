import React from 'react';
import { Box, Text } from 'grommet';

export const TextSizeExample = () => (
  <Box direction="column" gap="medium">
    <Text>Text default</Text>
    <Text color="text-strong">colorProp</Text>
    <Text color="black">color non design token</Text>
    <Text size="small">sizeProp</Text>
    <Text weight="bolder">weightProp</Text>
    <Text style={{ fontStyle: 'italic' }}>styleProp</Text>
  </Box>
);
