import { Box, Text } from 'grommet';

export const TagResults = ({ ...rest }) => (
  <Box flex={false}>
    <Box border="bottom" pad={{ horizontal: 'small', vertical: 'xsmall' }}>
      <Text color="text-strong" weight="bold">
        Tags to be assigned
      </Text>
    </Box>
    <Box
      direction="row"
      gap="small"
      pad={{ horizontal: 'small', vertical: 'small' }}
      {...rest}
    />
  </Box>
);
