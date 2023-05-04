import { Box } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const TagResults = ({ ...rest }) => (
  <Box flex={false}>
    <Box border="bottom" pad={{ horizontal: 'small', vertical: 'xsmall' }}>
      <TextEmphasis>Assigned tags</TextEmphasis>
    </Box>
    <Box
      direction="row"
      pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      wrap
      {...rest}
    />
  </Box>
);
