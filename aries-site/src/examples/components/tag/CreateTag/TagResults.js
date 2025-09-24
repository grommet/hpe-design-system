import { Box } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const TagResults = ({ ...rest }) => (
  <Box flex={false}>
    <Box border="bottom" pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}>
      <TextEmphasis>Assigned tags</TextEmphasis>
    </Box>
    <Box
      direction="row"
      pad={{ horizontal: '3xsmall', vertical: '3xsmall' }}
      wrap
      {...rest}
    />
  </Box>
);
